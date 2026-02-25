import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuthChallengeHeader, isAdminAuthorized } from '@/lib/admin-auth';
import { convexApi } from '@/lib/convex-api.generated';
import { callConvexFunction } from '@/lib/convex-http';

type DashboardResponse = {
  audience: {
    totalUsers: number;
    uniqueRecipients: number;
    invalidEmails: number;
  };
  recentCampaigns: Array<{
    _id: string;
    title: string;
    subject: string;
    status: string;
    totalRecipients: number;
    sentCount: number;
    failedCount: number;
    createdAt: number;
    sentAt?: number;
  }>;
};

type SendResponse = {
  campaignId: string;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  status: string;
  errors: string[];
  ignoredRecipientCount?: number;
};

type ConvexFunctionType = 'query' | 'mutation' | 'action';
type ConvexFunctionInfo = {
  path: string;
  type: ConvexFunctionType;
  visibility: 'public' | 'internal' | 'unknown';
};

type AudienceEmailsResponse = {
  summary: {
    totalUsers: number;
    totalUsersWithEmail: number;
    validRecipientCount: number;
    invalidEmailCount: number;
  };
  emails: Array<{
    email: string;
    normalizedEmail: string;
    isValid: boolean;
    userCount: number;
  }>;
};

function isConvexFunctionInfo(value: unknown): value is ConvexFunctionInfo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const maybe = value as Partial<ConvexFunctionInfo>;
  return (
    typeof maybe.path === 'string' &&
    (maybe.type === 'query' || maybe.type === 'mutation' || maybe.type === 'action') &&
    (maybe.visibility === 'public' || maybe.visibility === 'internal' || maybe.visibility === 'unknown')
  );
}

function findConvexFunctionInfoByPath(node: unknown, path: string): ConvexFunctionInfo | null {
  if (isConvexFunctionInfo(node)) {
    return node.path === path ? node : null;
  }
  if (typeof node !== 'object' || node === null) {
    return null;
  }
  for (const value of Object.values(node as Record<string, unknown>)) {
    const found = findConvexFunctionInfoByPath(value, path);
    if (found) {
      return found;
    }
  }
  return null;
}

function getRequiredFunction(path: string, expectedType: ConvexFunctionType): ConvexFunctionInfo {
  const found = findConvexFunctionInfoByPath(convexApi, path);
  if (!found) {
    // Fallback for stale generated maps: still call the known backend function path.
    return {
      path,
      type: expectedType,
      visibility: 'unknown',
    };
  }
  if (found.type !== expectedType) {
    throw new Error(`Function "${path}" has unexpected type "${found.type}"`);
  }
  return found;
}

function getString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toOptionalStringArray(value: unknown): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    throw new Error('recipientEmails must be an array of strings');
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthorized(request.headers.get('authorization'))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'WWW-Authenticate': getAdminAuthChallengeHeader(),
          },
        },
      );
    }

    const campaignAdminToken = process.env.CAMPAIGN_ADMIN_TOKEN;
    if (!campaignAdminToken) {
      return NextResponse.json(
        { error: 'CAMPAIGN_ADMIN_TOKEN is not configured on web server' },
        { status: 500 },
      );
    }

    const dashboardFunction = getRequiredFunction('emailCampaigns:getDashboardData', 'query');
    const audienceEmailsFunction = getRequiredFunction('emailCampaigns:getAudienceEmails', 'query');
    const sendFunction = getRequiredFunction('emailCampaigns:sendCampaign', 'action');
    const body = (await request.json()) as Record<string, unknown>;
    const mode = body.mode;

    if (mode === 'dashboard') {
      const limit = typeof body.limit === 'number' ? body.limit : undefined;
      const result = await callConvexFunction<DashboardResponse>({
        type: dashboardFunction.type,
        path: dashboardFunction.path,
        args: {
          adminToken: campaignAdminToken,
          limit,
        },
      });
      return NextResponse.json(result);
    }

    if (mode === 'audienceEmails') {
      const search = toOptionalString(body.search);
      const includeInvalid = typeof body.includeInvalid === 'boolean' ? body.includeInvalid : true;

      const result = await callConvexFunction<AudienceEmailsResponse>({
        type: audienceEmailsFunction.type,
        path: audienceEmailsFunction.path,
        args: {
          adminToken: campaignAdminToken,
          search,
          includeInvalid,
        },
      });
      return NextResponse.json(result);
    }

    if (mode === 'send') {
      const title = getString(body.title);
      const subject = getString(body.subject);
      const content = getString(body.content);
      const previewText = toOptionalString(body.previewText);
      const ctaLabel = toOptionalString(body.ctaLabel);
      const ctaUrl = toOptionalString(body.ctaUrl);
      const recipientEmails = toOptionalStringArray(body.recipientEmails);

      if (!title || !subject || !content) {
        return NextResponse.json(
          { error: 'title, subject, and content are required' },
          { status: 400 },
        );
      }

      const result = await callConvexFunction<SendResponse>({
        type: sendFunction.type,
        path: sendFunction.path,
        args: {
          adminToken: campaignAdminToken,
          title,
          subject,
          content,
          previewText,
          ctaLabel,
          ctaUrl,
          recipientEmails,
        },
      });

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unsupported mode' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    const status = message.toLowerCase().includes('unauthorized') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

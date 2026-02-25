'use client';

import { FormEvent, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type CampaignRecord = {
  _id: string;
  title: string;
  subject: string;
  status: string;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  createdAt: number;
  sentAt?: number;
};

type DashboardData = {
  audience: {
    totalUsers: number;
    uniqueRecipients: number;
    invalidEmails: number;
  };
  recentCampaigns: CampaignRecord[];
};

type AudienceEmailItem = {
  email: string;
  normalizedEmail: string;
  isValid: boolean;
  userCount: number;
};

type AudienceEmailsData = {
  summary: {
    totalUsers: number;
    totalUsersWithEmail: number;
    validRecipientCount: number;
    invalidEmailCount: number;
  };
  emails: AudienceEmailItem[];
};

type SendResult = {
  campaignId: string;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  status: string;
  errors: string[];
  ignoredRecipientCount?: number;
};

type SendTargetMode = 'all' | 'selected';

function formatTimestamp(seconds: number | undefined): string {
  if (!seconds) {
    return '-';
  }
  return new Date(seconds * 1000).toLocaleString();
}

function statusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'sent':
      return 'default';
    case 'partial':
      return 'secondary';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
}

async function readApiResponse<T>(response: Response, fallbackError: string): Promise<T> {
  const data = (await response.json()) as T | { error?: string };
  if (!response.ok) {
    const errorMessage =
      typeof data === 'object' &&
      data !== null &&
      'error' in data &&
      typeof data.error === 'string'
        ? data.error
        : fallbackError;
    throw new Error(errorMessage);
  }
  return data as T;
}

export default function EmailCampaignAdminPage() {
  const [title, setTitle] = useState('New release update');
  const [subject, setSubject] = useState('Baby Easy Tracker: New release is live');
  const [previewText, setPreviewText] = useState('New features and improvements are now available.');
  const [content, setContent] = useState(
    'We just shipped a new Baby Easy Tracker release.\n\nWhat is new:\n- Faster timeline loading\n- Improved sleep tracking details\n- Better reminder reliability\n\nUpdate the app and let us know what you think.',
  );
  const [ctaLabel, setCtaLabel] = useState('Read release notes');
  const [ctaUrl, setCtaUrl] = useState('https://easybabytracker.com/en/blog');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('Release image');
  const [sendTargetMode, setSendTargetMode] = useState<SendTargetMode>('all');

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [audienceEmails, setAudienceEmails] = useState<AudienceEmailsData | null>(null);
  const [sendResult, setSendResult] = useState<SendResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [emailFilter, setEmailFilter] = useState('');
  const [showInvalidEmails, setShowInvalidEmails] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const selectedEmailSet = useMemo(() => new Set(selectedEmails), [selectedEmails]);

  const filteredAudienceEmails = useMemo(() => {
    if (!audienceEmails) {
      return [];
    }
    const filterValue = emailFilter.trim().toLowerCase();
    return audienceEmails.emails.filter((entry) => {
      if (!showInvalidEmails && !entry.isValid) {
        return false;
      }
      if (!filterValue) {
        return true;
      }
      return entry.normalizedEmail.includes(filterValue) || entry.email.toLowerCase().includes(filterValue);
    });
  }, [audienceEmails, emailFilter, showInvalidEmails]);

  const selectableFilteredEmails = useMemo(
    () => filteredAudienceEmails.filter((entry) => entry.isValid).map((entry) => entry.normalizedEmail),
    [filteredAudienceEmails],
  );

  const allFilteredSelected = useMemo(() => {
    if (selectableFilteredEmails.length === 0) {
      return false;
    }
    return selectableFilteredEmails.every((email) => selectedEmailSet.has(email));
  }, [selectableFilteredEmails, selectedEmailSet]);

  const canSend = useMemo(() => {
    const hasBaseFields = title.trim().length > 0 && subject.trim().length > 0 && content.trim().length > 0;
    const hasValidCta = (!ctaLabel.trim() && !ctaUrl.trim()) || (ctaLabel.trim() && ctaUrl.trim());
    const hasRecipientsForMode = sendTargetMode === 'all' || selectedEmails.length > 0;
    return hasBaseFields && hasValidCta && hasRecipientsForMode;
  }, [title, subject, content, ctaLabel, ctaUrl, sendTargetMode, selectedEmails.length]);

  const updateEmailSelection = (email: string, shouldSelect: boolean) => {
    setSelectedEmails((current) => {
      if (shouldSelect) {
        if (current.includes(email)) {
          return current;
        }
        return [...current, email];
      }
      return current.filter((item) => item !== email);
    });
  };

  const selectAllFilteredEmails = () => {
    setSelectedEmails((current) => {
      const next = new Set(current);
      for (const email of selectableFilteredEmails) {
        next.add(email);
      }
      return [...next].sort();
    });
  };

  const clearSelectedEmails = () => {
    setSelectedEmails([]);
  };

  const loadAdminData = async () => {
    setError(null);
    setIsLoadingDashboard(true);

    try {
      const [dashboardResponse, emailsResponse] = await Promise.all([
        fetch('/api/admin/email-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'dashboard',
          }),
        }),
        fetch('/api/admin/email-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'audienceEmails',
            includeInvalid: true,
          }),
        }),
      ]);

      const [dashboardData, emailsData] = await Promise.all([
        readApiResponse<DashboardData>(dashboardResponse, 'Failed to load dashboard'),
        readApiResponse<AudienceEmailsData>(emailsResponse, 'Failed to load audience emails'),
      ]);

      setDashboard(dashboardData);
      setAudienceEmails(emailsData);
      setSelectedEmails((current) => {
        const availableRecipients = new Set(
          emailsData.emails.filter((entry) => entry.isValid).map((entry) => entry.normalizedEmail),
        );
        return current.filter((email) => availableRecipients.has(email));
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load admin data');
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();

    if (!canSend) {
      setError('Please fill required fields and choose recipients.');
      return;
    }

    setError(null);
    setSendResult(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/admin/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'send',
          title: title.trim(),
          subject: subject.trim(),
          previewText: previewText.trim() || undefined,
          content: content.trim(),
          ctaLabel: ctaLabel.trim() || undefined,
          ctaUrl: ctaUrl.trim() || undefined,
          recipientEmails: sendTargetMode === 'selected' ? selectedEmails : undefined,
        }),
      });

      const data = await readApiResponse<SendResult>(response, 'Failed to send campaign');
      setSendResult(data);
      await loadAdminData();
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Failed to send campaign');
    } finally {
      setIsSending(false);
    }
  };

  const insertImageMarkdown = () => {
    const trimmedUrl = imageUrl.trim();
    if (!trimmedUrl) {
      setError('Please enter an image URL first.');
      return;
    }

    const altText = imageAlt.trim() || 'Image';
    const markdownLine = `![${altText}](${trimmedUrl})`;
    setContent((current) => `${current.trimEnd()}\n\n${markdownLine}\n`);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Campaign Admin</CardTitle>
          <CardDescription>
            Write a release update and choose recipients before sending. This area is protected by
            server-side admin auth.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="text-sm text-muted-foreground">
            Campaign token is kept on the server and not exposed to the browser.
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={loadAdminData} disabled={isLoadingDashboard}>
              {isLoadingDashboard ? 'Loading...' : 'Load Audience'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Request failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {sendResult ? (
        <Alert>
          <AlertTitle>Campaign sent ({sendResult.status})</AlertTitle>
          <AlertDescription>
            Sent {sendResult.sentCount} / {sendResult.totalRecipients}, failed {sendResult.failedCount}
            {sendResult.ignoredRecipientCount ? `, ignored ${sendResult.ignoredRecipientCount} recipients` : ''}
            {sendResult.errors.length > 0 ? `, first error: ${sendResult.errors[0]}` : ''}
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Recipients</CardTitle>
          <CardDescription>
            View all emails, filter the list, and choose exactly who should receive this campaign.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <Input
              placeholder="Filter emails"
              value={emailFilter}
              onChange={(event) => setEmailFilter(event.target.value)}
            />
            <div className="flex items-center gap-2 rounded-md border px-3">
              <Checkbox
                id="showInvalidEmails"
                checked={showInvalidEmails}
                onCheckedChange={(checked) => setShowInvalidEmails(checked === true)}
              />
              <Label htmlFor="showInvalidEmails" className="text-sm">
                Show invalid
              </Label>
            </div>
            <Button type="button" variant="outline" onClick={selectAllFilteredEmails} disabled={selectableFilteredEmails.length === 0}>
              Select filtered
            </Button>
            <Button type="button" variant="outline" onClick={clearSelectedEmails} disabled={selectedEmails.length === 0}>
              Clear selected
            </Button>
          </div>

          {audienceEmails ? (
            <>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Users</div>
                  <div className="text-2xl font-semibold">{audienceEmails.summary.totalUsers}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Users with email</div>
                  <div className="text-2xl font-semibold">{audienceEmails.summary.totalUsersWithEmail}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Valid recipients</div>
                  <div className="text-2xl font-semibold">{audienceEmails.summary.validRecipientCount}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Selected</div>
                  <div className="text-2xl font-semibold">{selectedEmails.length}</div>
                </div>
              </div>

              <div className="max-h-[360px] overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">
                        <Checkbox
                          checked={allFilteredSelected}
                          onCheckedChange={(checked) => {
                            if (checked === true) {
                              selectAllFilteredEmails();
                              return;
                            }
                            clearSelectedEmails();
                          }}
                          disabled={selectableFilteredEmails.length === 0}
                        />
                      </TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>User count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAudienceEmails.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No emails found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAudienceEmails.map((entry) => (
                        <TableRow key={`${entry.normalizedEmail}:${entry.isValid ? 'valid' : 'invalid'}`}>
                          <TableCell>
                            <Checkbox
                              checked={selectedEmailSet.has(entry.normalizedEmail)}
                              disabled={!entry.isValid}
                              onCheckedChange={(checked) =>
                                updateEmailSelection(entry.normalizedEmail, checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell className="font-mono text-xs">{entry.email}</TableCell>
                          <TableCell>
                            <Badge variant={entry.isValid ? 'default' : 'outline'}>
                              {entry.isValid ? 'valid' : 'invalid'}
                            </Badge>
                          </TableCell>
                          <TableCell>{entry.userCount}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Load audience data first.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compose campaign</CardTitle>
          <CardDescription>
            Supports Markdown. Empty CTA fields to skip the button. Insert photos with markdown syntax:
            {' '}
            <code>![Alt text](https://image-url)</code>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSend}>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign title</Label>
                <Input id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Email subject</Label>
                <Input id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previewText">Preview text (optional)</Label>
              <Input
                id="previewText"
                value={previewText}
                onChange={(event) => setPreviewText(event.target.value)}
                placeholder="Small summary shown in inbox preview"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Release update content</Label>
              <Textarea
                id="content"
                rows={12}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>

            <div className="rounded-md border p-4">
              <div className="mb-3 text-sm font-medium">Insert image</div>
              <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
                <Input
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="https://example.com/photo.png"
                />
                <Input
                  value={imageAlt}
                  onChange={(event) => setImageAlt(event.target.value)}
                  placeholder="Alt text"
                />
                <Button type="button" variant="outline" onClick={insertImageMarkdown}>
                  Insert image markdown
                </Button>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="mb-3 text-sm font-medium">Markdown preview</div>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ctaLabel">CTA label (optional)</Label>
                <Input
                  id="ctaLabel"
                  value={ctaLabel}
                  onChange={(event) => setCtaLabel(event.target.value)}
                  placeholder="Read release notes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaUrl">CTA URL (optional)</Label>
                <Input
                  id="ctaUrl"
                  value={ctaUrl}
                  onChange={(event) => setCtaUrl(event.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-4">
              <Label>Target recipients</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={sendTargetMode === 'all' ? 'default' : 'outline'}
                  onClick={() => setSendTargetMode('all')}
                >
                  Send to all valid ({dashboard?.audience.uniqueRecipients ?? 0})
                </Button>
                <Button
                  type="button"
                  variant={sendTargetMode === 'selected' ? 'default' : 'outline'}
                  onClick={() => setSendTargetMode('selected')}
                >
                  Send to selected ({selectedEmails.length})
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={!canSend || isSending}>
              {isSending
                ? 'Sending...'
                : sendTargetMode === 'all'
                  ? 'Send to all users'
                  : `Send to ${selectedEmails.length} selected`}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent campaigns</CardTitle>
          <CardDescription>Most recent sends and delivery summary.</CardDescription>
        </CardHeader>
        <CardContent>
          {dashboard ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard.recentCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No campaigns yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  dashboard.recentCampaigns.map((campaign) => (
                    <TableRow key={campaign._id}>
                      <TableCell className="max-w-[240px] truncate">{campaign.title}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(campaign.status)}>{campaign.status}</Badge>
                      </TableCell>
                      <TableCell>{campaign.totalRecipients}</TableCell>
                      <TableCell>{campaign.sentCount}</TableCell>
                      <TableCell>{campaign.failedCount}</TableCell>
                      <TableCell>{formatTimestamp(campaign.createdAt)}</TableCell>
                      <TableCell>{formatTimestamp(campaign.sentAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No campaign history loaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

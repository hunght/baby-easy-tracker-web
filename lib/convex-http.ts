type ConvexFunctionType = 'query' | 'mutation' | 'action';

type ConvexSuccess<T> = {
  status: 'success';
  value: T;
};

type ConvexError = {
  status: 'error';
  errorMessage: string;
};

function getConvexUrl(): string {
  const url =
    process.env.CONVEX_URL ??
    process.env.NEXT_PUBLIC_CONVEX_URL ??
    process.env.EXPO_PUBLIC_CONVEX_URL;

  if (!url) {
    throw new Error('Convex URL is not configured. Set CONVEX_URL or NEXT_PUBLIC_CONVEX_URL.');
  }

  return url.replace(/\/$/, '');
}

export async function callConvexFunction<T>({
  type,
  path,
  args,
}: {
  type: ConvexFunctionType;
  path: string;
  args: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(`${getConvexUrl()}/api/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path,
      format: 'convex_encoded_json',
      args: [args],
    }),
  });

  if (!response.ok && response.status !== 560) {
    throw new Error(await response.text());
  }

  const payload = (await response.json()) as ConvexSuccess<T> | ConvexError;
  if (payload.status === 'success') {
    return payload.value;
  }

  throw new Error(payload.errorMessage);
}

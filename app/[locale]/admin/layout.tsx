import Link from 'next/link';
import { AdminSideMenu } from '@/components/admin/admin-side-menu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const newAdminUrl = process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? process.env.ADMIN_APP_URL;

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground">Internal tools for operations and growth.</p>
      </div>

      <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-950">
        <AlertTitle>Admin migration in progress</AlertTitle>
        <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            This admin page is being phased out. Use the dedicated admin app for email campaigns.
          </span>
          {newAdminUrl ? (
            <Button asChild size="sm" variant="outline">
              <Link href={newAdminUrl}>Open new admin app</Link>
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside>
          <AdminSideMenu locale={locale} />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

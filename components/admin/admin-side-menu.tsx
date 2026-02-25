'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AdminSideMenu({ locale }: { locale: string }) {
  const pathname = usePathname();
  const items = [
    {
      title: 'Email Campaign',
      description: 'Send release updates',
      href: `/${locale}/admin/email-campaign`,
    },
  ];

  return (
    <nav className="sticky top-6 rounded-lg border bg-card p-2">
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground',
                )}
              >
                <div className="text-sm font-medium">{item.title}</div>
                <div
                  className={cn(
                    'text-xs',
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground',
                  )}
                >
                  {item.description}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

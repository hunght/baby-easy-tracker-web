'use client';

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu, Home, BookOpen, MessageSquare, Tag, Calendar, Syringe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Icons } from './icons';
import { siteConfig } from '@/config/site';
import { ModeToggle } from './mode-toggle';

const navLinks = [
  { href: '/', label: 'Home', labelVi: 'Trang chủ', icon: Home },
  { href: '/easy-schedule', label: 'E.A.S.Y. Schedule', labelVi: 'Lịch E.A.S.Y', icon: Calendar },
  { href: '/blog', label: 'Blog', labelVi: 'Blog', icon: BookOpen },
  { href: '/pricing', label: 'Pricing', labelVi: 'Giá', icon: Tag },
  { href: '/feedback', label: 'Feedback', labelVi: 'Góp ý', icon: MessageSquare },
] as const;

const vietnameseOnlyLinks = [
  { href: '/lich-tiem-chung', label: 'Lịch tiêm chủng', icon: Syringe },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setOpen(false)}
            >
              <Icons.logo className="h-6 w-6" />
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </Link>
          </div>

          <nav className="mb-6 space-y-4">
            {navLinks.map(({ href, label, labelVi, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 ${
                  pathname === href ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon size={20} />
                <span>{locale === 'vi' ? labelVi : label}</span>
              </Link>
            ))}
            {locale === 'vi' &&
              vietnameseOnlyLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 ${
                    pathname === href ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              ))}
          </nav>

          <div className="mt-auto space-y-4">
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

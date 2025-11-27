'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu, Home, BookOpen, MessageSquare, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';
import { siteConfig } from '@/config/site';
import { ModeToggle } from './mode-toggle';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/pricing', label: 'Pricing', icon: Tag },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
            {navLinks.map(({ href, label, icon: Icon }) => (
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

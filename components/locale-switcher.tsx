'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLocaleChange = (newLocale: string) => {
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname === '' ? `/${newLocale}` : newPathname);
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" aria-label="Switch language">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Switch language">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLocaleChange('en')}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange('vi')}>
                    Tiếng Việt
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

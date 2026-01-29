'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useVaccinationStorage } from '@/hooks/use-vaccination-storage';
import { VaccinationDashboard } from '@/components/vaccinations/VaccinationDashboard';
import { VaccinationSetup } from '@/components/vaccinations/VaccinationSetup';
import { DownloadCtaBanner } from '@/components/download-cta-banner';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function VaccinationTrackerPage() {
  const router = useRouter();
  const locale = useLocale();
  const vaccinationStorage = useVaccinationStorage();
  const { isLoaded, isSetupComplete } = vaccinationStorage;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect non-Vietnamese users to home
  useEffect(() => {
    if (mounted && locale !== 'vi') {
      router.push(`/${locale}`);
    }
  }, [mounted, locale, router]);

  // Show loading state
  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-dvh flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Only show for Vietnamese locale
  if (locale !== 'vi') {
    return null;
  }

  // Show setup if not complete
  if (!isSetupComplete) {
    return (
      <div className="min-h-dvh flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-6">
          <VaccinationSetup onAddBaby={vaccinationStorage.addBaby} />
          <DownloadCtaBanner locale="vi" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <VaccinationDashboard storage={vaccinationStorage} />
        <DownloadCtaBanner locale="vi" />
      </main>
      <SiteFooter />
    </div>
  );
}

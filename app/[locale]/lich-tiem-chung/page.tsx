'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useVaccinationStorage } from '@/hooks/use-vaccination-storage';
import { VaccinationDashboard } from '@/components/vaccinations/VaccinationDashboard';
import { VaccinationSetup } from '@/components/vaccinations/VaccinationSetup';

export default function VaccinationTrackerPage() {
  const router = useRouter();
  const locale = useLocale();
  const { isLoaded, isSetupComplete } = useVaccinationStorage();
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
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Only show for Vietnamese locale
  if (locale !== 'vi') {
    return null;
  }

  // Show setup if not complete
  if (!isSetupComplete) {
    return <VaccinationSetup />;
  }

  return <VaccinationDashboard />;
}

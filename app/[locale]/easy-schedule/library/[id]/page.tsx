'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { SCHEDULES } from '@/data/easy-schedules';
import { useEasyStorage } from '@/hooks/use-easy-storage';
import { formatDuration, formatAgeRange } from '@/lib/easy-schedule-utils';
import type { ScheduleType } from '@/data/easy-types';
import { ScheduleDetail } from '@/components/easy-schedule/ScheduleDetail';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

interface ScheduleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ScheduleDetailPage({ params }: ScheduleDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const locale = useLocale() as 'en' | 'vi';
  const { currentSchedule, setCurrentSchedule } = useEasyStorage();

  const schedule = SCHEDULES[id as ScheduleType];

  if (!schedule) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">
          {locale === 'vi' ? 'Không tìm thấy lịch' : 'Schedule not found'}
        </p>
        <Link href={`/${locale}/easy-schedule/library`}>
          <Button variant="link">
            {locale === 'vi' ? 'Quay lại thư viện' : 'Back to library'}
          </Button>
        </Link>
      </div>
    );
  }

  const isSelected = currentSchedule === id;

  const handleSelect = () => {
    setCurrentSchedule(id as ScheduleType);
    router.push(`/${locale}/easy-schedule`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link href={`/${locale}/easy-schedule/library`}>
            <Button variant="ghost" size="icon" className="mt-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{schedule.name}</h1>
              {schedule.isGoldStandard && (
                <Badge variant="default">
                  {locale === 'vi' ? 'Tiêu chuẩn vàng' : 'Gold Standard'}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              {formatAgeRange(schedule.ageRange, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {(schedule.description || schedule.descriptionVi) && (
        <p className="mb-6 text-muted-foreground">
          {locale === 'vi' ? schedule.descriptionVi || schedule.description : schedule.description}
        </p>
      )}

      {/* Warning */}
      {schedule.warning && (
        <div className="mb-6 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            ⚠️ {schedule.warning}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold">{schedule.napCount}</p>
          <p className="text-sm text-muted-foreground">
            {locale === 'vi' ? 'Giấc ngủ' : 'Naps'}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold">
            {schedule.totalSleepTarget.min}-{schedule.totalSleepTarget.max}
          </p>
          <p className="text-sm text-muted-foreground">
            {locale === 'vi' ? 'Giờ ngủ' : 'Hours Sleep'}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold">
            {schedule.totalWakeTarget.min}-{schedule.totalWakeTarget.max}
          </p>
          <p className="text-sm text-muted-foreground">
            {locale === 'vi' ? 'Giờ thức' : 'Hours Awake'}
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold">{schedule.sleepDebtThreshold}</p>
          <p className="text-sm text-muted-foreground">
            {locale === 'vi' ? 'Ngưỡng nợ ngủ' : 'Debt Threshold'}
          </p>
        </div>
      </div>

      {/* Wake Windows */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold">
          {locale === 'vi' ? 'Thời gian thức' : 'Wake Windows'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {schedule.wakeWindows.map((ww, index) => (
            <Badge key={index} variant="outline" className="text-base">
              WW{index + 1}: {formatDuration(ww, locale)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Schedule Detail */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold">
          {locale === 'vi' ? 'Chi tiết lịch' : 'Schedule Details'}
        </h2>
        <ScheduleDetail schedule={schedule} locale={locale} />
      </div>

      {/* Sleep Debt Signs */}
      {schedule.sleepDebtSigns && schedule.sleepDebtSigns.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">
            {locale === 'vi' ? 'Dấu hiệu nợ ngủ' : 'Sleep Debt Signs'}
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {schedule.sleepDebtSigns.map((sign, index) => (
              <li key={index}>{sign}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Select Button */}
      <div className="sticky bottom-4 flex justify-center">
        <Button
          size="lg"
          className="w-full max-w-md shadow-lg"
          onClick={handleSelect}
          disabled={isSelected}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              {locale === 'vi' ? 'Đang sử dụng' : 'Currently Using'}
            </>
          ) : (
            locale === 'vi' ? 'Sử dụng lịch này' : 'Use This Schedule'
          )}
        </Button>
      </div>
    </div>
  );
}

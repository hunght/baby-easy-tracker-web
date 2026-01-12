'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useEasyStorage } from '@/hooks/use-easy-storage';
import { SCHEDULES, ALL_SCHEDULE_IDS } from '@/data/easy-schedules';
import { getSchedulesByAgeGroup, calculateAgeInWeeks, getRecommendedSchedule } from '@/lib/easy-schedule-utils';
import type { ScheduleType } from '@/data/easy-types';
import { ScheduleCard } from '@/components/easy-schedule/ScheduleCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LibraryPage() {
  const locale = useLocale() as 'en' | 'vi';
  const { baby, currentSchedule, setCurrentSchedule } = useEasyStorage();
  const [selectedTab, setSelectedTab] = useState('recommended');

  const ageWeeks = baby ? calculateAgeInWeeks(new Date(baby.birthDate)) : 0;
  const recommendation = ageWeeks > 0 ? getRecommendedSchedule(ageWeeks) : null;
  const ageGroups = getSchedulesByAgeGroup();

  const handleSelectSchedule = (scheduleId: ScheduleType) => {
    setCurrentSchedule(scheduleId);
  };

  // Get schedules for recommended tab
  const recommendedSchedules = recommendation
    ? [recommendation.primary, ...recommendation.variants]
    : [];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link href={`/${locale}/easy-schedule`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {locale === 'vi' ? 'Thư viện lịch' : 'Schedule Library'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {locale === 'vi'
              ? 'Chọn lịch phù hợp với bé của bạn'
              : 'Choose a schedule that fits your baby'}
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="recommended">
            {locale === 'vi' ? 'Đề xuất' : 'Recommended'}
          </TabsTrigger>
          <TabsTrigger value="all">
            {locale === 'vi' ? 'Tất cả' : 'All Schedules'}
          </TabsTrigger>
          <TabsTrigger value="by-age">
            {locale === 'vi' ? 'Theo tuổi' : 'By Age'}
          </TabsTrigger>
        </TabsList>

        {/* Recommended Tab */}
        <TabsContent value="recommended" className="space-y-4">
          {recommendation ? (
            <>
              <p className="text-sm text-muted-foreground">
                {locale === 'vi'
                  ? `Dựa trên tuổi ${ageWeeks} tuần của ${baby?.name || 'bé'}`
                  : `Based on ${baby?.name || 'baby'}'s age of ${ageWeeks} weeks`}
              </p>
              {recommendedSchedules.map((scheduleId) => (
                <ScheduleCard
                  key={scheduleId}
                  schedule={SCHEDULES[scheduleId]}
                  isSelected={currentSchedule === scheduleId}
                  isRecommended={scheduleId === recommendation.primary}
                  onSelect={() => handleSelectSchedule(scheduleId)}
                  locale={locale}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              {locale === 'vi'
                ? 'Vui lòng hoàn thành thiết lập để xem đề xuất'
                : 'Please complete setup to see recommendations'}
            </p>
          )}
        </TabsContent>

        {/* All Schedules Tab */}
        <TabsContent value="all" className="space-y-4">
          {ALL_SCHEDULE_IDS.map((scheduleId) => (
            <ScheduleCard
              key={scheduleId}
              schedule={SCHEDULES[scheduleId]}
              isSelected={currentSchedule === scheduleId}
              isRecommended={recommendation?.primary === scheduleId}
              onSelect={() => handleSelectSchedule(scheduleId)}
              locale={locale}
            />
          ))}
        </TabsContent>

        {/* By Age Tab */}
        <TabsContent value="by-age" className="space-y-6">
          {Object.entries(ageGroups).map(([groupKey, group]) => (
            <div key={groupKey}>
              <h3 className="mb-3 text-lg font-semibold">
                {locale === 'vi' ? group.labelVi : group.label}
              </h3>
              <div className="space-y-3">
                <ScheduleCard
                  schedule={SCHEDULES[group.primary]}
                  isSelected={currentSchedule === group.primary}
                  isRecommended={recommendation?.primary === group.primary}
                  onSelect={() => handleSelectSchedule(group.primary)}
                  locale={locale}
                />
                {group.variants.map((variantId) => (
                  <ScheduleCard
                    key={variantId}
                    schedule={SCHEDULES[variantId]}
                    isSelected={currentSchedule === variantId}
                    isRecommended={false}
                    onSelect={() => handleSelectSchedule(variantId)}
                    locale={locale}
                    compact
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

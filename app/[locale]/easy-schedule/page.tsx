'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEasyStorage, useCurrentTime, useTodayAdjustment } from '@/hooks/use-easy-storage';
import { generateDailySchedule, getCurrentActivity, calculateAgeInWeeks, formatAge, applyScheduleAdjustments, analyzeScheduleAdjustments, minutesToTimeString, parseTimeToMinutes, getActivityType } from '@/lib/easy-schedule-utils';
import { SCHEDULES } from '@/data/easy-schedules';
import { ActivityCard } from '@/components/easy-schedule/ActivityCard';
import { Timeline } from '@/components/easy-schedule/Timeline';
import { LeapCard } from '@/components/easy-schedule/LeapCard';
import { getLeapStatus, calculateWeeksFromBirth } from '@/data/wonder-weeks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Settings, Library, Baby, Clock, RefreshCw, AlertTriangle, Info, Lightbulb, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EasyScheduleDashboard() {
  const router = useRouter();
  const locale = useLocale() as 'en' | 'vi';
  const { isLoaded, isSetupComplete, baby, currentSchedule } = useEasyStorage();
  const currentTime = useCurrentTime();
  const [mounted, setMounted] = useState(false);

  // State for adjustment dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number | null>(null);
  const [tempStartTime, setTempStartTime] = useState('');
  const [tempEndTime, setTempEndTime] = useState('');
  const [expectedEndTime, setExpectedEndTime] = useState('');

  // Use the today adjustment hook
  const {
    adjustments,
    hasAdjustments,
    adjustmentCount,
    isLoaded: adjustmentLoaded,
    setActivityAdjustment,
    removeActivityAdjustment,
    clearAllAdjustments,
    getActivityAdjustment,
  } = useTodayAdjustment();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to setup if not complete
  useEffect(() => {
    if (isLoaded && !isSetupComplete) {
      router.push(`/${locale}/easy-schedule/setup`);
    }
  }, [isLoaded, isSetupComplete, router, locale]);

  // Handle activity click to open adjustment dialog
  const handleActivityClick = (index: number, currentStartTime: string) => {
    setSelectedActivityIndex(index);

    // Check if this activity already has an adjustment
    const existingAdjustment = getActivityAdjustment(index);
    if (existingAdjustment) {
      setTempStartTime(existingAdjustment.actualStartTime);
      setTempEndTime(existingAdjustment.actualEndTime || '');
    } else {
      setTempStartTime(currentStartTime);
      setTempEndTime('');
    }

    // Calculate expected end time based on duration
    if (baby && currentSchedule) {
      const baseSchedule = generateDailySchedule(currentSchedule, baby.wakeTime);
      if (baseSchedule[index]) {
        const startMinutes = parseTimeToMinutes(existingAdjustment?.actualStartTime || currentStartTime);
        const expectedEnd = startMinutes + baseSchedule[index].duration;
        setExpectedEndTime(minutesToTimeString(expectedEnd));
      }
    }

    setDialogOpen(true);
  };

  // Update expected end time when start time changes
  const handleStartTimeChange = (newStartTime: string) => {
    setTempStartTime(newStartTime);

    // Recalculate expected end time
    if (baby && currentSchedule && selectedActivityIndex !== null) {
      const baseSchedule = generateDailySchedule(currentSchedule, baby.wakeTime);
      if (baseSchedule[selectedActivityIndex]) {
        const startMinutes = parseTimeToMinutes(newStartTime);
        const expectedEnd = startMinutes + baseSchedule[selectedActivityIndex].duration;
        setExpectedEndTime(minutesToTimeString(expectedEnd));
      }
    }
  };

  const handleSaveAdjustment = () => {
    if (selectedActivityIndex !== null) {
      setActivityAdjustment(selectedActivityIndex, {
        actualStartTime: tempStartTime,
        actualEndTime: tempEndTime || undefined,
      });
    }
    setDialogOpen(false);
    setSelectedActivityIndex(null);
    setTempStartTime('');
    setTempEndTime('');
  };

  const handleRemoveAdjustment = () => {
    if (selectedActivityIndex !== null) {
      removeActivityAdjustment(selectedActivityIndex);
    }
    setDialogOpen(false);
    setSelectedActivityIndex(null);
    setTempStartTime('');
    setTempEndTime('');
  };

  const handleClearAllAdjustments = () => {
    clearAllAdjustments();
    setDialogOpen(false);
    setSelectedActivityIndex(null);
  };

  // Show loading state
  if (!mounted || !isLoaded || !adjustmentLoaded || !isSetupComplete || !baby || !currentSchedule) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">
            {locale === 'vi' ? 'Đang tải...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  const schedule = SCHEDULES[currentSchedule];
  // Generate base schedule from wake time, then apply any adjustments
  const baseSchedule = generateDailySchedule(currentSchedule, baby.wakeTime);
  const dailySchedule = applyScheduleAdjustments(baseSchedule, adjustments);
  const currentActivity = getCurrentActivity(dailySchedule, currentTime);
  const ageWeeks = calculateAgeInWeeks(new Date(baby.birthDate));

  // Calculate Wonder Weeks leap status
  const weeksFromBirth = calculateWeeksFromBirth(new Date(baby.birthDate));
  const leapStatus = getLeapStatus(weeksFromBirth);

  // Analyze adjustments for warnings/suggestions
  const warnings = hasAdjustments
    ? analyzeScheduleAdjustments(baseSchedule, dailySchedule, adjustments, ageWeeks)
    : [];

  // Get the selected activity for the dialog
  const selectedActivity = selectedActivityIndex !== null ? baseSchedule[selectedActivityIndex] : null;
  const selectedActivityType = selectedActivity ? getActivityType(selectedActivity.activity) : null;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Baby Info Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Baby className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{baby.name}</h1>
            <p className="text-sm text-muted-foreground">
              {formatAge(new Date(baby.birthDate), locale)} • {schedule.name}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/${locale}/easy-schedule/library`}>
            <Button variant="outline" size="icon">
              <Library className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/${locale}/easy-schedule/setup`}>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Current Activity Card */}
      {currentActivity && (
        <ActivityCard
          activity={currentActivity.current}
          next={currentActivity.next}
          timeRemaining={currentActivity.timeRemaining}
          progress={currentActivity.progress}
          locale={locale}
        />
      )}

      {/* Wonder Weeks Leap Card */}
      <div className="mb-4">
        <LeapCard leapStatus={leapStatus} />
      </div>

      {/* Schedule Adjustment Status */}
      {hasAdjustments && (
        <Card className="mb-4 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">
                      {locale === 'vi' ? 'Lịch đã điều chỉnh' : 'Schedule Adjusted'}
                    </p>
                    <Badge variant="secondary" className="text-xs bg-orange-200 dark:bg-orange-800">
                      {locale === 'vi' ? 'Hôm nay' : 'Today only'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'vi'
                      ? `${adjustmentCount} hoạt động đã điều chỉnh`
                      : `${adjustmentCount} ${adjustmentCount === 1 ? 'activity' : 'activities'} adjusted`}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClearAllAdjustments}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {locale === 'vi' ? 'Đặt lại tất cả' : 'Reset All'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Adjustment Warnings & Suggestions */}
      {warnings.length > 0 && (
        <div className="mb-6 space-y-3">
          {warnings.map((warning, index) => (
            <Card
              key={index}
              className={cn(
                'border-l-4',
                warning.severity === 'warning' && 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30',
                warning.severity === 'danger' && 'border-l-red-500 bg-red-50 dark:bg-red-950/30',
                warning.severity === 'info' && 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30'
              )}
            >
              <CardContent className="py-3">
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {warning.severity === 'warning' && (
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    )}
                    {warning.severity === 'danger' && (
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                    {warning.severity === 'info' && (
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {locale === 'vi' ? warning.message.vi : warning.message.en}
                    </p>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        {locale === 'vi' ? warning.suggestion.vi : warning.suggestion.en}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Adjustment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {locale === 'vi' ? 'Điều chỉnh giờ hoạt động' : 'Adjust Activity Time'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'vi'
                ? 'Bé không theo lịch trình? Nhập giờ thực tế và lịch trình còn lại sẽ tự động điều chỉnh.'
                : "Baby didn't follow the schedule? Enter the actual time and the remaining schedule will adjust automatically."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Activity info */}
            {selectedActivity && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">
                  {locale === 'vi' ? 'Hoạt động' : 'Activity'}: {selectedActivity.activity}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === 'vi'
                    ? `Thời lượng dự kiến: ${selectedActivity.duration} phút`
                    : `Expected duration: ${selectedActivity.duration} min`}
                </p>
              </div>
            )}

            {/* Start time input */}
            <div className="space-y-2">
              <Label htmlFor="startTime">
                {locale === 'vi' ? 'Giờ bắt đầu thực tế' : 'Actual Start Time'}
              </Label>
              <Input
                id="startTime"
                type="time"
                value={tempStartTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="w-full"
              />
            </div>

            {/* End time input - only for sleep activities */}
            {selectedActivityType === 'S' && (
              <div className="space-y-2">
                <Label htmlFor="endTime">
                  {locale === 'vi' ? 'Giờ kết thúc thực tế' : 'Actual End Time'}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({locale === 'vi' ? 'tùy chọn' : 'optional'})
                  </span>
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={tempEndTime}
                  onChange={(e) => setTempEndTime(e.target.value)}
                  placeholder={expectedEndTime}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {locale === 'vi'
                    ? `Dự kiến kết thúc: ${expectedEndTime}. Để trống nếu theo đúng lịch.`
                    : `Expected end: ${expectedEndTime}. Leave empty if followed schedule.`}
                </p>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              {locale === 'vi'
                ? 'Các hoạt động sau đó sẽ được điều chỉnh tương ứng. Chỉ áp dụng cho hôm nay.'
                : 'Subsequent activities will be adjusted accordingly. Only applies to today.'}
            </p>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            {selectedActivityIndex !== null && getActivityAdjustment(selectedActivityIndex) && (
              <Button
                variant="destructive"
                onClick={handleRemoveAdjustment}
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {locale === 'vi' ? 'Xóa điều chỉnh' : 'Remove'}
              </Button>
            )}
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
              {locale === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button onClick={handleSaveAdjustment} className="w-full sm:w-auto">
              {locale === 'vi' ? 'Áp dụng' : 'Apply'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Info */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {locale === 'vi' ? 'Thông tin lịch' : 'Schedule Info'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">
                {locale === 'vi' ? 'Số giấc ngủ' : 'Naps'}
              </p>
              <p className="font-medium">{schedule.napCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {locale === 'vi' ? 'Giờ mặc định' : 'Default wake time'}
              </p>
              <p className="font-medium">{baby.wakeTime}</p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {locale === 'vi' ? 'Tổng giấc ngủ' : 'Total sleep'}
              </p>
              <p className="font-medium">
                {schedule.totalSleepTarget.min}-{schedule.totalSleepTarget.max}h
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {locale === 'vi' ? 'Độ tuổi' : 'Age range'}
              </p>
              <p className="font-medium">
                {schedule.ageRange.min}-{schedule.ageRange.max}{' '}
                {locale === 'vi' ? 'tuần' : 'weeks'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Timeline */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold">
          {locale === 'vi' ? 'Lịch hôm nay' : "Today's Schedule"}
        </h2>
        <Timeline
          schedule={dailySchedule}
          currentTime={currentTime}
          locale={locale}
          onActivityClick={handleActivityClick}
          adjustments={adjustments}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href={`/${locale}/easy-schedule/library`} className="block">
          <Card className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Library className="mb-2 h-8 w-8 text-primary" />
              <p className="font-medium">
                {locale === 'vi' ? 'Thư viện lịch' : 'Schedule Library'}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/${locale}/easy-schedule/setup`} className="block">
          <Card className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Settings className="mb-2 h-8 w-8 text-primary" />
              <p className="font-medium">
                {locale === 'vi' ? 'Cài đặt' : 'Settings'}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEasyStorage } from '@/hooks/use-easy-storage';
import {
  calculateAgeInWeeks,
  getRecommendedSchedule,
  formatAge,
} from '@/lib/easy-schedule-utils';
import { SCHEDULES } from '@/data/easy-schedules';
import type { ScheduleType } from '@/data/easy-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Baby, Clock, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const locale = useLocale() as 'en' | 'vi';
  const { baby, currentSchedule, setBabyProfile, setCurrentSchedule, isLoaded } = useEasyStorage();

  // Form state
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [wakeTime, setWakeTime] = useState('07:00');
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(null);
  const [step, setStep] = useState(1);

  // Load existing data
  useEffect(() => {
    if (isLoaded && baby) {
      setName(baby.name);
      setBirthDate(new Date(baby.birthDate));
      setWakeTime(baby.wakeTime);
    }
    if (isLoaded && currentSchedule) {
      setSelectedSchedule(currentSchedule);
    }
  }, [isLoaded, baby, currentSchedule]);

  // Calculate age and recommendation when birthDate changes
  const ageWeeks = birthDate ? calculateAgeInWeeks(birthDate) : 0;
  const recommendation = ageWeeks > 0 ? getRecommendedSchedule(ageWeeks) : null;

  // Auto-select recommended schedule
  useEffect(() => {
    if (recommendation && !selectedSchedule) {
      setSelectedSchedule(recommendation.primary);
    }
  }, [recommendation, selectedSchedule]);

  const handleSave = () => {
    if (!name || !birthDate || !selectedSchedule) return;

    setBabyProfile({
      name,
      birthDate: birthDate.toISOString(),
      wakeTime,
    });
    setCurrentSchedule(selectedSchedule);

    router.push(`/${locale}/easy-schedule`);
  };

  const canProceedStep1 = name.trim().length > 0 && birthDate !== undefined;
  const canProceedStep2 = selectedSchedule !== null;

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}
        >
          {step > 1 ? <Check className="h-4 w-4" /> : '1'}
        </div>
        <div className={cn('h-1 w-12', step > 1 ? 'bg-primary' : 'bg-muted')} />
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}
        >
          {step > 2 ? <Check className="h-4 w-4" /> : '2'}
        </div>
      </div>

      {/* Step 1: Baby Profile */}
      {step === 1 && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Baby className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>
              {locale === 'vi' ? 'Thông tin bé' : 'Baby Profile'}
            </CardTitle>
            <CardDescription>
              {locale === 'vi'
                ? 'Nhập thông tin về bé của bạn'
                : 'Enter your baby\'s information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {locale === 'vi' ? 'Tên bé' : 'Baby\'s Name'}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'vi' ? 'Nhập tên bé' : 'Enter baby\'s name'}
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label>
                {locale === 'vi' ? 'Ngày sinh' : 'Date of Birth'}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !birthDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? (
                      format(birthDate, 'PPP')
                    ) : (
                      <span>{locale === 'vi' ? 'Chọn ngày' : 'Pick a date'}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {birthDate && (
                <p className="text-sm text-muted-foreground">
                  {locale === 'vi' ? 'Tuổi: ' : 'Age: '}
                  {formatAge(birthDate, locale)}
                </p>
              )}
            </div>

            {/* Wake Time */}
            <div className="space-y-2">
              <Label htmlFor="wakeTime">
                {locale === 'vi' ? 'Giờ thức dậy' : 'Wake Time'}
              </Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="wakeTime"
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-32"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {locale === 'vi'
                  ? 'Thời gian bé thức dậy buổi sáng'
                  : 'When your baby typically wakes up'}
              </p>
            </div>

            <Button
              className="w-full"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
            >
              {locale === 'vi' ? 'Tiếp tục' : 'Continue'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Schedule Selection */}
      {step === 2 && recommendation && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>
              {locale === 'vi' ? 'Lịch được đề xuất' : 'Recommended Schedule'}
            </CardTitle>
            <CardDescription>
              {locale === 'vi'
                ? `Dựa trên tuổi ${ageWeeks} tuần của bé`
                : `Based on your baby's age of ${ageWeeks} weeks`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Recommended Schedule */}
            <div
              className={cn(
                'cursor-pointer rounded-lg border-2 p-4 transition-colors',
                selectedSchedule === recommendation.primary
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => setSelectedSchedule(recommendation.primary)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      {SCHEDULES[recommendation.primary].name}
                    </h3>
                    {SCHEDULES[recommendation.primary].isGoldStandard && (
                      <Badge variant="default" className="text-xs">
                        {locale === 'vi' ? 'Tiêu chuẩn vàng' : 'Gold Standard'}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {locale === 'vi'
                      ? recommendation.descriptionVi || recommendation.description
                      : recommendation.description}
                  </p>
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    <span>
                      {SCHEDULES[recommendation.primary].napCount}{' '}
                      {locale === 'vi' ? 'giấc' : 'naps'}
                    </span>
                    <span>
                      {SCHEDULES[recommendation.primary].totalSleepTarget.min}-
                      {SCHEDULES[recommendation.primary].totalSleepTarget.max}h{' '}
                      {locale === 'vi' ? 'ngủ' : 'sleep'}
                    </span>
                  </div>
                </div>
                {selectedSchedule === recommendation.primary && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            </div>

            {/* Variants */}
            {recommendation.variants.length > 0 && (
              <>
                <p className="text-sm font-medium text-muted-foreground">
                  {locale === 'vi' ? 'Các biến thể:' : 'Variants:'}
                </p>
                {recommendation.variants.map((variantId) => {
                  const variant = SCHEDULES[variantId];
                  return (
                    <div
                      key={variantId}
                      className={cn(
                        'cursor-pointer rounded-lg border p-3 transition-colors',
                        selectedSchedule === variantId
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                      onClick={() => setSelectedSchedule(variantId)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">{variant.name}</h4>
                          {variant.purpose && (
                            <p className="text-xs text-muted-foreground">
                              {variant.purpose}
                            </p>
                          )}
                        </div>
                        {selectedSchedule === variantId && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                {locale === 'vi' ? 'Quay lại' : 'Back'}
              </Button>
              <Button
                className="flex-1"
                disabled={!canProceedStep2}
                onClick={handleSave}
              >
                {locale === 'vi' ? 'Bắt đầu' : 'Get Started'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

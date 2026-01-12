'use client';

import type { ScheduleData } from '@/data/easy-types';
import { formatAgeRange } from '@/lib/easy-schedule-utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface ScheduleCardProps {
  schedule: ScheduleData;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
  locale: 'en' | 'vi';
  compact?: boolean;
}

export function ScheduleCard({
  schedule,
  isSelected,
  isRecommended,
  onSelect,
  locale,
  compact = false,
}: ScheduleCardProps) {
  const currentLocale = useLocale();

  if (compact) {
    return (
      <Card
        className={cn(
          'cursor-pointer transition-all hover:border-primary/50',
          isSelected && 'border-primary bg-primary/5'
        )}
        onClick={onSelect}
      >
        <CardContent className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            {isSelected && <Check className="h-4 w-4 text-primary" />}
            <div>
              <p className="font-medium text-sm">{schedule.name}</p>
              {schedule.purpose && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {schedule.purpose}
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/${currentLocale}/easy-schedule/library/${schedule.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:border-primary/50',
        isSelected && 'border-primary bg-primary/5'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              {isSelected && <Check className="h-5 w-5 text-primary" />}
              <h3 className="font-semibold">{schedule.name}</h3>
              {schedule.isGoldStandard && (
                <Badge variant="default" className="text-xs">
                  <Star className="mr-1 h-3 w-3" />
                  {locale === 'vi' ? 'Vàng' : 'Gold'}
                </Badge>
              )}
              {isRecommended && !schedule.isGoldStandard && (
                <Badge variant="secondary" className="text-xs">
                  {locale === 'vi' ? 'Đề xuất' : 'Recommended'}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-2">
              {locale === 'vi'
                ? schedule.descriptionVi || schedule.description || schedule.purpose
                : schedule.description || schedule.purpose}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>{formatAgeRange(schedule.ageRange, locale)}</span>
              <span>
                {schedule.napCount} {locale === 'vi' ? 'giấc' : 'naps'}
              </span>
              <span>
                {schedule.totalSleepTarget.min}-{schedule.totalSleepTarget.max}h{' '}
                {locale === 'vi' ? 'ngủ' : 'sleep'}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <Link
            href={`/${currentLocale}/easy-schedule/library/${schedule.id}`}
            onClick={(e) => e.stopPropagation()}
            className="ml-2"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

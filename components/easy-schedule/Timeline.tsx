'use client';

import type { ScheduleEntry } from '@/data/easy-types';
import { ACTIVITY_COLORS, ACTIVITY_LABELS } from '@/data/easy-types';
import { getActivityType, formatDuration, parseTimeToMinutes, type ActivityAdjustment } from '@/lib/easy-schedule-utils';
import { cn } from '@/lib/utils';
import { Edit2 } from 'lucide-react';

interface TimelineProps {
  schedule: ScheduleEntry[];
  currentTime: Date;
  locale: 'en' | 'vi';
  onActivityClick?: (index: number, time: string) => void;
  adjustments?: Record<number, ActivityAdjustment>;
}

export function Timeline({ schedule, currentTime, locale, onActivityClick, adjustments }: TimelineProps) {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Determine first adjusted index for cascade effect
  const adjustedIndices = adjustments ? Object.keys(adjustments).map(Number) : [];
  const firstAdjustedIndex = adjustedIndices.length > 0 ? Math.min(...adjustedIndices) : -1;

  return (
    <div className="space-y-2">
      {schedule.map((entry, index) => {
        const activityType = getActivityType(entry.activity);
        const color = ACTIVITY_COLORS[activityType] || ACTIVITY_COLORS['A'];
        const label = ACTIVITY_LABELS[activityType] || ACTIVITY_LABELS['A'];

        const entryStart = parseTimeToMinutes(entry.time);
        const entryEnd = entryStart + entry.duration;

        // Determine if this is past, current, or future
        const isPast = currentMinutes >= entryEnd;
        const isCurrent = currentMinutes >= entryStart && currentMinutes < entryEnd;
        const isFuture = currentMinutes < entryStart;

        // Check if this specific activity has an adjustment or is affected by one
        const hasDirectAdjustment = adjustments && adjustments[index];
        const isAffectedByAdjustment = firstAdjustedIndex >= 0 && index >= firstAdjustedIndex;
        const isAdjusted = hasDirectAdjustment || isAffectedByAdjustment;

        return (
          <div
            key={index}
            className={cn(
              'relative flex items-stretch rounded-lg border transition-all',
              isCurrent && 'ring-2 ring-offset-2',
              isPast && 'opacity-50',
              onActivityClick && 'cursor-pointer hover:shadow-md',
              isAdjusted && 'border-dashed'
            )}
            style={{
              borderColor: color,
              ...(isCurrent && { ringColor: color }),
            }}
            onClick={() => onActivityClick?.(index, entry.time)}
          >
            {/* Time Column */}
            <div
              className="flex w-20 shrink-0 flex-col items-center justify-center rounded-l-lg px-3 py-3 text-white"
              style={{ backgroundColor: color }}
            >
              <span className="text-sm font-bold">{entry.time}</span>
              <span className="text-xs opacity-80">
                {formatDuration(entry.duration, locale)}
              </span>
            </div>

            {/* Content Column */}
            <div className="flex flex-1 flex-col justify-center px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {locale === 'vi' ? label.vi : label.en}
                </span>
                {isCurrent && (
                  <span
                    className="h-2 w-2 animate-pulse rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )}
                {hasDirectAdjustment && (
                  <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    {locale === 'vi' ? '(đã sửa)' : '(edited)'}
                  </span>
                )}
                {!hasDirectAdjustment && isAffectedByAdjustment && (
                  <span className="text-xs text-orange-500 dark:text-orange-500">
                    {locale === 'vi' ? '(điều chỉnh)' : '(shifted)'}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{entry.note}</p>
            </div>

            {/* Edit indicator when hoverable */}
            {onActivityClick && (
              <div className="flex items-center pr-3 opacity-0 transition-opacity group-hover:opacity-100">
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            {/* Current time indicator */}
            {isCurrent && (
              <div
                className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
              />
            )}
          </div>
        );
      })}

      {/* Hint for adjusting */}
      {onActivityClick && (
        <p className="text-center text-xs text-muted-foreground mt-4">
          {locale === 'vi'
            ? 'Nhấn vào hoạt động để điều chỉnh giờ thực tế'
            : 'Tap on any activity to adjust its actual time'}
        </p>
      )}
    </div>
  );
}

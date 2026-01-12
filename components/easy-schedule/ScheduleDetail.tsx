'use client';

import type { ScheduleData } from '@/data/easy-types';
import { ACTIVITY_COLORS, ACTIVITY_LABELS } from '@/data/easy-types';
import { getActivityType, formatDuration } from '@/lib/easy-schedule-utils';

interface ScheduleDetailProps {
  schedule: ScheduleData;
  locale: 'en' | 'vi';
}

export function ScheduleDetail({ schedule, locale }: ScheduleDetailProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2 text-left text-sm font-medium">
              {locale === 'vi' ? 'Thời gian' : 'Time'}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              {locale === 'vi' ? 'Hoạt động' : 'Activity'}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              {locale === 'vi' ? 'Thời lượng' : 'Duration'}
            </th>
            <th className="hidden px-4 py-2 text-left text-sm font-medium sm:table-cell">
              {locale === 'vi' ? 'Ghi chú' : 'Note'}
            </th>
          </tr>
        </thead>
        <tbody>
          {schedule.schedule.map((entry, index) => {
            const activityType = getActivityType(entry.activity);
            const color = ACTIVITY_COLORS[activityType] || ACTIVITY_COLORS['A'];
            const label = ACTIVITY_LABELS[activityType] || ACTIVITY_LABELS['A'];

            return (
              <tr key={index} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <span className="font-mono text-sm font-medium">{entry.time}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium">
                      {locale === 'vi' ? label.vi : label.en}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(entry.duration, locale)}
                  </span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="text-sm text-muted-foreground">{entry.note}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Notes (shown below table on small screens) */}
      <div className="border-t bg-muted/30 p-4 sm:hidden">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          {locale === 'vi' ? 'Ghi chú:' : 'Notes:'}
        </p>
        <ul className="space-y-1">
          {schedule.schedule.map((entry, index) => (
            <li key={index} className="text-xs text-muted-foreground">
              <span className="font-medium">{entry.time}:</span> {entry.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import type { ScheduleEntry } from '@/data/easy-types';
import { ACTIVITY_COLORS, ACTIVITY_LABELS } from '@/data/easy-types';
import { formatTimeRemaining, getActivityType, formatDuration } from '@/lib/easy-schedule-utils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Baby, Moon, Play, Coffee, ArrowRight } from 'lucide-react';

interface ActivityCardProps {
  activity: ScheduleEntry;
  next: ScheduleEntry | null;
  timeRemaining: number;
  progress: number;
  locale: 'en' | 'vi';
}

const ActivityIcon = ({ type }: { type: string }) => {
  const activityType = getActivityType(type);
  const iconClass = 'h-8 w-8';

  switch (activityType) {
    case 'E':
      return <Baby className={iconClass} />;
    case 'S':
      return <Moon className={iconClass} />;
    case 'A':
      return <Play className={iconClass} />;
    case 'Y':
      return <Coffee className={iconClass} />;
    default:
      return <Play className={iconClass} />;
  }
};

export function ActivityCard({
  activity,
  next,
  timeRemaining,
  progress,
  locale,
}: ActivityCardProps) {
  const [currentRemaining, setCurrentRemaining] = useState(timeRemaining);

  // Update remaining time every second
  useEffect(() => {
    setCurrentRemaining(timeRemaining);

    const interval = setInterval(() => {
      setCurrentRemaining((prev) => Math.max(0, prev - 1 / 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const activityType = getActivityType(activity.activity);
  const activityColor = ACTIVITY_COLORS[activityType] || ACTIVITY_COLORS['A'];
  const activityLabel = ACTIVITY_LABELS[activityType] || ACTIVITY_LABELS['A'];

  const nextActivityType = next ? getActivityType(next.activity) : null;
  const nextLabel = nextActivityType ? ACTIVITY_LABELS[nextActivityType] : null;

  // Calculate display progress based on current remaining
  const displayProgress = Math.min(100, Math.max(0, 100 - (currentRemaining / activity.duration) * 100));

  // Format minutes and seconds for countdown
  const formatCountdown = (minutes: number) => {
    const totalSeconds = Math.floor(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Card
      className="mb-6 overflow-hidden"
      style={{ borderColor: activityColor, borderWidth: 2 }}
    >
      <CardContent className="p-0">
        {/* Main Activity Section */}
        <div
          className="p-6 text-white"
          style={{ backgroundColor: activityColor }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <ActivityIcon type={activity.activity} />
              </div>
              <div>
                <p className="text-sm font-medium opacity-80">
                  {locale === 'vi' ? 'Hoạt động hiện tại' : 'Current Activity'}
                </p>
                <h2 className="text-2xl font-bold">
                  {locale === 'vi' ? activityLabel.vi : activityLabel.en}
                </h2>
                <p className="text-sm opacity-80">{activity.note}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums">
                {formatCountdown(currentRemaining)}
              </p>
              <p className="text-sm opacity-80">
                {locale === 'vi' ? 'còn lại' : 'remaining'}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress
              value={displayProgress}
              className="h-2 bg-white/30"
            />
            <div className="mt-1 flex justify-between text-xs opacity-80">
              <span>{activity.time}</span>
              <span>{formatDuration(activity.duration, locale)}</span>
            </div>
          </div>
        </div>

        {/* Next Activity Section */}
        {next && nextLabel && (
          <div className="flex items-center justify-between bg-muted/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {locale === 'vi' ? 'Tiếp theo:' : 'Next:'}
              </span>
              <span className="font-medium">
                {locale === 'vi' ? nextLabel.vi : nextLabel.en}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {next.time}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

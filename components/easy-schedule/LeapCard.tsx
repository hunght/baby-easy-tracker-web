'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Brain, AlertTriangle, Sun, Moon, Baby, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LeapStatus } from '@/data/wonder-weeks';
import { cn } from '@/lib/utils';

interface LeapCardProps {
  leapStatus: LeapStatus;
}

export function LeapCard({ leapStatus }: LeapCardProps) {
  const t = useTranslations('WonderWeeks');
  const locale = useLocale() as 'en' | 'vi';
  const [isExpanded, setIsExpanded] = useState(false);

  const { isInLeap, currentLeap, phase, nextLeap, daysUntilNextLeap, progressPercent } = leapStatus;

  // If baby is past all leaps (> 77 weeks), don't show anything
  if (leapStatus.weeksFromDueDate > 77 && !isInLeap) {
    return null;
  }

  const getPhaseIcon = () => {
    switch (phase) {
      case 'stormy':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      default:
        return <Baby className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'stormy':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800';
      case 'sunny':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
    }
  };

  const getBadgeVariant = () => {
    switch (phase) {
      case 'stormy':
        return 'destructive';
      case 'sunny':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const blogLink = locale === 'vi'
    ? '/vi/blog/tuan-khung-hoang-wonder-weeks-huong-dan-day-du'
    : '/en/blog/wonder-weeks-complete-guide';

  return (
    <Card className={cn('border-2 transition-all', getPhaseColor())}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-base font-semibold">
              {t('title')}
            </CardTitle>
          </div>
          <Badge variant={getBadgeVariant()}>
            {isInLeap ? (
              phase === 'stormy' ? t('phases.stormy') : t('phases.sunny')
            ) : (
              t('phases.calm')
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Leap or Upcoming Leap */}
        {isInLeap && currentLeap ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getPhaseIcon()}
              <span className="font-medium">
                {t('leap')} {currentLeap.number}: {currentLeap.name[locale]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentLeap.description[locale]}
            </p>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t('progress')}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{phase === 'stormy' ? t('stormyPhase') : t('sunnyPhase')}</span>
              </div>
            </div>
          </div>
        ) : nextLeap && daysUntilNextLeap ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-blue-500" />
              <span className="font-medium">
                {t('upcomingLeap')}: {t('leap')} {nextLeap.number}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('daysUntilLeap', { days: daysUntilNextLeap })}
            </p>
            <p className="text-sm">
              {nextLeap.name[locale]} - {nextLeap.description[locale]}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t('noUpcomingLeaps')}
          </p>
        )}

        {/* Expanded details */}
        {isInLeap && currentLeap && isExpanded && (
          <div className="space-y-4 pt-2 border-t">
            {/* Symptoms */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                {t('symptoms')}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentLeap.symptoms[locale].map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sleep Impact */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Moon className="h-4 w-4 text-indigo-500" />
                {t('sleepImpact')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentLeap.sleepImpact[locale]}
              </p>
            </div>

            {/* New Skills (Sunny Side) */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                {t('sunnySide')}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentLeap.newSkills[locale].map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-purple-500" />
                {t('tips')}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentLeap.tips[locale].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-500">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Link to full article */}
            <Link href={blogLink} className="block">
              <Button variant="outline" className="w-full gap-2">
                <BookOpen className="h-4 w-4" />
                {t('readMore')}
              </Button>
            </Link>
          </div>
        )}

        {/* Expand/Collapse button */}
        {isInLeap && currentLeap && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                {t('showLess')}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                {t('showMore')}
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

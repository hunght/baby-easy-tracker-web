import type { ScheduleType, ScheduleEntry, CurrentActivityInfo } from '@/data/easy-types';
import { SCHEDULES, AGE_SCHEDULE_MAP } from '@/data/easy-schedules';

/**
 * Calculate baby's age in weeks from birth date
 */
export function calculateAgeInWeeks(birthDate: Date): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birthDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

/**
 * Calculate baby's age in months (for display)
 */
export function calculateAgeInMonths(birthDate: Date): number {
  const now = new Date();
  const months =
    (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());
  return months;
}

/**
 * Format age for display (e.g., "12 weeks" or "4 months")
 */
export function formatAge(birthDate: Date, locale: 'en' | 'vi' = 'en'): string {
  const weeks = calculateAgeInWeeks(birthDate);
  const months = calculateAgeInMonths(birthDate);

  if (weeks < 12) {
    return locale === 'vi' ? `${weeks} tuần` : `${weeks} weeks`;
  } else {
    return locale === 'vi' ? `${months} tháng` : `${months} months`;
  }
}

/**
 * Get recommended schedule based on age in weeks
 */
export function getRecommendedSchedule(ageWeeks: number): {
  primary: ScheduleType;
  variants: ScheduleType[];
  description: string;
  descriptionVi?: string;
} {
  if (ageWeeks <= 6) return AGE_SCHEDULE_MAP['0-6'];
  if (ageWeeks <= 8) return AGE_SCHEDULE_MAP['6-8'];
  if (ageWeeks <= 12) return AGE_SCHEDULE_MAP['8-12'];
  if (ageWeeks <= 17) return AGE_SCHEDULE_MAP['10-17'];
  if (ageWeeks <= 20) return AGE_SCHEDULE_MAP['14-20'];
  if (ageWeeks <= 26) return AGE_SCHEDULE_MAP['16-26'];
  if (ageWeeks <= 44) return AGE_SCHEDULE_MAP['26-44'];
  if (ageWeeks <= 50) return AGE_SCHEDULE_MAP['40-50'];
  if (ageWeeks <= 57) return AGE_SCHEDULE_MAP['51-57'];
  return AGE_SCHEDULE_MAP['56-65'];
}

/**
 * Parse time string to minutes from midnight
 */
export function parseTimeToMinutes(time: string): number {
  const [hour, min] = time.split(':').map(Number);
  return hour * 60 + min;
}

/**
 * Convert minutes from midnight to time string
 */
export function minutesToTimeString(minutes: number): string {
  // Handle overflow past midnight
  const normalizedMinutes = ((minutes % 1440) + 1440) % 1440;
  const hour = Math.floor(normalizedMinutes / 60);
  const min = normalizedMinutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

/**
 * Generate daily schedule from a schedule type and custom wake time
 */
export function generateDailySchedule(
  scheduleType: ScheduleType,
  wakeTime: string // "HH:MM" format
): ScheduleEntry[] {
  const schedule = SCHEDULES[scheduleType];
  if (!schedule) return [];

  const baseSchedule = schedule.schedule;

  // Calculate offset from default 7:00 AM
  const defaultWakeMinutes = 7 * 60; // 7:00 AM = 420 minutes
  const actualWakeMinutes = parseTimeToMinutes(wakeTime);
  const offsetMinutes = actualWakeMinutes - defaultWakeMinutes;

  return baseSchedule.map((entry) => {
    const entryMinutes = parseTimeToMinutes(entry.time) + offsetMinutes;
    return {
      ...entry,
      time: minutesToTimeString(entryMinutes),
    };
  });
}

/**
 * Get current activity based on schedule and current time
 */
export function getCurrentActivity(
  schedule: ScheduleEntry[],
  currentTime: Date = new Date()
): CurrentActivityInfo | null {
  if (schedule.length === 0) return null;

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  for (let i = 0; i < schedule.length; i++) {
    const entry = schedule[i];
    const entryStart = parseTimeToMinutes(entry.time);
    const entryEnd = entryStart + entry.duration;

    if (currentMinutes >= entryStart && currentMinutes < entryEnd) {
      const timeRemaining = entryEnd - currentMinutes;
      const progress = ((entry.duration - timeRemaining) / entry.duration) * 100;

      return {
        current: entry,
        next: schedule[i + 1] || null,
        timeRemaining,
        progress,
      };
    }
  }

  // If before first activity or after last, return first/last appropriately
  const firstEntry = schedule[0];
  const firstStart = parseTimeToMinutes(firstEntry.time);

  if (currentMinutes < firstStart) {
    // Before first activity - waiting for wake time
    return {
      current: {
        time: '00:00',
        activity: 'NIGHT',
        duration: firstStart,
        note: 'Night sleep',
      },
      next: firstEntry,
      timeRemaining: firstStart - currentMinutes,
      progress: ((firstStart - (firstStart - currentMinutes)) / firstStart) * 100,
    };
  }

  // After last activity (night sleep continues)
  const lastEntry = schedule[schedule.length - 1];
  return {
    current: lastEntry,
    next: schedule[0],
    timeRemaining: 0,
    progress: 100,
  };
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number, locale: 'en' | 'vi' = 'en'): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return locale === 'vi' ? `${mins} phút` : `${mins}min`;
  }
  if (mins === 0) {
    return locale === 'vi' ? `${hours} giờ` : `${hours}h`;
  }
  return locale === 'vi' ? `${hours}g ${mins}p` : `${hours}h ${mins}m`;
}

/**
 * Format countdown time remaining
 */
export function formatTimeRemaining(minutes: number, locale: 'en' | 'vi' = 'en'): string {
  if (minutes <= 0) {
    return locale === 'vi' ? 'Bây giờ' : 'Now';
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return locale === 'vi' ? `${mins} phút` : `${mins} min`;
  }
  if (mins === 0) {
    return locale === 'vi' ? `${hours} giờ` : `${hours}h`;
  }
  return locale === 'vi' ? `${hours}g ${mins}p` : `${hours}h ${mins}m`;
}

/**
 * Get activity type from activity string
 * E.g., 'E+A' -> 'E', 'E+NIGHT' -> 'S'
 */
export function getActivityType(activity: string): 'E' | 'A' | 'S' | 'Y' {
  if (activity.includes('NIGHT')) return 'S';
  if (activity === 'S') return 'S';
  if (activity === 'E' || activity.startsWith('E')) return 'E';
  if (activity === 'A') return 'A';
  if (activity === 'Y') return 'Y';
  return 'A'; // default
}

/**
 * Check if a schedule is the gold standard
 */
export function isGoldStandard(scheduleType: ScheduleType): boolean {
  const schedule = SCHEDULES[scheduleType];
  return schedule?.isGoldStandard ?? false;
}

/**
 * Get schedule age range as formatted string
 */
export function formatAgeRange(
  ageRange: { min: number; max: number },
  locale: 'en' | 'vi' = 'en'
): string {
  const { min, max } = ageRange;

  // Convert weeks to months for display if > 12 weeks
  if (min >= 12) {
    const minMonths = Math.floor(min / 4.33);
    const maxMonths = Math.ceil(max / 4.33);
    return locale === 'vi' ? `${minMonths}-${maxMonths} tháng` : `${minMonths}-${maxMonths} months`;
  }

  return locale === 'vi' ? `${min}-${max} tuần` : `${min}-${max} weeks`;
}

/**
 * Get all schedules grouped by age category
 */
export function getSchedulesByAgeGroup(): Record<
  string,
  { primary: ScheduleType; variants: ScheduleType[]; label: string; labelVi: string }
> {
  return {
    '0-6': { ...AGE_SCHEDULE_MAP['0-6'], label: '0-6 weeks', labelVi: '0-6 tuần' },
    '6-12': { primary: 'E3.5', variants: ['E3.15', 'E3.5+4', 'E3.75'], label: '6-12 weeks', labelVi: '6-12 tuần' },
    '10-20': { primary: 'E4', variants: ['E4_2-2-2-2.5', 'E4_2-2.15-2-2.15', 'E4_2-2-2.15-2.15'], label: '10-20 weeks (3-5 months)', labelVi: '10-20 tuần (3-5 tháng)' },
    '16-44': { primary: 'E2-3-4', variants: ['E2.5-2.5-3', 'E2-2.5-3.5', 'E2-3-3', 'E2-2.5-4', 'E4_delayed30', 'E2.5-3-4', 'E2.5-3-4.5', 'E2.5-2.5-4'], label: '4-10 months', labelVi: '4-10 tháng' },
    '40-57': { primary: 'E3-3-4', variants: ['E56_3.5-3-4', 'E56_3-3-4.5', 'E56_3.15-3.15-4'], label: '10-14 months', labelVi: '10-14 tháng' },
    '56+': { primary: 'E5-6', variants: ['E56_4-6', 'E56_4.5-5.5', 'E56_4.5-6', 'E56_5.5-5.5', 'E56_5.5-5'], label: '14+ months', labelVi: '14+ tháng' },
  };
}

/**
 * Activity adjustment with start and/or end time
 */
export interface ActivityAdjustment {
  actualStartTime: string;
  actualEndTime?: string;
}

/**
 * Apply time adjustments to the schedule
 * Handles both start time changes and duration changes (via end time)
 * Subsequent activities are shifted based on cumulative changes
 */
export function applyScheduleAdjustments(
  schedule: ScheduleEntry[],
  adjustments: Record<number, ActivityAdjustment>
): ScheduleEntry[] {
  if (!adjustments || Object.keys(adjustments).length === 0 || schedule.length === 0) {
    return schedule;
  }

  let cumulativeOffset = 0;
  const result: ScheduleEntry[] = [];

  for (let i = 0; i < schedule.length; i++) {
    const entry = schedule[i];
    const adjustment = adjustments[i];

    if (adjustment) {
      // This activity has been adjusted
      const originalStartMinutes = parseTimeToMinutes(entry.time);
      const actualStartMinutes = parseTimeToMinutes(adjustment.actualStartTime);

      // Calculate start time offset
      const startOffset = actualStartMinutes - (originalStartMinutes + cumulativeOffset);
      cumulativeOffset += startOffset;

      // Calculate new duration if end time is specified
      let newDuration = entry.duration;
      if (adjustment.actualEndTime) {
        const actualEndMinutes = parseTimeToMinutes(adjustment.actualEndTime);
        newDuration = actualEndMinutes - actualStartMinutes;

        // Duration change affects subsequent activities
        const durationChange = newDuration - entry.duration;
        cumulativeOffset += durationChange;
      }

      result.push({
        ...entry,
        time: adjustment.actualStartTime,
        duration: Math.max(0, newDuration), // Ensure non-negative duration
      });
    } else {
      // No adjustment for this activity, apply cumulative offset
      const entryMinutes = parseTimeToMinutes(entry.time) + cumulativeOffset;
      result.push({
        ...entry,
        time: minutesToTimeString(entryMinutes),
      });
    }
  }

  return result;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use applyScheduleAdjustments instead
 */
export function applyScheduleAdjustment(
  schedule: ScheduleEntry[],
  adjustment: { activityIndex: number; actualTime: string } | null
): ScheduleEntry[] {
  if (!adjustment) {
    return schedule;
  }

  return applyScheduleAdjustments(schedule, {
    [adjustment.activityIndex]: { actualStartTime: adjustment.actualTime },
  });
}

/**
 * Schedule adjustment warning types
 */
export type AdjustmentWarningType =
  | 'bedtime_too_late'
  | 'overtired_risk'
  | 'skip_nap_suggested'
  | 'early_bedtime_suggested'
  | 'catnap_detected'
  | 'long_nap_detected'
  | 'wake_window_too_long'
  | 'wake_window_too_short'
  | 'total_sleep_low';

export interface AdjustmentWarning {
  type: AdjustmentWarningType;
  severity: 'info' | 'warning' | 'danger';
  message: { en: string; vi: string };
  suggestion: { en: string; vi: string };
}

/**
 * Analyze schedule adjustments and return warnings/suggestions
 * Based on E.A.S.Y. sleep debt prevention guidelines from the document
 */
export function analyzeScheduleAdjustments(
  originalSchedule: ScheduleEntry[],
  adjustedSchedule: ScheduleEntry[],
  adjustments: Record<number, ActivityAdjustment>,
  ageWeeks: number
): AdjustmentWarning[] {
  const warnings: AdjustmentWarning[] = [];

  if (originalSchedule.length === 0 || adjustedSchedule.length === 0) {
    return warnings;
  }

  const maxWakeWindow = getMaxWakeWindowForAge(ageWeeks);
  const minWakeWindow = getMinWakeWindowForAge(ageWeeks);
  const maxBedtimeMinutes = getMaxBedtimeForAge(ageWeeks);

  // Analyze each adjusted activity
  for (const [indexStr, adjustment] of Object.entries(adjustments)) {
    const index = parseInt(indexStr);
    const originalEntry = originalSchedule[index];
    const adjustedEntry = adjustedSchedule[index];

    if (!originalEntry || !adjustedEntry) continue;

    const activityType = getActivityType(originalEntry.activity);

    // Check for nap duration changes (catnapping or long naps)
    if (activityType === 'S' && adjustment.actualEndTime) {
      const originalDuration = originalEntry.duration;
      const actualDuration = adjustedEntry.duration;
      const durationDiff = actualDuration - originalDuration;

      // Catnap detected (nap was 30+ min shorter than expected)
      if (durationDiff <= -30 && actualDuration < 60) {
        warnings.push({
          type: 'catnap_detected',
          severity: 'warning',
          message: {
            en: `Nap was only ${actualDuration} minutes (expected ${originalDuration} min). This may indicate undertired or overtired.`,
            vi: `Giấc ngủ chỉ ${actualDuration} phút (dự kiến ${originalDuration} phút). Có thể bé chưa đủ mệt hoặc quá mệt.`,
          },
          suggestion: {
            en: ageWeeks < 12
              ? 'Try extending wake time by 15 minutes before next nap. If baby seems overtired, try shortening wake time instead.'
              : 'Check if wake window was appropriate. Too short = undertired (extend by 15min). Too long = overtired (shorten by 15min).',
            vi: ageWeeks < 12
              ? 'Thử kéo dài thời gian thức thêm 15 phút trước giấc tiếp. Nếu bé có vẻ quá mệt, hãy rút ngắn thời gian thức.'
              : 'Kiểm tra thời gian thức có phù hợp không. Quá ngắn = chưa mệt (tăng 15p). Quá dài = quá mệt (giảm 15p).',
          },
        });
      }

      // Long nap detected (30+ min longer than expected)
      if (durationDiff >= 30) {
        warnings.push({
          type: 'long_nap_detected',
          severity: 'info',
          message: {
            en: `Nap was ${actualDuration} minutes (${durationDiff} min longer than expected).`,
            vi: `Giấc ngủ dài ${actualDuration} phút (hơn ${durationDiff} phút so với dự kiến).`,
          },
          suggestion: {
            en: 'Long naps are usually good! But if this causes bedtime issues, consider capping future naps or adjusting the schedule.',
            vi: 'Giấc ngủ dài thường tốt! Nhưng nếu ảnh hưởng giờ ngủ đêm, hãy giới hạn giấc hoặc điều chỉnh lịch.',
          },
        });
      }
    }
  }

  // Calculate wake windows in adjusted schedule
  for (let i = 0; i < adjustedSchedule.length - 1; i++) {
    const current = adjustedSchedule[i];
    const next = adjustedSchedule[i + 1];
    const currentType = getActivityType(current.activity);
    const nextType = getActivityType(next.activity);

    // Check wake window before sleep
    if (nextType === 'S' && currentType !== 'S') {
      const wakeEnd = parseTimeToMinutes(next.time);
      // Find when baby woke up (end of previous sleep or start of day)
      let wakeStart = parseTimeToMinutes(adjustedSchedule[0].time); // Default to schedule start

      // Look backwards to find the last sleep to calculate when baby woke
      for (let j = i; j >= 0; j--) {
        const prevEntry = adjustedSchedule[j];
        if (getActivityType(prevEntry.activity) === 'S') {
          wakeStart = parseTimeToMinutes(prevEntry.time) + prevEntry.duration;
          break;
        }
      }

      const wakeWindow = wakeEnd - wakeStart;

      if (wakeWindow > maxWakeWindow + 15) {
        warnings.push({
          type: 'wake_window_too_long',
          severity: 'warning',
          message: {
            en: `Wake window before ${next.activity === 'S' ? 'nap' : 'bedtime'} is ${Math.round(wakeWindow)} minutes (max recommended: ${maxWakeWindow} min for ${ageWeeks} weeks).`,
            vi: `Thời gian thức trước ${next.activity === 'S' ? 'giấc ngủ' : 'ngủ đêm'} là ${Math.round(wakeWindow)} phút (khuyến nghị tối đa: ${maxWakeWindow} phút cho bé ${ageWeeks} tuần).`,
          },
          suggestion: {
            en: 'Baby may be overtired. Watch for tired signs earlier. An overtired baby releases cortisol, making it harder to sleep.',
            vi: 'Bé có thể quá mệt. Chú ý dấu hiệu mệt sớm hơn. Bé quá mệt sẽ tiết cortisol, làm khó ngủ hơn.',
          },
        });
      }

      if (wakeWindow < minWakeWindow - 10 && wakeWindow > 0) {
        warnings.push({
          type: 'wake_window_too_short',
          severity: 'info',
          message: {
            en: `Wake window is only ${Math.round(wakeWindow)} minutes (min recommended: ${minWakeWindow} min for ${ageWeeks} weeks).`,
            vi: `Thời gian thức chỉ ${Math.round(wakeWindow)} phút (khuyến nghị tối thiểu: ${minWakeWindow} phút cho bé ${ageWeeks} tuần).`,
          },
          suggestion: {
            en: 'Baby may not be tired enough, which can cause short naps (catnapping). Try extending awake time slightly.',
            vi: 'Bé có thể chưa đủ mệt, dẫn đến ngủ vặt. Hãy thử kéo dài thời gian thức một chút.',
          },
        });
      }
    }
  }

  // Check bedtime
  const lastAdjusted = adjustedSchedule[adjustedSchedule.length - 1];
  const lastOriginal = originalSchedule[originalSchedule.length - 1];
  const adjustedBedtime = parseTimeToMinutes(lastAdjusted.time);
  const originalBedtime = parseTimeToMinutes(lastOriginal.time);
  const delayMinutes = adjustedBedtime - originalBedtime;

  // Bedtime too late
  if (adjustedBedtime > maxBedtimeMinutes) {
    const minutesLate = adjustedBedtime - maxBedtimeMinutes;
    warnings.push({
      type: 'bedtime_too_late',
      severity: minutesLate > 60 ? 'danger' : 'warning',
      message: {
        en: `Bedtime is ${minutesToTimeString(adjustedBedtime)}, which is ${minutesLate} minutes later than recommended (${minutesToTimeString(maxBedtimeMinutes)}).`,
        vi: `Giờ ngủ đêm là ${minutesToTimeString(adjustedBedtime)}, muộn ${minutesLate} phút so với khuyến nghị (${minutesToTimeString(maxBedtimeMinutes)}).`,
      },
      suggestion: {
        en: 'Late bedtime causes sleep debt which leads to early waking and poor naps. Consider putting baby down earlier tonight (even if they skip the last nap).',
        vi: 'Ngủ đêm muộn gây nợ ngủ, dẫn đến dậy sớm và ngủ ngày kém. Hãy cho bé ngủ sớm tối nay (dù có thể bỏ giấc cuối).',
      },
    });
  }

  // Skip last nap suggestion for large delays
  if (delayMinutes > 90) {
    const lastNapIndex = findLastNapIndex(adjustedSchedule);
    if (lastNapIndex !== -1 && lastNapIndex < adjustedSchedule.length - 1) {
      warnings.push({
        type: 'skip_nap_suggested',
        severity: 'info',
        message: {
          en: 'Schedule is significantly delayed today.',
          vi: 'Lịch trình hôm nay bị trễ nhiều.',
        },
        suggestion: {
          en: 'Consider skipping the last short nap (catnap) and moving bedtime to compensate. Early bedtime helps recover from a difficult day.',
          vi: 'Cân nhắc bỏ giấc ngắn cuối (catnap) và cho ngủ đêm sớm hơn. Ngủ đêm sớm giúp bù lại một ngày khó khăn.',
        },
      });
    }
  }

  // Moderate delay - early bedtime suggestion
  if (delayMinutes >= 30 && delayMinutes <= 90 && adjustedBedtime <= maxBedtimeMinutes) {
    warnings.push({
      type: 'early_bedtime_suggested',
      severity: 'info',
      message: {
        en: `Schedule is ${delayMinutes} minutes behind.`,
        vi: `Lịch trình trễ ${delayMinutes} phút.`,
      },
      suggestion: {
        en: 'This is manageable! Consider moving bedtime 15-30 minutes earlier than the adjusted time to prevent sleep debt.',
        vi: 'Vẫn ổn! Nên cho ngủ đêm sớm hơn 15-30 phút so với giờ đã điều chỉnh để tránh nợ ngủ.',
      },
    });
  }

  // Calculate total sleep impact
  let originalTotalSleep = 0;
  let adjustedTotalSleep = 0;

  for (const entry of originalSchedule) {
    if (getActivityType(entry.activity) === 'S') {
      originalTotalSleep += entry.duration;
    }
  }

  for (const entry of adjustedSchedule) {
    if (getActivityType(entry.activity) === 'S') {
      adjustedTotalSleep += entry.duration;
    }
  }

  const sleepLoss = originalTotalSleep - adjustedTotalSleep;
  if (sleepLoss >= 30) {
    warnings.push({
      type: 'total_sleep_low',
      severity: sleepLoss >= 60 ? 'warning' : 'info',
      message: {
        en: `Baby may get ${sleepLoss} minutes less day sleep than planned.`,
        vi: `Bé có thể ngủ ngày ít hơn ${sleepLoss} phút so với kế hoạch.`,
      },
      suggestion: {
        en: 'Try to compensate with an earlier bedtime tonight. Every 30 minutes of lost day sleep = move bedtime 15 minutes earlier.',
        vi: 'Hãy bù bằng cách cho ngủ đêm sớm hơn. Mỗi 30 phút thiếu ngủ ngày = ngủ đêm sớm hơn 15 phút.',
      },
    });
  }

  return warnings;
}

/**
 * Get minimum wake window in minutes based on age
 */
function getMinWakeWindowForAge(ageWeeks: number): number {
  if (ageWeeks < 6) return 45;      // 45 min
  if (ageWeeks < 12) return 60;     // 1 hour
  if (ageWeeks < 20) return 90;     // 1.5 hours
  if (ageWeeks < 26) return 120;    // 2 hours
  if (ageWeeks < 44) return 150;    // 2.5 hours
  if (ageWeeks < 52) return 180;    // 3 hours
  return 240;                        // 4 hours for toddlers
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use analyzeScheduleAdjustments instead
 */
export function analyzeScheduleAdjustment(
  originalSchedule: ScheduleEntry[],
  adjustedSchedule: ScheduleEntry[],
  ageWeeks: number
): AdjustmentWarning[] {
  return analyzeScheduleAdjustments(originalSchedule, adjustedSchedule, {}, ageWeeks);
}

/**
 * Get maximum recommended bedtime based on age
 */
function getMaxBedtimeForAge(ageWeeks: number): number {
  // Younger babies need earlier bedtimes
  if (ageWeeks < 12) return 19 * 60 + 30; // 7:30 PM
  if (ageWeeks < 26) return 20 * 60;      // 8:00 PM
  if (ageWeeks < 52) return 20 * 60 + 30; // 8:30 PM
  return 21 * 60;                          // 9:00 PM for toddlers
}

/**
 * Get maximum wake window in minutes based on age
 */
function getMaxWakeWindowForAge(ageWeeks: number): number {
  if (ageWeeks < 6) return 60;      // 1 hour
  if (ageWeeks < 12) return 90;     // 1.5 hours
  if (ageWeeks < 20) return 120;    // 2 hours
  if (ageWeeks < 26) return 150;    // 2.5 hours
  if (ageWeeks < 44) return 180;    // 3 hours
  if (ageWeeks < 52) return 240;    // 4 hours
  return 300;                        // 5 hours for toddlers
}

/**
 * Find the index of the last nap (sleep activity that's not night sleep)
 */
function findLastNapIndex(schedule: ScheduleEntry[]): number {
  for (let i = schedule.length - 1; i >= 0; i--) {
    const activity = schedule[i].activity;
    if (activity === 'S' && !activity.includes('NIGHT')) {
      return i;
    }
  }
  return -1;
}

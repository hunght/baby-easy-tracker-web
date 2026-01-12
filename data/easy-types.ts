// E.A.S.Y. Schedule Types

export type ScheduleType =
  | 'E3'
  | 'E3.15'
  | 'E3.5'
  | 'E3.5+4'
  | 'E3.75'
  | 'E4'
  | 'E4_2-2-2-2.5'
  | 'E4_2-2.15-2-2.15'
  | 'E4_2-2-2.15-2.15'
  | 'E2.5-2.5-3'
  | 'E2-2.5-3.5'
  | 'E2-3-3'
  | 'E2-2.5-4'
  | 'E4_delayed30'
  | 'E2-3-4'
  | 'E2.5-3-4'
  | 'E2.5-3-4.5'
  | 'E2.5-2.5-4'
  | 'E3-3-4'
  | 'E56_3.5-3-4'
  | 'E56_3-3-4.5'
  | 'E56_3.15-3.15-4'
  | 'E56_4-6'
  | 'E56_4.5-5.5'
  | 'E56_4.5-6'
  | 'E5-6'
  | 'E56_5.5-5.5'
  | 'E56_5.5-5';

export type ActivityType = 'E' | 'A' | 'S' | 'E+A' | 'E+NIGHT' | 'NIGHT';

export interface ScheduleEntry {
  time: string; // HH:MM format
  activity: string;
  duration: number; // in minutes
  note: string;
}

export interface AgeRange {
  min: number;
  max: number;
}

export interface SleepTarget {
  min: number;
  max: number;
}

export interface ScheduleData {
  id: ScheduleType;
  name: string;
  nameVi?: string;
  ageRange: AgeRange;
  wakeWindows: number[]; // in minutes
  napCount: number;
  typicalNapDurations: number[]; // in minutes
  totalWakeTarget: SleepTarget;
  totalSleepTarget: SleepTarget;
  sleepDebtThreshold: number;
  schedule: ScheduleEntry[];
  sleepDebtSigns?: string[];
  description?: string;
  descriptionVi?: string;
  purpose?: string;
  warning?: string;
  isGoldStandard?: boolean;
  transitionTip?: string;
  useWhen?: string;
  requirements?: string;
}

export interface SleepRequirement {
  ageWeeks: AgeRange;
  totalSleep: SleepTarget;
  totalWake: SleepTarget;
  warningThreshold: number;
  sleepDebtSigns: string[];
}

export interface AgeScheduleRecommendation {
  primary: ScheduleType;
  variants: ScheduleType[];
  description: string;
  descriptionVi?: string;
}

export interface BabyProfile {
  name: string;
  birthDate: string; // ISO date string
  wakeTime: string; // HH:MM format
}

export interface EasyAppData {
  baby: BabyProfile | null;
  currentSchedule: ScheduleType | null;
}

export interface CurrentActivityInfo {
  current: ScheduleEntry;
  next: ScheduleEntry | null;
  timeRemaining: number; // in minutes
  progress: number; // 0-100 percentage
}

// Activity color mapping
export const ACTIVITY_COLORS: Record<string, string> = {
  E: '#4CAF50', // Green - Eat
  A: '#2196F3', // Blue - Activity
  S: '#9C27B0', // Purple - Sleep
  Y: '#FF9800', // Orange - Your Time
  'E+A': '#4CAF50', // Green
  'E+NIGHT': '#9C27B0', // Purple
  NIGHT: '#9C27B0', // Purple
};

// Activity icons (using Lucide icon names)
export const ACTIVITY_ICONS: Record<string, string> = {
  E: 'baby-bottle',
  A: 'play',
  S: 'moon',
  Y: 'heart',
  'E+A': 'baby-bottle',
  'E+NIGHT': 'moon',
  NIGHT: 'moon',
};

// Activity labels
export const ACTIVITY_LABELS: Record<string, { en: string; vi: string }> = {
  E: { en: 'Eat', vi: 'Ăn' },
  A: { en: 'Activity', vi: 'Hoạt động' },
  S: { en: 'Sleep', vi: 'Ngủ' },
  Y: { en: 'Your Time', vi: 'Thời gian của mẹ' },
  'E+A': { en: 'Eat + Activity', vi: 'Ăn + Hoạt động' },
  'E+NIGHT': { en: 'Night Sleep', vi: 'Giấc đêm' },
  NIGHT: { en: 'Night Sleep', vi: 'Giấc đêm' },
};

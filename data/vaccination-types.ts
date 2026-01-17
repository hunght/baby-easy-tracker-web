// Vaccination Types for Vietnamese Vaccination Schedule Tracker

export type VaccineSource = 'TCMR' | 'dichvu'; // TCMR = Chương trình tiêm chủng mở rộng, dichvu = Dịch vụ

export type VaccinationStatus = 'completed' | 'upcoming' | 'overdue' | 'skipped';

export interface VaccineInfo {
  id: string;
  name: string;
  nameEn?: string;
  shortName: string;
  description: string;
  source: VaccineSource;
  isLiveVaccine: boolean; // For 28-day rule between live vaccines
  diseases: string[]; // Diseases it protects against
}

export interface VaccineDose {
  id: string;
  vaccineId: string;
  doseNumber: number;
  totalDoses: number;
  recommendedAgeMonths: number; // Age in months (can be decimal, e.g., 0.5 for 2 weeks)
  recommendedAgeDays?: number; // More precise for newborn vaccines
  minIntervalDays?: number; // Minimum days from previous dose
  maxAgeDays?: number; // Maximum age to receive this vaccine (e.g., Rotavirus)
  notes?: string;
}

export interface VaccinationRecord {
  id: string;
  babyId?: string;
  vaccineId: string;
  doseNumber: number;
  status: VaccinationStatus;
  scheduledDate?: number; // Unix timestamp
  completedDate?: number; // Unix timestamp when administered
  location?: string; // Hospital/clinic name
  batchNumber?: string; // Vaccine batch/lot number
  provider?: string; // Doctor/nurse name
  notes?: string;
  sideEffects?: string;
  createdAt: number;
  updatedAt: number;
}

export interface BabyProfile {
  id: string;
  name: string;
  birthDate: number; // Unix timestamp
  gender?: 'male' | 'female';
}

export interface VaccinationStorageData {
  babies: BabyProfile[];
  activeBabyId: string | null;
  records: VaccinationRecord[];
  lastUpdated: number;
}

// Calculate age in months from birth date
export function calculateAgeInMonths(birthDate: number): number {
  const now = Date.now();
  const birth = new Date(birthDate);
  const today = new Date(now);

  let months = (today.getFullYear() - birth.getFullYear()) * 12;
  months += today.getMonth() - birth.getMonth();

  // Adjust for day of month
  if (today.getDate() < birth.getDate()) {
    months--;
  }

  return Math.max(0, months);
}

// Calculate age in days from birth date
export function calculateAgeInDays(birthDate: number): number {
  const now = Date.now();
  const diffTime = now - birthDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Get vaccination status based on age and schedule
export function getVaccinationStatus(
  dose: VaccineDose,
  record: VaccinationRecord | undefined,
  ageInDays: number
): VaccinationStatus {
  if (record?.status === 'completed') return 'completed';
  if (record?.status === 'skipped') return 'skipped';

  const recommendedAgeDays = dose.recommendedAgeDays ?? dose.recommendedAgeMonths * 30;
  const gracePeriodDays = 30; // 1 month grace period

  if (ageInDays < recommendedAgeDays) {
    return 'upcoming';
  } else if (ageInDays <= recommendedAgeDays + gracePeriodDays) {
    return 'upcoming';
  } else {
    return 'overdue';
  }
}

// Check if two live vaccines respect the 28-day rule
export function checkLiveVaccineRule(
  lastLiveVaccineDate: number,
  newVaccineDate: number
): boolean {
  const diffDays = (newVaccineDate - lastLiveVaccineDate) / (1000 * 60 * 60 * 24);
  return diffDays >= 28 || diffDays === 0; // Same day is OK, otherwise 28+ days
}

// Format age for display
export function formatAge(ageInDays: number): string {
  if (ageInDays < 30) {
    return `${ageInDays} ngày`;
  } else if (ageInDays < 365) {
    const months = Math.floor(ageInDays / 30);
    return `${months} tháng`;
  } else {
    const years = Math.floor(ageInDays / 365);
    const remainingMonths = Math.floor((ageInDays % 365) / 30);
    if (remainingMonths === 0) {
      return `${years} tuổi`;
    }
    return `${years} tuổi ${remainingMonths} tháng`;
  }
}

// Format recommended age for display
export function formatRecommendedAge(dose: VaccineDose): string {
  if (dose.recommendedAgeDays !== undefined) {
    if (dose.recommendedAgeDays === 0) return 'Sơ sinh (<24h)';
    if (dose.recommendedAgeDays < 30) return `${dose.recommendedAgeDays} ngày`;
    if (dose.recommendedAgeDays < 60) return '< 1 tháng';
  }

  const months = dose.recommendedAgeMonths;
  if (months < 12) {
    return `${months} tháng`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} tuổi`;
    }
    return `${years} tuổi ${remainingMonths} tháng`;
  }
}

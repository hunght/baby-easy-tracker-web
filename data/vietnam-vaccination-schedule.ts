// Vietnamese Vaccination Schedule Data
// Based on: Chương trình Tiêm chủng Mở rộng (TCMR - Bộ Y tế)
// and common service vaccination protocols

import type { VaccineInfo, VaccineDose } from './vaccination-types';

// ============================================
// VACCINE INFORMATION
// ============================================

export const VACCINES: VaccineInfo[] = [
  // Hepatitis B - Newborn
  {
    id: 'hepb-newborn',
    name: 'Viêm gan B (Sơ sinh)',
    nameEn: 'Hepatitis B (Birth)',
    shortName: 'HepB',
    description: 'Tiêm trong vòng 24h sau sinh. Nếu mẹ nhiễm HBV, cần tiêm thêm kháng huyết thanh trong 12h đầu.',
    source: 'TCMR',
    isLiveVaccine: false,
    diseases: ['Viêm gan B'],
  },
  // BCG - Tuberculosis
  {
    id: 'bcg',
    name: 'Lao (BCG)',
    nameEn: 'BCG (Tuberculosis)',
    shortName: 'BCG',
    description: 'Tốt nhất tiêm trước khi đầy tháng.',
    source: 'TCMR',
    isLiveVaccine: true,
    diseases: ['Lao'],
  },
  // 6-in-1 (Hexaxim/Infanrix Hexa)
  {
    id: '6in1',
    name: 'Vắc xin 6 trong 1',
    nameEn: '6-in-1 (Hexaxim/Infanrix Hexa)',
    shortName: '6in1',
    description: 'Bạch hầu, Ho gà, Uốn ván, Bại liệt, Hib, Viêm gan B. Có thể thay thế 5in1 + Viêm gan B.',
    source: 'dichvu',
    isLiveVaccine: false,
    diseases: ['Bạch hầu', 'Ho gà', 'Uốn ván', 'Bại liệt', 'Hib', 'Viêm gan B'],
  },
  // 5-in-1 (TCMR)
  {
    id: '5in1',
    name: 'Vắc xin 5 trong 1 (TCMR)',
    nameEn: '5-in-1 (EPI Program)',
    shortName: '5in1',
    description: 'Bạch hầu, Ho gà, Uốn ván, Bại liệt, Hib. Cần uống thêm Bại liệt (OPV).',
    source: 'TCMR',
    isLiveVaccine: false,
    diseases: ['Bạch hầu', 'Ho gà', 'Uốn ván', 'Bại liệt', 'Hib'],
  },
  // Rotavirus
  {
    id: 'rotavirus',
    name: 'Rotavirus',
    nameEn: 'Rotavirus',
    shortName: 'Rota',
    description: 'Phòng tiêu chảy cấp do Rotavirus. Phải hoàn thành trước 8 tháng tuổi.',
    source: 'dichvu',
    isLiveVaccine: true,
    diseases: ['Tiêu chảy Rotavirus'],
  },
  // Pneumococcal (Phế cầu)
  {
    id: 'pneumococcal',
    name: 'Phế cầu (PCV)',
    nameEn: 'Pneumococcal (PCV13/PCV15)',
    shortName: 'PCV',
    description: 'Phòng viêm phổi, viêm màng não, nhiễm trùng huyết do phế cầu.',
    source: 'dichvu',
    isLiveVaccine: false,
    diseases: ['Viêm phổi phế cầu', 'Viêm màng não', 'Nhiễm trùng huyết'],
  },
  // Influenza (Cúm)
  {
    id: 'flu',
    name: 'Cúm mùa',
    nameEn: 'Influenza',
    shortName: 'Cúm',
    description: 'Tiêm từ 6 tháng tuổi. Trẻ < 9 tuổi lần đầu cần tiêm 2 mũi. Nhắc lại hàng năm.',
    source: 'dichvu',
    isLiveVaccine: false,
    diseases: ['Cúm'],
  },
  // Meningococcal BC
  {
    id: 'meningo-bc',
    name: 'Não mô cầu BC',
    nameEn: 'Meningococcal BC (Mengoc BC)',
    shortName: 'MenBC',
    description: 'Phòng viêm màng não do não mô cầu nhóm B và C.',
    source: 'dichvu',
    isLiveVaccine: false,
    diseases: ['Viêm màng não mô cầu BC'],
  },
  // Meningococcal ACYW
  {
    id: 'meningo-acyw',
    name: 'Não mô cầu ACYW-135',
    nameEn: 'Meningococcal ACYW (Menactra)',
    shortName: 'MenACYW',
    description: 'Phòng viêm màng não do não mô cầu nhóm A, C, Y, W-135.',
    source: 'dichvu',
    isLiveVaccine: false,
    diseases: ['Viêm màng não mô cầu ACYW'],
  },
  // Measles (Sởi đơn)
  {
    id: 'measles',
    name: 'Sởi đơn',
    nameEn: 'Measles',
    shortName: 'Sởi',
    description: 'Mũi bắt buộc trong chương trình tiêm chủng mở rộng.',
    source: 'TCMR',
    isLiveVaccine: true,
    diseases: ['Sởi'],
  },
  // MMR
  {
    id: 'mmr',
    name: 'Sởi - Quai bị - Rubella (MMR)',
    nameEn: 'MMR (Measles, Mumps, Rubella)',
    shortName: 'MMR',
    description: 'Nếu đã tiêm Sởi đơn lúc 9 tháng, phải cách mũi Sởi đơn ít nhất 6 tháng.',
    source: 'dichvu',
    isLiveVaccine: true,
    diseases: ['Sởi', 'Quai bị', 'Rubella'],
  },
  // MR (Measles-Rubella)
  {
    id: 'mr',
    name: 'Sởi - Rubella (MR)',
    nameEn: 'MR (Measles, Rubella)',
    shortName: 'MR',
    description: 'Tiêm nhắc trong chương trình mở rộng.',
    source: 'TCMR',
    isLiveVaccine: true,
    diseases: ['Sởi', 'Rubella'],
  },
  // Japanese Encephalitis - Imojev (live)
  {
    id: 'je-imojev',
    name: 'Viêm não Nhật Bản (Imojev)',
    nameEn: 'Japanese Encephalitis (Imojev)',
    shortName: 'VNNB-I',
    description: 'Vắc xin sống, tiêm 1 mũi từ 9 tháng, nhắc lại sau 1-2 năm.',
    source: 'dichvu',
    isLiveVaccine: true,
    diseases: ['Viêm não Nhật Bản'],
  },
  // Japanese Encephalitis - Jevax (inactivated)
  {
    id: 'je-jevax',
    name: 'Viêm não Nhật Bản (Jevax)',
    nameEn: 'Japanese Encephalitis (Jevax)',
    shortName: 'VNNB-J',
    description: 'Vắc xin bất hoạt, tiêm 3 mũi: Mũi 1 lúc 12 tháng, mũi 2 sau 1-2 tuần, mũi 3 sau 1 năm.',
    source: 'TCMR',
    isLiveVaccine: false,
    diseases: ['Viêm não Nhật Bản'],
  },
  // Varicella (Thủy đậu)
  {
    id: 'varicella',
    name: 'Thủy đậu',
    nameEn: 'Varicella (Chickenpox)',
    shortName: 'Thủy đậu',
    description: 'Có thể tiêm từ 9 tháng hoặc 12 tháng tùy loại vắc xin. Mũi 2 cách mũi 1 ít nhất 3 tháng.',
    source: 'dichvu',
    isLiveVaccine: true,
    diseases: ['Thủy đậu'],
  },
  // Hepatitis A
  {
    id: 'hepa',
    name: 'Viêm gan A',
    nameEn: 'Hepatitis A',
    shortName: 'HepA',
    description: 'Bắt đầu từ 1 tuổi. Mũi 2 cách mũi 1 từ 6-12 tháng.',
    source: 'dichvu',
    isLiveVaccine: false,
    diseases: ['Viêm gan A'],
  },
];

// ============================================
// VACCINATION SCHEDULE (DOSES)
// ============================================

export const VACCINE_DOSES: VaccineDose[] = [
  // ========== NEWBORN (0-1 month) ==========
  {
    id: 'hepb-newborn-1',
    vaccineId: 'hepb-newborn',
    doseNumber: 1,
    totalDoses: 1,
    recommendedAgeMonths: 0,
    recommendedAgeDays: 0, // Within 24 hours
    notes: 'Tiêm trong vòng 24 giờ sau sinh',
  },
  {
    id: 'bcg-1',
    vaccineId: 'bcg',
    doseNumber: 1,
    totalDoses: 1,
    recommendedAgeMonths: 0,
    recommendedAgeDays: 14, // < 1 month
    notes: 'Tiêm trước khi đầy tháng',
  },

  // ========== 2 MONTHS ==========
  {
    id: '6in1-1',
    vaccineId: '6in1',
    doseNumber: 1,
    totalDoses: 4,
    recommendedAgeMonths: 2,
    notes: 'Có thể dùng 5in1 (TCMR) thay thế',
  },
  {
    id: 'rotavirus-1',
    vaccineId: 'rotavirus',
    doseNumber: 1,
    totalDoses: 3,
    recommendedAgeMonths: 2,
    recommendedAgeDays: 42, // Sớm nhất từ 6 tuần
    maxAgeDays: 240, // Phải hoàn thành trước 8 tháng
    notes: 'Uống liều 1. Sớm nhất từ 6 tuần tuổi.',
  },
  {
    id: 'pneumococcal-1',
    vaccineId: 'pneumococcal',
    doseNumber: 1,
    totalDoses: 4,
    recommendedAgeMonths: 2,
    recommendedAgeDays: 42, // Sớm nhất từ 6 tuần
    notes: 'Sớm nhất từ 6 tuần tuổi',
  },

  // ========== 3 MONTHS ==========
  {
    id: '6in1-2',
    vaccineId: '6in1',
    doseNumber: 2,
    totalDoses: 4,
    recommendedAgeMonths: 3,
    minIntervalDays: 28,
    notes: 'Cách mũi 1 tối thiểu 28 ngày',
  },
  {
    id: 'rotavirus-2',
    vaccineId: 'rotavirus',
    doseNumber: 2,
    totalDoses: 3,
    recommendedAgeMonths: 3,
    minIntervalDays: 28,
    maxAgeDays: 240,
    notes: 'Cách liều 1 tối thiểu 4 tuần',
  },
  {
    id: 'pneumococcal-2',
    vaccineId: 'pneumococcal',
    doseNumber: 2,
    totalDoses: 4,
    recommendedAgeMonths: 3,
    minIntervalDays: 28,
    notes: 'Cách mũi 1 tối thiểu 1 tháng',
  },

  // ========== 4 MONTHS ==========
  {
    id: '6in1-3',
    vaccineId: '6in1',
    doseNumber: 3,
    totalDoses: 4,
    recommendedAgeMonths: 4,
    minIntervalDays: 28,
    notes: 'Cách mũi 2 tối thiểu 28 ngày. Hoàn thành 3 liều trước 6 tháng là tốt nhất.',
  },
  {
    id: 'rotavirus-3',
    vaccineId: 'rotavirus',
    doseNumber: 3,
    totalDoses: 3,
    recommendedAgeMonths: 4,
    minIntervalDays: 28,
    maxAgeDays: 240,
    notes: 'Liều 3 (nếu dùng Rotateq). Phải hoàn thành trước 8 tháng tuổi.',
  },
  {
    id: 'pneumococcal-3',
    vaccineId: 'pneumococcal',
    doseNumber: 3,
    totalDoses: 4,
    recommendedAgeMonths: 4,
    minIntervalDays: 28,
    notes: 'Cách mũi 2 tối thiểu 1 tháng',
  },

  // ========== 6 MONTHS ==========
  {
    id: 'flu-1',
    vaccineId: 'flu',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 6,
    notes: 'Trẻ < 9 tuổi lần đầu tiêm cần tiêm 2 mũi',
  },
  {
    id: 'meningo-bc-1',
    vaccineId: 'meningo-bc',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 6,
    notes: 'Tiêm mũi 1 (Mengoc BC)',
  },

  // ========== 7 MONTHS ==========
  {
    id: 'flu-2',
    vaccineId: 'flu',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 7,
    minIntervalDays: 28,
    notes: 'Cách mũi 1 tối thiểu 1 tháng. Sau đó nhắc lại hàng năm.',
  },

  // ========== 8 MONTHS ==========
  {
    id: 'meningo-bc-2',
    vaccineId: 'meningo-bc',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 8,
    minIntervalDays: 42, // 6-8 tuần
    notes: 'Cách mũi 1 từ 6-8 tuần',
  },

  // ========== 9 MONTHS ==========
  {
    id: 'measles-1',
    vaccineId: 'measles',
    doseNumber: 1,
    totalDoses: 1,
    recommendedAgeMonths: 9,
    notes: 'Mũi bắt buộc trong chương trình mở rộng',
  },
  {
    id: 'meningo-acyw-1',
    vaccineId: 'meningo-acyw',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 9,
    notes: 'Menactra: Tiêm 2 mũi cách nhau 3 tháng (với trẻ 9-23 tháng)',
  },
  {
    id: 'je-imojev-1',
    vaccineId: 'je-imojev',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 9,
    notes: 'Tiêm 1 mũi từ 9 tháng',
  },
  {
    id: 'varicella-1',
    vaccineId: 'varicella',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 9,
    notes: 'Có thể tiêm từ 9 tháng hoặc đợi 12 tháng tùy loại vắc xin',
  },

  // ========== 12 MONTHS ==========
  {
    id: 'je-jevax-1',
    vaccineId: 'je-jevax',
    doseNumber: 1,
    totalDoses: 3,
    recommendedAgeMonths: 12,
    notes: 'Nếu chưa tiêm Imojev, tiêm Jevax mũi 1',
  },
  {
    id: 'je-jevax-2',
    vaccineId: 'je-jevax',
    doseNumber: 2,
    totalDoses: 3,
    recommendedAgeMonths: 12,
    minIntervalDays: 7, // 1-2 tuần
    notes: 'Mũi 2 sau 1-2 tuần',
  },
  {
    id: 'mmr-1',
    vaccineId: 'mmr',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 12,
    notes: 'Nếu đã tiêm Sởi đơn lúc 9 tháng, phải cách ít nhất 6 tháng',
  },
  {
    id: 'meningo-acyw-2',
    vaccineId: 'meningo-acyw',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 12,
    minIntervalDays: 90, // 3 tháng
    notes: 'Cách mũi 1 tối thiểu 3 tháng',
  },
  {
    id: 'hepa-1',
    vaccineId: 'hepa',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeMonths: 12,
    notes: 'Bắt đầu từ tròn 1 tuổi',
  },
  {
    id: 'pneumococcal-4',
    vaccineId: 'pneumococcal',
    doseNumber: 4,
    totalDoses: 4,
    recommendedAgeMonths: 12,
    minIntervalDays: 60,
    notes: 'Mũi nhắc lại, cách mũi 3 tối thiểu 2 tháng',
  },

  // ========== 15 MONTHS ==========
  {
    id: 'varicella-2',
    vaccineId: 'varicella',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 15,
    minIntervalDays: 90,
    notes: 'Mũi 2 cách mũi 1 ít nhất 3 tháng',
  },

  // ========== 18 MONTHS ==========
  {
    id: '6in1-4',
    vaccineId: '6in1',
    doseNumber: 4,
    totalDoses: 4,
    recommendedAgeMonths: 18,
    minIntervalDays: 180,
    notes: 'Tiêm nhắc lại. Cách mũi 3 tối thiểu 6 tháng.',
  },
  {
    id: 'mr-1',
    vaccineId: 'mr',
    doseNumber: 1,
    totalDoses: 1,
    recommendedAgeMonths: 18,
    notes: 'Tiêm nhắc trong chương trình mở rộng',
  },
  {
    id: 'hepa-2',
    vaccineId: 'hepa',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 18,
    minIntervalDays: 180,
    notes: 'Cách mũi 1 từ 6-12 tháng',
  },

  // ========== 24 MONTHS ==========
  {
    id: 'je-imojev-2',
    vaccineId: 'je-imojev',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 24,
    minIntervalDays: 365,
    notes: 'Tiêm nhắc nếu dùng Imojev. Cách mũi 1 từ 1-2 năm.',
  },
  {
    id: 'je-jevax-3',
    vaccineId: 'je-jevax',
    doseNumber: 3,
    totalDoses: 3,
    recommendedAgeMonths: 24,
    minIntervalDays: 365,
    notes: 'Mũi 3 sau 1 năm kể từ mũi 2',
  },

  // ========== 4-6 YEARS ==========
  {
    id: 'mmr-2',
    vaccineId: 'mmr',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeMonths: 48,
    minIntervalDays: 90,
    notes: 'Tiêm nhắc trước khi đi học',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getVaccineById(id: string): VaccineInfo | undefined {
  return VACCINES.find((v) => v.id === id);
}

export function getDoseById(id: string): VaccineDose | undefined {
  return VACCINE_DOSES.find((d) => d.id === id);
}

export function getDosesByVaccineId(vaccineId: string): VaccineDose[] {
  return VACCINE_DOSES.filter((d) => d.vaccineId === vaccineId);
}

export function getDosesByAgeRange(minMonths: number, maxMonths: number): VaccineDose[] {
  return VACCINE_DOSES.filter(
    (d) => d.recommendedAgeMonths >= minMonths && d.recommendedAgeMonths <= maxMonths
  );
}

// Group doses by recommended age for timeline display
export function getDosesGroupedByAge(): Map<number, VaccineDose[]> {
  const grouped = new Map<number, VaccineDose[]>();

  VACCINE_DOSES.forEach((dose) => {
    const age = dose.recommendedAgeMonths;
    if (!grouped.has(age)) {
      grouped.set(age, []);
    }
    grouped.get(age)!.push(dose);
  });

  return grouped;
}

// Get vaccines for a specific age stage
export function getVaccinesForStage(
  stage: 'newborn' | '2-6months' | '6-12months' | '12-24months' | '2years+'
): VaccineDose[] {
  switch (stage) {
    case 'newborn':
      return getDosesByAgeRange(0, 1);
    case '2-6months':
      return getDosesByAgeRange(2, 6);
    case '6-12months':
      return getDosesByAgeRange(6, 12);
    case '12-24months':
      return getDosesByAgeRange(12, 24);
    case '2years+':
      return getDosesByAgeRange(24, 100);
    default:
      return [];
  }
}

// Business Rules

// Rule 1: Live vaccines must be 28 days apart (or same day)
export const LIVE_VACCINE_INTERVAL_DAYS = 28;

// Rule 2: Minimum interval between same vaccine doses (most inactivated)
export const DEFAULT_MIN_INTERVAL_DAYS = 28;

// Rule 3: Rotavirus max age
export const ROTAVIRUS_MAX_AGE_DAYS = 240; // 8 months

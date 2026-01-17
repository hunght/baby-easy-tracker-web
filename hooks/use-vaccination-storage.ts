'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  VaccinationStorageData,
  VaccinationRecord,
  BabyProfile,
  VaccinationStatus,
} from '@/data/vaccination-types';
import {
  calculateAgeInDays,
  getVaccinationStatus,
} from '@/data/vaccination-types';
import { VACCINE_DOSES, getVaccineById, getDoseById } from '@/data/vietnam-vaccination-schedule';

const STORAGE_KEY = 'vietnam-vaccination-tracker-data';

const DEFAULT_DATA: VaccinationStorageData = {
  babies: [],
  activeBabyId: null,
  records: [],
  lastUpdated: Date.now(),
};

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Hook for managing Vietnamese vaccination data in localStorage
 */
export function useVaccinationStorage() {
  const [data, setData] = useState<VaccinationStorageData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as VaccinationStorageData;
        setData(parsed);
      }
    } catch (error) {
      console.error('Error loading vaccination data from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save data helper
  const saveData = useCallback((updater: (prev: VaccinationStorageData) => VaccinationStorageData) => {
    setData((prev) => {
      const newData = { ...updater(prev), lastUpdated: Date.now() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error('Error saving vaccination data to localStorage:', error);
      }
      return newData;
    });
  }, []);

  // ========== BABY PROFILE MANAGEMENT ==========

  const addBaby = useCallback(
    (baby: Omit<BabyProfile, 'id'>): BabyProfile => {
      const newBaby: BabyProfile = {
        ...baby,
        id: generateId(),
      };
      saveData((prev) => ({
        ...prev,
        babies: [...prev.babies, newBaby],
        activeBabyId: prev.activeBabyId ?? newBaby.id,
      }));
      return newBaby;
    },
    [saveData]
  );

  const updateBaby = useCallback(
    (id: string, updates: Partial<Omit<BabyProfile, 'id'>>) => {
      saveData((prev) => ({
        ...prev,
        babies: prev.babies.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      }));
    },
    [saveData]
  );

  const deleteBaby = useCallback(
    (id: string) => {
      saveData((prev) => {
        const newBabies = prev.babies.filter((b) => b.id !== id);
        const newRecords = prev.records.filter((r) => r.babyId !== id);
        const newActiveBabyId =
          prev.activeBabyId === id ? (newBabies[0]?.id ?? null) : prev.activeBabyId;
        return {
          ...prev,
          babies: newBabies,
          records: newRecords,
          activeBabyId: newActiveBabyId,
        };
      });
    },
    [saveData]
  );

  const setActiveBaby = useCallback(
    (id: string) => {
      saveData((prev) => ({
        ...prev,
        activeBabyId: id,
      }));
    },
    [saveData]
  );

  // ========== VACCINATION RECORD MANAGEMENT ==========

  const addVaccinationRecord = useCallback(
    (record: Omit<VaccinationRecord, 'id' | 'createdAt' | 'updatedAt'>): VaccinationRecord => {
      const now = Date.now();
      const newRecord: VaccinationRecord = {
        ...record,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      saveData((prev) => ({
        ...prev,
        records: [...prev.records, newRecord],
      }));
      return newRecord;
    },
    [saveData]
  );

  const updateVaccinationRecord = useCallback(
    (id: string, updates: Partial<Omit<VaccinationRecord, 'id' | 'createdAt'>>) => {
      saveData((prev) => ({
        ...prev,
        records: prev.records.map((r) =>
          r.id === id ? { ...r, ...updates, updatedAt: Date.now() } : r
        ),
      }));
    },
    [saveData]
  );

  const deleteVaccinationRecord = useCallback(
    (id: string) => {
      saveData((prev) => ({
        ...prev,
        records: prev.records.filter((r) => r.id !== id),
      }));
    },
    [saveData]
  );

  const markVaccinationCompleted = useCallback(
    (
      vaccineId: string,
      doseNumber: number,
      details: {
        completedDate: number;
        location?: string;
        batchNumber?: string;
        provider?: string;
        notes?: string;
      }
    ) => {
      const babyId = data.activeBabyId;
      if (!babyId) return null;

      // Check if record already exists
      const existingRecord = data.records.find(
        (r) => r.babyId === babyId && r.vaccineId === vaccineId && r.doseNumber === doseNumber
      );

      if (existingRecord) {
        updateVaccinationRecord(existingRecord.id, {
          status: 'completed',
          ...details,
        });
        return existingRecord;
      } else {
        return addVaccinationRecord({
          babyId,
          vaccineId,
          doseNumber,
          status: 'completed',
          ...details,
        });
      }
    },
    [data.activeBabyId, data.records, addVaccinationRecord, updateVaccinationRecord]
  );

  const markVaccinationSkipped = useCallback(
    (vaccineId: string, doseNumber: number, reason?: string) => {
      const babyId = data.activeBabyId;
      if (!babyId) return null;

      const existingRecord = data.records.find(
        (r) => r.babyId === babyId && r.vaccineId === vaccineId && r.doseNumber === doseNumber
      );

      if (existingRecord) {
        updateVaccinationRecord(existingRecord.id, {
          status: 'skipped',
          notes: reason,
        });
        return existingRecord;
      } else {
        return addVaccinationRecord({
          babyId,
          vaccineId,
          doseNumber,
          status: 'skipped',
          notes: reason,
        });
      }
    },
    [data.activeBabyId, data.records, addVaccinationRecord, updateVaccinationRecord]
  );

  // ========== COMPUTED VALUES ==========

  const activeBaby = useMemo(() => {
    return data.babies.find((b) => b.id === data.activeBabyId) ?? null;
  }, [data.babies, data.activeBabyId]);

  const activeBabyRecords = useMemo(() => {
    if (!data.activeBabyId) return [];
    return data.records.filter((r) => r.babyId === data.activeBabyId);
  }, [data.records, data.activeBabyId]);

  // Get vaccination schedule with status for active baby
  const vaccinationSchedule = useMemo(() => {
    if (!activeBaby) return [];

    const ageInDays = calculateAgeInDays(activeBaby.birthDate);

    return VACCINE_DOSES.map((dose) => {
      const vaccine = getVaccineById(dose.vaccineId);
      const record = activeBabyRecords.find(
        (r) => r.vaccineId === dose.vaccineId && r.doseNumber === dose.doseNumber
      );
      const status = getVaccinationStatus(dose, record, ageInDays);

      return {
        dose,
        vaccine,
        record,
        status,
      };
    });
  }, [activeBaby, activeBabyRecords]);

  // Get statistics
  const statistics = useMemo(() => {
    const total = vaccinationSchedule.length;
    const completed = vaccinationSchedule.filter((v) => v.status === 'completed').length;
    const upcoming = vaccinationSchedule.filter((v) => v.status === 'upcoming').length;
    const overdue = vaccinationSchedule.filter((v) => v.status === 'overdue').length;
    const skipped = vaccinationSchedule.filter((v) => v.status === 'skipped').length;

    return {
      total,
      completed,
      upcoming,
      overdue,
      skipped,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [vaccinationSchedule]);

  // Get upcoming vaccinations (next 3 months)
  const upcomingVaccinations = useMemo(() => {
    if (!activeBaby) return [];

    const ageInDays = calculateAgeInDays(activeBaby.birthDate);
    const threeMonthsFromNow = ageInDays + 90;

    return vaccinationSchedule
      .filter((v) => {
        if (v.status !== 'upcoming') return false;
        const recommendedAgeDays =
          v.dose.recommendedAgeDays ?? v.dose.recommendedAgeMonths * 30;
        return recommendedAgeDays <= threeMonthsFromNow;
      })
      .sort((a, b) => {
        const aAge = a.dose.recommendedAgeDays ?? a.dose.recommendedAgeMonths * 30;
        const bAge = b.dose.recommendedAgeDays ?? b.dose.recommendedAgeMonths * 30;
        return aAge - bAge;
      });
  }, [activeBaby, vaccinationSchedule]);

  // Get overdue vaccinations
  const overdueVaccinations = useMemo(() => {
    return vaccinationSchedule.filter((v) => v.status === 'overdue');
  }, [vaccinationSchedule]);

  // Clear all data
  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(DEFAULT_DATA);
    } catch (error) {
      console.error('Error clearing vaccination data:', error);
    }
  }, []);

  // Check if setup is complete (has at least one baby)
  const isSetupComplete = data.babies.length > 0 && data.activeBabyId !== null;

  return {
    // Data
    data,
    isLoaded,
    isSetupComplete,

    // Baby management
    babies: data.babies,
    activeBaby,
    activeBabyId: data.activeBabyId,
    addBaby,
    updateBaby,
    deleteBaby,
    setActiveBaby,

    // Vaccination records
    records: data.records,
    activeBabyRecords,
    addVaccinationRecord,
    updateVaccinationRecord,
    deleteVaccinationRecord,
    markVaccinationCompleted,
    markVaccinationSkipped,

    // Computed
    vaccinationSchedule,
    statistics,
    upcomingVaccinations,
    overdueVaccinations,

    // Utils
    clearData,
  };
}

/**
 * Get a record for a specific dose
 */
export function getRecordForDose(
  records: VaccinationRecord[],
  vaccineId: string,
  doseNumber: number,
  babyId?: string
): VaccinationRecord | undefined {
  return records.find(
    (r) =>
      r.vaccineId === vaccineId &&
      r.doseNumber === doseNumber &&
      (babyId ? r.babyId === babyId : true)
  );
}

/**
 * Calculate the recommended date for a dose based on baby's birth date
 */
export function calculateRecommendedDate(birthDate: number, doseId: string): Date | null {
  const dose = getDoseById(doseId);
  if (!dose) return null;

  const birth = new Date(birthDate);
  const recommendedDays = dose.recommendedAgeDays ?? dose.recommendedAgeMonths * 30;

  const recommended = new Date(birth);
  recommended.setDate(recommended.getDate() + recommendedDays);

  return recommended;
}

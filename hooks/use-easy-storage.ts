'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BabyProfile, ScheduleType, EasyAppData } from '@/data/easy-types';

const STORAGE_KEY = 'easy-schedule-app-data';
const TODAY_ADJUSTMENT_KEY = 'easy-schedule-today-adjustment';

const DEFAULT_DATA: EasyAppData = {
  baby: null,
  currentSchedule: null,
};

interface ActivityAdjustment {
  actualStartTime: string; // HH:mm format - when this activity actually started
  actualEndTime?: string; // HH:mm format - when this activity actually ended (optional)
}

interface TodayAdjustmentData {
  date: string; // YYYY-MM-DD format
  adjustments: Record<number, ActivityAdjustment>; // Map of activity index to adjustments
}

/**
 * Hook for managing E.A.S.Y. app data in localStorage
 */
export function useEasyStorage() {
  const [data, setData] = useState<EasyAppData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as EasyAppData;
        setData(parsed);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  const saveData = useCallback((updater: (prev: EasyAppData) => EasyAppData) => {
    setData((prev) => {
      const newData = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
      return newData;
    });
  }, []);

  // Set baby profile
  const setBabyProfile = useCallback(
    (baby: BabyProfile) => {
      saveData((prev) => ({ ...prev, baby }));
    },
    [saveData]
  );

  // Set current schedule
  const setCurrentSchedule = useCallback(
    (schedule: ScheduleType) => {
      saveData((prev) => ({ ...prev, currentSchedule: schedule }));
    },
    [saveData]
  );

  // Clear all data
  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(DEFAULT_DATA);
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
    }
  }, []);

  // Check if setup is complete
  const isSetupComplete = data.baby !== null && data.currentSchedule !== null;

  return {
    data,
    isLoaded,
    isSetupComplete,
    baby: data.baby,
    currentSchedule: data.currentSchedule,
    setBabyProfile,
    setCurrentSchedule,
    clearData,
  };
}

/**
 * Hook for current time that updates every minute
 */
export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update immediately
    setCurrentTime(new Date());

    // Update every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
}

/**
 * Hook for countdown that updates every second
 */
export function useCountdown(targetMinutes: number) {
  const [remaining, setRemaining] = useState(targetMinutes);

  useEffect(() => {
    setRemaining(targetMinutes);

    if (targetMinutes <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1 / 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetMinutes]);

  return remaining;
}

/**
 * Hook for managing today's schedule adjustments
 * Allows adjusting start/end times for any activity, recalculating subsequent times
 */
export function useTodayAdjustment() {
  const [data, setDataState] = useState<TodayAdjustmentData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = useCallback(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  // Load today's adjustments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TODAY_ADJUSTMENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TodayAdjustmentData;
        // Only use stored value if it's for today
        if (parsed.date === getTodayDate()) {
          setDataState(parsed);
        } else {
          // Clear old data
          localStorage.removeItem(TODAY_ADJUSTMENT_KEY);
          setDataState(null);
        }
      }
    } catch (error) {
      console.error('Error loading today adjustments:', error);
    }
    setIsLoaded(true);
  }, [getTodayDate]);

  // Set adjustment for a specific activity (start time, end time, or both)
  const setActivityAdjustment = useCallback(
    (activityIndex: number, adjustment: ActivityAdjustment) => {
      try {
        const newData: TodayAdjustmentData = {
          date: getTodayDate(),
          adjustments: {
            ...(data?.adjustments || {}),
            [activityIndex]: adjustment,
          },
        };
        localStorage.setItem(TODAY_ADJUSTMENT_KEY, JSON.stringify(newData));
        setDataState(newData);
      } catch (error) {
        console.error('Error saving adjustment:', error);
      }
    },
    [getTodayDate, data]
  );

  // Remove adjustment for a specific activity
  const removeActivityAdjustment = useCallback(
    (activityIndex: number) => {
      if (!data) return;

      try {
        const newAdjustments = { ...data.adjustments };
        delete newAdjustments[activityIndex];

        if (Object.keys(newAdjustments).length === 0) {
          localStorage.removeItem(TODAY_ADJUSTMENT_KEY);
          setDataState(null);
        } else {
          const newData: TodayAdjustmentData = {
            date: getTodayDate(),
            adjustments: newAdjustments,
          };
          localStorage.setItem(TODAY_ADJUSTMENT_KEY, JSON.stringify(newData));
          setDataState(newData);
        }
      } catch (error) {
        console.error('Error removing adjustment:', error);
      }
    },
    [getTodayDate, data]
  );

  // Clear all adjustments
  const clearAllAdjustments = useCallback(() => {
    try {
      localStorage.removeItem(TODAY_ADJUSTMENT_KEY);
      setDataState(null);
    } catch (error) {
      console.error('Error clearing adjustments:', error);
    }
  }, []);

  // Get adjustment for a specific activity
  const getActivityAdjustment = useCallback(
    (activityIndex: number): ActivityAdjustment | undefined => {
      return data?.adjustments?.[activityIndex];
    },
    [data]
  );

  // Check if there are any adjustments
  const hasAdjustments = data !== null && data.adjustments && Object.keys(data.adjustments).length > 0;

  // Get count of adjusted activities
  const adjustmentCount = data?.adjustments ? Object.keys(data.adjustments).length : 0;

  return {
    adjustments: data?.adjustments || {},
    hasAdjustments,
    adjustmentCount,
    isLoaded,
    setActivityAdjustment,
    removeActivityAdjustment,
    clearAllAdjustments,
    getActivityAdjustment,
  };
}

// Export the type for use in other files
export type { ActivityAdjustment };

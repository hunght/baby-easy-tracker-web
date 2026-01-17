'use client';

import { useState } from 'react';
import { useVaccinationStorage } from '@/hooks/use-vaccination-storage';
import { VaccinationCard } from './VaccinationCard';
import { VaccinationForm } from './VaccinationForm';
import { formatAge, calculateAgeInDays, formatRecommendedAge } from '@/data/vaccination-types';
import { getVaccineById, VACCINE_DOSES } from '@/data/vietnam-vaccination-schedule';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import {
  Baby,
  Syringe,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Settings,
  Plus,
  Calendar,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

type AgeStage = 'all' | 'newborn' | '2-6' | '6-12' | '12-24' | '24+';

export function VaccinationDashboard() {
  const {
    activeBaby,
    vaccinationSchedule,
    statistics,
    upcomingVaccinations,
    overdueVaccinations,
    markVaccinationCompleted,
    markVaccinationSkipped,
    clearData,
  } = useVaccinationStorage();

  const [selectedDose, setSelectedDose] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AgeStage>('all');

  if (!activeBaby) return null;

  const ageInDays = calculateAgeInDays(activeBaby.birthDate);
  const ageDisplay = formatAge(ageInDays);

  // Filter vaccinations by age stage
  const filterByStage = (stage: AgeStage) => {
    if (stage === 'all') return vaccinationSchedule;

    return vaccinationSchedule.filter((v) => {
      const months = v.dose.recommendedAgeMonths;
      switch (stage) {
        case 'newborn':
          return months < 2;
        case '2-6':
          return months >= 2 && months < 6;
        case '6-12':
          return months >= 6 && months < 12;
        case '12-24':
          return months >= 12 && months < 24;
        case '24+':
          return months >= 24;
        default:
          return true;
      }
    });
  };

  const filteredVaccinations = filterByStage(activeTab);

  const handleOpenForm = (doseId: string) => {
    setSelectedDose(doseId);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedDose(null);
    setFormOpen(false);
  };

  const handleSaveVaccination = (data: {
    completedDate: number;
    location?: string;
    batchNumber?: string;
    provider?: string;
    notes?: string;
  }) => {
    if (!selectedDose) return;

    const dose = VACCINE_DOSES.find((d) => d.id === selectedDose);
    if (!dose) return;

    markVaccinationCompleted(dose.vaccineId, dose.doseNumber, data);
    handleCloseForm();
  };

  const handleSkipVaccination = (vaccineId: string, doseNumber: number, reason?: string) => {
    markVaccinationSkipped(vaccineId, doseNumber, reason);
  };

  const handleDeleteData = () => {
    clearData();
    setDeleteDialogOpen(false);
  };

  const selectedDoseData = selectedDose
    ? VACCINE_DOSES.find((d) => d.id === selectedDose)
    : null;
  const selectedVaccine = selectedDoseData
    ? getVaccineById(selectedDoseData.vaccineId)
    : null;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Baby className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{activeBaby.name}</h1>
            <p className="text-sm text-muted-foreground">{ageDisplay}</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={() => setDeleteDialogOpen(true)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                {statistics.completed}
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">Đã tiêm</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {statistics.upcoming}
              </span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">Sắp tới</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-bold text-red-700 dark:text-red-300">
                {statistics.overdue}
              </span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400">Quá hạn</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <Syringe className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{statistics.completionRate}%</span>
            </div>
            <p className="text-sm text-muted-foreground">Hoàn thành</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Tiến độ tiêm chủng</span>
            <span className="text-sm text-muted-foreground">
              {statistics.completed}/{statistics.total} mũi
            </span>
          </div>
          <Progress value={statistics.completionRate} className="h-2" />
        </CardContent>
      </Card>

      {/* Overdue Alert */}
      {overdueVaccinations.length > 0 && (
        <Card className="mb-6 border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Cần tiêm ngay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueVaccinations.slice(0, 3).map((v) => (
                <div
                  key={v.dose.id}
                  className="flex items-center justify-between rounded-lg bg-white/50 dark:bg-black/20 p-3"
                >
                  <div>
                    <p className="font-medium">{v.vaccine?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Mũi {v.dose.doseNumber} • {formatRecommendedAge(v.dose)}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => handleOpenForm(v.dose.id)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Ghi nhận
                  </Button>
                </div>
              ))}
              {overdueVaccinations.length > 3 && (
                <p className="text-sm text-muted-foreground text-center pt-2">
                  và {overdueVaccinations.length - 3} mũi khác...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Vaccinations */}
      {upcomingVaccinations.length > 0 && (
        <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Calendar className="h-5 w-5" />
              Sắp đến lịch tiêm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingVaccinations.slice(0, 3).map((v) => (
                <div
                  key={v.dose.id}
                  className="flex items-center justify-between rounded-lg bg-white/50 dark:bg-black/20 p-3"
                >
                  <div>
                    <p className="font-medium">{v.vaccine?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Mũi {v.dose.doseNumber} • {formatRecommendedAge(v.dose)}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {formatRecommendedAge(v.dose)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Vaccinations by Age Stage */}
      <div className="mb-4">
        <h2 className="mb-4 text-lg font-semibold">Lịch tiêm chủng theo độ tuổi</h2>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AgeStage)}>
          <TabsList className="mb-4 w-full flex-wrap h-auto gap-1">
            <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
            <TabsTrigger value="newborn" className="text-xs">Sơ sinh</TabsTrigger>
            <TabsTrigger value="2-6" className="text-xs">2-6 tháng</TabsTrigger>
            <TabsTrigger value="6-12" className="text-xs">6-12 tháng</TabsTrigger>
            <TabsTrigger value="12-24" className="text-xs">12-24 tháng</TabsTrigger>
            <TabsTrigger value="24+" className="text-xs">2+ tuổi</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-3">
              {filteredVaccinations.map((v) => (
                <VaccinationCard
                  key={v.dose.id}
                  dose={v.dose}
                  vaccine={v.vaccine}
                  record={v.record}
                  status={v.status}
                  onMarkComplete={() => handleOpenForm(v.dose.id)}
                  onSkip={() => handleSkipVaccination(v.dose.vaccineId, v.dose.doseNumber)}
                />
              ))}
              {filteredVaccinations.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Syringe className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Không có vắc xin nào trong giai đoạn này
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ghi nhận tiêm chủng</DialogTitle>
            <DialogDescription>
              {selectedVaccine?.name} - Mũi {selectedDoseData?.doseNumber}
            </DialogDescription>
          </DialogHeader>
          <VaccinationForm
            vaccine={selectedVaccine}
            dose={selectedDoseData}
            onSave={handleSaveVaccination}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa tất cả dữ liệu?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xóa toàn bộ thông tin bé và lịch sử tiêm chủng.
              Bạn không thể hoàn tác sau khi xóa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa tất cả
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Lịch tiêm chủng dựa trên hướng dẫn của Bộ Y tế Việt Nam.
        Vui lòng tham khảo ý kiến bác sĩ cho trường hợp cụ thể của bé.
      </p>
    </div>
  );
}

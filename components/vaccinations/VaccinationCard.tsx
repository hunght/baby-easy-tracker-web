'use client';

import type { VaccineDose, VaccineInfo, VaccinationRecord, VaccinationStatus } from '@/data/vaccination-types';
import { formatRecommendedAge } from '@/data/vaccination-types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Plus,
  ChevronRight,
  Syringe,
} from 'lucide-react';

interface VaccinationCardProps {
  dose: VaccineDose;
  vaccine: VaccineInfo | undefined;
  record: VaccinationRecord | undefined;
  status: VaccinationStatus;
  onMarkComplete: () => void;
  onSkip?: () => void;
}

export function VaccinationCard({
  dose,
  vaccine,
  record,
  status,
  onMarkComplete,
  onSkip,
}: VaccinationCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-950/30',
          borderColor: 'border-l-green-500',
          badgeVariant: 'default' as const,
          badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          label: 'Đã tiêm',
        };
      case 'upcoming':
        return {
          icon: Clock,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-950/30',
          borderColor: 'border-l-blue-500',
          badgeVariant: 'secondary' as const,
          badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
          label: 'Sắp tới',
        };
      case 'overdue':
        return {
          icon: AlertTriangle,
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          borderColor: 'border-l-red-500',
          badgeVariant: 'destructive' as const,
          badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
          label: 'Quá hạn',
        };
      case 'skipped':
        return {
          icon: XCircle,
          color: 'text-gray-500 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-950/30',
          borderColor: 'border-l-gray-400',
          badgeVariant: 'outline' as const,
          badgeClass: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
          label: 'Bỏ qua',
        };
      default:
        return {
          icon: Clock,
          color: 'text-muted-foreground',
          bgColor: '',
          borderColor: 'border-l-muted',
          badgeVariant: 'outline' as const,
          badgeClass: '',
          label: 'Chưa tiêm',
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <Card
      className={cn(
        'border-l-4 transition-all hover:shadow-md',
        config.borderColor,
        config.bgColor
      )}
    >
      <CardContent className="py-4">
        <div className="flex items-start justify-between gap-3">
          {/* Left: Status Icon & Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                status === 'completed' && 'bg-green-100 dark:bg-green-900/50',
                status === 'upcoming' && 'bg-blue-100 dark:bg-blue-900/50',
                status === 'overdue' && 'bg-red-100 dark:bg-red-900/50',
                status === 'skipped' && 'bg-gray-100 dark:bg-gray-800'
              )}
            >
              <StatusIcon className={cn('h-5 w-5', config.color)} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold truncate">{vaccine?.name || 'Unknown'}</h3>
                <Badge variant={config.badgeVariant} className={cn('text-xs', config.badgeClass)}>
                  {config.label}
                </Badge>
              </div>

              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <span>Mũi {dose.doseNumber}/{dose.totalDoses}</span>
                <span>•</span>
                <span>{formatRecommendedAge(dose)}</span>
                {vaccine?.source === 'TCMR' && (
                  <>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">TCMR</Badge>
                  </>
                )}
              </div>

              {/* Completion Info */}
              {status === 'completed' && record?.completedDate && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  Đã tiêm ngày {format(new Date(record.completedDate), 'dd/MM/yyyy', { locale: vi })}
                  {record.location && ` tại ${record.location}`}
                </p>
              )}

              {/* Notes */}
              {dose.notes && status !== 'completed' && (
                <p className="mt-2 text-xs text-muted-foreground">{dose.notes}</p>
              )}

              {/* Diseases protected */}
              {vaccine?.diseases && vaccine.diseases.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {vaccine.diseases.slice(0, 3).map((disease) => (
                    <Badge key={disease} variant="outline" className="text-xs font-normal">
                      {disease}
                    </Badge>
                  ))}
                  {vaccine.diseases.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{vaccine.diseases.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-2 shrink-0">
            {(status === 'upcoming' || status === 'overdue') && (
              <Button size="sm" onClick={onMarkComplete}>
                <Plus className="mr-1 h-4 w-4" />
                Ghi nhận
              </Button>
            )}
            {status === 'completed' && (
              <Button variant="ghost" size="sm" onClick={onMarkComplete}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

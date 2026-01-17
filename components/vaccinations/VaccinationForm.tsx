'use client';

import { useState } from 'react';
import type { VaccineDose, VaccineInfo } from '@/data/vaccination-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, Save } from 'lucide-react';

interface VaccinationFormProps {
  vaccine: VaccineInfo | null | undefined;
  dose: VaccineDose | null | undefined;
  onSave: (data: {
    completedDate: number;
    location?: string;
    batchNumber?: string;
    provider?: string;
    notes?: string;
  }) => void;
  onCancel: () => void;
}

export function VaccinationForm({ vaccine, dose, onSave, onCancel }: VaccinationFormProps) {
  const [completedDate, setCompletedDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [provider, setProvider] = useState('');
  const [notes, setNotes] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      completedDate: completedDate.getTime(),
      location: location.trim() || undefined,
      batchNumber: batchNumber.trim() || undefined,
      provider: provider.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Vaccine Info */}
      {vaccine && dose && (
        <div className="rounded-lg bg-muted p-3">
          <p className="font-medium">{vaccine.name}</p>
          <p className="text-sm text-muted-foreground">
            Mũi {dose.doseNumber}/{dose.totalDoses}
            {vaccine.source === 'TCMR' && ' • Chương trình TCMR'}
          </p>
          {vaccine.description && (
            <p className="mt-1 text-xs text-muted-foreground">{vaccine.description}</p>
          )}
        </div>
      )}

      {/* Date */}
      <div className="space-y-2">
        <Label>Ngày tiêm *</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !completedDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {completedDate
                ? format(completedDate, 'dd/MM/yyyy', { locale: vi })
                : 'Chọn ngày tiêm'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={completedDate}
              onSelect={(date) => {
                if (date) {
                  setCompletedDate(date);
                  setCalendarOpen(false);
                }
              }}
              disabled={(date) => date > new Date()}
              initialFocus
              locale={vi}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Nơi tiêm</Label>
        <Input
          id="location"
          placeholder="VD: Bệnh viện Nhi Đồng 1"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Batch Number */}
      <div className="space-y-2">
        <Label htmlFor="batchNumber">Số lô vắc xin</Label>
        <Input
          id="batchNumber"
          placeholder="VD: ABC123456"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Có thể tìm trên sổ tiêm chủng của bé
        </p>
      </div>

      {/* Provider */}
      <div className="space-y-2">
        <Label htmlFor="provider">Bác sĩ/Y tá tiêm</Label>
        <Input
          id="provider"
          placeholder="Tên người tiêm"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Ghi chú</Label>
        <Textarea
          id="notes"
          placeholder="Phản ứng sau tiêm, lưu ý đặc biệt..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Hủy
        </Button>
        <Button type="submit" className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Lưu
        </Button>
      </div>
    </form>
  );
}

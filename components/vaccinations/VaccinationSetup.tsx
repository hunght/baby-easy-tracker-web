'use client';

import { useState } from 'react';
import { useVaccinationStorage } from '@/hooks/use-vaccination-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, Syringe, Baby, Heart } from 'lucide-react';

export function VaccinationSetup() {
  const { addBaby } = useVaccinationStorage();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<'male' | 'female' | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;

    addBaby({
      name: name.trim(),
      birthDate: birthDate.getTime(),
      gender,
    });
  };

  const isValid = name.trim() && birthDate;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Syringe className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Lịch Tiêm Chủng Việt Nam</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Theo dõi lịch tiêm chủng cho bé theo Chương trình Tiêm chủng Mở rộng (TCMR)
          và các vắc xin dịch vụ phổ biến tại Việt Nam.
        </p>
      </div>

      {/* Features */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Lịch theo độ tuổi</p>
              <p className="text-sm text-muted-foreground">Từ sơ sinh đến 6 tuổi</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20 bg-green-50 dark:bg-green-950/30">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <Syringe className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium">TCMR & Dịch vụ</p>
              <p className="text-sm text-muted-foreground">Đầy đủ các loại vắc xin</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-pink-500/20 bg-pink-50 dark:bg-pink-950/30">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/50">
              <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="font-medium">Nhắc lịch thông minh</p>
              <p className="text-sm text-muted-foreground">Không bỏ lỡ mũi tiêm nào</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Form */}
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5" />
            Thông tin bé
          </CardTitle>
          <CardDescription>
            Nhập thông tin để bắt đầu theo dõi lịch tiêm chủng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Baby Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Tên bé *</Label>
              <Input
                id="name"
                placeholder="Nhập tên bé"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label>Ngày sinh *</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !birthDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate
                      ? format(birthDate, 'dd/MM/yyyy', { locale: vi })
                      : 'Chọn ngày sinh'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={(date) => {
                      setBirthDate(date);
                      setCalendarOpen(false);
                    }}
                    disabled={(date) => date > new Date() || date < new Date('2015-01-01')}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Giới tính (tùy chọn)</Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as 'male' | 'female')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">
                    Con trai
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">
                    Con gái
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid}>
              Bắt đầu theo dõi
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-muted-foreground max-w-md mx-auto">
        Lịch tiêm chủng dựa trên hướng dẫn của Bộ Y tế Việt Nam.
        Vui lòng tham khảo ý kiến bác sĩ cho trường hợp cụ thể của bé.
      </p>
    </div>
  );
}

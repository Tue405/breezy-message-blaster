
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock recipient groups
const mockRecipientGroups = [
  { id: '1', name: 'Nhóm Marketing', count: 12 },
  { id: '2', name: 'Nhóm Kỹ thuật', count: 8 },
  { id: '3', name: 'Ban Quản lý', count: 5 },
];

export function ScheduleForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [recipientGroup, setRecipientGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !subject || !message || !recipientGroup) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng điền đầy đủ thông tin lên lịch thông báo',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedGroup = mockRecipientGroups.find(g => g.id === recipientGroup);
      toast({
        title: 'Đã lên lịch thông báo!',
        description: `Tin nhắn sẽ được gửi đến ${selectedGroup?.name || 'nhóm người nhận'} vào ${format(date, 'dd/MM/yyyy')} lúc ${time}`,
      });
      setIsLoading(false);
      setSubject('');
      setMessage('');
      setDate(undefined);
      setTime('');
      setRecipientGroup('');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Ngày gửi</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd/MM/yyyy') : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Thời gian</Label>
          <div className="flex w-full items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient">Người nhận</Label>
        <Select value={recipientGroup} onValueChange={setRecipientGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn nhóm người nhận" />
          </SelectTrigger>
          <SelectContent>
            {mockRecipientGroups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name} ({group.count} người)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Tiêu đề</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Tiêu đề tin nhắn"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nội dung tin nhắn</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
          className="min-h-32"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading || !date || !time || !recipientGroup || !subject || !message}
        >
          {isLoading ? 'Đang lên lịch...' : 'Lên lịch thông báo'}
        </Button>
      </div>
    </form>
  );
}

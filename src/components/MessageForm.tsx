
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock recipient data
const mockRecipients = [
  { id: '1', name: 'Nhóm Marketing', count: 12 },
  { id: '2', name: 'Nhóm Kỹ thuật', count: 8 },
  { id: '3', name: 'Ban Quản lý', count: 5 },
];

export function MessageForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipientGroup, setRecipientGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Tin nhắn đã được gửi!',
        description: `Tin nhắn đã được gửi đến ${
          mockRecipients.find(r => r.id === recipientGroup)?.name || 'nhóm người nhận'
        }`,
      });
      setIsLoading(false);
      setSubject('');
      setMessage('');
      setRecipientGroup('');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="recipient">Người nhận</Label>
        <Select value={recipientGroup} onValueChange={setRecipientGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn nhóm người nhận" />
          </SelectTrigger>
          <SelectContent>
            {mockRecipients.map((group) => (
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
        <Button type="submit" disabled={isLoading || !recipientGroup || !subject || !message}>
          {isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}
        </Button>
      </div>
    </form>
  );
}

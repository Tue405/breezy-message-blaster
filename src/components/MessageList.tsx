
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash, Eye } from 'lucide-react';
import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Message {
  id: string;
  subject: string;
  content: string;
  recipients: string;
  sentAt: Date;
  status: 'sent' | 'scheduled' | 'failed';
}

// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    subject: 'Cập nhật chính sách',
    content: 'Kính gửi quý khách, chúng tôi xin thông báo về việc cập nhật chính sách mới...',
    recipients: 'Nhóm Marketing',
    sentAt: new Date('2023-05-10T10:30:00'),
    status: 'sent',
  },
  {
    id: '2',
    subject: 'Thông báo bảo trì hệ thống',
    content: 'Hệ thống sẽ được bảo trì vào ngày 15/05/2023 từ 22:00 - 24:00...',
    recipients: 'Nhóm Kỹ thuật',
    sentAt: new Date('2023-05-12T14:15:00'),
    status: 'sent',
  },
  {
    id: '3',
    subject: 'Lịch họp tháng 5',
    content: 'Kính mời các thành viên tham dự cuộc họp vào ngày 20/05/2023 lúc 9:00...',
    recipients: 'Ban Quản lý',
    sentAt: new Date('2023-05-15T09:00:00'),
    status: 'scheduled',
  },
  {
    id: '4',
    subject: 'Cảnh báo bảo mật',
    content: 'Chúng tôi phát hiện một số hoạt động bất thường trên hệ thống...',
    recipients: 'Nhóm Kỹ thuật',
    sentAt: new Date('2023-05-09T18:45:00'),
    status: 'failed',
  },
];

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500">Đã gửi</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Đã lên lịch</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Lỗi</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Người nhận</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length > 0 ? (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.subject}</TableCell>
                  <TableCell>{message.recipients}</TableCell>
                  <TableCell>{format(message.sentAt, 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Không có tin nhắn nào trong lịch sử
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              Gửi đến: {selectedMessage?.recipients} | 
              {selectedMessage && format(selectedMessage.sentAt, ' dd/MM/yyyy HH:mm')}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="whitespace-pre-wrap">{selectedMessage?.content}</p>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

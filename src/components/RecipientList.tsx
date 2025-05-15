
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserPlus, Trash } from 'lucide-react';

interface Recipient {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string;
}

// Mock data
const mockRecipients: Recipient[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0901234567', group: 'Marketing' },
  { id: '2', name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0901234568', group: 'Kỹ thuật' },
  { id: '3', name: 'Lê Văn C', email: 'levanc@example.com', phone: '0901234569', group: 'Ban Quản lý' },
];

export function RecipientList() {
  const [recipients, setRecipients] = useState<Recipient[]>(mockRecipients);
  const [newRecipient, setNewRecipient] = useState<Partial<Recipient>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddRecipient = () => {
    if (!newRecipient.name || !newRecipient.email) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng điền đầy đủ thông tin người nhận',
        variant: 'destructive',
      });
      return;
    }

    const recipient: Recipient = {
      id: Date.now().toString(),
      name: newRecipient.name || '',
      email: newRecipient.email || '',
      phone: newRecipient.phone || '',
      group: newRecipient.group || 'Chưa phân loại',
    };

    setRecipients([...recipients, recipient]);
    setNewRecipient({});
    setIsDialogOpen(false);
    toast({
      title: 'Đã thêm người nhận',
      description: `${recipient.name} đã được thêm vào danh sách`,
    });
  };

  const handleDeleteRecipient = (id: string) => {
    setRecipients(recipients.filter(recipient => recipient.id !== id));
    toast({
      title: 'Đã xóa người nhận',
      description: 'Người nhận đã được xóa khỏi danh sách',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Danh sách người nhận</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người nhận
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Nhóm</TableHead>
              <TableHead className="w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipients.length > 0 ? (
              recipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell>{recipient.name}</TableCell>
                  <TableCell>{recipient.email}</TableCell>
                  <TableCell>{recipient.phone}</TableCell>
                  <TableCell>{recipient.group}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteRecipient(recipient.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Không có người nhận nào trong danh sách
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm người nhận mới</DialogTitle>
            <DialogDescription>
              Điền thông tin người nhận mà bạn muốn thêm vào danh sách.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                value={newRecipient.name || ''}
                onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newRecipient.email || ''}
                onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                placeholder="example@mail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={newRecipient.phone || ''}
                onChange={(e) => setNewRecipient({ ...newRecipient, phone: e.target.value })}
                placeholder="0901234567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group">Nhóm</Label>
              <Input
                id="group"
                value={newRecipient.group || ''}
                onChange={(e) => setNewRecipient({ ...newRecipient, group: e.target.value })}
                placeholder="Marketing"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleAddRecipient}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

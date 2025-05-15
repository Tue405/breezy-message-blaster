
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { ScheduleForm } from '@/components/ScheduleForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ScheduleNotifications = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Lên lịch thông báo</h1>
          <Card>
            <CardHeader>
              <CardTitle>Lên lịch gửi tin nhắn</CardTitle>
              <CardDescription>Đặt lịch gửi tin nhắn tự động vào ngày và giờ bạn chọn.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleForm />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ScheduleNotifications;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { MessageList } from '@/components/MessageList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MessageHistory = () => {
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
          <h1 className="text-2xl font-bold mb-6">Lịch sử tin nhắn</h1>
          <Card>
            <CardHeader>
              <CardTitle>Tin nhắn đã gửi</CardTitle>
              <CardDescription>Xem lại tất cả tin nhắn đã gửi và đã lên lịch.</CardDescription>
            </CardHeader>
            <CardContent>
              <MessageList />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default MessageHistory;

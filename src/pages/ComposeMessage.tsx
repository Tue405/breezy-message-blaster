
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { MessageForm } from '@/components/MessageForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ComposeMessage = () => {
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
          <h1 className="text-2xl font-bold mb-6">Soạn tin nhắn</h1>
          <Card>
            <CardHeader>
              <CardTitle>Soạn tin nhắn mới</CardTitle>
              <CardDescription>Tạo và gửi tin nhắn đến các nhóm người nhận của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
              <MessageForm />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ComposeMessage;

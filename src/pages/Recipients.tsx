
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { RecipientList } from '@/components/RecipientList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Recipients = () => {
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
          <h1 className="text-2xl font-bold mb-6">Quản lý danh sách người nhận</h1>
          <Card>
            <CardHeader>
              <CardTitle>Danh sách người nhận</CardTitle>
              <CardDescription>Quản lý danh sách người nhận tin nhắn của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecipientList />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Recipients;

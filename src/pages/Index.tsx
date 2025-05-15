
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { MessageSquare } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <div className="flex justify-center">
            <MessageSquare className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">MessageHub</h1>
          <p className="mt-2 text-gray-600">Đăng nhập để bắt đầu gửi tin nhắn</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;

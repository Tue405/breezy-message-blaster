
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Send, Users, Calendar, List } from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: 'Soạn tin nhắn',
    href: '/compose',
    icon: Send,
  },
  {
    title: 'Danh sách người nhận',
    href: '/recipients',
    icon: Users,
  },
  {
    title: 'Lên lịch thông báo',
    href: '/schedule',
    icon: Calendar,
  },
  {
    title: 'Lịch sử tin nhắn',
    href: '/history',
    icon: List,
  },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 py-4 px-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center py-2 px-4 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Bell, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * NotificationCenter Component
 * Muestra notificaciones en tiempo real de descargas, comparticiones y calificaciones
 */

interface Notification {
  id: number;
  type: "download" | "share" | "rating" | "comment";
  message: string;
  read: number;
  createdAt: Date;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Cargar notificaciones
  const { data: notificationsData } = trpc.notifications.list.useQuery(undefined, {
    refetchInterval: 5000, // Actualizar cada 5 segundos
  });

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData as Notification[]);
      const unread = notificationsData.filter((n: any) => !n.read).length;
      setUnreadCount(unread);
    }
  }, [notificationsData]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "download":
        return "📥";
      case "share":
        return "🔗";
      case "rating":
        return "⭐";
      case "comment":
        return "💬";
      default:
        return "📢";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "download":
        return "bg-blue-50 border-l-4 border-l-blue-500";
      case "share":
        return "bg-green-50 border-l-4 border-l-green-500";
      case "rating":
        return "bg-yellow-50 border-l-4 border-l-yellow-500";
      case "comment":
        return "bg-purple-50 border-l-4 border-l-purple-500";
      default:
        return "bg-gray-50 border-l-4 border-l-gray-500";
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Notificaciones"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Notificaciones</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No tienes notificaciones</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${getNotificationColor(notification.type)} hover:bg-opacity-75 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 break-words">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString("es-ES")}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 p-3 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Marcar todas como leídas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

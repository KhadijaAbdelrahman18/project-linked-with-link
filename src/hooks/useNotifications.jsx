import { useState, useEffect, useCallback } from "react";

// MOCK HOOK: Replace with your real API logic
export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markAllLoading, setMarkAllLoading] = useState(false);

  // Mock fetch
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setNotifications([
        {
          id: 1,
          userId,
          title: "Welcome to the platform!",
          link: "/dashboard",
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        },
        {
          id: 2,
          userId,
          title: "Your profile is 80% complete.",
          link: "/settings",
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
      ]);
    } catch (err) {
      setError("Failed to load notifications.");
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
    // Optionally add interval for auto-refresh
    return () => {};
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    setMarkAllLoading(true);
    setTimeout(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setMarkAllLoading(false);
    }, 1000);
  };

  return {
    notifications,
    loading,
    error,
    markAllLoading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
}
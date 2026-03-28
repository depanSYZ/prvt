"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, LogOut, UserPlus, LogIn, X } from "lucide-react";

export type ToastType = "login" | "logout" | "register" | "error" | "success";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const toastConfig = {
  login:    { icon: LogIn,        bg: "bg-green-500",  border: "border-green-400",  label: "Login Berhasil" },
  logout:   { icon: LogOut,       bg: "bg-blue-500",   border: "border-blue-400",   label: "Logout Berhasil" },
  register: { icon: UserPlus,     bg: "bg-violet-500", border: "border-violet-400", label: "Registrasi Berhasil" },
  error:    { icon: XCircle,      bg: "bg-red-500",    border: "border-red-400",    label: "Error" },
  success:  { icon: CheckCircle2, bg: "bg-green-500",  border: "border-green-400",  label: "Berhasil" },
};

export function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const cfg = toastConfig[type];
  const Icon = cfg.icon;

  useEffect(() => {
    // Animate in
    const t1 = setTimeout(() => setVisible(true), 10);
    // Start exit
    const t2 = setTimeout(() => { setExiting(true); setTimeout(onClose, 400); }, duration);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [duration, onClose]);

  return (
    <div
      className={`flex items-start gap-3 w-full max-w-sm bg-background border shadow-xl rounded-2xl p-4 transition-all duration-400 ${cfg.border} ${
        visible && !exiting
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      <div className={`${cfg.bg} rounded-xl p-2 flex-shrink-0`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{cfg.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{message}</p>
      </div>
      <button
        onClick={() => { setExiting(true); setTimeout(onClose, 400); }}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      >
        <X className="h-3 w-3" />
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl overflow-hidden">
        <div
          className={`h-full ${cfg.bg} opacity-40`}
          style={{ animation: `shrink ${duration}ms linear forwards` }}
        />
      </div>
      <style>{`
        @keyframes shrink { from { width: 100% } to { width: 0% } }
      `}</style>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm relative">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

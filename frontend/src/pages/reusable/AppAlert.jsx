// src/components/ui/AppAlert.jsx
import { useEffect, useState } from "react";

export default function AppAlert({ type = "success", message = "", visible, onClose }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  const styles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    info: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-8 py-2 rounded-md border text-sm font-semibold shadow-lg ${styles[type]}`}>
      {message}
    </div>
  );
}

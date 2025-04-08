import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import React from "react";
import { AlertType } from "../types";

interface AlertProps {
  type?: AlertType;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const icons = {
  success: <CheckCircle className="text-green-600" size={20} />,
  error: <XCircle className="text-red-600" size={20} />,
  warning: <AlertTriangle className="text-yellow-600" size={20} />,
  info: <Info className="text-blue-600" size={20} />,
};

const bgColors = {
  success: "bg-green-100 border-green-600",
  error: "bg-red-100 border-red-600",
  warning: "bg-yellow-100 border-yellow-600",
  info: "bg-blue-100 border-blue-600",
};
export default function Alert({
  type = "info",
  message,
  setMessage,
}: AlertProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-3 p-4 border-l-4 rounded-md shadow-sm ${bgColors[type]}`}
    >
      {icons[type]}
      <span className="text-sm text-gray-800">{message}</span>
      <button
        onClick={() => setMessage("")}
        className="ml-auto text-gray-500 hover:text-black"
      >
        ✕
      </button>
    </div>
  );
}

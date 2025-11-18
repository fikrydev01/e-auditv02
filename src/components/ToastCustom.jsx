import { toast } from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";

export const showSuccess = (message) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-green-50 border border-green-200 rounded-xl shadow-lg p-4 flex items-center gap-3`}
    >
      <CheckCircle2 className="w-5 h-5 text-green-500" />
      <span className="text-sm font-medium text-green-700">{message}</span>
    </div>
  ));
};

export const showError = (message) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-red-50 border border-red-200 rounded-xl shadow-lg p-4 flex items-center gap-3`}
    >
      <XCircle className="w-5 h-5 text-red-500" />
      <span className="text-sm font-medium text-red-700">{message}</span>
    </div>
  ));
};

import { motion } from "framer-motion";
import { ArrowLeftSquareIcon, ArrowBigLeftDashIcon, Check, ArrowLeftSquare } from "lucide-react";

// export const ButtonSpinner = ({ size = 20, color = "white" }) => {
//   return (
//     <motion.div
//       className="rounded-full border-2 border-t-transparent"
//       style={{
//         width: size,
//         height: size,
//         borderColor: color,
//       }}
//       animate={{ rotate: 360 }}
//       transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//     />
//   );
// }

export const ButtonSpinner = () => {
    return (
<button
  type="button"
  class="inline-flex w-fit items-center px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium shadow hover:bg-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
  disabled
>
  <svg
    class="mr-2 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
  Processing…
</button>

    );
}

export const ButtonSubmit = ({ animate, children = "Simpan", ...props }) => {
    if (animate === true) {
    return <ButtonSpinner />;
  }
  return (
    <button
      type="submit"
      className="inline-flex w-fit items-center gap-2 px-4 py-2 capitalize rounded-lg bg-emerald-500 text-white font-medium shadow hover:bg-emerald-600 transition-all duration-200"
      {...props}
    >
      <Check className="w-5 h-5" />
      {children}
    </button>
  );
}

export const Ladong = ({ loading, children, disabled, ...props }) => {
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={`relative flex items-center justify-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 ${props.className || ""} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
            {loading ? <ButtonSpinner size={20} color="white" /> : children}
        </button>
    );
}

export const ButtonKembali = ({ onClick, children = "Kembali", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg w-fit
        bg-yellow-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
        hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200
        ${className}
      `}
    >
      <ArrowLeftSquare className="w-5 h-5" />
      {children}
    </button>
  );
};

export const ActionButton = ({ onClick, icon: Icon, label, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    yellow: "bg-yellow-400 hover:bg-yellow-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-2 text-xs rounded-lg font-medium transition ${colors[color]}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
};

export const ButtonKembaliDashboard = () => {
  return (
          <a
        href="/u/d"
        className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium mb-6"
      >
        <ArrowBigLeftDashIcon size="18" />
        Kembali ke Dashboard
      </a>
  )
}

export const ButtonMod = ({onClick, title, mod, selected}) => {
  return (
    <button 
    onClick={onClick}
    className={`w-fit px-4 py-2 rounded-md ${mod == selected ? `bg-emerald-600` : `bg-orange-600`} text-white text-xs`}>
        {title}
    </button>
  )
}
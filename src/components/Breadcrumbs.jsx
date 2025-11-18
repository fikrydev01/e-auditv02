import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";

const Breadcrumbs = ({title}) => {
  const items = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Dashboard", href: "/u/d" },
    { label: title }, // terakhir tidak ada href
  ];

  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              {item.label}
            </span>
          )}
          {idx < items.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

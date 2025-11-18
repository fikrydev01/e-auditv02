import { TrendingUp, Users, UserPlus, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Today's Money", value: "$53,000", change: "+55%", icon: DollarSign, color: "bg-pink-200 text-pink-700" },
    { title: "Today's Users", value: "2,300", change: "+3%", icon: Users, color: "bg-blue-200 text-blue-700" },
    { title: "New Clients", value: "+3,462", change: "-2%", icon: UserPlus, color: "bg-purple-200 text-purple-700" },
    { title: "Sales", value: "$103,430", change: "+5%", icon: TrendingUp, color: "bg-green-200 text-green-700" },
  ];

  const projects = [
    { name: "Soft UI XD Version", budget: "$14,000", completion: 60 },
    { name: "Add Progress Track", budget: "$3,000", completion: 10 },
    { name: "Fix Platform Errors", budget: "Not set", completion: 100 },
    { name: "Launch Mobile App", budget: "$20,500", completion: 100 },
    { name: "New Pricing Page", budget: "$500", completion: 25 },
    { name: "Redesign Online Shop", budget: "$2,000", completion: 40 },
  ];

  const orders = [
    { title: "$2400, Design changes", date: "22 DEC 7:20 PM" },
    { title: "New order #1832412", date: "21 DEC 11 PM" },
    { title: "Server payments for April", date: "21 DEC 9:34 PM" },
    { title: "New card added #4395133", date: "20 DEC 2:20 AM" },
    { title: "Unlock packages for dev", date: "18 DEC 4:54 AM" },
    { title: "New order #9583120", date: "17 DEC" },
  ];

  return (
    <div className="space-y-6 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{s.title}</span>
              <div className={`p-2 rounded-full ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xl font-bold">{s.value}</p>
              <p className={`text-sm ${s.change.includes("-") ? "text-red-500" : "text-green-600"}`}>
                {s.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects & Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Company</th>
                <th className="pb-2">Budget</th>
                <th className="pb-2">Completion</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.budget}</td>
                  <td className="py-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-300 h-2 rounded-full"
                        style={{ width: `${p.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{p.completion}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orders */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <ul className="space-y-2 text-sm">
            {orders.map((o, i) => (
              <li key={i} className="border-b pb-2">
                <p className="font-medium text-gray-800">{o.title}</p>
                <p className="text-gray-500">{o.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

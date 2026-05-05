import React from "react";

const stats = [
  { label: "Total Forms", value: 24 },
  { label: "Responses Collected", value: 1284 },
  { label: "Active Forms", value: 12 },
  { label: "Team Members", value: 8 },
];

const recentForms = [
  { id: 1, name: "Hiring Form", responses: 120, status: "Active" },
  { id: 2, name: "Feedback Survey", responses: 340, status: "Active" },
  { id: 3, name: "Employee Onboarding", responses: 89, status: "Draft" },
];

const recentResponses = [
  { id: 1, user: "Niroj Shah", form: "Hiring Form", date: "Today" },
  { id: 2, user: "Amit Kumar", form: "Feedback Survey", date: "Yesterday" },
  { id: 3, user: "Priya Singh", form: "Hiring Form", date: "2 days ago" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f3] p-6 font-sans">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0E0F0C]">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, here's what's happening.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-black/10 rounded-xl p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <h2 className="text-xl font-semibold mt-2">{s.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMS */}
        <div className="lg:col-span-2 bg-white border border-black/10 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Your Forms</h2>
            <button className="text-sm text-[#3a7a1a]">View all</button>
          </div>

          <div className="space-y-3">
            {recentForms.map((f) => (
              <div
                key={f.id}
                className="flex justify-between items-center border border-black/10 rounded-lg px-4 py-3 hover:bg-black/5 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-gray-500">{f.responses} responses</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    f.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RESPONSES */}
        <div className="bg-white border border-black/10 rounded-xl p-5">
          <h2 className="text-lg font-medium mb-4">Recent Responses</h2>

          <div className="space-y-4">
            {recentResponses.map((r) => (
              <div key={r.id} className="flex flex-col">
                <span className="text-sm font-medium">{r.user}</span>
                <span className="text-xs text-gray-500">
                  {r.form} • {r.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-8 bg-white border border-black/10 rounded-xl p-5">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-[#9FE870] text-black rounded-lg text-sm font-medium">
            + Create Form
          </button>
          <button className="px-4 py-2 border border-black/10 rounded-lg text-sm">
            View Responses
          </button>
          <button className="px-4 py-2 border border-black/10 rounded-lg text-sm">
            Manage Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

import React from "react";
const payments = [
  {
    id: "TXN001",
    name: "Harsh Patil",
    action: "Payment Successful",
    date: "2026-01-12"
  },
  {
    id: "TXN002",
    name: "Aarav Sharma",
    action: "Payment Failed",
    date: "2026-01-13"
  },
  {
    id: "TXN003",
    name: "Sneha Kulkarni",
    action: "Refund Issued",
    date: "2026-01-14"
  },
  {
    id: "TXN004",
    name: "Rohit Mehta",
    action: "Payment Successful",
    date: "2026-01-15"
  }
];

export default function HistoryComponent() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Payment History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4">
                    {payment.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.action === "Payment Successful"
                          ? "bg-green-100 text-green-700"
                          : payment.action === "Payment Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {payment.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

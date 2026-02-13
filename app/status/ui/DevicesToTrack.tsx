
"use client";

import { cn } from "@/lib/utils";

import { useMemo, useState } from "react";
import { Search, Laptop } from "lucide-react";
import { Device } from "./ClientDashboard";

export default function DevicesToTrack({ data }: { data: Device[] }) {

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return data?.filter((d) =>
      d.deviceName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            الأجهزة المسلمة للصيانة
          </h3>

          <p className="text-sm text-gray-500">
            متابعة حالة الأجهزة الحالية والسابقة
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

          <input
            placeholder="ابحث باسم الجهاز..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm text-center">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-3">الإدارة</th>
              <th className="py-3 px-3">تاريخ الاستلام</th>
              <th className="py-3 px-3">اسم الجهاز</th>
              <th className="py-3 px-3">الحالة</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-gray-400">
         لا توجد أجهزة متاحة او تم التسليم
                </td>
              </tr>
            )}

            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3">{item.administrationName ?? "—"}</td>

                <td className="py-3">
                  {new Date(item.createdAt).toLocaleDateString("ar-EG")}
                </td>

                <td className="py-3 flex items-center justify-center gap-2">
                  <Laptop className="w-4 h-4 text-gray-500" />
                  {item.deviceName ?? "—"}
                </td>

                <td
                  className={cn(
                    "py-3 font-medium",
                    item.status === "UNDER_MAINTENANCE"
                      ? "text-amber-600"
                      : "text-green-600"
                  )}
                >
                  {item.status === "UNDER_MAINTENANCE"
                    ? "قيد الصيانة"
                    : "تم الإصلاح"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 text-sm text-gray-500 flex justify-between">
        <span>إجمالي الأجهزة: {data?.length ?? 0}</span>
        <span>عدد النتائج: {filtered.length}</span>
      </div>
    </div>
  );
}

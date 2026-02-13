"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  CheckCircle2,
  Search,
  PlusCircle,
  Laptop,
} from "lucide-react";
import Link from "next/link";

const dummyDevices = [
  {
    id: 1,
    name: "Dell Latitude 5420",
    status: "جاري الإصلاح",
    date: "12 يناير 2026",
  },
  {
    id: 2,
    name: "HP ProBook 450",
    status: "تم الإصلاح",
    date: "28 ديسمبر 2025",
  },
  {
    id: 3,
    name: "Lenovo ThinkPad T14",
    status: "قيد الفحص",
    date: "5 فبراير 2026",
  },
];

export default function Home() {
  const [devices] = useState(dummyDevices);
  const [search, setSearch] = useState("");

  const filtered = devices.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-screen">
    <div className="min-h-screen mx-auto w-full ">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          منصة متابعة وصيانة الأجهزة
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          يمكنك الإبلاغ عن الأعطال بسرعة ومتابعة حالة أجهزتك أثناء الصيانة
          ومعرفة الأجهزة التي تم تسليمها مسبقاً.
        </motion.p>

        {/* Report Issue Button */}
       <Link href={"/report"}>
        <motion.button
         
          whileHover={{ scale: 1.05 }}
          className="mt-8 flex items-center gap-2 mx-auto bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          الإبلاغ عن مشكلة جديدة
        </motion.button></Link>
           <Link href={"/status"}>
        <motion.button
         
          whileHover={{ scale: 1.05 }}
          className="mt-8 flex items-center gap-2 mx-auto bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
           متابعة حالة جهاز تحت الصيانة  
        </motion.button></Link>
      </div>

      {/* Devices Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

         

          {/* Search */}
          {/* <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

            <input
              placeholder="ابحث باسم الجهاز..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div> */}
        </div>

        {/* Devices Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
            >
              {/* Device Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                  <Laptop />
                </div>

                <StatusBadge status={device.status} />
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">
                {device.name}
              </h3>

              <p className="text-sm text-gray-500">
                تاريخ التسليم: {device.date}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            لا توجد أجهزة مطابقة للبحث
          </div>
        )}
      </div>
    </div>
    </div>

  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "تم الإصلاح")
    return (
      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
        <CheckCircle2 className="w-4 h-4" />
        {status}
      </span>
    );

  if (status === "جاري الإصلاح")
    return (
      <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
        <Wrench className="w-4 h-4" />
        {status}
      </span>
    );

  return (
    <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">
      <Clock className="w-4 h-4" />
      {status}
    </span>
  );
}

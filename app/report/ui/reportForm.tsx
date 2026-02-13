"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"

import {
  Building2,
  User,
  Landmark,
  Wrench,
  Cpu,
  Phone,
  PhoneCall,
  Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { startTransition } from "react"
import { createReport } from "@/app/actions/report.action"

export const formSchema = z.object({
  office: z.string().min(2, "اسم المكتب مطلوب"),
  reporterName: z.string().min(2, "اسم المُبلِّغ مطلوب"),
  administration: z.string().min(2, "اسم الإدارة مطلوب"),
  technicalIssue: z.string().min(5, "يرجى وصف العطل الفني"),
  mobilePhone: z.string().optional(),
  landlinePhone: z.string().optional(),
})

export function TechnicalIssueForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      office: "",
      reporterName: "",
      administration: "",
      technicalIssue: "",
      // macAddress: "",
      mobilePhone: "",
      landlinePhone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    

    startTransition(async() => {
       const result = await createReport(values)
        if (result.success) {
          form.reset()
          alert("تم إرسال البلاغ بنجاح!")
        } else {
          alert("حدث خطأ أثناء إرسال البلاغ. يرجى المحاولة مرة أخرى.")
        }
      console.log("Form Submitted", values)
    })
  }

  const fieldAnimation = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-10 text-center"
      >
        <h1 className="text-3xl font-extrabold text-slate-800">
          بلاغ عطل فني
        </h1>
        <p className="mt-2 text-slate-600">
          يرجى تعبئة النموذج بدقة ليتم التعامل مع العطل في أسرع وقت
        </p>
      </motion.div>

      {/* Form Card */}
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
          className="max-w-3xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-8 space-y-6"
          dir="rtl"
        >
          {/* المكتب */}
          <motion.div variants={fieldAnimation}>
            <FormField
              control={form.control}
              name="office"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    المكتب
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="اسم المكتب"
                      className="focus-visible:ring-emerald-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* اسم المبلغ */}
          <motion.div variants={fieldAnimation}>
            <FormField
              control={form.control}
              name="reporterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    اسم المُبلِّغ
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="اسم مقدم البلاغ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* الإدارة */}
          <motion.div variants={fieldAnimation}>
            <FormField
              control={form.control}
              name="administration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-emerald-600" />
                    اسم الإدارة
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="اسم الإدارة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* العطل */}
          <motion.div variants={fieldAnimation}>
            <FormField
              control={form.control}
              name="technicalIssue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-emerald-600" />
                    العطل الفني
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="وصف العطل الفني" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
{/* 
          MAC
          <motion.div variants={fieldAnimation}>
            <FormField
              control={form.control}
              name="macAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-600" />
                    MAC Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="AA:BB:CC:DD:EE:FF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div> */}

          {/* Phones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={fieldAnimation}>
              <FormField
                control={form.control}
                name="mobilePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      رقم الهاتف
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="رقم الهاتف المحمول" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={fieldAnimation}>
              <FormField
                control={form.control}
                name="landlinePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-slate-500" />
                      الرقم الأرضي
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="الرقم الأرضي" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          {/* Submit */}
          <motion.div variants={fieldAnimation}>
            <Button
              type="submit"
              className="w-full h-12 text-lg gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
              إرسال البلاغ
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </div>
  )
}

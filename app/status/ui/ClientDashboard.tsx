
"use client";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { TestLogo } from "@/components/user/TestLogo";
// import { UserAvatarMenu } from "@/components/user/userAvatarMenu";
import { zodResolver } from "@hookform/resolvers/zod";
import { Device } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { PackageSearch } from "lucide-react";
import DevicesToTrack from "./DevicesToTrack";

/* ---------------- Schema ---------------- */
const formSchema = z.object({
  DeliveryNumber: z
    .string()
    .length(11, "رقم التسليم يجب أن يكون 11 رقم")
    .regex(/^\d+$/, "يجب إدخال أرقام فقط"),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  trackingData: Device[];
}

export default function ClientDashboard({ trackingData }: Props) {
  
  const [confirmed, setConfirmed] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { DeliveryNumber: "" },
  });

  const onSubmit = (values: FormValues) => {
 
      setConfirmed(true);
      router.push(`/status?DeliveryNumber=${values.DeliveryNumber}`);
      toast.success("تم التحقق من رقم التسليم بنجاح");
 
  };

  return (
    <div className="relative min-h-screen  ">

      {/* Header */}
      <header className="max-w-7xl mx-auto ">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center items-center">
          <div className="flex items-center justify-center gap-2 text-gray-700 font-semibold">
            <PackageSearch className="w-5 h-5" />
            <span>لوحة متابعة الأجهزة</span>
          </div>

          {/* <UserAvatarMenu
            user={{
              userImage: user?.userImage,
              fullName: user?.fullName,
              profileName: user?.profileName,
              email: user?.email,
              role: user?.role,
            }}
            onLogout={() => startTransition(() => logoutAction())}
          /> */}
        </div>
      </header>

      {/* Background Logo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* <TestLogo src="/future.png" size="lg" /> */}
      </div>

      {/* Content */}
      <main className="pt-24 px-4">

        {/* ----------- Form ----------- */}
        {!confirmed && (
          <div className="max-w-xl mx-auto bg-white border rounded-2xl shadow-sm p-8">

            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                تتبع جهازك
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                أدخل رقم التسليم لمتابعة حالة جهازك أثناء الصيانة
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="DeliveryNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        رقم التسليم
                      </FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="أدخل رقم مكون من 11 رقم"
                          className="h-11"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {pending ? "جاري التحقق..." : "تأكيد"}
                </Button>
              </form>
            </Form>

          </div>
        )}

        {/* ----------- Devices ----------- */}
        {confirmed && (
          <Suspense
            fallback={
              <div className="text-center py-20 text-gray-400">
                جاري تحميل البيانات...
              </div>
            }
          >
            <div className="max-w-7xl mx-auto mt-6 bg-white border rounded-2xl shadow-sm p-6">
              <DevicesToTrack data={trackingData} />
            </div>
          </Suspense>
        )}

      </main>
    </div>
  );
}


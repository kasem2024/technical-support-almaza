'use server'
import {prisma} from "@/lib/prisma";
import { formSchema } from "../report/ui/reportForm";
import z from "zod";
export async function createReport(
  data: z.infer<typeof formSchema>
) {

  try {
   
    const report = await prisma.report.create({
      data: {
        reportName: data.reporterName,
        office: data.office,
        administration: data.administration,
        technicalIssues: data.technicalIssue,
        mobilePhones: String(data.mobilePhone),
        landlinePhone: String(data.landlinePhone ?? ""),


        status: "PENDING",
        technicianId: null,
        technicianName: null,
      },
    });

    return {
      success: true,
      data: report,
    };
  } catch (error) {
    console.error("Create Report Error:", error);

    return {
      success: false,
      error: "Failed to create report",
    };
  }
}

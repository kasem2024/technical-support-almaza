import prisma from "./prisma";

export async function getTrackingData(
  number: string
) {
  if(!number)
   return []
  return prisma.device.findMany({
    where: {
      deliveryNumber:number ,
      status: {
        in: ["MAINTAINED", "UNDER_MAINTENANCE"],
      },
      
    },
    select: {
      id: true,
      administrationName: true,
      createdAt: true,
      deviceName: true,
      status: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
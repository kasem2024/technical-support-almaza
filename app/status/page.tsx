
import ClientDashboard from "./ui/ClientDashboard";
import { getTrackingData } from "@/lib/deviceStatus";

const page = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {


  const params = await searchParams
  const trackingData =  await getTrackingData(params.DeliveryNumber)
  console.log(trackingData)
  return (
    <div className="w-screen">
      <ClientDashboard trackingData={trackingData || []} />
    </div>
  )
}

export default page
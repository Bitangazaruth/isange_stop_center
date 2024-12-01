import CropMgtTable from "@/components/shared/EmergencyMgtTable";


const EmergencyMgt = () => {
  return (
    <div className="bg-[#F6FAF7]  flex gap-5 overflow-hidden h-screen">
      <div className="w-[100%]  overflow-y-auto h-full">
        <div className="">
          <CropMgtTable />
        </div>
      </div>
    </div>
  );
};

export default EmergencyMgt;

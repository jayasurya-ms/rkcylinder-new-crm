import { Factory, Scale, CalendarDays } from "lucide-react";

const CylinderDetails = ({ data, branchId }) => {
  if (!data) return null;

  const row1 = [
    { label: "Vendor", value: data.vendor_name, icon: Factory },
    { label: "Weight", value: data.cylinder_sub_weight || data.weight, icon: Scale },
    { label: "Date", value: data.cylinder_date ? new Date(data.cylinder_date).toLocaleDateString("en-GB").replace(/\//g, "-") : (data.registration_date || "N/A"), icon: CalendarDays },
  ];

  const row2 = [
    { label: "RK serial NO", value: data.cylinder_sub_barcode || data.barcode },
    { label: "Batch No", value: data.cylinder_sub_batch_no || data.batch_no },
  ];

  const row3 = [
    { label: "Cylinder No", value: data.cylinder_sub_company_no || "N/A" },
    { label: "Month/Year", value: (data.cylinder_sub_manufacturer_month && data.cylinder_sub_manufacturer_year) ? `${data.cylinder_sub_manufacturer_month}/${data.cylinder_sub_manufacturer_year}` : (data.month && data.year ? `${data.month}/${data.year}` : "N/A") },
  ];

  const row4 = [
    { label: "Manufacturer", value: data.manufacturer_name },
    { label: "RK Batch No", value: data.cylinder_batch_nos || data.internal_batch_no || data.batch_no },
  ];

  const GridItem = ({ label, value, icon: Icon, isFirstRow }) => (
    <div className={`flex items-center gap-4 p-5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors h-full w-full`}>
      {Icon && (
        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
          <Icon className="h-5 w-5 text-blue-700 font-bold" />
        </div>
      )}
      <div className="flex items-center gap-3 flex-1 flex-wrap min-w-0">
        <span className="text-lg text-gray-900 font-black">
          {label} :
        </span>
        <span className="text-lg font-black text-gray-900 truncate uppercase">
          {value || "N/A"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Row 1: 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full border-b border-gray-200">
        {row1.map((item, idx) => (
          <GridItem key={idx} {...item} isFirstRow={true} />
        ))}
      </div>

      {/* Remaining Rows: 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full border-b border-gray-200 last:border-b-0">
        {row2.map((item, idx) => (
          <GridItem key={idx} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full border-b border-gray-200 last:border-b-0">
        {row3.map((item, idx) => (
          <GridItem key={idx} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full last:border-b-0">
        {row4.map((item, idx) => (
          <GridItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CylinderDetails;

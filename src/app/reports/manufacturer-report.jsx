import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { Button } from "@/components/ui/button";
import { REPORT_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/use-mutation";
import { FileDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

const ManufacturerReport = () => {
  const [data, setData] = useState([]);
  const { trigger: fetchReport, loading } = useApiMutation();
  const reportRef = useRef(null);

  useEffect(() => {
    handleFilter();
  }, []);

  const handleFilter = async () => {
    try {
      const res = await fetchReport({
        url: REPORT_API.manufacturer,
        method: "post",
        data: {},
      });

      console.log("Manufacturer API Response:", res);
      if (res?.manufacturer) {
        setData(res.manufacturer);
      } else {
        setData([]);
        toast.info("No data found.");
      }
    } catch (err) {
      toast.error("Failed to fetch report data.");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "manufacturer-report",
  });

  const columns = [
    { header: "Name", accessorKey: "manufacturer_name" },
    { header: "Address", accessorKey: "manufacturer_address" },
    { header: "State", accessorKey: "manufacturer_state" },
    { header: "Mobile", accessorKey: "manufacturer_mobile" },
    { header: "Email", accessorKey: "manufacturer_email" },
    { header: "Status", accessorKey: "manufacturer_status" },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manufacturer Report</h2>
        <Button onClick={handlePrint} disabled={data.length === 0} variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          PDF
        </Button>
      </div>

      {loading && <LoadingBar />}

      <div ref={reportRef} className="bg-white rounded-lg p-2 overflow-hidden text-black">
        <h2 className="hidden print:block text-2xl font-bold text-center mb-4">Manufacturer Report</h2>
        <DataTable
          data={data}
          columns={columns}
          loading={loading}
          pageSize={20}
          hideSearch={true}
          hideColumn={true}
        />
      </div>
    </div>
  );
};

export default ManufacturerReport;

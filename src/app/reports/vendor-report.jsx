import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { Button } from "@/components/ui/button";
import { REPORT_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/use-mutation";
import { FileDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

const VendorReport = () => {
  const [data, setData] = useState([]);
  const { trigger: fetchReport, loading } = useApiMutation();
  const reportRef = useRef(null);

  useEffect(() => {
    handleFilter();
  }, []);

  const handleFilter = async () => {
    try {
      const res = await fetchReport({
        url: REPORT_API.vendor,
        method: "post",
        data: {},
      });

      console.log("Vendor API Response:", res);
      if (res?.vendor) {
        setData(res.vendor);
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
    documentTitle: "vendor-report",
  });

  const columns = [
    { header: "Name", accessorKey: "vendor_name" },
    { header: "Address", accessorKey: "vendor_address" },
    { header: "State", accessorKey: "vendor_state" },
    { header: "Mobile", accessorKey: "vendor_mobile" },
    { header: "Email", accessorKey: "vendor_email" },
    { header: "Status", accessorKey: "vendor_status" },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vendor Report</h2>
        <Button onClick={handlePrint} disabled={data.length === 0} variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          PDF
        </Button>
      </div>

      {loading && <LoadingBar />}

      <div ref={reportRef} className="bg-white rounded-lg p-2 overflow-hidden text-black">
        <h2 className="hidden print:block text-2xl font-bold text-center mb-4">Vendor Report</h2>
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

export default VendorReport;

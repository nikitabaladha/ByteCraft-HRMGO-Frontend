import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import putAPI from "../../../../api/putAPI";
import getAPI from "../../../../api/getAPI";

const Modal = ({ employee, grandTotal}) => {
  const [salaryType, setSalaryType] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalaryData = async () => {
      if (employee?.id) {
        try {
          const response = await getAPI(`/getemployeedatabyid/${employee.id}`, {}, true);
          const salaryData = response.data?.data?.salary;

          if (salaryData) {
            setSalaryType(salaryData.salaryType || "");
            setSalary(salaryData.salary || "");
          }
        } catch (error) {
          console.error("Error fetching employee salary data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSalaryData();
  }, [employee?.id]);

  useEffect(() => {
    const updateGrandTotal = async () => {
      try {
        const policyData = {
          employeeId: employee.id,
          salaryType,
          salary,
          grandTotal,
        };

        console.log("Sending API request with policyData:", policyData);

        const response = await putAPI("/updatenetsalary", policyData, true);

        if (!response.hasError) {
          toast.success("Net Salary Change Successful");
        } else {
          toast.error("Failed to update Net Salary.");
        }
      } catch (error) {
        console.error("An error occurred while updating the Net Salary:", error);
        toast.error("An error occurred while updating the Net Salary.");
      }
    };

    if (!loading && employee?.id && salaryType && salary && grandTotal) {
      updateGrandTotal();
    }
  }, [salaryType, salary, grandTotal, employee?.id, loading]);
};

export default Modal;

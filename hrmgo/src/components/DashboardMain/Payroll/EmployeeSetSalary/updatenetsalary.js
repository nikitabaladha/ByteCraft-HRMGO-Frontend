import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import putAPI from "../../../../api/putAPI";
import getAPI from "../../../../api/getAPI";

const Modal = ({ employee, grandTotal }) => {
  const [salaryType, setSalaryType] = useState("");
  const [salary, setSalary] = useState("");
  const hasUpdated = useRef(false); // Ref to track update status

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
        }
      }
    };

    fetchSalaryData();
  }, [employee?.id]);

  useEffect(() => {
    if (grandTotal && salary && salaryType && employee?.id && !hasUpdated.current) {
      const updateGrandTotal = async () => {
        try {
          const policyData = {
            employeeId: employee.id,
            salaryType,
            salary,
            grandTotal,
          };

          const response = await putAPI("/updatenetsalary", policyData, true);

          if (!response.hasError) {
            toast.success("Net Salary Change Successful");
            hasUpdated.current = true; // Mark update as completed
          } else {
            toast.error("Failed to update Net Salary.");
          }
        } catch (error) {
          console.error("An error occurred while updating the Net Salary:", error);
          toast.error("An error occurred while updating the Net Salary.");
        }
      };

      updateGrandTotal();
    }
  }, [grandTotal, salary, salaryType, employee?.id]);

  return (
    <div className="modal">
    </div>
  );
};

export default Modal;

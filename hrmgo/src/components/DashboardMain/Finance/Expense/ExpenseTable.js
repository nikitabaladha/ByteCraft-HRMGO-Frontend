import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditExpenseModal from "./EditExpenseModal";  
import getAPI from "../../../../api/getAPI"; 
import ConfirmationDialog from "./ConfirmationDialog";

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openDeleteDialog = (expenseId) => {
    setExpenseToDelete(expenseId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  const handleDeleteSuccess = (deletedExpenseId) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== deletedExpenseId)
    );
    closeDeleteDialog();
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
  };

  useEffect(() => {
  
    const fetchExpenses = async () => {
      try {
        const response = await getAPI("/getall_expense", {}, true); 
        setExpenses(response.data.data); 
        setLoading(false); 
      } catch (err) {
        setError("Failed to fetch expenses"); 
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="dash-content">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                  <div className="dataTable-top">
                    <div className="dataTable-dropdown">
                      <label>
                        <select className="dataTable-selector">
                          <option value="5">5</option>
                          <option value="10" selected>10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </select>{" "}
                        entries per page
                      </label>
                    </div>
                    <div className="dataTable-search">
                      <input className="dataTable-input" placeholder="Search..." type="text" />
                    </div>
                  </div>
                  <div className="dataTable-container">
                    <table className="table dataTable-table" id="pc-dt-simple">
                      <thead>
                        <tr>
                          <th>Account</th>
                          <th>Payee</th>
                          <th>Amount</th>
                          <th>Category</th>
                          <th>Ref#</th>
                          <th>Payment</th>
                          <th>Date</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense) => (
                          <tr key={expense._id}>
                            <td>{expense.account_name}</td>
                            <td>{expense.payee_name}</td> 
                            <td>{`₹${new Intl.NumberFormat('en-IN').format(expense.amount)}`}</td>
                            <td>{expense.category}</td>
                            <td>{expense.ref}</td>
                            <td>{expense.payment_type}</td>
                            <td>{new Date(expense.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-info me-2">
                                    <button
                                      onClick={() => handleEdit(expense)} 
                                      className="mx-3 btn btn-sm align-items-center"
                                    >
                                      <span className="text-white">
                                        <HiOutlinePencil />
                                      </span>
                                    </button>
                                  </div>

                                  <div className="action-btn bg-danger">
                                    <button
                                      onClick={() => openDeleteDialog(expense._id)}
                                      type="submit"
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                    >
                                      <span className="text-white">
                                        <RiDeleteBinLine />
                                      </span>
                                    </button>
                                  </div>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">Showing 1 to 5 of 5 entries</div>
                    <nav className="dataTable-pagination">
                      <ul className="dataTable-pagination-list"></ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditExpenseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedExpense={selectedExpense}  
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          expenseId={expenseToDelete}  
          deleteType="expense"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default ExpenseTable;

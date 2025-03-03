import { useState, useEffect } from "react";

export default function Payments() {
    const [PaymentsPerPage, setPaymentsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [payments, setPayments] = useState([]);
    const totalPages = Math.ceil(payments.length / PaymentsPerPage);

    const startIndex = (currentPage - 1) * PaymentsPerPage;
    const visiblePayments = payments.slice(startIndex, startIndex + PaymentsPerPage);
    
    useEffect(() => {
        async function GetPayments() {
            const resp = await fetch("/api/payments");
            const data = await resp.json();
            setPayments(data)
        }
        GetPayments();
    }, [])


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Payments</h1>
            <div>
                <span style={{margin: "0px 10px", fontWeight: "600"}}>Payments per page:</span> 
                <select name="" id="" value={PaymentsPerPage} onChange={(value) => {setPaymentsPerPage(value.target.value)}}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
            </div>
            <div>
                <div>
                    <table width={"100%"}  style={{textAlign: "center"}} className="admin-clients-table">
                        <thead >
                            <tr>
                                <th>ID</th>
                                <th>Transaction ID</th>
                                <th>Amount ($)</th>
                                <th>Payment Date</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visiblePayments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.transaction_id}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.payment_date.toLocaleDateString()}</td>
                                    <td>{payment.payment_method}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0px", fontWeight: "600", gap: "10px"}}>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    >
                    Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
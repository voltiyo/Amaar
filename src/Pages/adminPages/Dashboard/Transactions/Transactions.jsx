import { useState,useEffect } from "react";


export default function Transactions() {
    const [TransactionsPerPage, setTransactionsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactions, setTransactions] = useState([])
    const totalPages = Math.ceil(transactions.length / TransactionsPerPage);

    const startIndex = (currentPage - 1) * TransactionsPerPage;
    const visibleTransactions = transactions.slice(startIndex, startIndex + TransactionsPerPage);

    
    useEffect(() => {
        async function GetTrans() {
            const resp = await fetch("/api/transactions");
            const data = await resp.json();
            setTransactions(data)
        }
        GetTrans();
    }, [])


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Transactions</h1>
            <div>
                <span style={{margin: "0px 10px", fontWeight: "600"}}>Transactions per page:</span> 
                <select name="" id="" value={TransactionsPerPage} onChange={(value) => {setTransactionsPerPage(value.target.value)}}>
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
                                <th>Property ID</th>
                                <th>Client ID</th>
                                <th>Agent ID</th>
                                <th>Transaction Type</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleTransactions.map((Transaction) => (
                                <tr key={Transaction.id}>
                                    <td>{Transaction.id}</td>
                                    <td>{Transaction.property_id}</td>
                                    <td>{Transaction.client_id}</td>
                                    <td>{Transaction.agent_id || "-"}</td>
                                    <td>{Transaction.transaction_type}</td>
                                    <td>{Transaction.amount}</td>
                                    <td>{Transaction.payment_status}</td>
                                    <td>{Transaction.transaction_date.toLocaleDateString()}</td>
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
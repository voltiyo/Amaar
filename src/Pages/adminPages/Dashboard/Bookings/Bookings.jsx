import { useState, useEffect } from "react";

  


export default function Bookings() {
    const [BookingsPerPage, setBookingsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookings, setBookings] = useState([])


    const totalPages = Math.ceil(bookings.length / BookingsPerPage);

    const startIndex = (currentPage - 1) * BookingsPerPage;
    const visibleBookings = bookings.slice(startIndex, startIndex + BookingsPerPage);

    
    useEffect(() => {
        async function GetBookings() {
            const resp = await fetch("/api/bookings");
            const data = await resp.json();
            setBookings(data)
        }
        GetBookings();
    }, [])


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Bookings</h1>
            <div>
                <span style={{margin: "0px 10px", fontWeight: "600"}}>Bookings per page:</span> 
                <select name="" id="" value={BookingsPerPage} onChange={(value) => {setBookingsPerPage(value.target.value)}}>
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
                                <th>Booking Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleBookings.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.property_id}</td>
                                    <td>{book.client_id}</td>
                                    <td>{book.agent_id || "-"}</td>
                                    <td>{book.booking_date.toLocaleDateString()}</td>
                                    <td>{book.status}</td>
                                    
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
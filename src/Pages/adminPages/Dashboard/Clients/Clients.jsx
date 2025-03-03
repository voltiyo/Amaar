import { useState, useEffect } from "react";
import "./Clients.css"




export default function Clients() {
    const [usersPerPage, setUsersPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([])
    const totalPages = Math.ceil(users.length / usersPerPage);

    const startIndex = (currentPage - 1) * usersPerPage;
    const visibleUsers = users.slice(startIndex, startIndex + usersPerPage);

    
    useEffect(() => {
        async function GetClients() {
            const resp = await fetch("/api/clients");
            const data = await resp.json();
            setUsers(data)
        }
        GetClients();
    }, [])


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Clients</h1>
            <div>
                <span style={{margin: "0px 10px", fontWeight: "600"}}>Clients per page:</span> 
                <select name="" id="" value={usersPerPage} onChange={(value) => {setUsersPerPage(value.target.value)}}>
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
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Nationality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.nationality}</td>
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
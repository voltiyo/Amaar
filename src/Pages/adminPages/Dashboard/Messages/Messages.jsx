import { useEffect, useState } from "react";

export default function Messages() {
    const [MessagesPerPage, setMessagesPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [Messages, setMessages] = useState([])
    const totalPages = Math.ceil(Messages.length / MessagesPerPage);

    const startIndex = (currentPage - 1) * MessagesPerPage;
    const visibleMessages = Messages.slice(startIndex, startIndex + MessagesPerPage);

    useEffect(() => {
        async function getMesages() {
            const data = await (await fetch("/api/messages")).json();
            setMessages(data)
        }
        getMesages();
    }, [])


    return (
        <div style={{padding: "10px 60px", color: "#fff"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Messages</h1>
            <div>
                <span style={{margin: "0px 10px", fontWeight: "600"}}>Messages per page:</span> 
                <select name="" id="" value={MessagesPerPage} onChange={(value) => {setMessagesPerPage(value.target.value)}}>
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Code</th>
                                <th>Phone Number</th>
                                <th>Identity</th>
                                <th>Message</th>
                                <th>Message Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleMessages.map((Message) => (
                                <tr key={Message.id}>
                                    <td>{Message.id}</td>
                                    <td>{Message.name}</td>
                                    <td>{Message.email}</td>
                                    <td>{Message.phone_code}</td>
                                    <td>{Message.phone_number}</td>
                                    <td>{Message.identity}</td>
                                    <td>{Message.message}</td>
                                    <td>{new Date(Message.created_at).toISOString().split("T")[0]}</td>
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
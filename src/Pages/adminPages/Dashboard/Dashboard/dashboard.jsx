import { useEffect, useState } from "react"
import MyChart from "../../../components/Chart"
import CountUp from "../../../components/count"

export default function AdminDashboard() {
    const [clients, setClients] = useState([]);
    const [properties, setProperties] = useState("");
    const [developers, setDevelopers] = useState("");
    const [agents, setAgents] = useState("");
    const [clientChartData, setClientsChartData] = useState("")
    const [propertiesChartData,setPropertiesChartData] = useState("")

    useEffect(() => {
        async function GetCounts() {
            const clientsCount = await fetch("/api/Clients").then(response => response.json()).then(data => {return data})
            setClients(clientsCount)
            const PropsCount = await fetch("/api/properties").then(response => response.json()).then(data => {return data})
            setProperties(PropsCount)
            const DevsCount = await fetch("/api/developers").then(response => response.json()).then(data => {return data})
            setDevelopers(DevsCount)
            const AgentsCount = await fetch("/api/agents").then(response => response.json()).then(data => {return data})
            setAgents(AgentsCount)
            
        }
        GetCounts()
    }, [])

    useEffect(() => {
        if (clients.length > 0) { 
          const groupedData = clients.reduce((acc, client) => {
            const date = new Date(client.created_at).toDateString().split(" ")[1]; 
            acc[date] = (acc[date] || 0) + 1; 
            return acc;
          }, {});
      
          const ClientsChartData = Object.entries(groupedData).map(([date, count]) => ({
            name: date,
            value: count,
          }));
      
          setClientsChartData(ClientsChartData);
        }
        if (properties.length > 0) { 
            const groupedData = properties.reduce((acc, client) => {
              const date = new Date(client.created_at).toDateString().split(" ")[1]; 
              acc[date] = (acc[date] || 0) + 1; 
              return acc;
            }, {});
        
            const propertiesChartData = Object.entries(groupedData).map(([date, count]) => ({
              name: date,
              value: count,
            }));
        
            setPropertiesChartData(propertiesChartData);
        }
      }, [properties]);
      
    
    
    
    
    return (
        <div style={{padding: "10px 60px"}}>
            <h1 style={{color: "#fff", textDecoration: "underline"}}>Dashboard</h1>
            <div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", flexWrap:  "wrap", columnGap: "1rem" , rowGap: "1rem"}}>

                    
                    
                    
                    <div style={{width: "20%", minWidth: "150px", background: "#B8860B", color: "#fff",gap: "10px",padding: "20px 10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <i className="fa-solid fa-user" style={{fontSize: "2rem"}}></i>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column",justifyContent: "center",fontSize: "2rem", fontWeight: "600"}}>
                            <CountUp targetNumber={clients.length}/>
                            <small style={{margin: "0px", fontSize: ".75rem"}}>clients</small>
                        </div>
                    </div>




                    
                    <div style={{width: "20%", minWidth: "150px", background: "#FFC300", color: "#fff",gap: "10px",padding: "20px 10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <i className="fa-solid fa-building" style={{fontSize: "2rem"}}></i>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column",justifyContent: "center",fontSize: "2rem", fontWeight: "600"}}>
                            <CountUp targetNumber={properties.length}/>
                            <small style={{margin: "0px", fontSize: ".75rem"}}>Properties</small>
                        </div>
                    </div>

                    
                    
                    
                    <div style={{width: "20%", minWidth: "150px", background: "#FFD700", color: "#fff",gap: "10px",padding: "20px 10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <i className="fa-solid fa-flag" style={{fontSize: "2rem"}}></i>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column",justifyContent: "center",fontSize: "2rem", fontWeight: "600"}}>
                            <CountUp targetNumber={developers.length}/>
                            <small style={{margin: "0px", fontSize: ".75rem"}}>Developers</small>
                        </div>
                    </div>

                    
                    
                    <div style={{width: "20%", minWidth: "150px", background: "#D4AF37", color: "#fff",gap: "10px",padding: "20px 10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <i className="fa-solid fa-laptop" style={{fontSize: "2rem"}}></i>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column",justifyContent: "center",fontSize: "2rem", fontWeight: "600"}}>
                            <CountUp targetNumber={agents.length}/>
                            <small style={{margin: "0px", fontSize: ".75rem"}}>Agents</small>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center",gap: "3rem", margin: "50px 0px", flexDirection: "column"}}>
                    <div style={{width: "90%", background: "rgba(255, 255, 255, .25)", borderRadius: "10px", padding: "10px 20px"}}>
                        <h2 style={{textAlign: "center", color: "#fff"}}>Clients Graph</h2>
                        {Array.isArray(clientChartData) && clientChartData.length > 0 && <MyChart data={clientChartData} />}
                    </div>

                    
                    <div style={{width: "90%", background: "rgba(255, 255, 255, .25)", borderRadius: "10px", padding: "10px 20px"}}>
                        <h2 style={{textAlign: "center", color: "#fff"}}>Properties Graph</h2>
                        {(Array.isArray(propertiesChartData) && propertiesChartData.length > 0) ? <MyChart data={propertiesChartData} /> : <MyChart data={[{name: new Date().toDateString().split(" ")[1], value: 0}]} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
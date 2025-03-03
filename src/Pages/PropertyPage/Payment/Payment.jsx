import PdfViewer from "../../components/PdfViewer"

export default function Payment({ property }) {
    
    return (
        <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee"}}>
            <h2 style={{color: "#333"}}>Payment Plan</h2>
            <p style={{color: "#727272"}} dangerouslySetInnerHTML={{__html: property.payment_plan_description.replaceAll(/\n/g, "<br />")}}></p>
            <div>
                <PdfViewer fileUrl={"/api/file/" + property.paymentplanPDF} />
            </div>
        </div>
    )
}
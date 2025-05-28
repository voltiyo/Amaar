

export default function Payment({ property }) {
    return (
        <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee"}}>
            <h2 style={{color: "#333"}}>Payment Plan</h2>
            <p style={{color: "#727272"}} dangerouslySetInnerHTML={{__html: property.payment_plan_description.replaceAll(/\n/g, "<br />")}}></p>
            {   property.paymentPlanDetails.length > 0 && property.paymentPlanHeader && 
                <h2 style={{marginTop: "40px"}}>{property.paymentPlanHeader}</h2>
            }
            {   property.paymentPlanDetails.length > 0 && property.paymentPlanHeader && 
                <table style={{width: "100%"}}>
                    <style>
                        {`
                            tr:not(:last-child) td,th {
                                border-bottom: 1px solid #ccc;
                            }
                            td, th{
                                padding: 10px;
                                text-align: center;
                            }
                        `}
                    </style>
                    <thead>
                        <tr>
                            <th>
                                Installment
                            </th>
                            <th>
                                Payment (%)
                            </th>
                            <th>
                                Milestone
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            property.paymentPlanDetails.map((installment, index) => (
                                <tr key={index}>
                                    <td>
                                        {installment.installment}
                                    </td>
                                    <td>
                                        {installment.payment}
                                    </td>
                                    <td>
                                        {installment.milestone}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
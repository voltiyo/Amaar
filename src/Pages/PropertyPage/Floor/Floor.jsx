import ImageShower from "../../../images/ImageComponent";
import { useEffect, useRef, useState } from "react";

export default function Floor({ property }) {
    const imageShowerRef = useRef();
    const [FloorImages, SetImages] = useState([])
    const [isFullScreen, setIsFullScreen] = useState(false);
    const headers = ["category", "unit_type", "FloorDetails", "Sizes", "type"];
    const visibleColumns = []
    for (const col of headers) {
        if (!property.floorDetails.every(obj => obj[col] === null || obj[col] === undefined)) visibleColumns.push(col)
    }
    useEffect(() => {
        const Images = []
        for (const floorDetail of property.floorDetails){
            Images.push(floorDetail.floorPlanImage)
        }
        SetImages(Images)
    }, [property])
    const goToImage = (index) => {
        imageShowerRef.current?.slideTo(index);
    };
    return (
        <div>
            <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee"}}>
                <h2 style={{color: "#333"}}>Floor Plan</h2>
                <p style={{color: "#727272"}} dangerouslySetInnerHTML={{__html: property.floorPlanDescription.replaceAll(/\n/g, "<br />")}}></p>
            </div>
            {   property.floorDetails.length > 0 &&
                <div style={{padding: "20px", margin: "20px", borderRadius: "10px", border: "1px solid #eee"}}>
                    <table style={{width: "100%", }}>
                        <style>
                            {`
                                table, th, td{
                                    border: 1px solid #ccc;
                                    border-collapse: collapse;
                                }
                                th, td {
                                    padding: 10px;
                                }
                            `}
                        </style>
                        <thead>
                            <th>Floor Plan</th>
                            {
                                visibleColumns.map((col, index) => (
                                    <th key={index}>{col}</th>
                                ))
                            }
                        </thead>
                        <tbody style={{textAlign: "center"}}>
                            {
                                property.floorDetails.map((floorDetail, index) => (
                                    <tr key={index}>
                                        <td >
                                            <img src={`/api/file/${floorDetail.floorPlanImage}`} style={{width: "50px"}} onClick={() => { goToImage(index); imageShowerRef.current.toggleFullScreen() }} />
                                        </td>
                                        {
                                            visibleColumns.filter(col => col === "category").length > 0 &&
                                            <td>
                                                {floorDetail.category || "-"}
                                            </td>

                                        }
                                        {
                                            visibleColumns.filter(col => col === "unit_type").length > 0 &&
                                            <td>
                                                {floorDetail.unit_type || "-"}
                                            </td>
                                        }
                                        {
                                            visibleColumns.filter(col => col === "FloorDetails").length > 0 &&
                                            <td>
                                                {floorDetail.FloorDetails || "-"}
                                            </td>
                                        }
                                        {
                                            visibleColumns.filter(col => col === "Sizes").length > 0 &&
                                            <td>
                                                {floorDetail.Sizes || "-"}
                                            </td>
                                        }
                                        {
                                            visibleColumns.filter(col => col === "type").length > 0 &&
                                            <td>
                                                {floorDetail.type || "-"}
                                            </td>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div style={{display: isFullScreen ? "block" : "none"}}>
                        <ImageShower images={FloorImages} onFullScreenChange={setIsFullScreen} ref={imageShowerRef} />
                    </div>
                </div>
            }
        </div>
    )
}
import { useEffect, useState } from "react";
import Select from 'react-select';
import { useParams } from "react-router-dom";
import makeAnimated from 'react-select/animated';

export default function EditProperty() {
    const { ID } = useParams();
    const [property, setProperty] = useState({})
    const [uploadedImages, setUploadedImages] = useState("");
    const [states, setStates] = useState([])
    const [communities, setCommunities] = useState([])
    const [devs, setDevs] = useState([]);
    const [locations, setLocations] = useState([])
    const [locationmapperview, setlocationmapperview] = useState("")
    const [features, setFeatures] = useState("")
    const animatedComponents = makeAnimated();
    const [paymentplanpdf, setpaymentplanpdf] = useState("")
    const [floorplanpdf, setfloorplanpdf] = useState("")
    const [masterplanprev, setmasterplanprev] = useState("")
    const [chosenFeatures, setChosenFeatures] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [selectedCommunity, setSelectedCommunity] = useState("")
    const [selectedDeveloper, setSelectedDeveloper] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
    const [originalFeatures, setOriginalFeatures] = useState("")
    const [handover, setHandover ] = useState("")

    async function SavePropertyEdit() {
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const price = document.querySelector("#price").value;
        const status = document.querySelector("#status").value;
        const size = document.querySelector("#size").value;
        const bedrooms = document.querySelector("#bedrooms").value;
        const bathrooms = document.querySelector("#bathrooms").value;
        const type = document.querySelector("#type").value;
        const state = document.querySelector("#state").value;
        const community = document.querySelector("#community").value;
        const developer = document.querySelector("#developer").value;
        const location = document.querySelector("#location").value;
        const location_description = document.querySelector("#location_description").value;
        const nearby_places = document.querySelector("#nearby_places").value;
        const features_description = document.querySelector("#features_description").value;
        const payment_plan = document.querySelector("#payment_plan").value;
        const handover = document.querySelector("#handover").value;
        const payment_plan_description = document.querySelector("#payment_plan_description").value;
        const floor_plan_description = document.querySelector("#floor_plan_description").value;
        const master_plan_description = document.querySelector("#master_plan_description").value;


        const SelectedFeatures = []
        for (const feature of chosenFeatures) {
            const ChosenFeature = originalFeatures.filter(feat => feat.id === feature.value)[0]
            SelectedFeatures.push(ChosenFeature.id)
        }

        const data = new FormData()
        data.append("title", title);
        data.append("description", description);
        data.append("price", price);
        data.append("status", status);
        data.append("size", size);
        data.append("bedrooms", bedrooms);
        data.append("bathrooms", bathrooms);
        data.append("type", type);
        data.append("state", state);
        data.append("community", community);
        data.append("developer", developer);
        data.append("location", location);
        data.append("location_description", location_description);
        data.append("nearby_places", nearby_places);
        data.append("locationmapperview", locationmapperview);
        data.append("SelectedFeatures", JSON.stringify(SelectedFeatures));
        data.append("features_description", features_description);
        data.append("payment_plan", payment_plan);
        data.append("handover", handover);
        data.append("payment_plan_description", payment_plan_description);
        data.append("payment_plan_pdf", paymentplanpdf);
        data.append("floor_plan_description", floor_plan_description);
        data.append("floor_plan_pdf", floorplanpdf);
        data.append("master_plan_description", master_plan_description);
        data.append("master_plan_preview", masterplanprev);
        data.append("id", property.id);

        for (const image of uploadedImages ) {
            data.append("images", image)
        }
        const response = await fetch("/api/SavePropEdit", {
            method: "POST",
            body: data,
        });
        const respoData = await response.json();
        if (respoData.success) {
            window.location.href = "/admin";
        } else {
            document.querySelector(".Formerror").textContent = "Error Saving Property Changes"
        }
        
    }



    useEffect(() => {
        async function GetProperty() {
            const resp = await fetch(`/api/properties`)
            const data = await resp.json();
            const prop = data.filter(prop => prop.id === parseInt(ID))[0];
            if (!prop) {
                window.location.href = "/Admin"
            }
            setProperty(data.filter(prop => prop.id === parseInt(ID))[0])
        }
        async function GetStates() {
            const resp = await fetch(`/api/states`)
            const data = await resp.json();
            setStates(data)
        }
        async function GetCommunities() {
            const resp = await fetch(`/api/communities`)
            const data = await resp.json();
            setCommunities(data)
        }
        async function GetDevs() {
            const resp = await fetch(`/api/developers`)
            const data = await resp.json();
            setDevs(data)
        }
        async function GetLocations() {
            const resp = await fetch(`/api/locations`)
            const data = await resp.json();
            setLocations(data)
        }





        GetLocations();
        GetDevs();
        GetCommunities();
        GetStates();
        GetProperty();
        setSelectedState(property.state)
        setSelectedCommunity(property.community_id)
        setSelectedDeveloper(property.developer_id)
        setSelectedLocation(property.location)

        
        
    }, [])
    useEffect(() => {
        if (property.handover) {
            setHandover(property.handover)
        }
    }, [property])
    useEffect(() => {
        async function LoadImages() {
            const Images = JSON.parse(property.images.replace("{", "[").replace("}","]"))
            const uploadedimages = []
            for (const image of Images) {
                const retrievedImage = await fetch("/api/file/" + image)
                const retrievedImageBlob = await retrievedImage.blob();
                const retrievedImageFile = new File([retrievedImageBlob],"image.png", { type: retrievedImageBlob.type })
                uploadedimages.push(retrievedImageFile)
            }
            setUploadedImages(uploadedimages)
            
        }
        
        if (property.images) {
            LoadImages();
        }
    }, [property])
    

    useEffect(() => {
        async function LoadMapPreview() {
            const mapPreview = property.location_map
            const FetchedMap = new File([await (await fetch("/api/file/" + mapPreview)).blob()], "preview.png", { type: "image/png" });

            setlocationmapperview(FetchedMap);
        }
        async function LoadPaymentPDF() {
            const mapPreview = property.paymentplanPDF
            const FetchedMap = new File([await (await fetch("/api/file/" + mapPreview)).blob()], "payment.pdf", { type: "application/pdf" });

            setpaymentplanpdf(FetchedMap);
        }
        async function LoadFloorPDF() {
            const mapPreview = property.floorPlanPDF
            const FetchedMap = new File([await (await fetch("/api/file/" + mapPreview)).blob()], "floor.pdf", { type: "application/pdf" });

            setfloorplanpdf(FetchedMap);
        }
        async function LoadMasterPrev() {
            const mapPreview = property.master_plan_map
            const FetchedMap = new File([await (await fetch("/api/file/" + mapPreview)).blob()], "master.png", { type: "image/png" });

            setmasterplanprev(FetchedMap);
        }
        if (property) {
            LoadMapPreview();
            LoadPaymentPDF();
            LoadFloorPDF();
            LoadMasterPrev();
        }
    }, [property])
    

    useEffect(() => {
        async function GetFeatures() {
            const resp = await fetch(`/api/features`)
            const data = await resp.json();
            setOriginalFeatures(data)
            setFeatures([])
            if (property.features) {
                const ChosenFeaturesIDs = JSON.parse(property.features.replace("{", "[").replace("}", "]"));
                const ChosenFeatures = [];
                ChosenFeaturesIDs.map(feat => {
                    const wholeFeature = data.filter(feature => feature.id === parseInt(feat))[0];
                    ChosenFeatures.push(wholeFeature)
                })
                for (const feature of ChosenFeatures) {
                    setChosenFeatures(prev =>  [...prev, { label: feature.name, value: feature.id} ] )
                }
            }
            for (const feature of data) {
                setFeatures(prev =>  [...prev, { label: feature.name, value: feature.id} ] )
            }
        }
        GetFeatures();
    }, [property])
    return (
        <div>
            <div style={{position: "absolute", top: "0px", left: "0px", bottom: "0px", right: "0px", background: "rgb(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center"}} className="newPropCont">
                
                <div className="newPropContBlur"></div>
                <style>{`
                    .newPropContBlur{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        content: "";
                        z-index: 6;
                    }
                `}</style>
                <div style={{width: "70%", height: "90%", background: "white", borderRadius: "10px", overflowY: "auto", paddingBottom: "30px", zIndex: "7"}}>
                    <h1 style={{textAlign: "center", color: "#333"}}>Edit Property</h1>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px", width: "100%"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input type="file" name="" multiple hidden id="imagesUp" onChange={(e) => {setUploadedImages(e.target.files)}}/>
                            <label htmlFor="imagesUp" style={{color: "#fff", width: "30%", background: "#727272", padding: "20px 60px", borderRadius: "10px",cursor: "pointer"}}>
                                
                                {uploadedImages.length > 0 ? (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", textWrap: "nowrap"}}>{uploadedImages.length} Uploaded</p>): (<p style={{margin: "0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", textWrap: "nowrap"}}><i className="fa fa-camera"></i>upload Images</p>)}
                            </label>
                        </div>
                        <p className="Formerror" style={{color: "red", textAlign: "center"}}></p>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px", gap: "10px", width: "100%"}} onFocus={(e) => {e.target.style.borderColor = "#004274"}} onBlur={(e) => { e.target.style.borderColor = "#ccc" }}>
                            <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Title" id="title" defaultValue={property.title} />
                            <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "200px"}} placeholder="Description" id="description" defaultValue={property.description}  />
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "27.5%"}} placeholder="Price (AED)" id="price" defaultValue={property.price}  />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "27.5%"}} placeholder="Status" id="status" defaultValue={property.status}  />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "27.5%"}} placeholder="Size" id="size" defaultValue={property.size}  />
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "44.5%"}} placeholder="Bedrooms" id="bedrooms" defaultValue={property.bedrooms}  />
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "44.5%"}} placeholder="Bathrooms" id="bathrooms"  defaultValue={property.bathrooms}  />
                            </div>
                            <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Type" list="property-types" id="type"  defaultValue={property.type}  />
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <p style={{color: "#333", fontWeight: "600"}}>State : </p>
                                <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="state" onChange={(e) => { setSelectedState(e.target.value) }}  value={selectedState}  >
                                    {
                                        states.map((com, index) => {
                                            return (
                                                <option value={com.id} key={index}>{com.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <p style={{color: "#333", fontWeight: "600"}}>Community : </p>
                                <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="community"  value={selectedCommunity} onChange={(e) => { setSelectedCommunity(e.target.value) }} >
                                    {
                                        communities.map((com, index) => {
                                            return (
                                                <option value={com.id} key={index}>{com.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <p style={{color: "#333", fontWeight: "600"}}>Developer : </p>
                                <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="developer"  value={selectedDeveloper} onChange={(e) => { setSelectedDeveloper(e.target.value) }}  >
                                    {
                                        devs.map((dev, index) => {
                                            return (
                                                <option value={dev.id} key={index}>{dev.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <p style={{color: "#333", fontWeight: "600"}}>Location : </p>
                                <select type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "84%"}} id="location" value={selectedLocation} onChange={(e) => { setSelectedLocation(e.target.value) }} >
                                    {
                                        locations.map((dev, index) => {
                                            return (
                                                <option value={dev.id} key={index}>{dev.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Location Description" id="location_description"  defaultValue={property.location_description}  />

                            <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%"}} placeholder="Nearby Places (separe them by a ',' )" id="nearby_places" defaultValue={property.nearby_places} />
                            <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                <label htmlFor="locationmapperviewup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{locationmapperview ? "(uploaded 1) Upload Map location Preview (image)" : "Upload Map location Preview (image)"}</label>
                                <input type="file" multiple id="locationmapperviewup" accept="*" hidden onChange={(e) => { setlocationmapperview(e.target.files[0]) }}/>
                            </div>
                            <div style={{width: "84%", color: "#727272", background: "#eee"}}>

                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: "#eee", // Background color
                                            border: state.isFocused ? "1px solid #004274" : "1px solid #ccc", // Border color
                                            boxShadow: state.isFocused ? "none" : "none", // Custom focus outline
                                            outline: "none",
                                            "&:hover" : {
                                                borderColor: "#004274"
                                            }
                                            }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: "#e0e0e0", // Change dropdown menu background
                                        }),
                                        input: (provided) => ({
                                            ...provided,
                                            outline: "none", // Remove input outline
                                            boxShadow: "none", // Remove focus shadow
                                        }),
                                        }}
                                    isMulti
                                    value={chosenFeatures}
                                    onChange={(e) => setChosenFeatures(e)}
                                    options={features}
                                    />
                            </div>
                            <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="Features Description" id="features_description" defaultValue={property.features_description}/>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "84%"}}>
                                <input type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "60%"}} placeholder="payment plan" id="payment_plan" defaultValue={property.payment_plan} />
                                <div style={{display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", marginRight: "40px"}} >
                                    <span style={{color : "#727272", fontWeight: "700"}}>HandOver</span>
                                    <input type="date" name="" id="handover"  defaultValue={handover} />
                                </div>
                            </div>
                            <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="payment plan description" id="payment_plan_description" defaultValue={property.payment_plan_description} />
                            <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                <label htmlFor="paymentplanpdfup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{paymentplanpdf ? "(uploaded 1) Upload Payment Plan Pdf File" : "Upload Payment Plan Pdf File"}</label>
                                <input type="file" multiple id="paymentplanpdfup" accept=".pdf" hidden onChange={(e) => { setpaymentplanpdf(e.target.files[0]) }}/>
                            </div>
                            <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="floor plan description" id="floor_plan_description" defaultValue={property.floorPlanDescription} />
                            <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                <label htmlFor="floorplanpdfup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{floorplanpdf ? "(uploaded 1) Upload Floor Plan Pdf File" : "Upload Floor Plan Pdf File"}</label>
                                <input type="file" multiple id="floorplanpdfup" accept=".pdf" hidden onChange={(e) => { setfloorplanpdf(e.target.files[0]) }}/>
                            </div>

                            <textarea type="text" style={{border: "1px solid #ccc", background: "#eee", borderRadius: "7px", padding: "10px 20px", color: "#333", fontWeight: "600", outline: "none", transition: "all .5s", width: "80%", resize: "none", height: "100px"}} placeholder="master plan description" id="master_plan_description" defaultValue={property.master_plan_description}/>
                            <div  style={{width: "84%", display: "flex", alignItems: "center", justifyContent:"center"}}>
                                <label htmlFor="masterplanprevup" style={{color: "#727272",fontWeight: "700", width: "100%", textAlign: "center", background: "#eee", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "7px", cursor: "pointer"}}>{masterplanprev ? "(uploaded 1) Upload Master Plan Preview (image)" : "Upload Master Plan Preview (image)"}</label>
                                <input type="file" multiple id="masterplanprevup" accept="*" hidden onChange={(e) => { setmasterplanprev(e.target.files[0]) }}/>
                            </div>
                        </div>
    
                        <button style={{width: "84%", outline: "none", border: "none", borderRadius: "7px", padding: "10px 20px", background: "#04418b", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: "550"}} onClick={() => {SavePropertyEdit()}}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
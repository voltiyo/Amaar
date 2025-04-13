export default function Search({data, onchange, value}) {
    return (
        <div style={{width: "50%"}}>
            <input type="text" id="search-inp" list="propList" defaultValue={value?.replaceAll("-", " ")} onChange={onchange} placeholder="Type To Search ..." style={{outline: "none", border: "1px solid #dee2e6", cursor: "pointer", padding: "10px", fontSize: "1rem", borderRadius: "5px", width: "90%"}}/>
            <datalist id="propList">
                {
                    data && data.map((property, index )=> {
                        return(
                            <option value={property.title || property.name} key={index}></option>
                        )
                    })
                }
            </datalist>
        </div>
    )
}
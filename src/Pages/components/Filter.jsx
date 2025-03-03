const ToggleOpen = (e) => {
    const target = e.target.parentElement.children[1];
    const upElement = e.target;
    
    if(target.style.display === "none"){
        target.style.display = "block";
        upElement.style.background = "linear-gradient(82deg,rgb(185 147 63) 0%,rgb(185 147 63) 35%,rgb(255 255 255) 100%)"
        upElement.style.color = "white";
        upElement.children[1].style.transform = "rotate(180deg)";
        upElement.children[1].style.color = "lightblue";

    } else {
        target.style.display = "none";
        upElement.style.background = "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)"
        upElement.style.color = "black";
        upElement.children[1].style.transform = "rotate(0deg)";
        upElement.children[1].style.color = "black";
    }
}


export default function Filter() {
    return (
        <div style={{width: "95%" , padding: "20px", boxShadow: "0 .5rem 1rem rgb(0 0 0 / .15)", borderRadius: "5px"}}>
            <h3 style={{color: "#333", borderBottom: "1px solid rgb(0 0 0 / .15)"}}>Filter</h3>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <div>
                    <div style={{display: "flex", color: "#fff", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(185 147 63) 0%,rgb(185 147 63) 35%,rgb(255 255 255) 100%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Starting Price Range</p>
                        <i style={{pointerEvents: "none", color: "blue", transform: "rotate(180deg)" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="search-options-1">
                        <ul style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
                            <li style={{display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem"}}>
                                <p style={{color: "#757575"}}>Min</p>
                                <input type="text" name="" id="min-search-range" style={{outline: "none", borderRadius: "5px", width: "93px", border: "1px solid #999"}}/>
                            </li>
                            <li style={{color: "#757575"}}>
                                -
                            </li>
                            <li style={{display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem"}}>
                                <p style={{color: "#757575"}}>Max</p>
                                <input type="text" name="" id="max-search-range" style={{outline: "none", borderRadius: "5px", width: "93px", border: "1px solid #999"}}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>City</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="search-options-2" style={{display: "none"}}>
                        <div>
                            <input type="radio" name="check-city" id="city1" />
                            <label htmlFor="city1">Dubai</label>
                            <input type="radio" name="check-city" id="city2" />
                            <label htmlFor="city1">Abu Dhabi</label>
                            <input type="radio" name="check-city" id="city3" />
                            <label htmlFor="city1">Sharjah</label>
                            <input type="radio" name="check-city" id="city4" />
                            <label htmlFor="city1">Ras Al Khaimah</label>
                        </div>
                        <div>
                            <h3>Communities</h3>
                            <div>
                                <input type="checkbox" name="saadiyat_abu_dhabi" id="saadiyat_abu_dhabi" />
                                <label htmlFor="saadiyat_abu_dhabi">Saadiyat Abu Dhabi</label><br />

                                <input type="checkbox" name="saadiyat_island" id="saadiyat_island" />
                                <label htmlFor="saadiyat_island">Saadiyat Island</label><br />

                                <input type="checkbox" name="yas_island" id="yas_island" />
                                <label htmlFor="yas_island">Yas Island</label><br />

                                <input type="checkbox" name="khalifa_city" id="khalifa_city" />
                                <label htmlFor="khalifa_city">Khalifa City</label><br />

                                <input type="checkbox" name="al_shamkha" id="al_shamkha" />
                                <label htmlFor="al_shamkha">Al Shamkha</label><br />

                                <input type="checkbox" name="aljurf_gardens" id="aljurf_gardens" />
                                <label htmlFor="aljurf_gardens">AlJurf Gardens</label><br />

                                <input type="checkbox" name="al_reem_island" id="al_reem_island" />
                                <label htmlFor="al_reem_island">Al Reem Island</label><br />

                                <input type="checkbox" name="alghadeer" id="alghadeer" />
                                <label htmlFor="alghadeer">Alghadeer</label><br />

                                <input type="checkbox" name="al_maryah_island" id="al_maryah_island" />
                                <label htmlFor="al_maryah_island">Al Maryah Island</label><br />

                                <input type="checkbox" name="masdar_city" id="masdar_city" />
                                <label htmlFor="masdar_city">Masdar City</label><br />

                                <input type="checkbox" name="al_raha_beach" id="al_raha_beach" />
                                <label htmlFor="al_raha_beach">Al Raha Beach</label><br />

                                <input type="checkbox" name="al_bateen" id="al_bateen" />
                                <label htmlFor="al_bateen">Al Bateen</label><br />

                                <input type="checkbox" name="abu_dhabi" id="abu_dhabi" />
                                <label htmlFor="abu_dhabi">Abu Dhabi</label><br />

                                <input type="checkbox" name="bloom_garden" id="bloom_garden" />
                                <label htmlFor="bloom_garden">Bloom Garden</label><br />

                                <input type="checkbox" name="nareel_island" id="nareel_island" />
                                <label htmlFor="nareel_island">Nareel Island</label><br />

                                <input type="checkbox" name="bloom_living" id="bloom_living" />
                                <label htmlFor="bloom_living">Bloom Living</label><br />

                                <input type="checkbox" name="jubail_island" id="jubail_island" />
                                <label htmlFor="jubail_island">Jubail Island</label><br />

                                <input type="checkbox" name="ramhan_island" id="ramhan_island" />
                                <label htmlFor="ramhan_island">Ramhan Island</label><br />

                                <input type="checkbox" name="hudayriyat_island" id="hudayriyat_island" />
                                <label htmlFor="hudayriyat_island">Hudayriyat Island</label><br />

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Property type</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                            <div style={{textWrap: "nowrap", fontSize: ".75rem"}}>
                                <input type="checkbox" id="chalet" /><label htmlFor="chalet" > Chalet</label><br />
                                <input type="checkbox" id="condominiums"/><label htmlFor="condominiums"> Condominiums</label><br />
                                <input type="checkbox" id="duplex_apartments"/><label htmlFor="duplex_apartments"> Duplex Apartments</label><br />
                                <input type="checkbox" id="duplex_villas"/><label htmlFor="duplex_villas"> Duplex Villas</label><br />
                                <input type="checkbox" id="garden_apartment"/><label htmlFor="garden_apartment"> Garden Apartment</label><br />
                                <input type="checkbox" id="hotel_rooms"/><label htmlFor="hotel_rooms"> Hotel Rooms</label><br />
                                <input type="checkbox" id="maisonette"/><label htmlFor="maisonette"> Maisonette</label><br />
                                <input type="checkbox" id="mansion_villa"/><label htmlFor="mansion_villa"> Mansion Villa</label><br />
                                <input type="checkbox" id="penthouse_loft"/><label htmlFor="penthouse_loft"> Penthouse Loft</label><br />
                                <input type="checkbox" id="premium_villa"/><label htmlFor="premium_villa"> Premium Villa</label><br />
                                <input type="checkbox" id="royal_suite"/><label htmlFor="royal_suite"> Royal Suite</label><br />
                                <input type="checkbox" id="semidetached_villa"/><label htmlFor="semidetached_villa"> Semidetached Villa</label><br />
                                <input type="checkbox" id="sky_home"/><label htmlFor="sky_home"> Sky Home</label><br />
                                <input type="checkbox" id="sky_mansion"/><label htmlFor="sky_mansion"> Sky Mansion</label><br />
                                <input type="checkbox" id="sky_villa"/><label htmlFor="sky_villa"> Sky Villa</label><br />
                                <input type="checkbox" id="studio"/><label htmlFor="studio"> Studio</label><br />
                                <input type="checkbox" id="townhouse"/><label htmlFor="townhouse"> Townhouse</label><br />
                                <input type="checkbox" id="twin_villas"/><label htmlFor="twin_villas"> Twin Villas</label><br />
                                <input type="checkbox" id="water_bungalows"/><label htmlFor="water_bungalows"> Water Bungalows</label><br />
                                <input type="checkbox" id="retail_space"/><label htmlFor="retail_space"> Retail Space</label><br />
                            </div>
                            <div style={{textWrap: "nowrap", fontSize: ".75rem"}}>
                                    <input type="checkbox" id="apartment" name="apartment" />
                                    <label htmlFor="apartment">Apartment</label><br />

                                    <input type="checkbox" id="club_villas" name="club_villas" />
                                    <label htmlFor="club_villas">Club Villas</label><br />

                                    <input type="checkbox" id="duets" name="duets" />
                                    <label htmlFor="duets">Duets</label><br />

                                    <input type="checkbox" id="duplex_penthouses" name="duplex_penthouses" />
                                    <label htmlFor="duplex_penthouses">Duplex Penthouses</label><br />

                                    <input type="checkbox" id="farmhouse" name="farmhouse" />
                                    <label htmlFor="farmhouse">Farmhouse</label><br />

                                    <input type="checkbox" id="garden_villa" name="garden_villa" />
                                    <label htmlFor="garden_villa">Garden Villa</label><br />

                                    <input type="checkbox" id="loft" name="loft" />
                                    <label htmlFor="loft">Loft</label><br />

                                    <input type="checkbox" id="mansion" name="mansion" />
                                    <label htmlFor="mansion">Mansion</label><br />

                                    <input type="checkbox" id="penthouse" name="penthouse" />
                                    <label htmlFor="penthouse">Penthouse</label><br />

                                    <input type="checkbox" id="podium_townhouses" name="podium_townhouses" />
                                    <label htmlFor="podium_townhouses">Podium Townhouses</label><br />

                                    <input type="checkbox" id="presidential_suite" name="presidential_suite" />
                                    <label htmlFor="presidential_suite">Presidential Suite</label><br />

                                    <input type="checkbox" id="semi_detached" name="semi_detached" />
                                    <label htmlFor="semi_detached">Semi Detached</label><br />

                                    <input type="checkbox" id="serviced_apartments" name="serviced_apartments" />
                                    <label htmlFor="serviced_apartments">Serviced Apartments</label><br />

                                    <input type="checkbox" id="sky_lofts" name="sky_lofts" />
                                    <label htmlFor="sky_lofts">Sky Lofts</label><br />

                                    <input type="checkbox" id="sky_palaces" name="sky_palaces" />
                                    <label htmlFor="sky_palaces">Sky Palaces</label><br />

                                    <input type="checkbox" id="stand_alone_villa" name="stand_alone_villa" />
                                    <label htmlFor="stand_alone_villa">Stand Alone Villa</label><br />

                                    <input type="checkbox" id="suite" name="suite" />
                                    <label htmlFor="suite">Suite</label><br />

                                    <input type="checkbox" id="triplex_penthouse" name="triplex_penthouse" />
                                    <label htmlFor="triplex_penthouse">Triplex Penthouse</label><br />

                                    <input type="checkbox" id="villa" name="villa" />
                                    <label htmlFor="villa">Villa</label><br />

                                    <input type="checkbox" id="office_space" name="office_space" />
                                    <label htmlFor="office_space">Office Space</label><br />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Status</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="search-options-4" style={{display: "none", fontSize: ".75rem"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", textWrap: "nowrap"}}> 
                            <div >
                                <input type="checkbox" name="" id="" /> 
                                <label htmlFor="">New Launch</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Ready to Move in</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Ready Plots</label><br />

                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Under Construction</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Upcoming</label><br />

                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Sold Out</label><br />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Developers</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none"}}>
                        devs
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Accomodation</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none", fontSize: ".75rem"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">1 Bedroom</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">3 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">4 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">5 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">6 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">7 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">8 Bedrooms</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">studio</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "linear-gradient(82deg,rgb(238 238 238) 0%,rgb(238 238 238) 41%,rgb(255 255 255) 99%)", padding: "0px 10px", borderRadius: "5px", transition: "all 300ms"}} onClick={(e) => {ToggleOpen(e)}}>
                        <p style={{pointerEvents: "none"}}>Possession</p>
                        <i style={{pointerEvents: "none" , transition: "all 300ms"}} className="fa-solid fa-caret-down"></i>
                    </div>
                    <div style={{display: "none"}}>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2,1fr)"}}>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2016</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2018</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2019</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2020</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2021</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2022</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2023</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2024</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2025</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2026</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2027</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2028</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">2029</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Announcing Soon</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Ready To Move in</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button style={{width: "100%", margin: "10px 0px", border: "none", borderRadius: "10px", background: "#001F3F", color: "#fff", padding: "7px 0px", fontSize: "1.25rem"}}>Search</button>
        </div>
    )
}
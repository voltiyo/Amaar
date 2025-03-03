import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

export default function AboutUs() {
    return (
        <div>
            <NavBar />
            <div>
                <div className='services-title-container'>
                    <h1>About Us</h1>
                    <ul>
                        <li>Home</li>
                        <li>/</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className='services-container'>
                    <h1>About Amaar Properties</h1>
                    <p>
                        To know about us and what we do - especially if you are looking to buy, sell and rent property in Dubai, just feel free to visit Amaar Properties. We have a complete list of all the properties that might fit your specific criteria. Amaar Properties are proudly a subsidiary of The Emirates Business Group, a holding company based in Abu Dhabi with a diverse range of companies in its portfolio. <br /><br />

                        Being a small-to-medium-sized real estate company with the backing of a large holding company we can be more adaptive to the market conditions and client’s needs, whilst at the same time benefiting from the influence of a corporation. <br /><br />

                        Amaar Properties offer a full range of real estate services including sales of under-development (off-plan) communities, completed properties (residential sales), investment consultancy, real estate advisory, mortgage advisory and property management facilities.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
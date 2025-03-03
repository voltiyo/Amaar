import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import "./Services.css";

export default function Services() {
    return (
        <div >
            <NavBar page="services"/>
            <div className='services-title-container'>
                <h1>Services</h1>
                <ul>
                    <li>Home</li>
                    <li>/</li>
                    <li>Services</li>
                </ul>
            </div>
            <div className='services-container'>
                <h1>Our Services</h1>
                <p>At Amaar Properties, we offer various range of services to our clients and end-users offering a transparent process, for buying or selling the property. We offer various services starting from residence visa or purchasing a property, investment consultancy, expert sales, marketing and many such.</p>
                <p>With our skilled, hard-working and passionate team of real estate players, we do offer our clients the best deal in the real estate market. The expert services like identifying the best neighbourhood for you, gaining returns on property, and all the requirements that suit you very best. The best advice is to start looking to sell or buy at the time to suit you. You never know what properties are out there or what buyers are booking before testing the market and if you can get ahead of the competition then it may work out in your favour.</p>
                <p>We have over 10 years of experience in facilitating our clients’ residency goals, and making the necessary arrangements to help gain a good deal for those who wish to make use of the UAE’s zero corporate and zero personal tax benefits.</p>

            </div>
            <div className='services-list-container'>
                <div>
                    <img src="/mortage.webp" alt="" />
                    <a href='/'> 
                    Mortgage Services <br />
                    When it comes to investing in the property market, irrespective of your nationality, mortgages are offered by local as well as international lenders, where our team of experts handles various mortgage-related issues.</a>
                </div>
                <div>
                    <img src="/property-investment.webp" alt="" />
                    <a href='/'> 
                    Property & Investment Consultancy <br />
                    As a leading real estate brokerage agency, we have a special team to deal with all issues related to property and investment consultancy to provide our customers satisfaction and assure them of great ROI.</a>
                </div>
                <div>
                    <img src="/visa-icon.webp" alt="" />
                    <a href='/'>
                    UAE Residence Visa & Business Setup <br />
                    We assist our clients wanting a Visa and establish a company in the UAE. We coordinate the entire visa processing service. With the help of our team, you can easily apply for the process.</a>
                </div>
                <div>
                    <img src="/sales-marketing.webp" alt="" />
                    <a href='/'>Sales & Marketing <br />
                    We have a dedicated team involved in the sales and marketing of real estate projects, available round the clock and our primary role is to serve the interest of our customers.
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    )
}
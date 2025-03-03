import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home/Home";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./Pages/Services/Services";
import Team from "./Pages/Team/Team";
import Offplan from "./Pages/Offplan/Offplan";
import SecondaryMarketProperties from "./Pages/secondaryProps/secondaryMarketProperties";
import NewsAndArticles from "./Pages/newsAndArticles/NewsandArticles";
import PropertyManagement from "./Pages/PropertyManagement/PropertyManagement";
import AdminDashboardLayout from "./Pages/adminPages/Dashboard/DashboardLayout";
import AdminLogin from "./Pages/adminPages/Login/Login";
import Developers from "./Pages/Developers/Developers";
import Communities from "./Pages/Communities/Communities";
import Locations from "./Pages/Locations/Locations";


import 'remixicon/fonts/remixicon.css';
import EditCom from "./Pages/adminPages/Edit/Community/EditCommunity";
import Developer from "./Pages/DeveloperPage/DeveloperPage";
import CommunityPage from "./Pages/CommunityPage/CommunityPage";
import LocationPage from "./Pages/LocationPage/LocationPage";
import PropertyPage from "./Pages/PropertyPage/PropertyPage";
import EditProperty from "./Pages/adminPages/Edit/Property/EditProperty";
import EditAgent from "./Pages/adminPages/Edit/Agent/EditAgent";
import EditState from "./Pages/adminPages/Edit/State/EditState";
import EditDev from "./Pages/adminPages/Edit/Developer/EditDeveloper";
import EditLoca from "./Pages/adminPages/Edit/Locations/EditLocations";
import EditArticle from "./Pages/adminPages/Edit/NewsAndArticles/EditArticle";
import ArticlePage from "./Pages/ArticlePage/ArticlePage";
import AboutUs from "./Pages/About/AboutUs";
import Privacy from "./Pages/Privacy/Privacy";
import ProtectedRoutes from "./utils/ProtectedRoutes";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/About" element={<AboutUs />}></Route>
      <Route path="/Services" element={<Services />}></Route>
      <Route path="/Privacy-Policy" element={<Privacy />}></Route>
      <Route path="/Our-Team" element={<Team />}></Route>
      <Route path="/Offplan-Projects" element={<Offplan />}></Route>
      <Route path="/Projects/:propertyTitle" element={<PropertyPage />}></Route>
      {/*<Route path="/secondary-market-properties" element={<SecondaryMarketProperties />}></Route>*/}
      <Route path="/News-and-Articles" element={<NewsAndArticles />}></Route>
      <Route path="/News-and-Articles/:Article" element={<ArticlePage />}></Route>
      <Route path="/List-Your-Property" element={<PropertyManagement />}></Route>
      <Route path="/Developer/:Developer" element={<Developer />}></Route>
      <Route path="/Developers" element={<Developers />}></Route>
      <Route path="/Communities" element={<Communities />}></Route>
      <Route path="/Community/:Community" element={<CommunityPage />}></Route>
      <Route path="/Locations" element={<Locations />}></Route>
      <Route path="/Locations/:loca" element={<LocationPage />}></Route>
      <Route path="/Offplan-Projects/:country" element={<Offplan />} />
      <Route path="/Admin/Login" element={<AdminLogin />}></Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/Admin" element={<AdminDashboardLayout />}></Route>
        <Route path="/Admin/property/edit/:ID" element={<EditProperty />}></Route>
        <Route path="/Admin/Agent/edit/:ID" element={<EditAgent />}></Route>
        <Route path="/Admin/State/edit/:ID" element={<EditState />}></Route>
        <Route path="/Admin/Developer/edit/:ID" element={<EditDev />}></Route>
        <Route path="/Admin/Article/edit/:ID" element={<EditArticle />}></Route>
        <Route path="/Admin/Location/edit/:ID" element={<EditLoca />}></Route>
        <Route path="/Admin/community/edit/:ID" element={<EditCom />}></Route>
      </Route>
    </Routes>
  </Router>
);
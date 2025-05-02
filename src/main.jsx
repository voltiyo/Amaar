import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import 'remixicon/fonts/remixicon.css';
import ProtectedRoutes from "./utils/ProtectedRoutes";

const Home = lazy(() => import("./Pages/Home/Home"));
const Services = lazy(() => import("./Pages/Services/Services"));
const Team = lazy(() => import("./Pages/Team/Team"));
const Offplan = lazy(() => import("./Pages/Offplan/Offplan"));
const SecondaryMarketProperties = lazy(() => import("./Pages/secondaryProps/secondaryMarketProperties"));
const NewsAndArticles = lazy(() => import("./Pages/newsAndArticles/NewsandArticles"));
const PropertyManagement = lazy(() => import("./Pages/PropertyManagement/PropertyManagement"));
const AdminDashboardLayout = lazy(() => import("./Pages/adminPages/Dashboard/DashboardLayout"));
const AdminLogin = lazy(() => import("./Pages/adminPages/Login/Login"));
const Developers = lazy(() => import("./Pages/Developers/Developers"));
const Communities = lazy(() => import("./Pages/Communities/Communities"));
const Locations = lazy(() => import("./Pages/Locations/Locations"));
const EditCom = lazy(() => import("./Pages/adminPages/Edit/Community/EditCommunity"));
const Developer = lazy(() => import("./Pages/DeveloperPage/DeveloperPage"));
const CommunityPage = lazy(() => import("./Pages/CommunityPage/CommunityPage"));
const LocationPage = lazy(() => import("./Pages/LocationPage/LocationPage"));
const PropertyPage = lazy(() => import("./Pages/PropertyPage/PropertyPage"));
const EditProperty = lazy(() => import("./Pages/adminPages/Edit/Property/EditProperty"));
const EditAgent = lazy(() => import("./Pages/adminPages/Edit/Agent/EditAgent"));
const EditState = lazy(() => import("./Pages/adminPages/Edit/State/EditState"));
const EditDev = lazy(() => import("./Pages/adminPages/Edit/Developer/EditDeveloper"));
const EditLoca = lazy(() => import("./Pages/adminPages/Edit/Locations/EditLocations"));
const EditArticle = lazy(() => import("./Pages/adminPages/Edit/NewsAndArticles/EditArticle"));
const ArticlePage = lazy(() => import("./Pages/ArticlePage/ArticlePage"));
const AboutUs = lazy(() => import("./Pages/About/AboutUs"));
const Privacy = lazy(() => import("./Pages/Privacy/Privacy"));




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
      <Route path="/Offplan-Projects/:country" element={<Offplan />} />
      <Route path="/Offplan-Projects/:country/:q" element={<Offplan />} />
      <Route path="/Offplan-Projects/type/:type" element={<Offplan />}  />
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
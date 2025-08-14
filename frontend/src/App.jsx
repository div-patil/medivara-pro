import { Route } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Home from './pages/Home';
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import DoctorDetailPage from "./components/Doctor/DoctorDetailPage"
import DoctorList from "./pages/DoctorList";
import AppointmentSuccess from "./pages/appointment/AppointmentSuccess";
import AboutUs from "./pages/AboutUs";
import ContactSection from "./pages/ContactSection";
const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Layout />} >
      <Route index element={<Home/>} />
      <Route path= "/appointment-success" element={<AppointmentSuccess />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="doctors" element={<DoctorList />} />
      <Route path="doctors/:id" element={<DoctorDetailPage />} />
      <Route path="about-us" element={<AboutUs/>} />
      <Route path="contact-us" element={<ContactSection />} />
     </Route>
      </>
)) 
  export default router;
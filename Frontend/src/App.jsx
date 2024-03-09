import React, { useContext, useEffect } from "react";
import { Context } from "./main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Job from "./components/Job/Job";
import Jobdetails from "./components/Job/Jobdetails";
import Application from "./components/Applications/Application";
import Myapplication from "./components/Applications/Myapplication";
import Postjob from "./components/Job/Postjob";
import Myjob from "./components/Job/Myjob";
import './App.css'
import Notfound from "./components/NotFound/NotFound";
const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8002/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        console.log("response is",response);
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log("response is");
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  // if(isAuthorized)
  // {
  //   return <Navigate to="/"></Navigate>
  // }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Job/>} />
          <Route path="/job/:id" element={<Jobdetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<Myapplication />} />
          <Route path="/job/post" element={<Postjob />} />
          <Route path="/job/me" element={<Myjob />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App

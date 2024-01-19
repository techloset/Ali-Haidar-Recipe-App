import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Store from "./sotore/Stores";
import Receitas from "./receitas/Receitas";
import AllReceitas from "./allReceitas/AllReceitas";
import PageNotFound from "../components/PageNotFound";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";



const Routese: React.FC = () => {
  return (
    <>
 <TopNavbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/recite/:recpieId" element={<Receitas />} />
      <Route path="/recite" element={<AllReceitas />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer/>
    </>

  );
};

export default Routese;

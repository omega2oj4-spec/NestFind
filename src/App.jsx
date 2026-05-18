import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Featured from "./components/Featured";
import About from "./components/About";
import Client from "./components/Client";
import Last from "./components/Last";
import Footer from "./components/Footer";
import Properties from "./components/Properties";
import Filter from "./components/Filter";
import PropertyDetail from "./components/PropertyDetail";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <FavoritesProvider>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Featured />
              
              <section id="about"><About /></section>     {/* ✅ Add this */}
              <Client />
              <section id="contact"><Last /></section>    {/* ✅ Add this */}
              <Footer />
            </>
          } />
          <Route path="/properties" element={<Properties />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </FavoritesProvider>
  );
}

export default App;
/** @format */

import React, { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./home.css";
import Pricing from "../components/pricing/Pricing";
import About from "../components/about/About";
import Features from "../components/features/Features";
import Hero from "../components/hero/Hero";

const HomePage = () => {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="grow my-20">
        <section className="max-w-7xl mx-auto shadow-xl shadow-primary-500 flex flex-col lg:flex-row items-center justify-center lg:gap-20 lg:items-start py-8 lg:py-20">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="pricing" className="relative md:py-24 py-16">
          <Pricing />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;

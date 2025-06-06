import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutSection from './general/About';
import ServicesSection from './general/Service';
import ProjectsSection from './general/Project';
import ContactPage from './general/ContactPage';
import './Home.css';

const LandingPage = () => (
  <>
    <Navbar />
    <header className="home-container" id="home">
      <h1>Welcome to BuildTrack</h1>
      <p>Track your construction site progress efficiently and effortlessly.</p>
      <button className="get-started-btn" onClick={() => window.location.href = '/login'}>
        Get Started
      </button>
    </header>
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <section id="contact">
      <ContactPage />
    </section>
    <Footer />
  </>
);

export default LandingPage;
import React from 'react';
import './Navbar.css';
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">BuildTrack</div>
      <ul className="navbar-links">
        <li>
          <ScrollLink to="home" smooth={true} duration={600} offset={-70}>Home</ScrollLink>
        </li>
        <li>
          <ScrollLink to="about" smooth={true} duration={600} offset={-70}>About</ScrollLink>
        </li>
        <li>
          <ScrollLink to="services" smooth={true} duration={600} offset={-70}>Services</ScrollLink>
        </li>
        <li>
          <ScrollLink to="projects" smooth={true} duration={600} offset={-70}>Projects</ScrollLink>
        </li>
        <li>
          <ScrollLink to="contact" smooth={true} duration={600} offset={-70}>Contact</ScrollLink>
        </li>
        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
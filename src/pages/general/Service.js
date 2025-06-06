// src/components/ServicesSection.jsx
import React from 'react';
import './Service.css';

const services = [
  {
    title: 'Building Construction',
    icon:"data:image/png;base64,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",
    description:
      'At Digital Construction Management system, we specialize in building construction services that meet the needs of our clients across India.',
  },
  {
    title: 'House Renovation',
    icon: '/icons/renovation.png',
    description:
      'At Digital Construction Management system, we are committed to delivering exceptional results and customer service on every project.',
  },
  {
    title: 'Architecture Design',
    icon: '/icons/architecture.png',
    description:
      'We believe architecture is about creating spaces that inspire, evoke emotion, and stand the test of time.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
  {
    title: 'Material Supply',
    icon: '/icons/material.png',
    description:
      'We provide high-quality materials for all your construction and renovation needs.',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.icon} alt={service.title} className="service-icon" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

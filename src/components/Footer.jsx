// src/components/Footer/Footer.jsx
import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Divider sx={{ mb: 2 }} />
      <Box className="footer-content">
        <Box className="footer-left">
          <Typography variant="h6" className="footer-title">
            Construction Tracker
          </Typography>
          <Typography variant="body2" className="footer-text">
            Track your construction projects, manage tasks, and collaborate with ease.
          </Typography>
        </Box>
        <Box className="footer-right">
          <Typography variant="body1" className="footer-social-title">
            Connect with us:
          </Typography>
          <Box className="social-icons">
            <IconButton>
              <Facebook />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <LinkedIn />
            </IconButton>
            <IconButton>
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" className="footer-bottom">
        © {new Date().getFullYear()} Construction Site Progress Tracker. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

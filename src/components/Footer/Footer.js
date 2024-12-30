import React from "react";
import { useState, useEffect } from "react";
import getAPI from "../../api/getAPI";
import { toast } from "react-toastify";

const Footer = () => {
  const [footerText, setFooterText] = useState('2024 HRMGo');
  useEffect(() => {
    const fetchBusinessSetting = async () => {
      try {
        const response = await getAPI('/get-business-setting'); 
          const { footerText, } = response.data.data;
          setFooterText(footerText || '2024 HRMGo');
      } catch (error) {
        toast.error('Error fetching business settings');
      }
    };

    fetchBusinessSetting();
  }, []);
  return (
    <>
      <footer className="dash-footer">
        <div className="footer-wrapper">
          <div className="py-1">
            <span className="text-muted">© {footerText}</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

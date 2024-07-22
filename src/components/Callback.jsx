import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await axios.post(
            "https://api.instagram.com/oauth/access_token",
            {
              client_id: "YOUR_INSTAGRAM_APP_ID",
              client_secret: "YOUR_INSTAGRAM_APP_SECRET",
              grant_type: "authorization_code",
              redirect_uri: "http://localhost:5173/callback",
              code: code,
            }
          );

          localStorage.setItem(
            "instagram_access_token",
            response.data.access_token
          );
          navigate("/dashboard");
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    fetchAccessToken();
  }, [location, navigate]);

  return <div>Processing login...</div>;
};

export default Callback;

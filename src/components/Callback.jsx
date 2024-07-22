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
              client_id: import.meta.env.VITE_INSTAGRAM_APP_ID,
              client_secret: import.meta.env.VITE_INSTAGRAM_APP_SECRET,
              grant_type: "authorization_code",
              redirect_uri: import.meta.env.VITE_REDIRECT_URI,
              code: code,
            }
          );

          const longLivedTokenResponse = await axios.get(
            "https://graph.instagram.com/access_token",
            {
              params: {
                grant_type: "ig_exchange_token",
                client_secret: import.meta.env.VITE_INSTAGRAM_APP_SECRET,
                access_token: response.data.access_token,
              },
            }
          );

          localStorage.setItem(
            "instagram_access_token",
            longLivedTokenResponse.data.access_token
          );
          navigate("/dashboard");
        } catch (error) {
          console.error("Error fetching access token:", error);
          navigate("/");
        }
      }
    };

    fetchAccessToken();
  }, [location, navigate]);

  return <div>Processing login...</div>;
};

export default Callback;

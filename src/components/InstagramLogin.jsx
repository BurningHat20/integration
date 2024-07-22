import React, { useState } from "react";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  minTime: 1000, // Minimum time between requests (1 second)
});

const InstagramLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await limiter.schedule(() => {
        const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${
          import.meta.env.VITE_INSTAGRAM_APP_ID
        }&redirect_uri=${encodeURIComponent(
          import.meta.env.VITE_REDIRECT_URI
        )}&scope=user_profile,user_media&response_type=code`;
        window.location.href = instagramAuthUrl;
      });
    } catch (error) {
      console.error("Error initiating login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? "Please wait..." : "Login with Instagram"}
    </button>
  );
};

export default InstagramLogin;

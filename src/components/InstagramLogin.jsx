import React from "react";

const InstagramLogin = () => {
  const handleLogin = () => {
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=YOUR_INSTAGRAM_APP_ID&redirect_uri=${encodeURIComponent(
      "http://localhost:5173/callback"
    )}&scope=user_profile,user_media&response_type=code`;
    window.location.href = instagramAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login with Instagram
    </button>
  );
};

export default InstagramLogin;

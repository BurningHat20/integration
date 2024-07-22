import React from "react";

const InstagramLogin = () => {
  const handleLogin = () => {
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=1697770271009685&redirect_uri=${encodeURIComponent(
      "https://integration.burninghat.tech/callback"
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

import React from "react";

const InstagramLogin = () => {
  const handleLogin = () => {
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${
      import.meta.env.VITE_INSTAGRAM_APP_ID
    }&redirect_uri=${encodeURIComponent(
      import.meta.env.VITE_REDIRECT_URI
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

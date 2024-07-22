import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoUpload from "./PhotoUpload";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("instagram_access_token");
      try {
        const response = await axios.get(
          `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      {userData && <p className="mb-4">Welcome, {userData.username}!</p>}
      <PhotoUpload />
    </div>
  );
};

export default Dashboard;

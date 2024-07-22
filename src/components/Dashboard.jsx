import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("instagram_access_token");
      try {
        const userResponse = await axios.get(
          `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
        );
        setUserData(userResponse.data);

        const mediaResponse = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`
        );
        setMedia(mediaResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      {userData && <p className="mb-4">Welcome, {userData.username}!</p>}
      <div className="grid grid-cols-3 gap-4">
        {media.map((item) => (
          <div key={item.id} className="border p-2">
            {item.media_type === "IMAGE" && (
              <img
                src={item.media_url}
                alt={item.caption}
                className="w-full h-auto"
              />
            )}
            {item.media_type === "VIDEO" && (
              <video src={item.media_url} controls className="w-full h-auto" />
            )}
            <p className="mt-2">{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
    
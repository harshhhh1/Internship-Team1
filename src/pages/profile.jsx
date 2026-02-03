import React from "react";
import Profilecard from "../components/Profilecard";

function Profile() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex justify-center">
        <Profilecard />
      </div>
    </div>
  );
}

export default Profile;



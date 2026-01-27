import React from 'react';

const Profile = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <p><span className="font-semibold">Name:</span> Nikita Bhalerao</p>
        <p><span className="font-semibold">Email:</span> nikita@gmail.com</p>
        <p><span className="font-semibold">Role:</span> Admin</p>
      </div>
    </div>
  );
};

export default Profile;


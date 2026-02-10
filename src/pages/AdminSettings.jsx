import React, { useState } from "react";
import AddBranchModal from "../components/AddBranchModal";

const AdminSettings = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <button
        onClick={() => setOpen(true)}
        className="bg-amber-600 text-white px-5 py-2 rounded-lg"
      >
        Add New Branch
      </button>

      {open && <AddBranchModal close={() => setOpen(false)} />}
    </div>
  );
};

export default AdminSettings;

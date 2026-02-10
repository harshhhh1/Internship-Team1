import AddStaff from "../components/AddStaff";
import StaffList from "../components/StaffList";

export default function BranchDetails() {
  const salonId = "PUT_BRANCH_ID_HERE"; // TEMP hardcoded

  return (
    <div className="p-6">
      <AddStaff salonId={salonId} refresh={() => window.location.reload()} />
      <StaffList salonId={salonId} />
    </div>
  );
}

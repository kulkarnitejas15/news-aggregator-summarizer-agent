import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;

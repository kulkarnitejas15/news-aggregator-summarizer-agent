import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProfileForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-red-500">No user logged in</div>;
  }

  return (
    <div className="max-w-md p-6 bg-white shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-4">
        User Profile
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Display Name</p>
          <p className="font-medium">
            {user.displayName || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="font-medium text-xs break-all">
            {user.uid}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

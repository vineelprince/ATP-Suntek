import { useLocation, useNavigate } from "react-router";

function User() {
  let { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-lg font-medium text-slate-900">No user selected</p>
          <p className="mt-2 text-sm text-slate-600">Select a user from the list to view details.</p>
          <button
            onClick={() => navigate("/users-list")}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
          <p className="mt-2 text-slate-600">User Profile</p>
        </div>
        <button
          onClick={() => navigate("/users-list")}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          ← Back
        </button>
      </div>

      {/* Details Card */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          {/* Email */}
          <div>
            <p className="text-sm font-medium text-slate-600">Email Address</p>
            <p className="mt-2 text-base text-slate-900">{user.email}</p>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="text-sm font-medium text-slate-600">Date of Birth</p>
            <p className="mt-2 text-base text-slate-900">
              {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not provided"}
            </p>
          </div>

          {/* Mobile Number */}
          <div>
            <p className="text-sm font-medium text-slate-600">Mobile Number</p>
            <p className="mt-2 text-base text-slate-900">{user.mobileNumber || "Not provided"}</p>
          </div>

          {/* Account Status */}
          <div>
            <p className="text-sm font-medium text-slate-600">Account Status</p>
            <p className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
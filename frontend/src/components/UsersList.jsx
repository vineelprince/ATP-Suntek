import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function UsersList() {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [deleting, setDeleting] = useState(null);

  let navigate = useNavigate();

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";

  const fetchUsers = async () => {
    try {
      let res = await fetch(`${BASE_URL}/user-api/users`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 200) {
        let resObj = await res.json();

        let fetchedUsers = [];

        if (Array.isArray(resObj.payload)) {
          fetchedUsers = resObj.payload;
        } else if (Array.isArray(resObj.users)) {
          fetchedUsers = resObj.users;
        } else if (Array.isArray(resObj)) {
          fetchedUsers = resObj;
        }

        setUsers(fetchedUsers);
        setError(null);
      } else {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to load users"
        );
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } });
  };

  const deleteUser = async (userId, userName, e) => {
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    setDeleting(userId);

    try {
      let res = await fetch(`${BASE_URL}/user-api/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 200) {
        // Remove user from list
        setUsers(users.filter((u) => u._id !== userId));
        setError(null);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
          </div>
          <p className="text-slate-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-800">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Users
          </h1>
          <p className="mt-2 text-slate-600">
            {users.length} user{users.length !== 1 ? "s" : ""} in the system
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <p className="text-lg text-slate-600">No users yet</p>
          <p className="mt-2 text-sm text-slate-500">Create your first user to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((userObj) => (
            <div
              key={userObj._id}
              className="rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <button
                onClick={() => gotoUser(userObj)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">
                      {userObj.name}
                    </h3>
                    <p className="mt-1 truncate text-sm text-slate-600">
                      {userObj.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-500 uppercase">View Details</span>
                  <span className="text-slate-400">→</span>
                </div>
              </button>

              {/* Delete Button */}
              <div className="border-t border-slate-100 px-6 py-3">
                <button
                  onClick={(e) => deleteUser(userObj._id, userObj.name, e)}
                  disabled={deleting === userObj._id}
                  className="w-full rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                >
                  {deleting === userObj._id ? "Deleting..." : "Delete User"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;
import React, { useState, useEffect } from "react";

function Home() {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:4000";

    async function fetchUserCount() {
      try {
        const res = await fetch(`${BASE_URL}/user-api/users`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const resObj = await res.json();
          let users = [];

          if (Array.isArray(resObj.payload)) {
            users = resObj.payload;
          } else if (Array.isArray(resObj.users)) {
            users = resObj.users;
          } else if (Array.isArray(resObj)) {
            users = resObj;
          }

          setUserCount(users.length);
        }
      } catch (err) {
        console.log("Error fetching user count:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserCount();
    
    // Refresh every 5 seconds to stay updated
    const interval = setInterval(fetchUserCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 px-8 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            User Management System
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            A clean, modern interface to manage your users. Add, view, and organize user profiles with ease.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {loading ? "..." : userCount}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3">
              <span className="text-xl">👥</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Quick Actions</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3">
              <span className="text-xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Features</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">CRUD</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3">
              <span className="text-xl">✨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Features</h2>
        <div className="mt-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-900">1</div>
            <div>
              <p className="font-medium text-slate-900">Create Users</p>
              <p className="mt-1 text-sm text-slate-600">Add new users with name, email, date of birth, and mobile number.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-900">2</div>
            <div>
              <p className="font-medium text-slate-900">View All Users</p>
              <p className="mt-1 text-sm text-slate-600">Browse all users in a clean, organized grid layout with quick access to details.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-900">3</div>
            <div>
              <p className="font-medium text-slate-900">Inspect Details</p>
              <p className="mt-1 text-sm text-slate-600">Click on any user to view their complete profile information.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
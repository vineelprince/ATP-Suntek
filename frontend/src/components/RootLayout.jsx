import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
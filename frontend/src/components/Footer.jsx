import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <span className="font-semibold text-slate-900">Users</span>
          </div>
          <p className="text-sm text-slate-600">
            &copy; {currentYear} User Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
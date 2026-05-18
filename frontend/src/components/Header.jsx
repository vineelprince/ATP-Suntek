import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
              <span className="text-lg font-bold text-white">U</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">Users</span>
          </div>

          {/* Navigation */}
          <ul className="flex gap-1">
            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive
                    ? "rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900"
                    : "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-user"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900"
                    : "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                }
              >
                Add User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users-list"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900"
                    : "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                }
              >
                Users List
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
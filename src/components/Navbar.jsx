import { NavLink } from "react-router-dom";
import { Compass, Home, Mic, User } from "lucide-react";

const links = [
  { to: "/home", label: "Feed", icon: Home },
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/grabar", label: "Grabar", icon: Mic },
  { to: "/profile", label: "Perfil", icon: User },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-t border-white/10">
      <div className="max-w-5xl mx-auto flex items-stretch justify-around h-16">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 flex-1 text-xs transition ${
                isActive
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "fill-white/10" : ""
                  }`}
                />
                <span
                  className={isActive ? "font-semibold" : ""}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

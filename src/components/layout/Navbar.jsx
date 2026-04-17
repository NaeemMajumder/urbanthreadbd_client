import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import logoDark from "../../assets/logo-dark.png";

const Navbar = () => {
  const { isLoggedIn, user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/products" },
    { label: "Categories", to: "/products?view=categories" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#222]"
      style={{
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logoDark} alt="UrbanThread BD" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-[#AAFF00]"
                      : "text-[#888] hover:text-[#F0F0F0]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-[#888] hover:text-[#AAFF00] transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#AAFF00] text-[#0A0A0A] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* User Section — Desktop */}
            <div className="hidden md:block relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setUserDropOpen(!userDropOpen)}
                    className="flex items-center gap-2 text-sm text-[#888] hover:text-[#F0F0F0] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#AAFF00] flex items-center justify-center">
                      <span className="text-[#0A0A0A] font-bold text-xs">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${userDropOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {userDropOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#333] rounded-lg shadow-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#333]">
                        <p className="text-sm font-medium text-[#F0F0F0]">
                          {user?.name}
                        </p>
                        <p className="text-xs text-[#888] truncate">
                          {user?.phone}
                        </p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-[#888] hover:text-[#F0F0F0] hover:bg-[#2A2A2A] transition-colors"
                      >
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-[#888] hover:text-[#AAFF00] hover:bg-[#2A2A2A] transition-colors"
                        >
                          <Shield size={15} />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#888] hover:text-red-400 hover:bg-[#2A2A2A] transition-colors"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 border border-[#AAFF00] text-[#AAFF00] text-sm font-medium rounded hover:bg-[#AAFF00] hover:text-[#0A0A0A] transition-all duration-200"
                  style={{ padding: "8px 16px" }}
                >
                  <User size={15} />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[#888] hover:text-[#F0F0F0] transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-t border-[#333] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 text-sm font-medium tracking-widest uppercase rounded transition-colors ${
                  isActive
                    ? "text-[#AAFF00] bg-[#1A1A1A]"
                    : "text-[#888] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="border-t border-[#333] pt-3 mt-3">
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 mb-2">
                  <p className="text-sm font-medium text-[#F0F0F0]">
                    {user?.name}
                  </p>
                  <p className="text-xs text-[#888]">{user?.phone}</p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-[#888] hover:text-[#F0F0F0] hover:bg-[#1A1A1A] rounded transition-colors"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm text-[#888] hover:text-[#AAFF00] hover:bg-[#1A1A1A] rounded transition-colors"
                  >
                    <Shield size={15} />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-sm text-[#888] hover:text-red-400 hover:bg-[#1A1A1A] rounded transition-colors"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 mx-3 py-3 border border-[#AAFF00] text-[#AAFF00] text-sm font-medium rounded hover:bg-[#AAFF00] hover:text-[#0A0A0A] transition-all"
              >
                <User size={15} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

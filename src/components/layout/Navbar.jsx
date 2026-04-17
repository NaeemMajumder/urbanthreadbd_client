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
        <div
          style={{
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid #222",
            padding: "8px 0 24px 0",
          }}
        >
          {/* Nav Links */}
          <div style={{ padding: "8px 16px" }}>
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "block" : "block")}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 12px",
                  marginBottom: "4px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  background: isActive ? "rgba(170,255,0,0.1)" : "transparent",
                  color: isActive ? "#AAFF00" : "#888",
                  borderLeft: isActive
                    ? "3px solid #AAFF00"
                    : "3px solid transparent",
                })}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span style={{ color: "#AAFF00", fontSize: "10px" }}>
                        ●
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{ height: "1px", background: "#1A1A1A", margin: "8px 16px" }}
          />

          {/* User Section */}
          <div style={{ padding: "12px 16px" }}>
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    background: "#1A1A1A",
                    borderRadius: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#AAFF00",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      color: "#0A0A0A",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#F0F0F0",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {user?.name}
                    </p>
                    <p style={{ color: "#555", fontSize: "12px" }}>
                      {user?.phone}
                    </p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px",
                    borderRadius: "8px",
                    color: "#888",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#1A1A1A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px",
                      borderRadius: "8px",
                      color: "#AAFF00",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    <Shield size={16} /> Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px",
                    borderRadius: "8px",
                    color: "#FF4444",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    width: "100%",
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px",
                  background: "#AAFF00",
                  color: "#0A0A0A",
                  fontWeight: "700",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                <User size={16} /> LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

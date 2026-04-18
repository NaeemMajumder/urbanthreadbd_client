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
import { authAPI } from "../../api/auth.api";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isLoggedIn, user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // error হলেও logout করবো
      console.error(err);
    } finally {
      logout();
      setUserDropOpen(false);
      navigate("/");
      toast.success("Logged out!");
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/products" },
    { label: "Categories", to: "/categories" },
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
                end
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #AAFF00, #88CC00)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "800",
                        color: "#0A0A0A",
                        boxShadow: userDropOpen
                          ? "0 0 16px rgba(170,255,0,0.4)"
                          : "0 0 8px rgba(170,255,0,0.2)",
                        transition: "box-shadow 0.2s ease",
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <ChevronDown
                      size={14}
                      color="#555"
                      style={{
                        transform: userDropOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  {/* Dropdown */}
                  {userDropOpen && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 12px)",
                        width: "220px",
                        background: "rgba(15,15,15,0.98)",
                        border: "1px solid #222",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow:
                          "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(170,255,0,0.05)",
                        animation: "dropDown 0.2s ease",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* Neon top line */}
                      <div
                        style={{
                          height: "2px",
                          background:
                            "linear-gradient(to right, transparent, #AAFF00, transparent)",
                        }}
                      />

                      {/* User Info */}
                      <div
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #1A1A1A",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #AAFF00, #88CC00)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "16px",
                              fontWeight: "800",
                              color: "#0A0A0A",
                              flexShrink: 0,
                              boxShadow: "0 0 12px rgba(170,255,0,0.3)",
                            }}
                          >
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p
                              style={{
                                color: "#F0F0F0",
                                fontSize: "13px",
                                fontWeight: "700",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user?.name}
                            </p>
                            <p
                              style={{
                                color: "#555",
                                fontSize: "11px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user?.phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div style={{ padding: "6px" }}>
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            color: "#888",
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#1A1A1A";
                            e.currentTarget.style.color = "#F0F0F0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#888";
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "6px",
                              background: "#1A1A1A",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#AAFF00",
                            }}
                          >
                            <LayoutDashboard size={14} />
                          </div>
                          Dashboard
                        </Link>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropOpen(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "10px 12px",
                              borderRadius: "8px",
                              color: "#888",
                              textDecoration: "none",
                              fontSize: "13px",
                              fontWeight: "500",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#1A1A1A";
                              e.currentTarget.style.color = "#AAFF00";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#888";
                            }}
                          >
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                background: "rgba(170,255,0,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#AAFF00",
                              }}
                            >
                              <Shield size={14} />
                            </div>
                            Admin Panel
                          </Link>
                        )}

                        {/* Divider */}
                        <div
                          style={{
                            height: "1px",
                            background: "#1A1A1A",
                            margin: "6px 0",
                          }}
                        />

                        <button
                          onClick={handleLogout}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            color: "#888",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.15s ease",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,68,68,0.08)";
                            e.currentTarget.style.color = "#FF4444";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#888";
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "6px",
                              background: "#1A1A1A",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#FF4444",
                            }}
                          >
                            <LogOut size={14} />
                          </div>
                          Logout
                        </button>
                      </div>
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

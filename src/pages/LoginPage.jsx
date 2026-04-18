import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { authAPI } from "../api/auth.api";
import toast from "react-hot-toast";
import logoDark from "../assets/logo-dark.png";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.phone.trim()) return toast.error("Phone number দাও");
    const phoneRegex = /^(\+880|880|0)1[3-9]\d{8}$/;
    if (!phoneRegex.test(form.phone.trim()))
      return toast.error("Valid phone number দাও (01XXXXXXXXX)");
    if (!form.password.trim()) return toast.error("Password দাও");
    if (form.password.length < 6)
      return toast.error("Password কমপক্ষে ৬ characters");

    setLoading(true);
    try {
      const res = await authAPI.login({
        phone: form.phone.trim(),
        password: form.password,
      });
      const { user, token } = res.data.data;
      login(user, token);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(from, { replace: true });
    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Phone বা password ভুল হয়েছে";

      toast.error(message);

      // Password field clear করো
      setForm((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "#0F0F0F",
    border: "1px solid #222",
    borderRadius: "8px",
    color: "#F0F0F0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    color: "#888",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input:focus { border-color: #AAFF00 !important; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(170,255,0,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(170,255,0,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Left — Branding */}
        <div
          className="login-left"
          style={{
            width: "45%",
            flexShrink: 0,
            background: "linear-gradient(135deg, #0F0F0F 0%, #111 100%)",
            borderRight: "1px solid #1A1A1A",
            padding: "60px",
            flexDirection: "column",
            justifyContent: "space-between",
            display: "none",
          }}
        >
          <img
            src={logoDark}
            alt="UrbanThread BD"
            style={{
              height: "32px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(3rem, 4vw, 5rem)",
                color: "#F0F0F0",
                lineHeight: 0.95,
                marginBottom: "20px",
              }}
            >
              WEAR THE
              <br />
              <span style={{ color: "#AAFF00" }}>STREETS</span>
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "320px",
              }}
            >
              Login করো এবং তোমার favorite streetwear collection explore করো।
            </p>
          </div>
          <p style={{ color: "#444", fontSize: "12px" }}>
            © 2025 UrbanThread BD
          </p>
        </div>

        {/* Right — Form */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              animation: "fadeUp 0.5s ease",
            }}
          >
            {/* Mobile Logo */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <Link to="/">
                <img
                  src={logoDark}
                  alt="UrbanThread BD"
                  style={{
                    height: "32px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <h1
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "2.5rem",
                  color: "#F0F0F0",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                WELCOME BACK
              </h1>
              <p style={{ color: "#555", fontSize: "14px" }}>
                তোমার account এ login করো
              </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                placeholder="+8801XXXXXXXXX"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                onKeyDown={handleKeyDown}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ ...inputStyle, paddingRight: "48px" }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#555",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="button" // ← add করো
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                background: loading ? "#888" : "#AAFF00",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "800",
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                marginBottom: "20px",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#88CC00";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(170,255,0,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = loading ? "#888" : "#AAFF00";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  {" "}
                  Login <ArrowRight size={16} />{" "}
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "#1A1A1A" }} />
              <span style={{ color: "#444", fontSize: "12px" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "#1A1A1A" }} />
            </div>

            <p style={{ textAlign: "center", color: "#555", fontSize: "14px" }}>
              Account নেই?{" "}
              <Link
                to="/register"
                style={{
                  color: "#AAFF00",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Register করো
              </Link>
            </p>

            <p style={{ textAlign: "center", marginTop: "24px" }}>
              <Link
                to="/"
                style={{
                  color: "#555",
                  fontSize: "12px",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#AAFF00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`@media (min-width: 900px) { .login-left { display: flex !important; } }`}</style>
    </>
  );
};

export default LoginPage;

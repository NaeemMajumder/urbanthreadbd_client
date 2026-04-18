import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Package,
  Lock,
  LogOut,
  ChevronRight,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { orderAPI } from "../api/order.api";

const statusConfig = {
  pending: { label: "Pending", color: "#888", bg: "rgba(136,136,136,0.1)" },
  processing: {
    label: "Processing",
    color: "#FF8800",
    bg: "rgba(255,136,0,0.1)",
  },
  shipped: { label: "Shipped", color: "#00AAFF", bg: "rgba(0,170,255,0.1)" },
  delivered: {
    label: "Delivered",
    color: "#AAFF00",
    bg: "rgba(170,255,0,0.1)",
  },
};

// ── Sidebar Menu ─────────────────────────────────────────────
const menuItems = [
  { id: "orders", icon: <Package size={18} />, label: "My Orders" },
  { id: "profile", icon: <User size={18} />, label: "Profile" },
  { id: "password", icon: <Lock size={18} />, label: "Change Password" },
];

// ── Orders Tab ───────────────────────────────────────────────
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getMyOrders();
        setOrders(res.data.data);
      } catch (err) {
        console.error("Orders fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: "80px",
              background: "#111",
              borderRadius: "10px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    );

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "#AAFF00",
            fontWeight: "700",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          — Order History
        </span>
        <h2
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "2rem",
            color: "#F0F0F0",
            lineHeight: 1,
            marginTop: "6px",
          }}
        >
          MY ORDERS ({orders.length})
        </h2>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.3 }}>
            📦
          </div>
          <h3
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "1.8rem",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            NO ORDERS YET
          </h3>
          <p style={{ color: "#555", fontSize: "13px" }}>
            এখনো কোনো order করোনি।
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {orders.map((order, i) => {
            const status =
              statusConfig[order.orderStatus] || statusConfig.pending;
            const isExpanded = expanded === order._id;

            return (
              <div
                key={order._id}
                style={{
                  background: "#111",
                  border: `1px solid ${isExpanded ? "#333" : "#1A1A1A"}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                  animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
                }}
              >
                {/* Order Header */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : order._id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    cursor: "pointer",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          color: "#555",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "2px",
                        }}
                      >
                        Order ID
                      </p>
                      <p
                        style={{
                          color: "#F0F0F0",
                          fontSize: "13px",
                          fontWeight: "700",
                          fontFamily: "monospace",
                        }}
                      >ORD-{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#555",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "2px",
                        }}
                      >
                        Date
                      </p>
                      <p style={{ color: "#888", fontSize: "13px" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-BD")}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#555",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "2px",
                        }}
                      >
                        Items
                      </p>
                      <p style={{ color: "#888", fontSize: "13px" }}>
                        {order.items.length} items
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#555",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "2px",
                        }}
                      >
                        Total
                      </p>
                      <p
                        style={{
                          color: "#AAFF00",
                          fontSize: "14px",
                          fontWeight: "800",
                        }}
                      >
                        ৳
                        {(
                          order.totalAmount + order.deliveryCharge
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        background: status.bg,
                        color: status.color,
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      ● {status.label}
                    </span>
                    <ChevronRight
                      size={16}
                      color="#555"
                      style={{
                        transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    style={{
                      borderTop: "1px solid #1A1A1A",
                      padding: "20px 24px",
                      animation: "fadeUp 0.2s ease",
                    }}
                  >
                    {order.items.map((item, j) => (
                      <div
                        key={item._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom:
                            j < order.items.length - 1
                              ? "1px solid #1A1A1A"
                              : "none",
                        }}
                      >
                        <Link
                          to={`/products/${item.productId}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            textDecoration: "none",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              width: "52px",
                              height: "52px",
                              flexShrink: 0,
                              background: "#1A1A1A",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.5rem",
                              opacity: 0.6,
                            }}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />
                            ) : item.name?.toLowerCase().includes("hoodie") ? (
                              "🧥"
                            ) : item.name?.toLowerCase().includes("jogger") ? (
                              "👖"
                            ) : item.name?.toLowerCase().includes("cap") ? (
                              "🧢"
                            ) : (
                              "👕"
                            )}
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#F0F0F0",
                                fontSize: "13px",
                                fontWeight: "600",
                                marginBottom: "4px",
                              }}
                            >
                              {item.name}
                            </p>
                            <p style={{ color: "#555", fontSize: "11px" }}>
                              {item.size} · {item.color} · ×{item.quantity}
                            </p>
                          </div>
                        </Link>
                        <span
                          style={{
                            color: "#888",
                            fontSize: "13px",
                            flexShrink: 0,
                            marginLeft: "12px",
                          }}
                        >
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}

                    {/* Order Footer */}
                    <div
                      style={{
                        marginTop: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "16px" }}>
                        <span style={{ color: "#555", fontSize: "12px" }}>
                          Payment:{" "}
                          <span
                            style={{
                              color: "#888",
                              textTransform: "uppercase",
                            }}
                          >
                            {order.paymentMethod}
                          </span>
                        </span>
                        <span style={{ color: "#555", fontSize: "12px" }}>
                          Delivery:{" "}
                          <span
                            style={{
                              color:
                                order.deliveryCharge === 0 ? "#AAFF00" : "#888",
                            }}
                          >
                            {order.deliveryCharge === 0
                              ? "FREE"
                              : `৳${order.deliveryCharge}`}
                          </span>
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            color: "#555",
                            fontSize: "11px",
                            marginBottom: "2px",
                          }}
                        >
                          Total
                        </p>
                        <p
                          style={{
                            color: "#AAFF00",
                            fontSize: "16px",
                            fontWeight: "800",
                            fontFamily: "'Bebas Neue', cursive",
                          }}
                        >
                          ৳
                          {(
                            order.totalAmount + order.deliveryCharge
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Profile Tab ──────────────────────────────────────────────
const ProfileTab = ({ user, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: "",
  });

  const handleSave = () => {
    // Name validation
    if (!form.name.trim()) return toast.error("Name দাও");
    if (form.name.trim().length < 2)
      return toast.error("Name কমপক্ষে ২ characters");

    // Phone validation
    const phoneRegex = /^(\+880|880|0)1[3-9]\d{8}$/;
    if (!phoneRegex.test(form.phone.trim())) {
      return toast.error("Valid phone number দাও (01XXXXXXXXX)");
    }

    // Email validation (optional কিন্তু দিলে valid হতে হবে)
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return toast.error("Valid email দাও");
    }

    setEditing(false);

    onUpdate({ ...user, name: form.name.trim(), phone: form.phone.trim() });
    toast.success("Profile updated!");
    setEditing(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
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
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "#AAFF00",
            fontWeight: "700",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          — Account
        </span>
        <h2
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "2rem",
            color: "#F0F0F0",
            lineHeight: 1,
            marginTop: "6px",
          }}
        >
          MY PROFILE
        </h2>
      </div>

      <div
        style={{
          background: "#111",
          border: "1px solid #1A1A1A",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#AAFF00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "800",
              color: "#0A0A0A",
              flexShrink: 0,
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h3
              style={{
                color: "#F0F0F0",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              {user?.name}
            </h3>
            <p style={{ color: "#555", fontSize: "13px" }}>{user?.phone}</p>
            <span
              style={{
                display: "inline-block",
                marginTop: "6px",
                padding: "2px 10px",
                background: "rgba(170,255,0,0.1)",
                border: "1px solid rgba(170,255,0,0.2)",
                color: "#AAFF00",
                fontSize: "10px",
                fontWeight: "700",
                borderRadius: "20px",
                letterSpacing: "0.1em",
              }}
            >
              {user?.role?.toUpperCase() || "USER"}
            </span>
          </div>
        </div>

        {/* Form */}
        <style>{`input:focus { border-color: #AAFF00 !important; }`}</style>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              disabled={!editing}
              style={{
                ...inputStyle,
                opacity: editing ? 1 : 0.6,
                cursor: editing ? "text" : "default",
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              disabled={!editing}
              style={{
                ...inputStyle,
                opacity: editing ? 1 : 0.6,
                cursor: editing ? "text" : "default",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>Email (Optional)</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            disabled={!editing}
            style={{
              ...inputStyle,
              opacity: editing ? 1 : 0.6,
              cursor: editing ? "text" : "default",
            }}
          />
        </div>

        {/* Buttons */}
        {editing ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 24px",
                background: "#AAFF00",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "13px",
                transition: "all 0.2s ease",
              }}
            >
              <Check size={15} /> Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 24px",
                background: "transparent",
                border: "1px solid #333",
                color: "#888",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                transition: "all 0.2s ease",
              }}
            >
              <X size={15} /> Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 24px",
              background: "transparent",
              border: "1px solid #333",
              color: "#888",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#AAFF00";
              e.currentTarget.style.color = "#AAFF00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.color = "#888";
            }}
          >
            <Edit2 size={15} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

// ── PasswordTab এর আগে রাখো ─────────────────────────────────
const PasswordField = ({
  label,
  field,
  form,
  setForm,
  show,
  setShow,
  showKey,
}) => (
  <div style={{ marginBottom: "16px" }}>
    <label
      style={{
        display: "block",
        color: "#888",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "8px",
      }}
    >
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <input
        type={show[showKey] ? "text" : "password"}
        value={form[field]}
        onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "#0F0F0F",
          border: "1px solid #222",
          borderRadius: "8px",
          color: "#F0F0F0",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
          paddingRight: "48px",
        }}
      />
      <button
        onClick={() => setShow((p) => ({ ...p, [showKey]: !p[showKey] }))}
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "#555",
          cursor: "pointer",
        }}
      >
        {show[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);

// ── Password Tab ─────────────────────────────────────────────
const PasswordTab = () => {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = () => {
    if (!form.current) return toast.error("Current password দাও");
    if (form.newPass.length < 6)
      return toast.error("New password কমপক্ষে ৬ characters");
    if (form.newPass !== form.confirm)
      return toast.error("Password match করেনি");
    toast.success("Password changed!");
    setForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "#AAFF00",
            fontWeight: "700",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          — Security
        </span>
        <h2
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "2rem",
            color: "#F0F0F0",
            lineHeight: 1,
            marginTop: "6px",
          }}
        >
          CHANGE PASSWORD
        </h2>
      </div>

      <div
        style={{
          background: "#111",
          border: "1px solid #1A1A1A",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "480px",
        }}
      >
        <style>{`input:focus { border-color: #AAFF00 !important; }`}</style>
        <PasswordField
          label="Current Password"
          field="current"
          showKey="current"
          form={form}
          setForm={setForm}
          show={show}
          setShow={setShow}
        />
        <PasswordField
          label="New Password"
          field="newPass"
          showKey="new"
          form={form}
          setForm={setForm}
          show={show}
          setShow={setShow}
        />
        <PasswordField
          label="Confirm New Password"
          field="confirm"
          showKey="confirm"
          form={form}
          setForm={setForm}
          show={show}
          setShow={setShow}
        />

        <button
          onClick={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            background: "#AAFF00",
            color: "#0A0A0A",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "800",
            fontSize: "13px",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
            marginTop: "8px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#88CC00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#AAFF00")}
        >
          <Lock size={15} /> Update Password
        </button>
      </div>
    </div>
  );
};

// ── Main Dashboard ───────────────────────────────────────────
const DashboardPage = () => {
  const { user: authUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [localUser, setLocalUser] = useState(authUser);

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <>
      <style>{`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr !important;
      }
      .dashboard-sidebar {
        position: relative !important;
        top: 0 !important;
        max-width: 100% !important;
      }
    }
  `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          paddingTop: "88px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
        >
          {/* Header */}
          <div style={{ marginBottom: "40px", animation: "fadeUp 0.4s ease" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#AAFF00",
                fontWeight: "700",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              — Account
            </span>
            <h1
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#F0F0F0",
                lineHeight: 1,
                marginTop: "6px",
              }}
            >
              MY DASHBOARD
            </h1>
          </div>

          <div
            className="dashboard-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 260px) 1fr",
              gap: "32px",
              alignItems: "flex-start",
            }}
          >
            {/* ── Sidebar ───────────────────────────────── */}
            <div
              className="dashboard-sidebar"
              style={{
                background: "#111",
                border: "1px solid #1A1A1A",
                borderRadius: "12px",
                overflow: "hidden",
                position: "sticky",
                top: "88px",
                animation: "fadeUp 0.5s ease",
                maxWidth: "260px",
              }}
            >
              {/* User info */}
              <div
                style={{ padding: "24px", borderBottom: "1px solid #1A1A1A" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "#AAFF00",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "800",
                      color: "#0A0A0A",
                      flexShrink: 0,
                    }}
                  >
                    {localUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        color: "#F0F0F0",
                        fontSize: "14px",
                        fontWeight: "700",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {localUser?.name || "User"}
                    </p>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {localUser?.phone || ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div style={{ padding: "8px" }}>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background:
                        activeTab === item.id
                          ? "rgba(170,255,0,0.1)"
                          : "transparent",
                      border: `1px solid ${activeTab === item.id ? "rgba(170,255,0,0.2)" : "transparent"}`,
                      color: activeTab === item.id ? "#AAFF00" : "#888",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      marginBottom: "4px",
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== item.id)
                        e.currentTarget.style.background = "#1A1A1A";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== item.id)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}

                {/* Admin Panel Link */}
                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: "rgba(170,255,0,0.05)",
                      border: "1px solid rgba(170,255,0,0.1)",
                      color: "#AAFF00",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      textAlign: "left",
                      marginBottom: "4px",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#AAFF00";
                      e.currentTarget.style.background = "#1A1A1A";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#AAFF00";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    🛡️ Admin Panel
                  </button>
                )}

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "#1A1A1A",
                    margin: "8px 0",
                  }}
                />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "1px solid transparent",
                    color: "#555",
                    cursor: "pointer",
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FF4444";
                    e.currentTarget.style.background = "rgba(255,68,68,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>

            {/* ── Main Content ──────────────────────────── */}
            <div
              style={{ flex: 1, minWidth: 0, animation: "fadeUp 0.6s ease" }}
            >
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "profile" && (
                <ProfileTab
                  user={localUser}
                  onUpdate={(updated) => setLocalUser(updated)}
                />
              )}
              {activeTab === "password" && <PasswordTab />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

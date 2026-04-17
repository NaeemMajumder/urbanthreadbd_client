import { useState } from "react";
import { createPortal } from 'react-dom'
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Search,
  Eye,
  AlertTriangle,
  Tag,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

// ── Mock Data ────────────────────────────────────────────────
const mockStats = {
  totalOrders: 128,
  totalRevenue: 284500,
  totalProducts: 48,
  newOrdersToday: 7,
};

const initialProducts = [
  {
    _id: "1",
    name: "Oversized Urban Tee",
    price: 1200,
    discountPrice: 950,
    category: "tshirt",
    stock: 10,
    isActive: true,
  },
  {
    _id: "2",
    name: "Street Hoodie Black",
    price: 2500,
    discountPrice: 1999,
    category: "hoodie",
    stock: 5,
    isActive: true,
  },
  {
    _id: "3",
    name: "Cargo Jogger Grey",
    price: 1800,
    discountPrice: 1499,
    category: "jogger",
    stock: 8,
    isActive: true,
  },
  {
    _id: "4",
    name: "UT Signature Cap",
    price: 800,
    discountPrice: 650,
    category: "cap",
    stock: 20,
    isActive: true,
  },
  {
    _id: "5",
    name: "Graphic Print Tee",
    price: 1100,
    discountPrice: null,
    category: "tshirt",
    stock: 0,
    isActive: false,
  },
  {
    _id: "6",
    name: "Zip-Up Hoodie Olive",
    price: 2800,
    discountPrice: 2299,
    category: "hoodie",
    stock: 3,
    isActive: true,
  },
];

const initialOrders = [
  {
    _id: "ORD-001",
    user: "Rahim Ahmed",
    phone: "01711111111",
    total: 2550,
    status: "delivered",
    date: "2025-04-10",
    payment: "cod",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    items: [
      {
        name: "Oversized Urban Tee",
        size: "M",
        color: "black",
        quantity: 2,
        price: 950,
      },
      {
        name: "UT Signature Cap",
        size: "Free",
        color: "black",
        quantity: 1,
        price: 650,
      },
    ],
  },
  {
    _id: "ORD-005",
    user: "Rahim Ahmed",
    phone: "01711111111",
    total: 950,
    status: "pending",
    date: "2025-04-18",
    payment: "cod",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    items: [
      {
        name: "Oversized Urban Tee",
        size: "L",
        color: "white",
        quantity: 1,
        price: 950,
      },
    ],
  },
  {
    _id: "ORD-002",
    user: "Karim Khan",
    phone: "01722222222",
    total: 2059,
    status: "shipped",
    date: "2025-04-14",
    payment: "bkash",
    address: "House 5, Road 3, Gulshan, Dhaka",
    items: [
      {
        name: "Street Hoodie Black",
        size: "L",
        color: "black",
        quantity: 1,
        price: 1999,
      },
    ],
  },
  {
    _id: "ORD-003",
    user: "Nadia Islam",
    phone: "01733333333",
    total: 3699,
    status: "processing",
    date: "2025-04-17",
    payment: "cod",
    address: "House 8, Road 2, Mirpur, Dhaka",
    items: [
      {
        name: "Cargo Jogger Grey",
        size: "M",
        color: "grey",
        quantity: 1,
        price: 1499,
      },
      {
        name: "Graphic Print Tee",
        size: "L",
        color: "white",
        quantity: 2,
        price: 1100,
      },
    ],
  },
  {
    _id: "ORD-004",
    user: "Sakib Ahmed",
    phone: "01744444444",
    total: 1499,
    status: "pending",
    date: "2025-04-18",
    payment: "cod",
    address: "House 3, Road 1, Uttara, Dhaka",
    items: [
      {
        name: "Cargo Jogger Grey",
        size: "S",
        color: "black",
        quantity: 1,
        price: 1499,
      },
    ],
  },
];

const initialUsers = [
  {
    _id: "1",
    name: "Rahim Ahmed",
    phone: "01711111111",
    email: "rahim@example.com",
    orders: 3,
    joined: "2025-01-10",
    role: "user",
  },
  {
    _id: "2",
    name: "Karim Khan",
    phone: "01722222222",
    email: "karim@example.com",
    orders: 1,
    joined: "2025-02-14",
    role: "user",
  },
  {
    _id: "3",
    name: "Nadia Islam",
    phone: "01733333333",
    email: "nadia@example.com",
    orders: 5,
    joined: "2025-03-01",
    role: "user",
  },
  {
    _id: "4",
    name: "Admin User",
    phone: "01799999999",
    email: "admin@urbanthread.com",
    orders: 0,
    joined: "2025-01-01",
    role: "admin",
  },
];

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

const initialCategories = [
  {
    _id: "1",
    name: "T-Shirts",
    slug: "tshirt",
    image: "",
    productCount: 45,
    parentCategory: null,
    isActive: true,
  },
  {
    _id: "2",
    name: "Hoodies",
    slug: "hoodie",
    image: "",
    productCount: 28,
    parentCategory: null,
    isActive: true,
  },
  {
    _id: "3",
    name: "Joggers",
    slug: "jogger",
    image: "",
    productCount: 32,
    parentCategory: null,
    isActive: true,
  },
  {
    _id: "4",
    name: "Caps",
    slug: "cap",
    image: "",
    productCount: 19,
    parentCategory: null,
    isActive: true,
  },
];

const categories = ["tshirt", "hoodie", "jogger", "cap"];
const orderStatuses = ["pending", "processing", "shipped", "delivered"];

// ── Confirm Delete Modal ──────────────────────────────────────
const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
  <>
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 200,
        backdropFilter: "blur(4px)",
      }}
    />
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#111",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "32px",
        width: "90%",
        maxWidth: "380px",
        zIndex: 201,
        textAlign: "center",
        animation: "modalIn 0.25s ease",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "rgba(255,68,68,0.1)",
          border: "1px solid rgba(255,68,68,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          color: "#FF4444",
        }}
      >
        <AlertTriangle size={24} />
      </div>
      <h3
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "1.5rem",
          color: "#F0F0F0",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#888",
          fontSize: "13px",
          marginBottom: "24px",
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          onClick={onCancel}
          style={{
            padding: "10px 24px",
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: "10px 24px",
            background: "#FF4444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </>
);

// ── Order Detail Modal ────────────────────────────────────────
const OrderDetailModal = ({ order, onClose }) => {
  const status = statusConfig[order.status];
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 200,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "12px",
          padding: "32px",
          width: "90%",
          maxWidth: "560px",
          zIndex: 201,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "modalIn 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1.5rem",
                color: "#F0F0F0",
              }}
            >
              ORDER DETAILS
            </h3>
            <p
              style={{
                color: "#555",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              #{order._id}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#555",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            padding: "12px 16px",
            background: status.bg,
            borderRadius: "8px",
            border: `1px solid ${status.color}30`,
          }}
        >
          <span
            style={{ color: status.color, fontSize: "13px", fontWeight: "700" }}
          >
            ● {status.label}
          </span>
          <span style={{ color: "#555", fontSize: "12px" }}>{order.date}</span>
        </div>
        <div
          style={{
            background: "#0F0F0F",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              color: "#555",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px",
            }}
          >
            Customer Info
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {[
              ["Name", order.user],
              ["Phone", order.phone],
            ].map(([l, v]) => (
              <div key={l}>
                <p
                  style={{
                    color: "#555",
                    fontSize: "11px",
                    marginBottom: "2px",
                  }}
                >
                  {l}
                </p>
                <p
                  style={{
                    color: "#F0F0F0",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
            <div style={{ gridColumn: "1/-1" }}>
              <p
                style={{ color: "#555", fontSize: "11px", marginBottom: "2px" }}
              >
                Address
              </p>
              <p style={{ color: "#F0F0F0", fontSize: "13px" }}>
                {order.address}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#0F0F0F",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              color: "#555",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            Items
          </p>
          {order.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom:
                  i < order.items.length - 1 ? "1px solid #1A1A1A" : "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#1A1A1A",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    opacity: 0.5,
                  }}
                >
                  👕
                </div>
                <div>
                  <p
                    style={{
                      color: "#F0F0F0",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "2px",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ color: "#555", fontSize: "11px" }}>
                    {item.size} · {item.color} · ×{item.quantity}
                  </p>
                </div>
              </div>
              <span
                style={{
                  color: "#AAFF00",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                ৳{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#0F0F0F",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#888", fontSize: "13px" }}>Payment</span>
            <span
              style={{
                color: "#F0F0F0",
                fontSize: "13px",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {order.payment}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{ color: "#F0F0F0", fontSize: "15px", fontWeight: "700" }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1.5rem",
                color: "#AAFF00",
                lineHeight: 1,
              }}
            >
              ৳{order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// ── User Detail Modal ─────────────────────────────────────────
const UserDetailModal = ({ user, onClose }) => {
  const [ordersOpen, setOrdersOpen] = useState(false);

  // এই user এর orders filter করো
  const userOrders = initialOrders.filter((o) => o.user === user.name);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 200,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "12px",
          padding: "32px",
          width: "90%",
          maxWidth: "460px",
          zIndex: 201,
          animation: "modalIn 0.25s ease",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "1.5rem",
              color: "#F0F0F0",
            }}
          >
            USER DETAILS
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#555",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Avatar + Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
            padding: "16px",
            background: "#0F0F0F",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#AAFF00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "800",
              color: "#0A0A0A",
              flexShrink: 0,
            }}
          >
            {user.name[0]}
          </div>
          <div>
            <p
              style={{
                color: "#F0F0F0",
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              {user.name}
            </p>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "10px",
                fontWeight: "700",
                background:
                  user.role === "admin"
                    ? "rgba(170,255,0,0.1)"
                    : "rgba(136,136,136,0.1)",
                color: user.role === "admin" ? "#AAFF00" : "#888",
              }}
            >
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: "grid", gap: "8px", marginBottom: "20px" }}>
          {[
            ["Phone", user.phone],
            ["Email", user.email || "Not provided"],
            ["Joined", user.joined],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 14px",
                background: "#0F0F0F",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "#555", fontSize: "12px" }}>{label}</span>
              <span
                style={{
                  color: "#F0F0F0",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Orders Dropdown */}
        <div>
          <button
            onClick={() => setOrdersOpen(!ordersOpen)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "#0F0F0F",
              border: `1px solid ${ordersOpen ? "#AAFF00" : "#222"}`,
              borderRadius: ordersOpen ? "8px 8px 0 0" : "8px",
              color: "#F0F0F0",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ShoppingBag size={16} color="#AAFF00" />
              <span style={{ fontSize: "13px", fontWeight: "700" }}>
                Orders ({userOrders.length})
              </span>
            </div>
            <ChevronDown
              size={16}
              color="#555"
              style={{
                transform: ordersOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* Orders List */}
          {ordersOpen && (
            <div
              style={{
                border: "1px solid #AAFF00",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                overflow: "hidden",
              }}
            >
              {userOrders.length === 0 ? (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#555",
                    fontSize: "13px",
                  }}
                >
                  কোনো order নেই
                </div>
              ) : (
                userOrders.map((order, i) => {
                  const status = statusConfig[order.status];
                  return (
                    <div
                      key={order._id}
                      style={{
                        padding: "14px 16px",
                        background: i % 2 === 0 ? "#0F0F0F" : "#111",
                        borderBottom:
                          i < userOrders.length - 1
                            ? "1px solid #1A1A1A"
                            : "none",
                      }}
                    >
                      {/* Order ID + Status */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: "#F0F0F0",
                            fontSize: "13px",
                            fontWeight: "700",
                            fontFamily: "monospace",
                          }}
                        >
                          #{order._id}
                        </span>
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: "20px",
                            background: status.bg,
                            color: status.color,
                            fontSize: "10px",
                            fontWeight: "700",
                          }}
                        >
                          {status.label}
                        </span>
                      </div>

                      {/* Date + Total */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ color: "#555", fontSize: "11px" }}>
                          {order.date}
                        </span>
                        <span
                          style={{
                            color: "#AAFF00",
                            fontSize: "13px",
                            fontWeight: "800",
                          }}
                        >
                          ৳{order.total.toLocaleString()}
                        </span>
                      </div>

                      {/* Items */}
                      <div
                        style={{
                          borderTop: "1px solid #1A1A1A",
                          paddingTop: "8px",
                        }}
                      >
                        {order.items.map((item, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom:
                                j < order.items.length - 1 ? "4px" : "0",
                            }}
                          >
                            <span style={{ color: "#666", fontSize: "11px" }}>
                              {item.name} · {item.size} · ×{item.quantity}
                            </span>
                            <span style={{ color: "#555", fontSize: "11px" }}>
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ── Stats Tab ─────────────────────────────────────────────────
const StatsTab = ({ setActiveTab }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const stats = [
    {
      label: "Total Orders",
      value: mockStats.totalOrders,
      icon: <ShoppingBag size={20} />,
      color: "#00AAFF",
    },
    {
      label: "Total Revenue",
      value: `৳${mockStats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={20} />,
      color: "#AAFF00",
    },
    {
      label: "Total Products",
      value: mockStats.totalProducts,
      icon: <Package size={20} />,
      color: "#FF8800",
    },
    {
      label: "New Orders Today",
      value: mockStats.newOrdersToday,
      icon: <TrendingUp size={20} />,
      color: "#FF4444",
    },
  ];
  return (
    <div>
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
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
          — Overview
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
          DASHBOARD
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              background: "#111",
              border: "1px solid #1A1A1A",
              borderRadius: "10px",
              padding: "24px",
              animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  color: "#555",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "2rem",
                color: "#F0F0F0",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "1.5rem",
              color: "#F0F0F0",
            }}
          >
            RECENT ORDERS
          </h3>
          <button
            onClick={() => setActiveTab("orders")}
            style={{
              color: "#AAFF00",
              fontSize: "12px",
              fontWeight: "600",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            View All →
          </button>
        </div>
        <div
          style={{
            background: "#111",
            border: "1px solid #1A1A1A",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {initialOrders.map((order, i) => {
            const status = statusConfig[order.status];
            return (
              <div
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  gap: "12px",
                  borderBottom:
                    i < initialOrders.length - 1 ? "1px solid #1A1A1A" : "none",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#141414")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      color: "#F0F0F0",
                      fontSize: "13px",
                      fontWeight: "700",
                      fontFamily: "monospace",
                    }}
                  >
                    #{order._id}
                  </p>
                  <p style={{ color: "#888", fontSize: "13px" }}>
                    {order.user}
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <p
                    style={{
                      color: "#AAFF00",
                      fontSize: "14px",
                      fontWeight: "800",
                    }}
                  >
                    ৳{order.total.toLocaleString()}
                  </p>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background: status.bg,
                      color: status.color,
                      fontSize: "11px",
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {status.label}
                  </span>
                  <Eye size={14} color="#555" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Products Tab ──────────────────────────────────────────────
const ProductsTab = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: "tshirt",
    stock: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditProduct(null);
    setForm({
      name: "",
      price: "",
      discountPrice: "",
      category: "tshirt",
      stock: "",
      isActive: true,
    });
    setErrors({});
    setShowForm(true);
  };
  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      price: p.price,
      discountPrice: p.discountPrice || "",
      category: p.category,
      stock: p.stock,
      isActive: p.isActive,
    });
    setErrors({});
    setShowForm(true);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.price || Number(form.price) <= 0)
      e.price = "Valid price required";
    if (form.discountPrice && Number(form.discountPrice) >= Number(form.price))
      e.discountPrice = "Must be less than price";
    if (form.stock === "" || Number(form.stock) < 0)
      e.stock = "Valid stock required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editProduct._id
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                discountPrice: form.discountPrice
                  ? Number(form.discountPrice)
                  : null,
                stock: Number(form.stock),
              }
            : p,
        ),
      );
      toast.success("Product updated!");
    } else {
      setProducts((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          ...form,
          price: Number(form.price),
          discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
          stock: Number(form.stock),
        },
      ]);
      toast.success("Product added!");
    }
    setShowForm(false);
  };

  const IS = (err) => ({
    width: "100%",
    padding: "10px 14px",
    background: "#0F0F0F",
    border: `1px solid ${err ? "#FF4444" : "#222"}`,
    borderRadius: "6px",
    color: "#F0F0F0",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  });
  const LS = {
    display: "block",
    color: "#888",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "6px",
  };
  const EP = ({ msg }) =>
    msg ? (
      <p style={{ color: "#FF4444", fontSize: "11px", marginTop: "4px" }}>
        {msg}
      </p>
    ) : null;

  return (
    <div>
      {deleteConfirm && (
        <ConfirmModal
          title="DELETE PRODUCT"
          message="এই product টা permanently delete হয়ে যাবে।"
          onConfirm={() => {
            setProducts((p) => p.filter((x) => x._id !== deleteConfirm));
            setDeleteConfirm(null);
            toast.success("Deleted!");
          }}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {showForm && (
        <>
          <div
            onClick={() => setShowForm(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 1000,
              backdropFilter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#111",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "32px",
              width: "90%",
              maxWidth: "500px",
              zIndex: 1001,
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "modalIn 0.25s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "1.5rem",
                  color: "#F0F0F0",
                }}
              >
                {editProduct ? "EDIT PRODUCT" : "ADD PRODUCT"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={LS}>Product Name *</label>
                <input
                  type="text"
                  placeholder="Oversized Urban Tee"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  style={IS(errors.name)}
                />
                <EP msg={errors.name} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={LS}>Price (৳) *</label>
                  <input
                    type="number"
                    placeholder="1200"
                    value={form.price}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, price: e.target.value }))
                    }
                    style={IS(errors.price)}
                  />
                  <EP msg={errors.price} />
                </div>
                <div>
                  <label style={LS}>Discount Price (৳)</label>
                  <input
                    type="number"
                    placeholder="950"
                    value={form.discountPrice}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, discountPrice: e.target.value }))
                    }
                    style={IS(errors.discountPrice)}
                  />
                  <EP msg={errors.discountPrice} />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={LS}>Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                    style={{ ...IS(false), cursor: "pointer" }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} style={{ background: "#111" }}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={LS}>Stock *</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={form.stock}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, stock: e.target.value }))
                    }
                    style={IS(errors.stock)}
                  />
                  <EP msg={errors.stock} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  background: "#0F0F0F",
                  borderRadius: "6px",
                  border: "1px solid #222",
                }}
              >
                <span style={{ color: "#888", fontSize: "13px" }}>
                  Active (visible to customers)
                </span>
                <button
                  onClick={() =>
                    setForm((p) => ({ ...p, isActive: !p.isActive }))
                  }
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "12px",
                    background: form.isActive ? "#AAFF00" : "#333",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: form.isActive ? "23px" : "3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: form.isActive ? "#0A0A0A" : "#888",
                      transition: "left 0.2s ease",
                    }}
                  />
                </button>
              </div>
              <button
                onClick={handleSave}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "#AAFF00",
                  color: "#0A0A0A",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "800",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Check size={16} />{" "}
                {editProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "11px",
              color: "#AAFF00",
              fontWeight: "700",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            — Inventory
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
            PRODUCTS ({products.length})
          </h2>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "#AAFF00",
            color: "#0A0A0A",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "800",
            fontSize: "13px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#88CC00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#AAFF00")}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "6px",
          padding: "0 16px",
          marginBottom: "20px",
        }}
      >
        <Search size={16} color="#555" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#F0F0F0",
            fontSize: "14px",
            padding: "12px 0",
            width: "100%",
          }}
        />
      </div>

      <div
        className="users-wrapper"
        style={{
          background: "#111",
          border: "1px solid #1A1A1A",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <div className="users-table" style={{ minWidth: "580px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 60px 80px 55px 90px",
              padding: "12px 20px",
              borderBottom: "1px solid #1A1A1A",
              gap: "12px",
            }}
          >
            {["Product", "Price", "Stock", "Category", "Status", "Actions"].map(
              (h) => (
                <span
                  key={h}
                  style={{
                    color: "#555",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {h}
                </span>
              ),
            )}
          </div>
          {filtered.map((product, i) => (
            <div
              key={product._id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 90px 60px 80px 55px 90px",
                padding: "14px 20px",
                gap: "12px",
                alignItems: "center",
                borderBottom:
                  i < filtered.length - 1 ? "1px solid #1A1A1A" : "none",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#141414")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <p
                style={{
                  color: "#F0F0F0",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {product.name}
              </p>
              <span
                style={{
                  color: "#AAFF00",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                ৳{(product.discountPrice || product.price).toLocaleString()}
              </span>
              <span
                style={{
                  color:
                    product.stock === 0
                      ? "#FF4444"
                      : product.stock <= 5
                        ? "#FF8800"
                        : "#888",
                  fontSize: "13px",
                }}
              >
                {product.stock}
              </span>
              <span
                style={{
                  color: "#666",
                  fontSize: "12px",
                  textTransform: "uppercase",
                }}
              >
                {product.category}
              </span>
              <button
                onClick={() =>
                  setProducts((prev) =>
                    prev.map((p) =>
                      p._id === product._id
                        ? { ...p, isActive: !p.isActive }
                        : p,
                    ),
                  )
                }
                style={{
                  padding: "4px 8px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  background: product.isActive
                    ? "rgba(170,255,0,0.1)"
                    : "rgba(255,68,68,0.1)",
                  color: product.isActive ? "#AAFF00" : "#FF4444",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                {product.isActive ? "ON" : "OFF"}
              </button>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => openEdit(product)}
                  style={{
                    background: "none",
                    border: "1px solid #333",
                    color: "#888",
                    borderRadius: "4px",
                    padding: "5px 8px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
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
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(product._id)}
                  style={{
                    background: "none",
                    border: "1px solid #333",
                    color: "#888",
                    borderRadius: "4px",
                    padding: "5px 8px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FF4444";
                    e.currentTarget.style.color = "#FF4444";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.color = "#888";
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Orders Tab ────────────────────────────────────────────────
const OrdersTab = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders
    .filter((o) => !filterStatus || o.status === filterStatus)
    .filter(
      (o) =>
        o.user.toLowerCase().includes(search.toLowerCase()) ||
        o._id.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div>
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      <div style={{ marginBottom: "24px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "#AAFF00",
            fontWeight: "700",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          — Management
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
          ORDERS ({orders.length})
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "200px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#111",
            border: "1px solid #222",
            borderRadius: "6px",
            padding: "0 16px",
          }}
        >
          <Search size={16} color="#555" />
          <input
            type="text"
            placeholder="Search by name or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F0F0F0",
              fontSize: "14px",
              padding: "12px 0",
              width: "100%",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["", ...orderStatuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                background: filterStatus === s ? "#AAFF00" : "#111",
                color: filterStatus === s ? "#0A0A0A" : "#888",
                fontSize: "12px",
                fontWeight: "600",
                border: `1px solid ${filterStatus === s ? "#AAFF00" : "#222"}`,
                transition: "all 0.15s ease",
              }}
            >
              {s === "" ? "All" : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((order, i) => {
          const status = statusConfig[order.status];
          return (
            <div
              key={order._id}
              style={{
                background: "#111",
                border: "1px solid #1A1A1A",
                borderRadius: "10px",
                padding: "20px",
                animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {/* Left — clickable for details */}
                <div
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {[
                    { label: "Order ID", value: `#${order._id}`, mono: true },
                    { label: "Customer", value: order.user },
                    { label: "Date", value: order.date },
                    {
                      label: "Total",
                      value: `৳${order.total.toLocaleString()}`,
                      accent: true,
                    },
                    { label: "Payment", value: order.payment.toUpperCase() },
                  ].map((item) => (
                    <div key={item.label}>
                      <p
                        style={{
                          color: "#555",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "2px",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          color: item.accent ? "#AAFF00" : "#F0F0F0",
                          fontSize: "13px",
                          fontWeight: item.accent ? "800" : "600",
                          fontFamily: item.mono ? "monospace" : "inherit",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Status dropdown — opens UPWARD */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <button
                    onClick={() =>
                      setStatusDropdown(
                        statusDropdown === order._id ? null : order._id,
                      )
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      background: status.bg,
                      color: status.color,
                      border: `1px solid ${status.color}30`,
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ● {status.label}{" "}
                    <ChevronDown
                      size={12}
                      style={{
                        transform:
                          statusDropdown === order._id
                            ? "rotate(180deg)"
                            : "rotate(0)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  {statusDropdown === order._id && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        right: 0,
                        marginBottom: "6px",
                        background: "#1A1A1A",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        overflow: "hidden",
                        zIndex: 50,
                        minWidth: "140px",
                      }}
                    >
                      {orderStatuses.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setOrders((prev) =>
                              prev.map((o) =>
                                o._id === order._id ? { ...o, status: s } : o,
                              ),
                            );
                            setStatusDropdown(null);
                            toast.success("Status updated!");
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 14px",
                            background:
                              order.status === s
                                ? "rgba(170,255,0,0.05)"
                                : "transparent",
                            color: statusConfig[s].color,
                            border: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          ● {statusConfig[s].label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategoriesTab = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    parentCategory: null,
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const openAdd = () => {
    setEditCategory(null);
    setForm({
      name: "",
      slug: "",
      image: "",
      parentCategory: null,
      isActive: true,
    });
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditCategory(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      image: cat.image || "",
      parentCategory: cat.parentCategory,
      isActive: cat.isActive,
    });
    setErrors({});
    setShowForm(true);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Category name required";
    if (!form.slug.trim()) e.slug = "Slug required";
    if (form.slug && !/^[a-z0-9-]+$/.test(form.slug))
      e.slug = "Slug: lowercase letters, numbers, hyphens only";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editCategory) {
      setCategories((prev) =>
        prev.map((c) => (c._id === editCategory._id ? { ...c, ...form } : c)),
      );
      toast.success("Category updated!");
    } else {
      setCategories((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          ...form,
          productCount: 0,
        },
      ]);
      toast.success("Category added!");
    }
    setShowForm(false);
  };

  const IS = (err) => ({
    width: "100%",
    padding: "10px 14px",
    background: "#0F0F0F",
    border: `1px solid ${err ? "#FF4444" : "#222"}`,
    borderRadius: "6px",
    color: "#F0F0F0",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  });

  const LS = {
    display: "block",
    color: "#888",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "6px",
  };

  return (
    <div>
      {/* Delete Confirm */}
      {deleteConfirm && (
        <ConfirmModal
          title="DELETE CATEGORY"
          message="এই category টা permanently delete হয়ে যাবে।"
          onConfirm={() => {
            setCategories((prev) =>
              prev.filter((c) => c._id !== deleteConfirm),
            );
            setDeleteConfirm(null);
            toast.success("Category deleted!");
          }}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* Form Modal */}
      {showForm &&
        createPortal(
          <>
            <div
              onClick={() => setShowForm(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                zIndex: 1000,
                backdropFilter: "blur(4px)",
              }}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#111",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "32px",
                width: "90%",
                maxWidth: "480px",
                zIndex: 1001,
                maxHeight: "90vh",
                overflowY: "auto",
                animation: "modalIn 0.25s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "1.5rem",
                    color: "#F0F0F0",
                  }}
                >
                  {editCategory ? "EDIT CATEGORY" : "ADD CATEGORY"}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#555",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: "grid", gap: "14px" }}>
                {/* Name */}
                <div>
                  <label style={LS}>Category Name *</label>
                  <input
                    type="text"
                    placeholder="T-Shirts"
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm((p) => ({
                        ...p,
                        name,
                        slug: editCategory ? p.slug : generateSlug(name),
                      }));
                    }}
                    style={IS(errors.name)}
                  />
                  {errors.name && (
                    <p
                      style={{
                        color: "#FF4444",
                        fontSize: "11px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <label style={LS}>Slug *</label>
                  <input
                    type="text"
                    placeholder="t-shirts"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, slug: e.target.value }))
                    }
                    style={IS(errors.slug)}
                  />
                  {errors.slug && (
                    <p
                      style={{
                        color: "#FF4444",
                        fontSize: "11px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.slug}
                    </p>
                  )}
                  <p
                    style={{
                      color: "#555",
                      fontSize: "11px",
                      marginTop: "4px",
                    }}
                  >
                    Auto-generated from name। Manually edit করতে পারো।
                  </p>
                </div>

                {/* Image URL */}
                <div>
                  <label style={LS}>Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, image: e.target.value }))
                    }
                    style={IS(false)}
                  />
                </div>

                {/* Parent Category */}
                <div>
                  <label style={LS}>Parent Category (Optional)</label>
                  <select
                    value={form.parentCategory || ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        parentCategory: e.target.value || null,
                      }))
                    }
                    style={{ ...IS(false), cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#111" }}>
                      None (Top-level)
                    </option>
                    {categories
                      .filter(
                        (c) => !editCategory || c._id !== editCategory._id,
                      )
                      .map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                          style={{ background: "#111" }}
                        >
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Active Toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    background: "#0F0F0F",
                    borderRadius: "6px",
                    border: "1px solid #222",
                  }}
                >
                  <span style={{ color: "#888", fontSize: "13px" }}>
                    Active (visible on site)
                  </span>
                  <button
                    onClick={() =>
                      setForm((p) => ({ ...p, isActive: !p.isActive }))
                    }
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "12px",
                      background: form.isActive ? "#AAFF00" : "#333",
                      border: "none",
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "3px",
                        left: form.isActive ? "23px" : "3px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: form.isActive ? "#0A0A0A" : "#888",
                        transition: "left 0.2s ease",
                      }}
                    />
                  </button>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  style={{
                    width: "100%",
                    padding: "13px",
                    background: "#AAFF00",
                    color: "#0A0A0A",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "800",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Check size={16} />{" "}
                  {editCategory ? "Save Changes" : "Add Category"}
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "11px",
              color: "#AAFF00",
              fontWeight: "700",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            — Categories
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
            CATEGORIES ({categories.length})
          </h2>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "#AAFF00",
            color: "#0A0A0A",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "800",
            fontSize: "13px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#88CC00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#AAFF00")}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "6px",
          padding: "0 16px",
          marginBottom: "20px",
        }}
      >
        <Search size={16} color="#555" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#F0F0F0",
            fontSize: "14px",
            padding: "12px 0",
            width: "100%",
          }}
        />
      </div>

      {/* Category List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((cat, i) => (
          <div
            key={cat._id}
            style={{
              background: "#111",
              border: "1px solid #1A1A1A",
              borderRadius: "10px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              transition: "border-color 0.2s ease",
              animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#333")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#1A1A1A")
            }
          >
            {/* Left */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Image or Emoji */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "1.5rem" }}>
                    {cat.slug === "tshirt"
                      ? "👕"
                      : cat.slug === "hoodie"
                        ? "🧥"
                        : cat.slug === "jogger"
                          ? "👖"
                          : "🧢"}
                  </span>
                )}
              </div>

              <div>
                <p
                  style={{
                    color: "#F0F0F0",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginBottom: "4px",
                  }}
                >
                  {cat.name}
                </p>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <span
                    style={{
                      color: "#555",
                      fontSize: "11px",
                      fontFamily: "monospace",
                    }}
                  >
                    /{cat.slug}
                  </span>
                  <span style={{ color: "#444", fontSize: "11px" }}>
                    {cat.productCount} products
                  </span>
                  {cat.parentCategory && (
                    <span style={{ color: "#555", fontSize: "11px" }}>
                      Sub of:{" "}
                      {categories.find((c) => c._id === cat.parentCategory)
                        ?.name || "—"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Status */}
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  fontWeight: "700",
                  background: cat.isActive
                    ? "rgba(170,255,0,0.1)"
                    : "rgba(255,68,68,0.1)",
                  color: cat.isActive ? "#AAFF00" : "#FF4444",
                }}
              >
                {cat.isActive ? "ACTIVE" : "INACTIVE"}
              </span>

              {/* Edit */}
              <button
                onClick={() => openEdit(cat)}
                style={{
                  background: "none",
                  border: "1px solid #333",
                  color: "#888",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
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
                <Edit2 size={13} />
              </button>

              {/* Delete */}
              <button
                onClick={() => setDeleteConfirm(cat._id)}
                style={{
                  background: "none",
                  border: "1px solid #333",
                  color: "#888",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FF4444";
                  e.currentTarget.style.color = "#FF4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.color = "#888";
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Users Tab ─────────────────────────────────────────────────
const UsersTab = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const filtered = initialUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search),
  );

  return (
    <div>
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <div style={{ marginBottom: "24px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "#AAFF00",
            fontWeight: "700",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          — Customers
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
          USER LIST ({initialUsers.length})
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "6px",
          padding: "0 16px",
          marginBottom: "20px",
        }}
      >
        <Search size={16} color="#555" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#F0F0F0",
            fontSize: "14px",
            padding: "12px 0",
            width: "100%",
          }}
        />
      </div>
      {/* user table */}
      <div
        className="users-wrapper"
        style={{
          background: "#111",
          border: "1px solid #1A1A1A",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <div className="users-table" style={{ minWidth: "650px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 120px 160px 70px 110px 80px",
              padding: "12px 20px",
              borderBottom: "1px solid #1A1A1A",
              gap: "12px",
            }}
          >
            {["Name", "Phone", "Email", "Orders", "Joined", "Role"].map((h) => (
              <span
                key={h}
                style={{
                  color: "#555",
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {h}
              </span>
            ))}
          </div>
          {filtered.map((user, i) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 120px 160px 70px 110px 80px",
                padding: "14px 20px",
                gap: "12px",
                alignItems: "center",
                borderBottom:
                  i < filtered.length - 1 ? "1px solid #1A1A1A" : "none",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#141414")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#AAFF00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0A0A0A",
                    fontWeight: "800",
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  {user.name[0]}
                </div>
                <span
                  style={{
                    color: "#F0F0F0",
                    fontSize: "13px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </span>
              </div>
              <span
                style={{
                  color: "#888",
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                {user.phone}
              </span>
              <span style={{ color: "#666", fontSize: "12px" }}>
                {user.email || "—"}
              </span>
              <span style={{ color: "#888", fontSize: "13px" }}>
                {user.orders}
              </span>
              <span style={{ color: "#555", fontSize: "12px" }}>
                {user.joined}
              </span>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  fontWeight: "700",
                  background:
                    user.role === "admin"
                      ? "rgba(170,255,0,0.1)"
                      : "rgba(136,136,136,0.1)",
                  color: user.role === "admin" ? "#AAFF00" : "#888",
                  display: "inline-block",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {user.role.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Admin Menu ────────────────────────────────────────────────
const adminMenu = [
  { id: "stats", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { id: "products", icon: <Package size={18} />, label: "Products" },
  { id: 'categories', icon: <Tag size={18} />, label: 'Categories' },
  { id: "orders", icon: <ShoppingBag size={18} />, label: "Orders" },
  { id: "users", icon: <Users size={18} />, label: "Users" },
];

// ── Main Admin Page ───────────────────────────────────────────
const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          paddingTop: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚫</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "2rem",
              color: "#F0F0F0",
              marginBottom: "8px",
            }}
          >
            ACCESS DENIED
          </h2>
          <p style={{ color: "#555", marginBottom: "24px" }}>
            Admin access only
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 24px",
              background: "#AAFF00",
              color: "#0A0A0A",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes modalIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
            to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @media (max-width: 768px) {
          .admin-grid { grid-template-columns: 1fr !important; }
          .admin-sidebar { position: relative !important; top: 0 !important; }
        }
        input:focus, select:focus { border-color: #AAFF00 !important; }

          .users-table { min-width: 600px; }
            .users-wrapper { overflow-x: auto; }

            input:focus, select:focus { border-color: #AAFF00 !important; }
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
              — Admin
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#F0F0F0",
                  lineHeight: 1,
                  marginTop: "6px",
                }}
              >
                ADMIN PANEL
              </h1>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#AAFF00",
                  }}
                />
                <span style={{ color: "#888", fontSize: "13px" }}>
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
          <div
            className="admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 220px) 1fr",
              gap: "32px",
              alignItems: "flex-start",
            }}
          >
            <div
              className="admin-sidebar"
              style={{
                background: "#111",
                border: "1px solid #1A1A1A",
                borderRadius: "12px",
                overflow: "hidden",
                position: "sticky",
                top: "88px",
                animation: "fadeUp 0.5s ease",
              }}
            >
              <div style={{ padding: "16px 8px" }}>
                {adminMenu.map((item) => (
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
                <div
                  style={{
                    height: "1px",
                    background: "#1A1A1A",
                    margin: "8px 0",
                  }}
                />
                <button
                  onClick={() => navigate("/dashboard")}
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
                    e.currentTarget.style.color = "#AAFF00";
                    e.currentTarget.style.background = "#1A1A1A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  ← User Dashboard
                </button>
              </div>
            </div>
            <div
              style={{ flex: 1, minWidth: 0, animation: "fadeUp 0.6s ease" }}
            >
              {activeTab === "stats" && (
                <StatsTab setActiveTab={setActiveTab} />
              )}
              {activeTab === "products" && <ProductsTab />}
              {activeTab === 'categories' && <CategoriesTab />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "users" && <UsersTab />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { CheckCircle, ChevronDown, Truck, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const DELIVERY_CHARGE = 60;
const FREE_DELIVERY_ABOVE = 999;

const districts = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Narayanganj",
  "Gazipur",
  "Tangail",
  "Narsingdi",
  "Munshiganj",
  "Manikganj",
];

// ── Order Confirmation Screen ────────────────────────────────
const OrderConfirmation = ({ orderId, onContinue }) => (
  <div
    style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}
  >
    <div
      style={{
        textAlign: "center",
        maxWidth: "480px",
        width: "100%",
        animation: "fadeUp 0.6s ease",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(170,255,0,0.1)",
          border: "2px solid #AAFF00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        <CheckCircle size={40} color="#AAFF00" />
      </div>

      <h1
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          color: "#F0F0F0",
          marginBottom: "12px",
          lineHeight: 1,
        }}
      >
        ORDER PLACED!
      </h1>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
        তোমার order সফলভাবে placed হয়েছে।
      </p>
      <div
        style={{
          display: "inline-block",
          background: "#111",
          border: "1px solid #AAFF00",
          borderRadius: "8px",
          padding: "12px 24px",
          marginBottom: "32px",
        }}
      >
        <p
          style={{
            color: "#555",
            fontSize: "11px",
            letterSpacing: "0.1em",
            marginBottom: "4px",
          }}
        >
          ORDER ID
        </p>
        <p
          style={{
            color: "#AAFF00",
            fontSize: "16px",
            fontWeight: "800",
            fontFamily: "monospace",
          }}
        >
          #{orderId}
        </p>
      </div>

      <div
        style={{
          background: "#111",
          border: "1px solid #1A1A1A",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "32px",
          textAlign: "left",
        }}
      >
        {[
          { icon: "📦", text: "Order processing শুরু হয়েছে" },
          {
            icon: "🚚",
            text: "Dhaka: 24hrs | Others: 48hrs এর মধ্যে delivery",
          },
          { icon: "📱", text: "Delivery র আগে call করা হবে" },
        ].map((item) => (
          <div
            key={item.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            <span style={{ color: "#888", fontSize: "13px" }}>{item.text}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => onContinue("/dashboard")}
          style={{
            padding: "12px 24px",
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
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
          View Orders
        </button>
        <button
          onClick={() => onContinue("/")}
          style={{
            padding: "12px 24px",
            background: "#AAFF00",
            color: "#0A0A0A",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "800",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#88CC00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#AAFF00")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
    <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
  </div>
);

// ── bKash Mock Screen ────────────────────────────────────────
const BkashScreen = ({ amount, onSuccess, onCancel }) => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (phone.length < 11) return toast.error("Valid bKash number দাও");
    if (pin.length < 4) return toast.error("PIN দাও");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#E2136E",
          borderRadius: "16px",
          padding: "32px",
          width: "100%",
          maxWidth: "360px",
          textAlign: "center",
          animation: "fadeUp 0.3s ease",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📱</div>
          <h2
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "800",
              marginBottom: "4px",
            }}
          >
            bKash Payment
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
            Amount: ৳{amount.toLocaleString()}
          </p>
        </div>

        <input
          type="tel"
          placeholder="bKash Number (01XXXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={11}
          style={{
            width: "100%",
            padding: "12px 16px",
            marginBottom: "12px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={6}
          style={{
            width: "100%",
            padding: "12px 16px",
            marginBottom: "20px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handlePay}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "rgba(255,255,255,0.3)" : "#fff",
            color: "#E2136E",
            border: "none",
            borderRadius: "8px",
            fontWeight: "800",
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "12px",
            transition: "all 0.2s ease",
          }}
        >
          {loading ? "Processing..." : `Pay ৳${amount.toLocaleString()}`}
        </button>

        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// ── Main Checkout Page ───────────────────────────────────────
const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const deliveryCharge = cartTotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const finalTotal = cartTotal + deliveryCharge;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    fullAddress: "",
    city: "",
    district: "Dhaka",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [districtOpen, setDistrictOpen] = useState(false);
  const [showBkash, setShowBkash] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [cartItems, orderPlaced]);

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Name দাও");
      return false;
    }
    if (!form.phone.trim() || form.phone.length < 11) {
      toast.error("Valid phone number দাও");
      return false;
    }
    if (!form.fullAddress.trim()) {
      toast.error("Address দাও");
      return false;
    }
    if (!form.city.trim()) {
      toast.error("City দাও");
      return false;
    }
    return true;
  };

  const placeOrder = () => {
    if (!validateForm()) return;
    if (paymentMethod === "bkash") {
      setShowBkash(true);
      return;
    }
    processOrder();
  };

  const processOrder = () => {
    setLoading(true);
    const id = Date.now().toString().slice(-8);
    setTimeout(() => {
      setOrderId(id);
      clearCart();
      setLoading(false);
      setOrderPlaced(true);
    }, 1500);
  };

  const handleContinue = (path) => navigate(path);

  if (orderPlaced)
    return <OrderConfirmation orderId={orderId} onContinue={handleContinue} />;

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#111",
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
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        input:focus { border-color: #AAFF00 !important; }
        textarea:focus { border-color: #AAFF00 !important; }
      `}</style>

      {showBkash && (
        <BkashScreen
          amount={finalTotal}
          onSuccess={() => {
            setShowBkash(false);
            processOrder();
          }}
          onCancel={() => setShowBkash(false)}
        />
      )}

      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          paddingTop: "88px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px 80px",
          }}
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
              — Final Step
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
              CHECKOUT
            </h1>
          </div>

          {/* Back to Cart */}
          <button
            onClick={() => navigate("/cart")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "transparent",
              border: "1px solid #333",
              color: "#888",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              marginBottom: "12px",
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
            ← Back to Cart
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              alignItems: "flex-start",
            }}
          >
            {/* ── Left: Form ──────────────────────────────── */}
            <div style={{ animation: "fadeUp 0.5s ease" }}>
              {/* Delivery Address */}
              <div
                style={{
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: "12px",
                  padding: "28px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "1.5rem",
                    color: "#F0F0F0",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Truck size={20} color="#AAFF00" /> Delivery Address
                </h2>

                {/* Name + Phone */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Rahim Ahmed"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Address */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Full Address *</label>
                  <textarea
                    placeholder="House no, Road no, Area..."
                    value={form.fullAddress}
                    onChange={(e) => updateForm("fullAddress", e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "none", lineHeight: "1.5" }}
                  />
                </div>

                {/* City + District */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input
                      type="text"
                      placeholder="Dhaka"
                      value={form.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>District *</label>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setDistrictOpen(!districtOpen)}
                        style={{
                          ...inputStyle,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          border: `1px solid ${districtOpen ? "#AAFF00" : "#222"}`,
                        }}
                      >
                        <span
                          style={{ color: form.district ? "#F0F0F0" : "#555" }}
                        >
                          {form.district || "Select"}
                        </span>
                        <ChevronDown
                          size={16}
                          color="#555"
                          style={{
                            transform: districtOpen
                              ? "rotate(180deg)"
                              : "rotate(0)",
                            transition: "transform 0.2s",
                          }}
                        />
                      </button>
                      {districtOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            marginTop: "4px",
                            background: "#1A1A1A",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            maxHeight: "200px",
                            overflowY: "auto",
                            zIndex: 50,
                          }}
                        >
                          {districts.map((d) => (
                            <button
                              key={d}
                              onClick={() => {
                                updateForm("district", d);
                                setDistrictOpen(false);
                              }}
                              style={{
                                display: "block",
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 16px",
                                background:
                                  form.district === d
                                    ? "rgba(170,255,0,0.1)"
                                    : "transparent",
                                color: form.district === d ? "#AAFF00" : "#888",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "13px",
                                transition: "all 0.15s ease",
                              }}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div
                style={{
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: "12px",
                  padding: "28px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "1.5rem",
                    color: "#F0F0F0",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Smartphone size={20} color="#AAFF00" /> Payment Method
                </h2>

                {/* COD */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    marginBottom: "12px",
                    background:
                      paymentMethod === "cod"
                        ? "rgba(170,255,0,0.05)"
                        : "transparent",
                    border: `1px solid ${paymentMethod === "cod" ? "#AAFF00" : "#222"}`,
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: `2px solid ${paymentMethod === "cod" ? "#AAFF00" : "#444"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {paymentMethod === "cod" && (
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#AAFF00",
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#F0F0F0",
                        fontSize: "14px",
                        fontWeight: "700",
                        marginBottom: "2px",
                      }}
                    >
                      💵 Cash on Delivery
                    </p>
                    <p style={{ color: "#555", fontSize: "12px" }}>
                      Delivery র সময় cash দাও
                    </p>
                  </div>
                </div>

                {/* bKash */}
                <div
                  onClick={() => setPaymentMethod("bkash")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    background:
                      paymentMethod === "bkash"
                        ? "rgba(226,19,110,0.05)"
                        : "transparent",
                    border: `1px solid ${paymentMethod === "bkash" ? "#E2136E" : "#222"}`,
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: `2px solid ${paymentMethod === "bkash" ? "#E2136E" : "#444"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {paymentMethod === "bkash" && (
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#E2136E",
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#F0F0F0",
                        fontSize: "14px",
                        fontWeight: "700",
                        marginBottom: "2px",
                      }}
                    >
                      📱 bKash
                    </p>
                    <p style={{ color: "#555", fontSize: "12px" }}>
                      Mock payment — demo purpose only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Order Summary ─────────────────────── */}
            <div
              style={{
                background: "#111",
                border: "1px solid #1A1A1A",
                borderRadius: "12px",
                padding: "28px",
                position: "sticky",
                top: "88px",
                animation: "fadeUp 0.6s ease",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "1.8rem",
                  color: "#F0F0F0",
                  marginBottom: "24px",
                }}
              >
                ORDER SUMMARY
              </h2>

              {/* Items */}
              <div
                style={{
                  maxHeight: "240px",
                  overflowY: "auto",
                  marginBottom: "20px",
                }}
              >
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#1A1A1A",
                        borderRadius: "6px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        opacity: 0.5,
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        "👕"
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: "#F0F0F0",
                          fontSize: "13px",
                          fontWeight: "600",
                          marginBottom: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ color: "#555", fontSize: "11px" }}>
                        {item.size} · {item.color} · ×{item.quantity}
                      </p>
                    </div>
                    <span
                      style={{ color: "#888", fontSize: "13px", flexShrink: 0 }}
                    >
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  height: "1px",
                  background: "#1A1A1A",
                  marginBottom: "16px",
                }}
              />

              {/* Totals */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span style={{ color: "#888", fontSize: "13px" }}>
                  Subtotal
                </span>
                <span style={{ color: "#F0F0F0", fontSize: "13px" }}>
                  ৳{cartTotal.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "#888", fontSize: "13px" }}>
                  Delivery
                </span>
                {deliveryCharge === 0 ? (
                  <span
                    style={{
                      color: "#AAFF00",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    FREE 🎉
                  </span>
                ) : (
                  <span style={{ color: "#F0F0F0", fontSize: "13px" }}>
                    ৳{deliveryCharge}
                  </span>
                )}
              </div>

              <div
                style={{
                  height: "1px",
                  background: "#1A1A1A",
                  marginBottom: "20px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "28px",
                }}
              >
                <span
                  style={{
                    color: "#F0F0F0",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "2rem",
                    color: "#AAFF00",
                    lineHeight: 1,
                  }}
                >
                  ৳{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Place Order */}
              <button
                onClick={placeOrder}
                disabled={loading || cartItems.length === 0}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: loading ? "#888" : "#AAFF00",
                  color: "#0A0A0A",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "800",
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = "#88CC00";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = "#AAFF00";
                }}
              >
                {loading
                  ? "Placing Order..."
                  : `Place Order — ৳${finalTotal.toLocaleString()}`}
              </button>

              <p
                style={{
                  color: "#444",
                  fontSize: "11px",
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                🔒 Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

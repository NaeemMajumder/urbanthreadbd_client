import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const DELIVERY_CHARGE = 60;
const FREE_DELIVERY_ABOVE = 999;

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const deliveryCharge = cartTotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const finalTotal = cartTotal + deliveryCharge;

  //   const handleCheckout = () => {
  //     if (!isLoggedIn) {
  //       toast.error("Please login to checkout");
  //       navigate("/login");
  //       return;
  //     }
  //     navigate("/checkout");
  //   };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // ── Empty Cart ───────────────────────────────────────────
  if (cartItems.length === 0) {
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
        <div
          style={{
            textAlign: "center",
            padding: "40px 24px",
            animation: "fadeUp 0.5s ease",
          }}
        >
          <div style={{ fontSize: "5rem", marginBottom: "24px", opacity: 0.3 }}>
            🛒
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "3rem",
              color: "#F0F0F0",
              marginBottom: "12px",
            }}
          >
            YOUR CART IS EMPTY
          </h2>
          <p style={{ color: "#555", fontSize: "14px", marginBottom: "32px" }}>
            কোনো product add করোনি এখনো।
          </p>
          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              background: "#AAFF00",
              color: "#0A0A0A",
              fontWeight: "800",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            <ShoppingBag size={16} /> Shop Now
          </Link>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  // ── Cart with Items ──────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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
              — Your Order
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "6px",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#F0F0F0",
                  lineHeight: 1,
                }}
              >
                MY CART ({cartItems.length})
              </h1>

              {/* Right side buttons */}
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Link
                  to="/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    background: "transparent",
                    border: "1px solid #333",
                    color: "#888",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "12px",
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
                  ← Continue Shopping
                </Link>

                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "1px solid #333",
                    color: "#555",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FF4444";
                    e.currentTarget.style.color = "#FF4444";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.color = "#555";
                  }}
                >
                  <Trash2 size={14} /> Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              alignItems: "flex-start",
            }}
          >
            {/* ── Cart Items ───────────────────────────────── */}
            <div style={{ animation: "fadeUp 0.5s ease" }}>
              {cartItems.map((item, i) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    marginBottom: "12px",
                    background: "#111",
                    border: "1px solid #1A1A1A",
                    borderRadius: "10px",
                    transition: "border-color 0.2s ease",
                    animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#1A1A1A")
                  }
                >
                  {/* Image */}
                  <Link to={`/products/${item.productId}`}>
                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        flexShrink: 0,
                        background: "#1A1A1A",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
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
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "2rem", opacity: 0.3 }}>
                          {item.name?.toLowerCase().includes("hoodie")
                            ? "🧥"
                            : item.name?.toLowerCase().includes("jogger") ||
                                item.name?.toLowerCase().includes("pant")
                              ? "👖"
                              : item.name?.toLowerCase().includes("cap") ||
                                  item.name?.toLowerCase().includes("snapback")
                                ? "🧢"
                                : "👕"}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <Link
                        to={`/products/${item.productId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h3
                          style={{
                            color: "#F0F0F0",
                            fontSize: "14px",
                            fontWeight: "700",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => {
                          removeFromCart(item.productId, item.size, item.color);
                          toast.success("Item removed");
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#444",
                          cursor: "pointer",
                          flexShrink: 0,
                          padding: "2px",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#FF4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#444")
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Variants */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#555",
                          background: "#1A1A1A",
                          padding: "3px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        Size: {item.size}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#555",
                          background: "#1A1A1A",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.color}
                      </span>
                    </div>

                    {/* Quantity + Price */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Quantity */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid #2A2A2A",
                          borderRadius: "6px",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1,
                            )
                          }
                          style={{
                            width: "32px",
                            height: "32px",
                            background: "#1A1A1A",
                            border: "none",
                            color: "#888",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#2A2A2A";
                            e.currentTarget.style.color = "#F0F0F0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#1A1A1A";
                            e.currentTarget.style.color = "#888";
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            minWidth: "36px",
                            textAlign: "center",
                            color: "#F0F0F0",
                            fontSize: "13px",
                            fontWeight: "700",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1,
                            )
                          }
                          style={{
                            width: "32px",
                            height: "32px",
                            background: "#1A1A1A",
                            border: "none",
                            color: "#888",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#2A2A2A";
                            e.currentTarget.style.color = "#F0F0F0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#1A1A1A";
                            e.currentTarget.style.color = "#888";
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span
                        style={{
                          color: "#AAFF00",
                          fontSize: "16px",
                          fontWeight: "800",
                        }}
                      >
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Order Summary ────────────────────────────── */}
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
                  letterSpacing: "0.05em",
                }}
              >
                ORDER SUMMARY
              </h2>

              {/* Line items */}
              <div style={{ marginBottom: "20px" }}>
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#666",
                        fontSize: "13px",
                        flex: 1,
                        marginRight: "8px",
                      }}
                    >
                      {item.name} × {item.quantity}
                    </span>
                    <span
                      style={{ color: "#888", fontSize: "13px", flexShrink: 0 }}
                    >
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "#1A1A1A",
                  marginBottom: "20px",
                }}
              />

              {/* Subtotal */}
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

              {/* Delivery */}
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

              {/* Free delivery progress */}
              {deliveryCharge > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ color: "#555", fontSize: "11px" }}>
                      ৳{(FREE_DELIVERY_ABOVE - cartTotal).toLocaleString()} more
                      for free delivery
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      background: "#1A1A1A",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "2px",
                        background: "#AAFF00",
                        width: `${Math.min((cartTotal / FREE_DELIVERY_ABOVE) * 100, 100)}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "#1A1A1A",
                  marginBottom: "20px",
                }}
              />

              {/* Total */}
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
                    fontSize: "1.8rem",
                    color: "#AAFF00",
                    lineHeight: 1,
                  }}
                >
                  ৳{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px",
                  background: "#AAFF00",
                  color: "#0A0A0A",
                  fontWeight: "800",
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#88CC00";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(170,255,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#AAFF00";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              {/* Trust badges */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {["🔒 Secure", "✅ Trusted", "📦 Fast"].map((badge) => (
                  <span key={badge} style={{ color: "#444", fontSize: "11px" }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;

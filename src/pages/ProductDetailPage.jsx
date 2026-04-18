import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, ArrowLeft, Star } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { productAPI } from "../api/product.api";
import { reviewAPI } from "../api/review.api";
import toast from "react-hot-toast";

const colorMap = {
  black: "#1a1a1a",
  white: "#f0f0f0",
  olive: "#6b7c3f",
  grey: "#888888",
  navy: "#1a2744",
  khaki: "#c3b091",
  red: "#cc2200",
};

// ── Main Page ─────────────────────────────────────────────────
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "instant" });
      try {
        // Product fetch
        const res = await productAPI.getById(id);
        const productData = res.data.data;
        setProduct(productData);

        // Reset selections
        setSelectedSize("");
        setSelectedColor("");
        setQuantity(1);
        setSelectedImage(0);

        // Related products
        if (productData.category) {
          try {
            const relatedRes = await productAPI.getAll({
              category: productData.category?.slug || productData.category,
              limit: 5,
            });
            setRelated(
              relatedRes.data.data.products
                .filter((p) => p._id !== id)
                .slice(0, 4),
            );
          } catch {
            setRelated([]);
          }
        }

        // Reviews
        // Reviews
        try {
          const reviewRes = await reviewAPI.getByProduct(id);
          const reviewData = reviewRes.data.data || [];
          setReviews(reviewData);

          // Average calculate
          if (reviewData.length > 0) {
            const avg =
              reviewData.reduce((sum, r) => sum + r.rating, 0) /
              reviewData.length;
            setAvgRating(Math.round(avg * 10) / 10);
            setReviewCount(reviewData.length);
          } else {
            setAvgRating(0);
            setReviewCount(0);
          }
        } catch {
          setReviews([]);
          setAvgRating(0);
          setReviewCount(0);
        }
      } catch (err) {
        console.error("Product fetch failed:", err);
        toast.error("Product load হয়নি");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
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
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #1A1A1A",
              borderTop: "3px solid #AAFF00",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#555", fontSize: "13px" }}>Loading product...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  if (!product) return null;

  // discount calculate
  const discount = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select a size");
    if (!selectedColor) return toast.error("Please select a color");
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return toast.error("Please select a size");
    if (!selectedColor) return toast.error("Please select a color");
    addToCart(product, selectedSize, selectedColor, quantity);
    window.location.href = "/checkout";
  };

  // images
  const images =
    product.images?.length > 0 ? product.images : [null, null, null, null];

  // stock status
  const stockStatus =
    product.stock === 0
      ? { label: "OUT OF STOCK", color: "#FF4444" }
      : product.stock <= 5
        ? { label: `LOW STOCK — Only ${product.stock} left`, color: "#FF8800" }
        : { label: "IN STOCK", color: "#AAFF00" };

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
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
        >
          {/* Back Button */}
          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#888",
              fontSize: "13px",
              textDecoration: "none",
              marginBottom: "32px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#AAFF00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            <ArrowLeft size={16} /> Back to Products
          </Link>

          {/* Main Product Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "48px",
              marginBottom: "80px",
              animation: "fadeUp 0.5s ease",
            }}
          >
            {/* ── Left: Image Gallery */}
            <div>
              {/* Main Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                {/* Fallback */}
                <div
                  style={{
                    display: images[selectedImage] ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div style={{ fontSize: "5rem", opacity: 0.2 }}>
                    {product.category?.slug?.includes("hoodie")
                      ? "🧥"
                      : product.category?.slug?.includes("jogger")
                        ? "👖"
                        : product.category?.slug?.includes("cap")
                          ? "🧢"
                          : "👕"}
                  </div>
                  <p style={{ color: "#333", fontSize: "12px" }}>No Image</p>
                </div>

                {discount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "#AAFF00",
                      color: "#0A0A0A",
                      fontSize: "13px",
                      fontWeight: "800",
                      padding: "4px 12px",
                      borderRadius: "4px",
                    }}
                  >
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div style={{ display: "flex", gap: "10px" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      flex: 1,
                      aspectRatio: "1/1",
                      background: "#111",
                      border: `2px solid ${selectedImage === i ? "#AAFF00" : "#1A1A1A"}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "border-color 0.2s ease",
                      maxWidth: "80px", // ← size limit
                    }}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "1rem", opacity: 0.2 }}>
                        {product.category?.slug?.includes("hoodie")
                          ? "🧥"
                          : product.category?.slug?.includes("jogger")
                            ? "👖"
                            : product.category?.slug?.includes("cap")
                              ? "🧢"
                              : "👕"}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: Product Info */}
            <div>
              {/* Category tag */}
              <span
                style={{
                  fontSize: "11px",
                  color: "#AAFF00",
                  fontWeight: "700",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                {product.category?.name || "Uncategorized"}
              </span>

              {/* Name */}
              <h1
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#F0F0F0",
                  lineHeight: 1.1,
                  margin: "8px 0 16px",
                }}
              >
                {product.name}
              </h1>

              {/* Short desc */}
              <p
                style={{
                  color: "#666",
                  fontSize: "13px",
                  marginBottom: "20px",
                  letterSpacing: "0.05em",
                }}
              >
                {product.shortDesc}
              </p>

              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= Math.round(avgRating) ? "#AAFF00" : "none"}
                      color={s <= Math.round(avgRating) ? "#AAFF00" : "#444"}
                    />
                  ))}
                </div>
                <span style={{ color: "#666", fontSize: "12px" }}>
                  {reviewCount > 0
                    ? `${avgRating} (${reviewCount} reviews)`
                    : "No reviews yet"}
                </span>
              </div>

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "2.5rem",
                    color: "#AAFF00",
                    lineHeight: 1,
                  }}
                >
                  ৳{(product.discountPrice || product.price).toLocaleString()}
                </span>
                {discount > 0 && (
                  <span
                    style={{
                      color: "#444",
                      fontSize: "16px",
                      textDecoration: "line-through",
                    }}
                  >
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div style={{ marginBottom: "28px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: stockStatus.color,
                    letterSpacing: "0.1em",
                  }}
                >
                  ● {stockStatus.label}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "#1A1A1A",
                  marginBottom: "28px",
                }}
              />

              {/* Size Selector */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Size
                  </p>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "#AAFF00",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Size Guide
                  </button>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        minWidth: "48px",
                        padding: "10px 16px",
                        background:
                          selectedSize === size ? "#AAFF00" : "transparent",
                        border: `1px solid ${selectedSize === size ? "#AAFF00" : "#333"}`,
                        color: selectedSize === size ? "#0A0A0A" : "#888",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "700",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div style={{ marginBottom: "28px" }}>
                <p
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Color{" "}
                  {selectedColor && (
                    <span
                      style={{
                        color: "#F0F0F0",
                        textTransform: "capitalize",
                        fontWeight: "400",
                      }}
                    >
                      — {selectedColor}
                    </span>
                  )}
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: colorMap[color] || color,
                        border: `3px solid ${selectedColor === color ? "#AAFF00" : "transparent"}`,
                        outline: `2px solid ${selectedColor === color ? "transparent" : "#333"}`,
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.15s ease",
                        transform:
                          selectedColor === color ? "scale(1.15)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: "28px" }}>
                <p
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Quantity
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid #333",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#111",
                      border: "none",
                      color: "#888",
                      fontSize: "18px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F0F0F0")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >
                    −
                  </button>
                  <span
                    style={{
                      minWidth: "48px",
                      textAlign: "center",
                      color: "#F0F0F0",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#111",
                      border: "none",
                      color: "#888",
                      fontSize: "18px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F0F0F0")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "28px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px 24px",
                    background: "transparent",
                    border: "1px solid #AAFF00",
                    color: "#AAFF00",
                    fontWeight: "700",
                    fontSize: "13px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    borderRadius: "6px",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                    opacity: product.stock === 0 ? 0.4 : 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.background = "rgba(170,255,0,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px 24px",
                    background: "#AAFF00",
                    color: "#0A0A0A",
                    fontWeight: "800",
                    fontSize: "13px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    borderRadius: "6px",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                    opacity: product.stock === 0 ? 0.4 : 1,
                    border: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (product.stock > 0)
                      e.currentTarget.style.background = "#88CC00";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#AAFF00";
                  }}
                >
                  <Zap size={16} /> Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div
                style={{
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                {[
                  { icon: "🚚", text: "Free delivery on orders over ৳999" },
                  { icon: "⚡", text: "Dhaka: 24hrs | Others: 48hrs" },
                  { icon: "↩️", text: "7-day easy return policy" },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>{item.icon}</span>
                    <span style={{ color: "#666", fontSize: "12px" }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs — Description / Reviews */}
          <div style={{ marginBottom: "80px" }}>
            {/* Tab Headers */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #1A1A1A",
                marginBottom: "32px",
              }}
            >
              {["description", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "14px 24px",
                    background: "transparent",
                    border: "none",
                    borderBottom: `2px solid ${activeTab === tab ? "#AAFF00" : "transparent"}`,
                    color: activeTab === tab ? "#AAFF00" : "#555",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    marginBottom: "-1px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === "description" && (
              <div style={{ maxWidth: "600px" }}>
                <p
                  style={{ color: "#888", fontSize: "15px", lineHeight: "1.8" }}
                >
                  {product.description || "No description available."}
                </p>
                <div
                  style={{
                    marginTop: "24px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {[
                    { label: "Material", value: "100% Premium Cotton" },
                    { label: "Fit", value: "Oversized / Regular" },
                    { label: "Care", value: "Machine wash cold" },
                    { label: "Origin", value: "Made in Bangladesh" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "12px",
                        background: "#111",
                        borderRadius: "6px",
                        border: "1px solid #1A1A1A",
                      }}
                    >
                      <p
                        style={{
                          color: "#555",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "4px",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          color: "#F0F0F0",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === "reviews" && (
              <div>
                {reviews.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#555",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>এখনো কোনো review নেই।</p>
                  </div>
                ) : (
                  reviews.map((review, i) => (
                    <div
                      key={review._id}
                      style={{
                        padding: "20px",
                        background: "#111",
                        border: "1px solid #1A1A1A",
                        borderRadius: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "#AAFF00",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#0A0A0A",
                              fontWeight: "800",
                              fontSize: "14px",
                            }}
                          >
                            {review.userId?.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#F0F0F0",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              {review.userId?.name || "User"}
                            </p>
                            <div style={{ display: "flex", gap: "2px" }}>
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={11}
                                  fill={s <= review.rating ? "#AAFF00" : "none"}
                                  color={
                                    s <= review.rating ? "#AAFF00" : "#444"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span style={{ color: "#555", fontSize: "12px" }}>
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-BD",
                          )}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "#888",
                          fontSize: "14px",
                          lineHeight: "1.6",
                        }}
                      >
                        {review.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div style={{ marginBottom: "80px" }}>
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
                  — You May Also Like
                </span>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#F0F0F0",
                    lineHeight: 1,
                    marginTop: "6px",
                  }}
                >
                  RELATED PRODUCTS
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "20px",
                }}
              >
                {related.map((p) => {
                  const disc = p.discountPrice
                    ? Math.round((1 - p.discountPrice / p.price) * 100)
                    : 0;
                  return (
                    <Link
                      key={p._id}
                      to={`/products/${p._id}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        background: "#111",
                        border: "1px solid #1A1A1A",
                        borderRadius: "8px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#333";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#1A1A1A";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        style={{
                          height: "220px",
                          background: "#1A1A1A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <div style={{ fontSize: "3rem", opacity: 0.2 }}>
                          {p.category === "tshirt"
                            ? "👕"
                            : p.category === "hoodie"
                              ? "🧥"
                              : p.category === "jogger"
                                ? "👖"
                                : "🧢"}
                        </div>
                        {disc > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              background: "#AAFF00",
                              color: "#0A0A0A",
                              fontSize: "11px",
                              fontWeight: "800",
                              padding: "3px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            -{disc}%
                          </span>
                        )}
                      </div>
                      <div style={{ padding: "14px 16px" }}>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#555",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            marginBottom: "4px",
                          }}
                        >
                          {p.category}
                        </p>
                        <h3
                          style={{
                            color: "#F0F0F0",
                            fontSize: "14px",
                            fontWeight: "700",
                            marginBottom: "8px",
                          }}
                        >
                          {p.name}
                        </h3>
                        <span
                          style={{
                            color: "#AAFF00",
                            fontSize: "16px",
                            fontWeight: "800",
                          }}
                        >
                          ৳{(p.discountPrice || p.price).toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;

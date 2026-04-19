import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, ArrowLeft, Star } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { productAPI } from "../api/product.api";
import { reviewAPI } from "../api/review.api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

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

  const { isLoggedIn, user } = useAuth();
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const [editingReview, setEditingReview] = useState(null); // review _id
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });
  const [deletingReview, setDeletingReview] = useState(null);

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

  const handleReviewSubmit = async () => {
    if (!isLoggedIn) return toast.error("Review দিতে login করো");
    if (reviewForm.rating === 0) return toast.error("Rating দাও");
    if (!reviewForm.comment.trim()) return toast.error("Comment লিখো");

    setSubmittingReview(true);
    try {
      await reviewAPI.create(id, {
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      });
      toast.success("Review দেওয়া হয়েছে!");
      setReviewForm({ rating: 0, comment: "" });

      // Reviews reload করো
      const reviewRes = await reviewAPI.getByProduct(id);
      const reviewData = reviewRes.data.data || [];
      setReviews(reviewData);
      if (reviewData.length > 0) {
        const avg =
          reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setReviewCount(reviewData.length);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Review দেওয়া হয়নি");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleReviewEdit = async (reviewId) => {
    if (!editForm.rating) return toast.error("Rating দাও");
    if (!editForm.comment.trim()) return toast.error("Comment লিখো");

    try {
      await reviewAPI.update(reviewId, {
        rating: editForm.rating,
        comment: editForm.comment.trim(),
      });
      toast.success("Review update হয়েছে!");
      setEditingReview(null);

      // Reload reviews
      const reviewRes = await reviewAPI.getByProduct(id);
      const reviewData = reviewRes.data.data || [];
      setReviews(reviewData);
      if (reviewData.length > 0) {
        const avg =
          reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setReviewCount(reviewData.length);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update হয়নি");
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await reviewAPI.delete(reviewId);
      toast.success("Review delete হয়েছে!");
      setDeletingReview(null);

      // Reload reviews
      const reviewRes = await reviewAPI.getByProduct(id);
      const reviewData = reviewRes.data.data || [];
      setReviews(reviewData);
      if (reviewData.length > 0) {
        const avg =
          reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setReviewCount(reviewData.length);
      } else {
        setAvgRating(0);
        setReviewCount(0);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete হয়নি");
    }
  };

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
                {/* Review Form */}
                {isLoggedIn && (
                  <div
                    style={{
                      background: "#111",
                      border: "1px solid #1A1A1A",
                      borderRadius: "10px",
                      padding: "24px",
                      marginBottom: "24px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: "1.3rem",
                        color: "#F0F0F0",
                        marginBottom: "16px",
                      }}
                    >
                      WRITE A REVIEW
                    </h3>

                    {/* Star Rating */}
                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: "#888",
                          fontSize: "11px",
                          fontWeight: "700",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        Rating *
                      </p>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              setReviewForm((p) => ({ ...p, rating: s }))
                            }
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                            }}
                          >
                            <Star
                              size={28}
                              fill={
                                s <= (hoverRating || reviewForm.rating)
                                  ? "#AAFF00"
                                  : "none"
                              }
                              color={
                                s <= (hoverRating || reviewForm.rating)
                                  ? "#AAFF00"
                                  : "#333"
                              }
                              style={{ transition: "all 0.15s ease" }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: "#888",
                          fontSize: "11px",
                          fontWeight: "700",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        Comment *
                      </p>
                      <textarea
                        placeholder="তোমার experience শেয়ার করো..."
                        value={reviewForm.comment}
                        onChange={(e) =>
                          setReviewForm((p) => ({
                            ...p,
                            comment: e.target.value,
                          }))
                        }
                        rows={4}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background: "#0F0F0F",
                          border: "1px solid #222",
                          borderRadius: "8px",
                          color: "#F0F0F0",
                          fontSize: "14px",
                          outline: "none",
                          resize: "none",
                          lineHeight: "1.6",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#AAFF00")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#222")}
                      />
                    </div>

                    <button
                      onClick={handleReviewSubmit}
                      disabled={submittingReview}
                      style={{
                        padding: "10px 24px",
                        background: submittingReview ? "#888" : "#AAFF00",
                        color: "#0A0A0A",
                        border: "none",
                        borderRadius: "6px",
                        cursor: submittingReview ? "not-allowed" : "pointer",
                        fontWeight: "800",
                        fontSize: "13px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!submittingReview)
                          e.currentTarget.style.background = "#88CC00";
                      }}
                      onMouseLeave={(e) => {
                        if (!submittingReview)
                          e.currentTarget.style.background = submittingReview
                            ? "#888"
                            : "#AAFF00";
                      }}
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                )}

                {/* Reviews List */}
                {reviews.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#555",
                    }}
                  >
                    <p style={{ fontSize: "14px" }}>এখনো কোনো review নেই।</p>
                    {!isLoggedIn && (
                      <p
                        style={{
                          fontSize: "13px",
                          marginTop: "8px",
                          color: "#444",
                        }}
                      >
                        Review দিতে{" "}
                        <Link
                          to="/login"
                          style={{ color: "#AAFF00", textDecoration: "none" }}
                        >
                          login করো
                        </Link>
                      </p>
                    )}
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      style={{
                        padding: "20px 24px",
                        background: "#111",
                        border: "1px solid #1A1A1A",
                        borderRadius: "12px",
                        marginBottom: "12px",
                        transition: "border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#2A2A2A")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "#1A1A1A")
                      }
                    >
                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          {/* Avatar */}
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #AAFF00, #88CC00)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#0A0A0A",
                              fontWeight: "800",
                              fontSize: "16px",
                              flexShrink: 0,
                              boxShadow: "0 0 12px rgba(170,255,0,0.2)",
                            }}
                          >
                            {review.userId?.name?.charAt(0).toUpperCase() ||
                              "U"}
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
                              {review.userId?.name || "User"}
                            </p>
                            {/* Stars */}
                            <div
                              style={{
                                display: "flex",
                                gap: "3px",
                                alignItems: "center",
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={13}
                                  fill={s <= review.rating ? "#AAFF00" : "none"}
                                  color={
                                    s <= review.rating ? "#AAFF00" : "#333"
                                  }
                                />
                              ))}
                              <span
                                style={{
                                  color: "#555",
                                  fontSize: "11px",
                                  marginLeft: "4px",
                                }}
                              >
                                {review.rating}.0
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right — Date + Buttons */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "8px",
                          }}
                        >
                          <span style={{ color: "#444", fontSize: "11px" }}>
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-BD",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>

                          {/* Edit/Delete — নিজের review */}
                          {user?._id === review.userId?._id && (
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button
                                onClick={() => {
                                  setEditingReview(review._id);
                                  setEditForm({
                                    rating: review.rating,
                                    comment: review.comment,
                                  });
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  background: "none",
                                  border: "1px solid #2A2A2A",
                                  color: "#666",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = "#AAFF00";
                                  e.currentTarget.style.color = "#AAFF00";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = "#2A2A2A";
                                  e.currentTarget.style.color = "#666";
                                }}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => setDeletingReview(review._id)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  background: "none",
                                  border: "1px solid #2A2A2A",
                                  color: "#666",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = "#FF4444";
                                  e.currentTarget.style.color = "#FF4444";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = "#2A2A2A";
                                  e.currentTarget.style.color = "#666";
                                }}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div
                        style={{
                          height: "1px",
                          background: "#1A1A1A",
                          marginBottom: "12px",
                        }}
                      />

                      {/* Edit Form */}
                      {editingReview === review._id ? (
                        <div style={{ animation: "fadeUp 0.2s ease" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              marginBottom: "12px",
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                onClick={() =>
                                  setEditForm((p) => ({ ...p, rating: s }))
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: "2px",
                                  transition: "transform 0.1s ease",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.transform =
                                    "scale(1.2)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                              >
                                <Star
                                  size={24}
                                  fill={
                                    s <= editForm.rating ? "#AAFF00" : "none"
                                  }
                                  color={
                                    s <= editForm.rating ? "#AAFF00" : "#333"
                                  }
                                />
                              </button>
                            ))}
                          </div>

                          <textarea
                            value={editForm.comment}
                            onChange={(e) =>
                              setEditForm((p) => ({
                                ...p,
                                comment: e.target.value,
                              }))
                            }
                            rows={3}
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              background: "#0F0F0F",
                              border: "1px solid #333",
                              borderRadius: "8px",
                              color: "#F0F0F0",
                              fontSize: "13px",
                              outline: "none",
                              resize: "none",
                              lineHeight: "1.6",
                              boxSizing: "border-box",
                              marginBottom: "12px",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor = "#AAFF00")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor = "#333")
                            }
                          />

                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleReviewEdit(review._id)}
                              style={{
                                padding: "8px 20px",
                                background: "#AAFF00",
                                color: "#0A0A0A",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "800",
                                fontSize: "12px",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "#88CC00")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "#AAFF00")
                              }
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingReview(null)}
                              style={{
                                padding: "8px 20px",
                                background: "transparent",
                                color: "#888",
                                border: "1px solid #333",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Comment */
                        <p
                          style={{
                            color: "#888",
                            fontSize: "14px",
                            lineHeight: "1.8",
                          }}
                        >
                          {review.comment}
                        </p>
                      )}

                      {/* Delete Confirm */}
                      {deletingReview === review._id && (
                        <div
                          style={{
                            marginTop: "12px",
                            padding: "14px 16px",
                            background: "rgba(255,68,68,0.05)",
                            border: "1px solid rgba(255,68,68,0.15)",
                            borderRadius: "8px",
                            animation: "fadeUp 0.2s ease",
                          }}
                        >
                          <p
                            style={{
                              color: "#FF6666",
                              fontSize: "13px",
                              marginBottom: "10px",
                            }}
                          >
                            ⚠️ এই review permanently delete হয়ে যাবে।
                          </p>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleReviewDelete(review._id)}
                              style={{
                                padding: "7px 18px",
                                background: "#FF4444",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "700",
                                fontSize: "12px",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "#CC0000")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "#FF4444")
                              }
                            >
                              Yes, Delete
                            </button>
                            <button
                              onClick={() => setDeletingReview(null)}
                              style={{
                                padding: "7px 18px",
                                background: "transparent",
                                color: "#888",
                                border: "1px solid #333",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
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
                          overflow: "hidden",
                        }}
                      >
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
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
                          <div style={{ fontSize: "3rem", opacity: 0.2 }}>
                            {p.category?.slug?.includes("shirt")
                              ? "👕"
                              : p.category?.slug?.includes("hoodie")
                                ? "🧥"
                                : p.category?.slug?.includes("jogger")
                                  ? "👖"
                                  : p.category?.slug?.includes("cap")
                                    ? "🧢"
                                    : "👕"}
                          </div>
                        )}
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
                          {p.category?.name || "—"}
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

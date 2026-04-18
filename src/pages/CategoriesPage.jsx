import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categoryAPI } from "../api/category.api";

const CategoriesPage = () => {
  const [hovered, setHovered] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.getAll();
        setCategories(res.data.data);
      } catch (err) {
        console.error("Categories fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ← Step 2: parent/child divide এখানে
  const parentCategories = categories.filter((c) => !c.parentCategory);
  const childCategories = categories.filter((c) => c.parentCategory);

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
          <p style={{ color: "#555", fontSize: "13px" }}>
            Loading categories...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
          <div style={{ marginBottom: "60px", animation: "fadeUp 0.4s ease" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#AAFF00",
                fontWeight: "700",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              — Browse
            </span>
            <h1
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "#F0F0F0",
                lineHeight: 1,
                marginTop: "6px",
                marginBottom: "16px",
              }}
            >
              ALL CATEGORIES
            </h1>
            <p
              style={{
                color: "#555",
                fontSize: "14px",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              তোমার style অনুযায়ী category choose করো। প্রতিটা collection এ আছে
              premium quality streetwear।
            </p>
          </div>

          {/* Featured Categories — Big Cards */}
          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#AAFF00",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Main Categories
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {parentCategories.map((cat, i) => (
                <Link
                  key={cat._id}
                  to={`/products?category=${cat.slug}`}
                  onMouseEnter={() => setHovered(cat.slug)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    background: hovered === cat.slug ? "#141414" : "#111",
                    border: `1px solid ${hovered === cat.slug ? "#AAFF00" : "#1A1A1A"}`,
                    borderRadius: "12px",
                    padding: "40px 32px",
                    transform:
                      hovered === cat.slug
                        ? "translateY(-4px)"
                        : "translateY(0)",
                    boxShadow:
                      hovered === cat.slug
                        ? "0 16px 40px rgba(170,255,0,0.08)"
                        : "none",
                    transition: "all 0.3s ease",
                    animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      right: "-40px",
                      width: "150px",
                      height: "150px",
                      background:
                        "radial-gradient(circle, rgba(170,255,0,0.08) 0%, transparent 70%)",
                      opacity: hovered === cat.slug ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Emoji — backend এ নেই, slug দিয়ে দেখাও */}
                  {/* Image or Emoji */}
                  <div style={{ marginBottom: "20px" }}>
                    {cat.image && !cat.image.includes("example.com") ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "1px solid #1A1A1A",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "3.5rem" }}>
                        {cat.slug === "tshirt" || cat.slug?.includes("shirt")
                          ? "👕"
                          : cat.slug === "hoodie" ||
                              cat.slug?.includes("hoodie")
                            ? "🧥"
                            : cat.slug === "jogger" ||
                                cat.slug?.includes("jogger")
                              ? "👖"
                              : cat.slug === "cap" || cat.slug?.includes("cap")
                                ? "🧢"
                                : "👗"}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "2.2rem",
                      color: "#F0F0F0",
                      letterSpacing: "0.05em",
                      marginBottom: "10px",
                      lineHeight: 1,
                    }}
                  >
                    {cat.name}
                  </h2>

                  {/* Desc — backend এ নেই, slug দিয়ে fallback */}
                  <p
                    style={{
                      color: "#666",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {cat.parentCategory
                      ? `Sub-category of ${cat.parentCategory.name}`
                      : "Browse our collection"}
                  </p>

                  {/* Tags — backend এ নেই, hide করো */}

                  {/* Footer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#444", fontSize: "12px" }}>
                      View products →
                    </span>
                    <div
                      style={{
                        color: hovered === cat.slug ? "#AAFF00" : "#444",
                        transition: "color 0.3s ease",
                      }}
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Categories — Smaller Cards */}
          {childCategories.length > 0 && (
            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "#AAFF00",
                  fontWeight: "700",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "2px",
                    background: "#AAFF00",
                    display: "inline-block",
                  }}
                />
                Sub Categories
              </span>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {childCategories.map((cat, i) => (
                  <Link
                    key={cat._id}
                    to={`/products?category=${cat.slug}`}
                    onMouseEnter={() => setHovered(cat.slug)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      background: hovered === cat.slug ? "#141414" : "#111",
                      border: `1px solid ${hovered === cat.slug ? "#AAFF00" : "#1A1A1A"}`,
                      borderRadius: "10px",
                      padding: "28px 24px",
                      transform:
                        hovered === cat.slug
                          ? "translateY(-4px)"
                          : "translateY(0)",
                      boxShadow:
                        hovered === cat.slug
                          ? "0 12px 32px rgba(170,255,0,0.08)"
                          : "none",
                      transition: "all 0.3s ease",
                      animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                    }}
                  >
                    {/* Emoji */}
                    {/* Image or Emoji */}
                    <div style={{ marginBottom: "20px" }}>
                      {cat.image && !cat.image.includes("example.com") ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            border: "1px solid #1A1A1A",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: "3.5rem" }}>
                          {cat.slug?.includes("shirt")
                            ? "👕"
                            : cat.slug?.includes("hoodie")
                              ? "🧥"
                              : cat.slug?.includes("jogger")
                                ? "👖"
                                : cat.slug?.includes("cap")
                                  ? "🧢"
                                  : "👗"}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: "1.8rem",
                        color: "#F0F0F0",
                        letterSpacing: "0.05em",
                        marginBottom: "8px",
                        lineHeight: 1,
                      }}
                    >
                      {cat.name}
                    </h3>

                    {/* Parent info */}
                    <p
                      style={{
                        color: "#666",
                        fontSize: "12px",
                        lineHeight: 1.6,
                        marginBottom: "16px",
                      }}
                    >
                      {cat.parentCategory
                        ? `Sub-category of ${cat.parentCategory.name}`
                        : "Browse our collection"}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#444", fontSize: "12px" }}>
                        View products →
                      </span>
                      <ArrowRight
                        size={16}
                        color={hovered === cat.slug ? "#AAFF00" : "#333"}
                        style={{ transition: "color 0.3s ease" }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: "60px",
              padding: "40px",
              background: "#111",
              border: "1px solid #1A1A1A",
              borderRadius: "12px",
              textAlign: "center",
              animation: "fadeUp 0.6s ease",
            }}
          >
            <h3
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "2rem",
                color: "#F0F0F0",
                marginBottom: "8px",
              }}
            >
              সব products দেখতে চাও?
            </h3>
            <p
              style={{ color: "#555", fontSize: "13px", marginBottom: "24px" }}
            >
              সব category একসাথে browse করো
            </p>
            <Link
              to="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 32px",
                background: "#AAFF00",
                color: "#0A0A0A",
                fontWeight: "800",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#88CC00";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#AAFF00";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;

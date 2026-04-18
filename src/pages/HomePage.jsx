import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Package, RefreshCw, ShieldCheck } from "lucide-react";
import heroBanner from "../assets/hero-banner.png";
import heroBanner3 from "../assets/hero-banner3.png";
import heroBanner4 from "../assets/hero-banner4.png";
import heroBanner5 from "../assets/hero-banner5.png";
import { productAPI } from "../api/product.api";
import { categoryAPI } from '../api/category.api';

// ── Animations ──────────────────────────────────────────────
const fadeUpStyle = (delay = 0, visible = false) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(40px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});

const banners = [
  {
    image: heroBanner,
    tag: "Night Sessions / Dhaka",
    title1: "WEAR THE",
    title2: "STREETS",
    sub: "Dhaka র streets থেকে inspired। Bold streetwear for the new generation।",
  },
  {
    image: heroBanner3,
    tag: "Night Sessions / Dhaka",
    title1: "RULE THE",
    title2: "NIGHT",
    sub: "রাতের Dhaka তোমার। New season, new fits।",
  },
  {
    image: heroBanner4,
    tag: "Wolf Pack Collection / Dhaka",
    title1: "WOLF",
    title2: "PACK",
    sub: "Pack এর সাথে চলো। Bold cuts, stronger identity।",
  },
  {
    image: heroBanner5,
    tag: "Park 3D / Dhaka Streets",
    title1: "BUILT FOR",
    title2: "THE CITY",
    sub: "City র প্রতিটা corner এ তোমার style। Urban essentials, redefined।",
  },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// ── Category Data ────────────────────────────────────────────
const categories = [
  {
    label: "T-Shirts",
    slug: "tshirt",
    emoji: "👕",
    desc: "Urban cuts, bold prints",
  },
  {
    label: "Hoodies",
    slug: "hoodie",
    emoji: "🧥",
    desc: "Street-ready warmth",
  },
  { label: "Joggers", slug: "jogger", emoji: "👖", desc: "Move in style" },
  { label: "Caps", slug: "cap", emoji: "🧢", desc: "Top it off" },
];

// ── Features Data ────────────────────────────────────────────
const features = [
  {
    icon: <Zap size={20} />,
    label: "Fast Delivery",
    desc: "Dhaka: 24hrs | Others: 48hrs",
  },
  {
    icon: <Package size={20} />,
    label: "Free Delivery",
    desc: "On orders over ৳999",
  },
  {
    icon: <RefreshCw size={20} />,
    label: "Easy Returns",
    desc: "7-day hassle-free return",
  },
  {
    icon: <ShieldCheck size={20} />,
    label: "100% Authentic",
    desc: "Quality guaranteed",
  },
];

// ── Hero Section ─────────────────────────────────────────────
const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[current];

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${banner.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20px",
          transform: loaded ? "scale(1)" : "scale(1.05)",
          transition: "transform 1.2s ease, background-image 1s ease",
        }}
      />

      {/* Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 50%)",
        }}
      />

      {/* Neon top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(to right, transparent, #AAFF00, transparent)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px clamp(16px, 4vw, 24px) clamp(60px, 8vw, 80px)",
        }}
      >
        {/* Tag */}
        <div
          style={{
            ...fadeUpStyle(0.1, loaded),
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "clamp(12px, 2vw, 20px)",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "2px",
              background: "#AAFF00",
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: "#AAFF00",
              fontSize: "clamp(9px, 1.5vw, 11px)",
              fontWeight: "700",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {banner.tag}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            ...fadeUpStyle(0.25, loaded),
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(3rem, 12vw, 8rem)",
            lineHeight: "0.95",
            color: "#F0F0F0",
            marginBottom: "4px",
          }}
        >
          {banner.title1}
        </h1>
        <h1
          style={{
            ...fadeUpStyle(0.35, loaded),
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(3rem, 12vw, 8rem)",
            lineHeight: "0.95",
            color: "#AAFF00",
            marginBottom: "clamp(16px, 3vw, 24px)",
          }}
        >
          {banner.title2}
        </h1>

        {/* Sub */}
        <p
          style={{
            ...fadeUpStyle(0.5, loaded),
            color: "#AAA",
            fontSize: "clamp(12px, 2vw, 15px)",
            maxWidth: "380px",
            lineHeight: "1.7",
            marginBottom: "clamp(24px, 4vw, 40px)",
          }}
        >
          {banner.sub}
        </p>

        {/* CTAs */}
        <div
          style={{
            ...fadeUpStyle(0.65, loaded),
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)",
              background: "#AAFF00",
              color: "#0A0A0A",
              fontWeight: "800",
              fontSize: "clamp(11px, 1.5vw, 13px)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "4px",
              textDecoration: "none",
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
            Shop Now <ArrowRight size={14} />
          </Link>

          <Link
            to="/products?view=new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#F0F0F0",
              fontWeight: "600",
              fontSize: "clamp(11px, 1.5vw, 13px)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "4px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#AAFF00";
              e.currentTarget.style.color = "#AAFF00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "#F0F0F0";
            }}
          >
            New Arrivals
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            ...fadeUpStyle(0.8, loaded),
            display: "flex",
            gap: "clamp(20px, 5vw, 40px)",
            marginTop: "clamp(32px, 6vw, 60px)",
            flexWrap: "wrap",
          }}
        >
          {[
            ["500+", "Products"],
            ["10K+", "Customers"],
            ["4.8★", "Rating"],
          ].map(([num, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  color: "#AAFF00",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: "clamp(9px, 1.5vw, 11px)",
                  color: "#666",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Dots */}
      {banners.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px", // ← left/center থেকে right এ নিয়ে আসো
            display: "flex",
            gap: "8px",
            zIndex: 20,
          }}
        >
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "#AAFF00" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator — desktop only */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 1s ease 1.2s",
          animation: "bounce 2s ease-in-out infinite",
          zIndex: 20,
        }}
      >
        <span
          style={{ fontSize: "10px", color: "#888", letterSpacing: "0.2em" }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, #AAFF00, transparent)",
          }}
        />
      </div>
    </section>
  );
};

// ── Categories Section ───────────────────────────────────────
const CategoriesSection = () => {
  const [ref, visible] = useInView();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.getAll();
        // শুধু parent categories দেখাবো
        const parents = res.data.data.filter((c) => !c.parentCategory);
        setCategories(parents.slice(0, 4));
      } catch (err) {
        console.error("Categories fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section
      ref={ref}
      style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#0A0A0A" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "60px", ...fadeUpStyle(0, visible) }}>
          <span
            style={{
              fontSize: "11px",
              color: "#AAFF00",
              fontWeight: "700",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            — Browse by Category
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#F0F0F0",
              marginTop: "8px",
              lineHeight: 1,
            }}
          >
            FIND YOUR STYLE
          </h2>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: "180px",
                  background: "#111",
                  borderRadius: "8px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#555" }}>
            <p style={{ fontSize: "14px" }}>No categories yet.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat._id}
                to={`/products?category=${cat.slug}`}
                style={{
                  ...fadeUpStyle(i * 0.1, visible),
                  display: "block",
                  padding: "36px 28px",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#AAFF00";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(170,255,0,0.1)";
                  e.currentTarget.style.background = "#141414";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#222";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "#111";
                }}
              >
                {/* Emoji */}
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
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

                <h3
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "1.8rem",
                    color: "#F0F0F0",
                    letterSpacing: "0.05em",
                    marginBottom: "6px",
                  }}
                >
                  {cat.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  Browse collection
                </p>

                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    right: "24px",
                    color: "#AAFF00",
                    opacity: 0.5,
                  }}
                >
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ── Featured Products Section ────────────────────────────────
const FeaturedSection = () => {
  const [ref, visible] = useInView();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await productAPI.getAll({ featured: "true", limit: 4 });
        setProducts(res.data.data.products);
      } catch (err) {
        console.error("Featured fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(60px, 8vw, 100px) 0",
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F0F0F 100%)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "16px",
            ...fadeUpStyle(0, visible),
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
              — Hand Picked
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#F0F0F0",
                marginTop: "8px",
                lineHeight: 1,
              }}
            >
              FEATURED DROPS
            </h2>
          </div>
          <Link
            to="/products"
            style={{
              color: "#AAFF00",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: "380px",
                  background: "#111",
                  borderRadius: "8px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#555" }}>
            <p style={{ fontSize: "14px" }}>No featured products yet.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product, i) => (
              <ProductCard
                key={product._id}
                product={product}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ── Product Card ─────────────────────────────────────────────
const ProductCard = ({ product, index, visible }) => {
  const discount = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product._id}`}
      style={{
        ...fadeUpStyle(index * 0.1, visible),
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
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1A1A1A";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div
        style={{
          height: "280px",
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", opacity: 0.3 }}>
              {product.category === "tshirt"
                ? "👕"
                : product.category === "hoodie"
                  ? "🧥"
                  : product.category === "jogger"
                    ? "👖"
                    : "🧢"}
            </div>
            <p style={{ color: "#333", fontSize: "11px", marginTop: "8px" }}>
              No Image
            </p>
          </div>
        )}
        {discount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "#AAFF00",
              color: "#0A0A0A",
              fontSize: "11px",
              fontWeight: "800",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            -{discount}%
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "16px" }}>
        <p
          style={{
            fontSize: "11px",
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "6px",
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            color: "#F0F0F0",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "12px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{ color: "#AAFF00", fontSize: "18px", fontWeight: "800" }}
          >
            ৳{(product.discountPrice || product.price).toLocaleString()}
          </span>
          {discount > 0 && (
            <span
              style={{
                color: "#444",
                fontSize: "13px",
                textDecoration: "line-through",
              }}
            >
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ── Promo Banner ─────────────────────────────────────────────
const PromoBanner = () => {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      style={{
        padding: "0 clamp(16px, 4vw, 24px)",
        marginBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      <div
        style={{
          padding: "clamp(32px, 5vw, 60px) clamp(20px, 4vw, 48px)",
          maxWidth: "1280px",
          margin: "0 auto",
          ...fadeUpStyle(0, visible),
        }}
      >
        <div
          style={{
            padding: "60px 48px",
            background:
              "linear-gradient(135deg, #111 0%, #1A1A1A 50%, #111 100%)",
            border: "1px solid #AAFF00",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background:
                "radial-gradient(circle, rgba(170,255,0,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#F0F0F0",
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              SUMMER SALE —{" "}
              <span style={{ color: "#AAFF00" }}>UP TO 30% OFF</span>
            </h2>
            <p style={{ color: "#888", fontSize: "14px" }}>
              Limited time offer। Free delivery on orders over ৳999।
            </p>
          </div>

          <Link
            to="/products?sale=true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              background: "#AAFF00",
              color: "#0A0A0A",
              fontWeight: "800",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "4px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
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
            Shop Sale <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ── Features Strip ───────────────────────────────────────────
const FeaturesStrip = () => {
  const [ref, visible] = useInView();

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid #1A1A1A",
        borderBottom: "1px solid #1A1A1A",
        padding: "clamp(32px, 5vw, 48px) clamp(16px, 4vw, 24px)",
        marginBottom: "clamp(60px, 8vw, 100px)",
        background: "#0D0D0D",
        marginTop: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "32px",
        }}
      >
        {features.map((f, i) => (
          <div
            key={f.label}
            style={{
              ...fadeUpStyle(i * 0.1, visible),
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                background: "rgba(170,255,0,0.1)",
                border: "1px solid rgba(170,255,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#AAFF00",
                flexShrink: 0,
              }}
            >
              {f.icon}
            </div>
            <div>
              <h4
                style={{
                  color: "#F0F0F0",
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                {f.label}
              </h4>
              <p style={{ color: "#666", fontSize: "12px", lineHeight: 1.5 }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── CSS Animations ───────────────────────────────────────────
const styles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }
`;

// ── Main Export ──────────────────────────────────────────────
const HomePage = () => {
  return (
    <>
      <style>{styles}</style>
      <HeroSection />
      <FeaturesStrip />
      <CategoriesSection />
      <FeaturedSection />
      <PromoBanner />
    </>
  );
};

export default HomePage;

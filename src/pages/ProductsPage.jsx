import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";

// ── Mock Data ────────────────────────────────────────────────
const mockProducts = [
  {
    _id: "1",
    name: "Oversized Urban Tee",
    price: 1200,
    discountPrice: 950,
    category: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white"],
    images: [],
    stock: 10,
  },
  {
    _id: "2",
    name: "Street Hoodie Black",
    price: 2500,
    discountPrice: 1999,
    category: "hoodie",
    sizes: ["M", "L", "XL"],
    colors: ["black"],
    images: [],
    stock: 5,
  },
  {
    _id: "3",
    name: "Cargo Jogger Grey",
    price: 1800,
    discountPrice: 1499,
    category: "jogger",
    sizes: ["S", "M", "L"],
    colors: ["grey", "black"],
    images: [],
    stock: 8,
  },
  {
    _id: "4",
    name: "UT Signature Cap",
    price: 800,
    discountPrice: 650,
    category: "cap",
    sizes: ["Free"],
    colors: ["black", "white", "olive"],
    images: [],
    stock: 20,
  },
  {
    _id: "5",
    name: "Graphic Print Tee",
    price: 1100,
    discountPrice: null,
    category: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "olive"],
    images: [],
    stock: 15,
  },
  {
    _id: "6",
    name: "Zip-Up Hoodie Olive",
    price: 2800,
    discountPrice: 2299,
    category: "hoodie",
    sizes: ["S", "M", "L"],
    colors: ["olive"],
    images: [],
    stock: 3,
  },
  {
    _id: "7",
    name: "Slim Fit Jogger",
    price: 1600,
    discountPrice: null,
    category: "jogger",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "navy"],
    images: [],
    stock: 12,
  },
  {
    _id: "8",
    name: "Snapback Cap Black",
    price: 750,
    discountPrice: 600,
    category: "cap",
    sizes: ["Free"],
    colors: ["black"],
    images: [],
    stock: 25,
  },
  {
    _id: "9",
    name: "Neon Logo Tee",
    price: 1300,
    discountPrice: 999,
    category: "tshirt",
    sizes: ["M", "L", "XL"],
    colors: ["black"],
    images: [],
    stock: 7,
  },
  {
    _id: "10",
    name: "Heavy Fleece Hoodie",
    price: 3200,
    discountPrice: 2599,
    category: "hoodie",
    sizes: ["L", "XL"],
    colors: ["black", "grey"],
    images: [],
    stock: 4,
  },
  {
    _id: "11",
    name: "Tapered Cargo Pant",
    price: 2100,
    discountPrice: null,
    category: "jogger",
    sizes: ["S", "M", "L"],
    colors: ["black", "khaki"],
    images: [],
    stock: 6,
  },
  {
    _id: "12",
    name: "Embroidered Cap",
    price: 900,
    discountPrice: 750,
    category: "cap",
    sizes: ["Free"],
    colors: ["black", "white", "red"],
    images: [],
    stock: 18,
  },
  {
    _id: "13",
    name: "Minimal Logo Tee",
    price: 1000,
    discountPrice: 850,
    category: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white", "beige"],
    images: [],
    stock: 14,
  },
  {
    _id: "14",
    name: "Washed Vintage Tee",
    price: 1400,
    discountPrice: 1100,
    category: "tshirt",
    sizes: ["M", "L", "XL"],
    colors: ["grey", "brown"],
    images: [],
    stock: 9,
  },
  {
    _id: "15",
    name: "Basic Everyday Tee",
    price: 900,
    discountPrice: null,
    category: "tshirt",
    sizes: ["S", "M", "L"],
    colors: ["white", "black", "navy"],
    images: [],
    stock: 20,
  },
  {
    _id: "16",
    name: "Oversized Graphic Hoodie",
    price: 3000,
    discountPrice: 2499,
    category: "hoodie",
    sizes: ["M", "L", "XL"],
    colors: ["black", "purple"],
    images: [],
    stock: 6,
  },
  {
    _id: "17",
    name: "Classic Pullover Hoodie",
    price: 2600,
    discountPrice: 2100,
    category: "hoodie",
    sizes: ["S", "M", "L"],
    colors: ["grey", "navy"],
    images: [],
    stock: 10,
  },
  {
    _id: "18",
    name: "Lightweight Summer Hoodie",
    price: 2200,
    discountPrice: 1800,
    category: "hoodie",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "olive"],
    images: [],
    stock: 7,
  },
  {
    _id: "19",
    name: "Utility Cargo Jogger",
    price: 1900,
    discountPrice: 1550,
    category: "jogger",
    sizes: ["S", "M", "L"],
    colors: ["olive", "black"],
    images: [],
    stock: 11,
  },
  {
    _id: "20",
    name: "Relaxed Fit Sweatpant",
    price: 1700,
    discountPrice: null,
    category: "jogger",
    sizes: ["M", "L", "XL"],
    colors: ["grey", "black"],
    images: [],
    stock: 13,
  },
  {
    _id: "21",
    name: "Athletic Jogger Pro",
    price: 2000,
    discountPrice: 1650,
    category: "jogger",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "navy"],
    images: [],
    stock: 8,
  },
  {
    _id: "22",
    name: "Classic Snapback Cap",
    price: 850,
    discountPrice: 700,
    category: "cap",
    sizes: ["Free"],
    colors: ["black", "red"],
    images: [],
    stock: 22,
  },
  {
    _id: "23",
    name: "Trucker Mesh Cap",
    price: 750,
    discountPrice: null,
    category: "cap",
    sizes: ["Free"],
    colors: ["black", "white"],
    images: [],
    stock: 19,
  },
  {
    _id: "24",
    name: "Flat Brim Street Cap",
    price: 950,
    discountPrice: 800,
    category: "cap",
    sizes: ["Free"],
    colors: ["black", "green"],
    images: [],
    stock: 16,
  },
  {
    _id: "25",
    name: "Contrast Panel Tee",
    price: 1250,
    discountPrice: 999,
    category: "tshirt",
    sizes: ["S", "M", "L"],
    colors: ["black", "white"],
    images: [],
    stock: 10,
  },
  {
    _id: "26",
    name: "Longline Street Tee",
    price: 1350,
    discountPrice: 1050,
    category: "tshirt",
    sizes: ["M", "L", "XL"],
    colors: ["black", "beige"],
    images: [],
    stock: 9,
  },
  {
    _id: "27",
    name: "Premium Heavy Tee",
    price: 1500,
    discountPrice: 1200,
    category: "tshirt",
    sizes: ["L", "XL"],
    colors: ["white", "grey"],
    images: [],
    stock: 5,
  },
  {
    _id: "28",
    name: "Techwear Hoodie",
    price: 3500,
    discountPrice: 2999,
    category: "hoodie",
    sizes: ["M", "L", "XL"],
    colors: ["black"],
    images: [],
    stock: 4,
  },
  {
    _id: "29",
    name: "Slim Track Jogger",
    price: 1750,
    discountPrice: 1400,
    category: "jogger",
    sizes: ["S", "M", "L"],
    colors: ["black", "grey"],
    images: [],
    stock: 12,
  },
  {
    _id: "30",
    name: "Urban Street Cap",
    price: 880,
    discountPrice: 720,
    category: "cap",
    sizes: ["Free"],
    colors: ["black", "navy"],
    images: [],
    stock: 17,
  },
];

const categories = [
  { label: "All", value: "" },
  { label: "T-Shirts", value: "tshirt" },
  { label: "Hoodies", value: "hoodie" },
  { label: "Joggers", value: "jogger" },
  { label: "Caps", value: "cap" },
];

const sizes = ["S", "M", "L", "XL", "Free"];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name A-Z", value: "name_asc" },
];

const ITEMS_PER_PAGE = 10;

// ── Product Card ─────────────────────────────────────────────
const ProductCard = ({ product, index }) => {
  const [hovered, setHovered] = useState(false);
  const discount = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: "#111",
        border: `1px solid ${hovered ? "#333" : "#1A1A1A"}`,
        borderRadius: "8px",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.3s ease",
        animation: `fadeUp 0.5s ease ${index * 0.05}s both`,
      }}
    >
      {/* Image */}
      <div
        style={{
          height: "260px",
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", opacity: 0.2 }}>
              {product.category === "tshirt"
                ? "👕"
                : product.category === "hoodie"
                  ? "🧥"
                  : product.category === "jogger"
                    ? "👖"
                    : "🧢"}
            </div>
          </div>
        )}

        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {discount > 0 && (
            <span
              style={{
                background: "#AAFF00",
                color: "#0A0A0A",
                fontSize: "11px",
                fontWeight: "800",
                padding: "3px 8px",
                borderRadius: "4px",
              }}
            >
              -{discount}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span
              style={{
                background: "rgba(255,100,0,0.9)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "700",
                padding: "3px 8px",
                borderRadius: "4px",
              }}
            >
              LOW STOCK
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            style={{
              padding: "10px 24px",
              border: "1px solid #AAFF00",
              color: "#AAFF00",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              borderRadius: "4px",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            QUICK VIEW
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#555",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "5px",
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            color: "#F0F0F0",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "10px",
            lineHeight: 1.3,
            letterSpacing: "0.05em",
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          {product.sizes.map((size) => (
            <span
              key={size}
              style={{
                fontSize: "10px",
                color: "#666",
                border: "1px solid #2A2A2A",
                padding: "2px 6px",
                borderRadius: "3px",
              }}
            >
              {size}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{ color: "#AAFF00", fontSize: "17px", fontWeight: "800" }}
          >
            ৳{(product.discountPrice || product.price).toLocaleString()}
          </span>
          {discount > 0 && (
            <span
              style={{
                color: "#444",
                fontSize: "12px",
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

// ── Main Page ─────────────────────────────────────────────────
const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(5000);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSizes([]);
    setPriceMin(0);
    setPriceMax(5000);
    setSearch("");
    setCurrentPage(1);
  };

  const filtered = mockProducts
    .filter((p) => !selectedCategory || p.category === selectedCategory)
    .filter(
      (p) =>
        selectedSizes.length === 0 ||
        p.sizes.some((s) => selectedSizes.includes(s)),
    )
    .filter((p) => {
      const price = p.discountPrice || p.price;
      return price >= priceMin && price <= priceMax;
    })
    .filter(
      (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (selectedSort === "price_asc")
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      if (selectedSort === "price_desc")
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      if (selectedSort === "name_asc") return a.name.localeCompare(b.name);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = currentPage > totalPages ? 1 : currentPage;
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );
  const activeFilters =
    (selectedCategory ? 1 : 0) +
    selectedSizes.length +
    (priceMin > 0 || priceMax < 5000 ? 1 : 0);

  // ── Filter Content (shared between drawer and sidebar)
  const filterContent = (
    <div>
      {/* Category */}
      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            color: "#888",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Category
        </p>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              setCurrentPage(1);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "9px 12px",
              marginBottom: "4px",
              background:
                selectedCategory === cat.value
                  ? "rgba(170,255,0,0.1)"
                  : "transparent",
              border: `1px solid ${selectedCategory === cat.value ? "rgba(170,255,0,0.3)" : "transparent"}`,
              color: selectedCategory === cat.value ? "#AAFF00" : "#888",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
          >
            {cat.label}
            {selectedCategory === cat.value && (
              <span style={{ fontSize: "8px" }}>●</span>
            )}
          </button>
        ))}
      </div>

      {/* Size */}
      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            color: "#888",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Size
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              style={{
                padding: "6px 14px",
                borderRadius: "4px",
                background: selectedSizes.includes(size)
                  ? "#AAFF00"
                  : "transparent",
                border: `1px solid ${selectedSizes.includes(size) ? "#AAFF00" : "#333"}`,
                color: selectedSizes.includes(size) ? "#0A0A0A" : "#888",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p
          style={{
            color: "#888",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Price Range
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{ color: "#AAFF00", fontSize: "12px", fontWeight: "700" }}
          >
            ৳{priceMin.toLocaleString()}
          </span>
          <span
            style={{ color: "#AAFF00", fontSize: "12px", fontWeight: "700" }}
          >
            ৳{priceMax.toLocaleString()}
          </span>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <p style={{ color: "#555", fontSize: "10px", marginBottom: "4px" }}>
            Min
          </p>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceMin}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < priceMax) {
                setPriceMin(val);
                setCurrentPage(1);
              }
            }}
            style={{ width: "100%", accentColor: "#AAFF00" }}
          />
        </div>
        <div>
          <p style={{ color: "#555", fontSize: "10px", marginBottom: "4px" }}>
            Max
          </p>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceMax}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > priceMin) {
                setPriceMax(val);
                setCurrentPage(1);
              }
            }}
            style={{ width: "100%", accentColor: "#AAFF00" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
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
          {/* Page Header */}
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
              — Collection
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
              ALL PRODUCTS
            </h1>
          </div>

          {/* Controls Bar */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "32px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Search */}
            <div
              style={{
                flex: 1,
                minWidth: isMobile ? "100%" : "200px",
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
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
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
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter + Sort */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                width: isMobile ? "100%" : "auto",
                alignItems: "center",
              }}
            >
              {/* Filter Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  flex: isMobile ? 1 : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background:
                    activeFilters > 0 ? "rgba(170,255,0,0.1)" : "#111",
                  border: `1px solid ${activeFilters > 0 ? "#AAFF00" : "#222"}`,
                  color: activeFilters > 0 ? "#AAFF00" : "#888",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                <SlidersHorizontal size={16} />
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </button>

              {/* Sort Dropdown */}
              <div
                style={{ position: "relative", flex: isMobile ? 1 : "none" }}
              >
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    background: "#111",
                    border: "1px solid #222",
                    color: "#888",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {sortOptions.find((s) => s.value === selectedSort)?.label}
                  <ChevronDown
                    size={14}
                    style={{
                      transform: sortOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {sortOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      left: isMobile ? 0 : "auto",
                      marginTop: "8px",
                      background: "#1A1A1A",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      overflow: "hidden",
                      zIndex: 50,
                      minWidth: "180px",
                    }}
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSelectedSort(opt.value);
                          setSortOpen(false);
                          setCurrentPage(1);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 16px",
                          background:
                            selectedSort === opt.value
                              ? "rgba(170,255,0,0.1)"
                              : "transparent",
                          color:
                            selectedSort === opt.value ? "#AAFF00" : "#888",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Result count — desktop only */}
              {!isMobile && (
                <span style={{ color: "#555", fontSize: "13px" }}>
                  {filtered.length} products found
                </span>
              )}
            </div>

            {/* Result count — mobile */}
            {isMobile && (
              <span style={{ color: "#555", fontSize: "12px" }}>
                {filtered.length} products found
              </span>
            )}
          </div>

          {/* Mobile Filter Drawer */}
          {isMobile && sidebarOpen && (
            <>
              {/* Backdrop */}
              <div
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.7)",
                  zIndex: 100,
                  backdropFilter: "blur(4px)",
                }}
              />
              {/* Drawer */}
              <div
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "#111",
                  borderTop: "1px solid #333",
                  borderRadius: "16px 16px 0 0",
                  padding: '0 24px 80px',
                  zIndex: 101,
                  height: "80vh",
                  overflowY: "scroll",
                  animation: "slideUp 0.3s ease",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {/* Handle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "12px 0 20px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "4px",
                      background: "#333",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                {/* Drawer Header */}
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
                      color: "#F0F0F0",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    FILTERS
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    {activeFilters > 0 && (
                      <button
                        onClick={clearFilters}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#AAFF00",
                          fontSize: "13px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        background: "#1A1A1A",
                        border: "1px solid #333",
                        color: "#888",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
                {/* {filterContent} */}
                {/* Category */}
                <div style={{ marginBottom: "28px" }}>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Category
                  </p>
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setCurrentPage(1);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "9px 12px",
                        marginBottom: "4px",
                        background:
                          selectedCategory === cat.value
                            ? "rgba(170,255,0,0.1)"
                            : "transparent",
                        border: `1px solid ${selectedCategory === cat.value ? "rgba(170,255,0,0.3)" : "transparent"}`,
                        color:
                          selectedCategory === cat.value ? "#AAFF00" : "#888",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {cat.label}
                      {selectedCategory === cat.value && (
                        <span style={{ fontSize: "8px" }}>●</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Size */}
                <div style={{ marginBottom: "28px" }}>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Size
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "4px",
                          background: selectedSizes.includes(size)
                            ? "#AAFF00"
                            : "transparent",
                          border: `1px solid ${selectedSizes.includes(size) ? "#AAFF00" : "#333"}`,
                          color: selectedSizes.includes(size)
                            ? "#0A0A0A"
                            : "#888",
                          fontSize: "12px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div style={{ paddingBottom: "20px" }}>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Price Range
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "#AAFF00",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      ৳{priceMin.toLocaleString()}
                    </span>
                    <span
                      style={{
                        color: "#AAFF00",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      ৳{priceMax.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "10px",
                        marginBottom: "4px",
                      }}
                    >
                      Min
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceMin}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val < priceMax) {
                          setPriceMin(val);
                          setCurrentPage(1);
                        }
                      }}
                      style={{ width: "100%", accentColor: "#AAFF00" }}
                    />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "10px",
                        marginBottom: "4px",
                      }}
                    >
                      Max
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceMax}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > priceMin) {
                          setPriceMax(val);
                          setCurrentPage(1);
                        }
                      }}
                      style={{ width: "100%", accentColor: "#AAFF00" }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Desktop Sidebar + Product Grid */}
          <div
            style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}
          >
            {/* Desktop Sidebar */}
            {!isMobile && sidebarOpen && (
              <div
                style={{
                  width: "240px",
                  flexShrink: 0,
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  borderRadius: "10px",
                  padding: "24px",
                  position: "sticky",
                  top: "80px",
                  animation: "fadeUp 0.3s ease",
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
                      color: "#F0F0F0",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    FILTERS
                  </h3>
                  {activeFilters > 0 && (
                    <button
                      onClick={clearFilters}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#AAFF00",
                        fontSize: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                {filterContent}
              </div>
            )}

            {/* Product Grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {paginated.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 20px",
                    color: "#555",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
                    🔍
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "2rem",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    NO PRODUCTS FOUND
                  </h3>
                  <p style={{ fontSize: "14px" }}>Try changing your filters</p>
                  <button
                    onClick={clearFilters}
                    style={{
                      marginTop: "20px",
                      padding: "10px 24px",
                      background: "#AAFF00",
                      color: "#0A0A0A",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {paginated.map((product, i) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "48px",
                  }}
                >
                  <button
                    onClick={() => {
                      if (safePage > 1) {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    style={{
                      padding: "8px 16px",
                      background: "transparent",
                      border: "1px solid #333",
                      color: safePage === 1 ? "#333" : "#888",
                      borderRadius: "6px",
                      cursor: safePage === 1 ? "not-allowed" : "pointer",
                      fontSize: "13px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        style={{
                          width: "36px",
                          height: "36px",
                          background:
                            safePage === page ? "#AAFF00" : "transparent",
                          border: `1px solid ${safePage === page ? "#AAFF00" : "#333"}`,
                          color: safePage === page ? "#0A0A0A" : "#888",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: safePage === page ? "800" : "400",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => {
                      if (safePage < totalPages) {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    style={{
                      padding: "8px 16px",
                      background: "transparent",
                      border: "1px solid #333",
                      color: safePage === totalPages ? "#333" : "#888",
                      borderRadius: "6px",
                      cursor:
                        safePage === totalPages ? "not-allowed" : "pointer",
                      fontSize: "13px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ height: "80px" }} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

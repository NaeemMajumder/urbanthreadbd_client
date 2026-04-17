import { Link } from "react-router-dom";
import logoDark from "../../assets/logo-dark.png";
// import সরিয়ে দাও, এই component দিয়ে replace করো
const SocialLinks = () => (
  <div className="flex gap-4 mt-5">
    <a
      href="#"
      className="text-[#888] hover:text-[#AAFF00] transition-colors text-sm font-medium"
    >
      FB
    </a>
    <a
      href="#"
      className="text-[#888] hover:text-[#AAFF00] transition-colors text-sm font-medium"
    >
      IG
    </a>
    <a
      href="#"
      className="text-[#888] hover:text-[#AAFF00] transition-colors text-sm font-medium"
    >
      YT
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#333] mt-20">
      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '48px 24px'}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src={logoDark}
              alt="UrbanThread BD"
              className="h-8 w-auto mb-4"
            />
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              Bangladesh এর young urban generation এর জন্য bold streetwear। Wear
              the streets.
            </p>
            <SocialLinks />
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading text-lg text-[#F0F0F0] tracking-widest mb-4">
              SHOP
            </h4>
            <ul className="space-y-2">
              {[
                "T-Shirts",
                "Hoodies",
                "Joggers",
                "Caps",
                "New Arrivals",
                "Sale",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?category=${item.toLowerCase()}`}
                    className="text-sm text-[#888] hover:text-[#AAFF00] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading text-lg text-[#F0F0F0] tracking-widest mb-4">
              INFO
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Return Policy", to: "/returns" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-[#888] hover:text-[#AAFF00] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#333] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#555]">
            © 2025 UrbanThread BD. All rights reserved.
          </p>
          <p className="text-xs text-[#555]">
            Free delivery on orders over{" "}
            <span className="text-[#AAFF00]">৳999</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

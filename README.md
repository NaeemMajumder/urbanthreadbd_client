# basic folder structure
src/
├── api/
│   └── axios.js          ← base URL config
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── Button.jsx
│   └── ...
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── DashboardPage.jsx
│   └── AdminPage.jsx
├── hooks/
│   └── useAuth.js
└── App.jsx


Final Structure এখন:
src/
├── api/
│   └── axios.js
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useCart.js
├── routes/
│   ├── AppRoutes.jsx       ← সব routes
│   ├── ProtectedRoute.jsx  ← login check
│   └── AdminRoute.jsx      ← admin check
├── components/
│   ├── common/
│   └── layout/
├── pages/
│   └── admin/
├── App.jsx                 ← clean, শুধু providers
└── index.css
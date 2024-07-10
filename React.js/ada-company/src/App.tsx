import Layout from "./layout/Layout";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/404";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

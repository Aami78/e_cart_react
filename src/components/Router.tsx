import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Category } from "./Category";
import { Product } from "./Product";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="category/:category" element={<Category />} />
        <Route
          path="category/:category/product/:productid"
          element={<Product />}
        />
      </Routes>
    </Router>
  );
};

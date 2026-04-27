import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import styles from "./ProductList.module.css";
import type { Product } from "../types/Item";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Trạng thái fetch
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu từ API FastAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/items/");
        if (!response.ok) throw new Error("Không thể tải dữ liệu");
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Logic xử lý khi thay đổi bộ lọc

  if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;
  if (error) return <div className={styles.error}>Lỗi: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Danh sách Sản Phẩm</h2>
        <Link to="/create" className={styles.btnCreate}>
          + Tạo Mới
        </Link>
      </div>

      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

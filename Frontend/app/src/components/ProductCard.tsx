import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { Product } from "../types/Item";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      {/* Hiển thị ảnh giả lập nếu link ảnh lỗi */}
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.title}
        className={styles.image}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/200";
        }}
      />
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.actions}>
          <Link
            to={`/update/${product.id}`}
            className={`${styles.btn} ${styles.btnEdit}`}
          >
            Sửa
          </Link>
          <Link
            to={`/delete/${product.id}`}
            className={`${styles.btn} ${styles.btnDelete}`}
          >
            Xóa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

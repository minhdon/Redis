import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./ProductDelete.module.css";

const ProductDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Đã xóa thành công!");
        navigate("/");
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      alert("Không thể kết nối đến server.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Xác nhận Xóa</h2>
      <p className={styles.warning}>
        Bạn có chắc chắn muốn xóa sản phẩm có ID: <strong>{id}</strong> không?
        Hành động này không thể hoàn tác.
      </p>

      <div className={styles.actions}>
        <Link to="/" className={`${styles.btn} ${styles.btnCancel}`}>
          Quay lại
        </Link>
        <button
          onClick={handleDelete}
          className={`${styles.btn} ${styles.btnConfirm}`}
        >
          Có, Xóa ngay
        </button>
      </div>
    </div>
  );
};

export default ProductDelete;

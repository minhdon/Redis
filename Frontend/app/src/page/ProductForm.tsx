import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./ProductForm.module.css";
import type { Product } from "../types/Item";

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<Product>({
    id: "",
    category: "",
    title: "",
    price: "",
    image: "",
    description: "",
  });

  // Nếu là Edit, fetch dữ liệu cũ lên form
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://127.0.0.1:8000/api/v1/items/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => alert("Lỗi khi tải dữ liệu cũ: " + err));
    }
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditMode
      ? `http://127.0.0.1:8000/api/v1/items/${id}`
      : `http://127.0.0.1:8000/api/v1/items/${formData.id}`;

    const method = isEditMode ? "PUT" : "POST";

    // Tách id ra khỏi dữ liệu gửi đi
    const { id: _, ...dataToSend } = formData;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend), // Gửi data đã bỏ id
      });

      if (response.ok) {
        alert(isEditMode ? "Cập nhật thành công!" : "Tạo mới thành công!");
        navigate("/");
      } else {
        // Log lỗi chi tiết để biết Server đang mắng gì
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert(`Lỗi: ${errorData.detail || "Có lỗi xảy ra từ Server!"}`);
      }
    } catch (error) {
      alert("Không thể kết nối đến server.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEditMode ? "Chỉnh Sửa Sản Phẩm" : "Tạo Sản Phẩm Mới"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Chỉ cho phép nhập ID nếu là Tạo mới */}
        {!isEditMode && (
          <div className={styles.formGroup}>
            <label>ID Sản Phẩm (Bắt buộc):</label>
            <input
              type="text"
              name="id"
              required
              value={formData.id}
              onChange={handleChange}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Tên sản phẩm (Title):</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Danh mục (Category):</label>
          <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Giá (Price):</label>
          <input
            type="text"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Link ảnh (Image URL):</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Mô tả (Description):</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.btnCancel}>
            Hủy bỏ
          </Link>
          <button type="submit" className={`${styles.btn} ${styles.btnSave}`}>
            {isEditMode ? "Lưu thay đổi" : "Tạo sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

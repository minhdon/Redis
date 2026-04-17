import { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import styles from "./App.module.css";

type Item = {
  name: string;
  description: string;
  price: number;
  tax?: number | null;
};

const baseUrl = "http://localhost:8000/api/v1";

function Notification({ success, error }: { success: string | null; error: string | null }) {
  if (!success && !error) return null;
  return (
    <div className={`${styles.notification} ${success ? styles.success : styles.error}`}>
      {success || error}
    </div>
  );
}

function CreateItem() {
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearForm = () => {
    setItemId("");
    setName("");
    setDescription("");
    setPrice("");
    setTax("");
  };

  async function createItem() {
    setSuccess(null);
    setError(null);
    if (!itemId) return setError("Vui lòng nhập Item ID");
    const item: Item = {
      name,
      description,
      price: parseFloat(price || "0"),
      tax: tax === "" ? undefined : parseFloat(tax),
    };
    try {
      const res = await fetch(
        `${baseUrl}/items/${encodeURIComponent(itemId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
      setSuccess("Tạo item thành công!");
      clearForm();
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    }
  }

  return (
    <div className={styles.routeContainer}>
      <h2>Create Item</h2>
      <Notification success={success} error={error} />
      <div className={styles.row}>
        <label>Item ID / Tên</label>
        <input value={itemId} onChange={(e) => setItemId(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Tax</label>
        <input value={tax} onChange={(e) => setTax(e.target.value)} />
      </div>
      <div className={styles.buttons}>
        <button onClick={createItem}>Create</button>
      </div>
    </div>
  );
}

function ReadItem() {
  const [itemId, setItemId] = useState("");
  const [fetchedItem, setFetchedItem] = useState<Item | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function readItem() {
    setSuccess(null);
    setError(null);
    if (!itemId) return setError("Vui lòng nhập Item ID / Tên");
    try {
      const res = await fetch(`${baseUrl}/items/${encodeURIComponent(itemId)}`);
      const data = await res.json();
      if (!res.ok) {
        setFetchedItem(null);
        throw new Error(data.detail || JSON.stringify(data));
      } else {
        setFetchedItem(data as Item);
        setSuccess("Tải thông tin item thành công!");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
      setFetchedItem(null);
    }
  }

  return (
    <div className={styles.routeContainer}>
      <h2>Read Item</h2>
      <Notification success={success} error={error} />
      <div className={styles.row}>
        <label>Item ID / Tên</label>
        <input value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="Nhập ID hoặc tên để tìm kiếm..." />
      </div>
      <div className={styles.buttons}>
        <button onClick={readItem}>Read</button>
      </div>

      {fetchedItem && (
        <div className={styles.fetched}>
          <h3>Thông tin Item</h3>
          <pre>{JSON.stringify(fetchedItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function UpdateItem() {
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateItem() {
    setSuccess(null);
    setError(null);
    if (!itemId) return setError("Vui lòng nhập Item ID");
    const item: Item = {
      name,
      description,
      price: parseFloat(price || "0"),
      tax: tax === "" ? undefined : parseFloat(tax),
    };
    try {
      const res = await fetch(
        `${baseUrl}/items/${encodeURIComponent(itemId)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
      setSuccess("Cập nhật item thành công!");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    }
  }

  return (
    <div className={styles.routeContainer}>
      <h2>Update Item</h2>
      <Notification success={success} error={error} />
      <div className={styles.row}>
        <label>Item ID / Tên</label>
        <input value={itemId} onChange={(e) => setItemId(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Tax</label>
        <input value={tax} onChange={(e) => setTax(e.target.value)} />
      </div>
      <div className={styles.buttons}>
        <button onClick={updateItem}>Update</button>
      </div>
    </div>
  );
}

function DeleteItem() {
  const [itemId, setItemId] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function deleteItem() {
    setSuccess(null);
    setError(null);
    if (!itemId) return setError("Vui lòng nhập Item ID / Tên");
    try {
      const res = await fetch(
        `${baseUrl}/items/${encodeURIComponent(itemId)}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
      setSuccess("Xóa item thành công!");
      setItemId("");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    }
  }

  return (
    <div className={styles.routeContainer}>
      <h2>Delete Item</h2>
      <Notification success={success} error={error} />
      <div className={styles.row}>
        <label>Item ID / Tên</label>
        <input value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="Nhập ID hoặc tên cần xóa..." />
      </div>
      <div className={styles.buttons}>
        <button onClick={deleteItem}>Delete</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className={styles.appCrud}>
      <h1>Item Management</h1>
      <nav className={styles.nav}>
        <NavLink to="/create" className={({ isActive }) =>isActive ? styles.activeNav : ""}>Create</NavLink>
        <NavLink to="/read" className={({ isActive }) =>isActive ? styles.activeNav : ""}>Read</NavLink>
        <NavLink to="/update" className={({ isActive }) =>isActive ? styles.activeNav : ""}>Update</NavLink>
        <NavLink to="/delete" className={({ isActive }) =>isActive ? styles.activeNav : ""}>Delete</NavLink>
      </nav>

      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/create" />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/read" element={<ReadItem />} />
          <Route path="/update" element={<UpdateItem />} />
          <Route path="/delete" element={<DeleteItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

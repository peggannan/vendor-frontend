// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, editProduct, deleteProduct } from "../api/api";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        const found = data.products.find((p) => p.id == id);
        setProduct(found);
        setForm(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await editProduct(id, form);
      setProduct(data.product);
      setEditing(false);
    } catch {
      alert("Could not save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      navigate("/products");
    } catch {
      alert("Could not delete product");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-400">Product not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 max-w-lg mx-auto">
      <Header title="Product Details" />

      <div className="px-4 pt-4">
        {/* Product card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm mb-4">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
            <svg width="28" height="28" fill="none" stroke="#6c47ff" strokeWidth="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
          </div>

          {editing ? (
            <div className="flex flex-col gap-3">
              {[
                { label: "Product Name", key: "name", type: "text" },
                { label: "Price (₵)", key: "price", type: "number" },
                { label: "Stock", key: "stock", type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button onClick={() => setEditing(false)} className="flex-1 py-3 border border-gray-200 rounded-full text-gray-600 dark:text-gray-300 font-semibold text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-brand-600 text-white rounded-full font-bold text-sm disabled:opacity-60">
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{product.name}</h2>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { label: "Price", value: `₵${product.price}` },
                  { label: "Stock", value: `${product.stock} units` },
                  {
                    label: "Status", value: product.stock <= 5 ? "Low Stock" : "In Stock",
                    color: product.stock <= 5 ? "text-red-500" : "text-green-500"
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-700">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className={`text-sm font-semibold ${color ?? "text-gray-800 dark:text-gray-100"}`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditing(true)} className="flex-1 py-3 border border-brand-200 text-brand-600 rounded-full font-semibold text-sm">Edit</button>
                <button onClick={handleDelete} className="flex-1 py-3 border border-red-200 text-red-500 rounded-full font-semibold text-sm">Delete</button>
              </div>
            </>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
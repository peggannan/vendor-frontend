// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { getProducts, addProduct, editProduct, deleteProduct } from "../api/api";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product || { name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (product) {
        const { data } = await editProduct(product.id, form);
        onSave(data.product, "edit");
      } else {
        const { data } = await addProduct(form);
        onSave(data.product, "add");
      }
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-lg p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">{product ? "Edit Product" : "Add Product"}</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: "Product Name", key: "name", type: "text" },
            { label: "Price (₵)", key: "price", type: "number" },
            { label: "Stock Quantity", key: "stock", type: "number" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-sm text-gray-500 mb-1 block">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-full text-gray-600 font-semibold">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-brand-600 text-white rounded-full font-bold disabled:opacity-60">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "add" | product object

  useEffect(() => {
    getProducts()
      .then(({ data }) => setProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (product, type) => {
    if (type === "add") setProducts((p) => [product, ...p]);
    else setProducts((p) => p.map((x) => (x.id === product.id ? product : x)));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch {
      alert("Could not delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 max-w-lg mx-auto">
      <Header title="Products" />

      <div className="px-4 pt-4">
        <button
          onClick={() => setModal("add")}
          className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-full mb-5"
        >
          + Add Product
        </button>

        {loading ? (
          <p className="text-gray-400 text-sm text-center py-8">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No products yet. Add one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-400">₵{p.price} · {p.stock} in stock</p>
                    {p.stock <= 5 && (
                      <span className="text-xs text-red-500 font-medium">Low Stock</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setModal(p)} className="text-brand-600 text-xs font-semibold px-3 py-1 border border-brand-100 rounded-full">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 text-xs font-semibold px-3 py-1 border border-red-100 rounded-full">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <ProductModal
          product={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      <Navbar />
    </div>
  );
}
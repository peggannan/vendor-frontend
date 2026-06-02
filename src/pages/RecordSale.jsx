// src/pages/RecordSale.jsx
import { useEffect, useState } from "react";
import { getProducts, recordSale } from "../api/api";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function RecordSale() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product_id: "", quantity: 1 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data.products)).catch(console.error);
  }, []);

  const selected = products.find((p) => p.id == form.product_id);
  const total = selected ? (selected.price * form.quantity).toFixed(2) : "0.00";

  const handleSubmit = async () => {
    if (!form.product_id) return alert("Please select a product");
    setLoading(true);
    try {
      await recordSale(form);
      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || "Could not record sale");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 max-w-sm mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 text-2xl">✓</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Sale Recorded!</h2>
        <p className="text-gray-400 text-sm mb-8">Total: ₵{total}</p>
        <button onClick={() => { setSuccess(false); setForm({ product_id: "", quantity: 1 }); }} className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-full mb-3">Record Another</button>
        <button onClick={() => navigate("/dashboard")} className="text-brand-600 font-semibold">Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 max-w-lg mx-auto">
      <PageHeader title="Record Sale" />

      <div className="px-4 pt-6 flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Select Product</label>
          <select
            value={form.product_id}
            onChange={(e) => setForm({ ...form, product_id: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-brand-500"
          >
            <option value="">-- Choose a product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (₵{p.price}) — {p.stock} left</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Quantity</label>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>

        {selected && (
          <div className="bg-brand-50 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-brand-600">₵{total}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-full mt-2 disabled:opacity-60"
        >
          {loading ? "Recording..." : "Record Sale"}
        </button>
      </div>

      <Navbar />
    </div>
  );
}
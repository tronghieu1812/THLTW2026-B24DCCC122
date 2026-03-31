import { useState } from "react";

export default function BangCauLacBo({ clubs, setClubs, onViewMembers }: any) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({ name: "", date: "", president: "", description: "", image: "", active: true });

  const filtered = clubs.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));

  const saveClub = () => {
    if (!form.name) return alert("Vui lòng nhập tên CLB");
    if (editingId) {
      setClubs(clubs.map((c: any) => (c.id === editingId ? { ...form, id: editingId } : c)));
    } else {
      setClubs([...clubs, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", date: "", president: "", description: "", image: "", active: true });
    setEditingId(null);
  };

  const deleteClub = (id: number) => {
    if (window.confirm("Xóa CLB này?")) setClubs(clubs.filter((c: any) => c.id !== id));
  };

  const inputStyle = { padding: "10px", border: "1px solid #ddd", borderRadius: "8px", outline: "none" };

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Quản lý Câu lạc bộ</h3>
      
      {/* FORM NHẬP LIỆU */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px", marginBottom: "20px" }}>
        <input style={inputStyle} placeholder="Tên CLB" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input style={inputStyle}placeholder="Ngày thành lập" value={form.date} type={form.date ? "date" : "text"} onFocus={(e) => (e.target.type = "date")}onBlur={(e) => {
    if (!form.date) e.target.type = "text";}}onChange={e => setForm({...form, date: e.target.value})} />
        <input style={inputStyle} placeholder="Chủ nhiệm" value={form.president} onChange={e => setForm({...form, president: e.target.value})} />
        
        {/* Dropdown chọn Hoạt động */}
        <select 
          style={inputStyle} 
          value={form.active} 
          onChange={e => setForm({...form, active: e.target.value === "true"})}
        >
          <option value="true">Đang hoạt động</option>
          <option value="false">Ngừng hoạt động</option>
        </select>

        <input style={inputStyle} placeholder="Mô tả" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <button 
          onClick={saveClub}
          style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#fafafa", color: "#666", fontSize: "13px" }}>
          <tr>
            <th style={{ padding: "12px", textAlign: "left" }}>Ảnh</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Thông tin CLB</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Ngày lập</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Chủ nhiệm</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Hoạt động</th>
            <th style={{ padding: "12px", textAlign: "right" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c: any) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>
                <img src={c.image || "https://via.placeholder.com/40"} width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover" }} alt="" />
              </td>
              <td style={{ padding: "12px" }}>
                <div style={{ fontWeight: "bold" }}>{c.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }} dangerouslySetInnerHTML={{ __html: c.description }} />
              </td>
              {/* HIỂN THỊ NGÀY THÀNH LẬP */}
              <td style={{ padding: "12px", fontSize: "14px" }}>{c.date || "---"}</td>
              <td style={{ padding: "12px" }}>{c.president}</td>
              {/* HIỂN THỊ TRẠNG THÁI HOẠT ĐỘNG */}
              <td style={{ padding: "12px" }}>
                <span style={{ 
                  padding: "4px 8px", 
                  borderRadius: "12px", 
                  fontSize: "11px", 
                  fontWeight: "bold",
                  backgroundColor: c.active ? "#e6f9ed" : "#ffebee",
                  color: c.active ? "#1e7e34" : "#c62828"
                }}>
                  {c.active ? "Có" : "Không"}
                </span>
              </td>
              <td style={{ padding: "12px", textAlign: "right" }}>
                <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                  <button onClick={() => { setForm(c); setEditingId(c.id); }} style={{ padding: "5px 10px", border: "1px solid #007bff", background: "none", color: "#007bff", borderRadius: "4px" }}>Sửa</button>
                  <button onClick={() => deleteClub(c.id)} style={{ padding: "5px 10px", border: "1px solid #dc3545", background: "none", color: "#dc3545", borderRadius: "4px" }}>Xóa</button>
                  <button onClick={() => onViewMembers(c.name)} style={{ padding: "5px 10px", backgroundColor: "#f0f0f0", border: "none", borderRadius: "4px" }}>Thành viên</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
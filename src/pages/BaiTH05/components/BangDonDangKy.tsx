import React, { useState } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const formInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #cbd5e0",
  boxSizing: "border-box"
};

function Input({ label, value, onChange }: InputProps) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", fontWeight: "bold" }}>{label}</label>
      <input 
        style={formInputStyle} 
        value={value} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
      />
    </div>
  );
}

export default function BangDonDangKy({ data, availableClubs, onAction, onSave }: any) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentActionId, setCurrentActionId] = useState<number | "batch" | null>(null);

  // State cho Modal xem toàn bộ lịch sử
  const [historyModal, setHistoryModal] = useState<any>(null);

  // State cho Form Thêm/Sửa
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "", email: "", phone: "", gender: "Nam", address: "", talent: "", club: "", reason: "", status: "Pending", note: ""
  });

  const handleApprove = (id?: number) => {
    const ids = id ? [id] : selectedIds;
    if (ids.length === 0) return;
    if (window.confirm(`Xác nhận duyệt ${ids.length} đơn?`)) {
      onAction(ids, "Approved");
      setSelectedIds([]);
    }
  };

  const openRejectModal = (id: number | "batch") => {
    setCurrentActionId(id);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) return alert("Bắt buộc nhập lý do từ chối!");
    const ids = currentActionId === "batch" ? selectedIds : [currentActionId as number];
    onAction(ids, "Rejected", rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedIds([]);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSaveForm = () => {
    if (!formData.name || !formData.club) return alert("Vui lòng nhập Họ tên và Câu lạc bộ!");
    onSave(formData); 
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", gender: "Nam", address: "", talent: "", club: "", reason: "", status: "Pending", note: "" });
  };

  const btnStyle: React.CSSProperties = { padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "12px" };

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0 }}>Quản lý Đơn đăng ký thành viên</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => { setEditingItem(null); setShowForm(true); }} style={{ ...btnStyle, backgroundColor: "#10b981", color: "#fff" }}>+ Thêm mới đơn</button>
          <button disabled={selectedIds.length === 0} onClick={() => handleApprove()} style={{ ...btnStyle, backgroundColor: "#3b82f6", color: "#fff", opacity: selectedIds.length ? 1 : 0.5 }}>Duyệt ({selectedIds.length})</button>
          <button disabled={selectedIds.length === 0} onClick={() => openRejectModal("batch")} style={{ ...btnStyle, backgroundColor: "#ef4444", color: "#fff", opacity: selectedIds.length ? 1 : 0.5 }}>Từ chối đã chọn</button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#666", fontSize: "13px", borderBottom: "2px solid #edf2f7", backgroundColor: "#f8fafc" }}>
              <th style={{ padding: "12px" }}><input type="checkbox" checked={selectedIds.length === data.length && data.length > 0} onChange={() => setSelectedIds(selectedIds.length === data.length ? [] : data.map((d: any) => d.id))} /></th>
              <th style={{ padding: "12px" }}>Thông tin ứng viên</th>
              <th style={{ padding: "12px" }}>Chi tiết</th>
              <th style={{ padding: "12px" }}>Câu lạc bộ</th>
              <th style={{ padding: "12px" }}>Trạng thái</th>
              <th style={{ padding: "12px" }}>Lịch sử & Ghi chú</th>
              <th style={{ padding: "12px", textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #edf2f7", fontSize: "13px" }}>
                  <td style={{ padding: "12px" }}><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])} /></td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.name}</div>
                    <div>{item.email}</div>
                    <div>{item.phone}</div>
                  </td>
                  <td style={{ padding: "12px", lineHeight: "1.6" }}>
                    <div><strong>Giới tính:</strong> {item.gender}</div>
                    <div><strong>Địa chỉ:</strong> {item.address}</div>
                    <div style={{ color: "#718096", fontStyle: "italic" }}><strong>Sở trường:</strong> {item.talent}</div>
                    <div style={{ fontSize: "12px" }}><strong>Lý do:</strong> {item.reason}</div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ color: availableClubs.includes(item.club) ? "#1a202c" : "#ef4444", fontWeight: "bold" }}>{item.club}</span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", backgroundColor: item.status === "Approved" ? "#C6F6D5" : item.status === "Rejected" ? "#FED7D7" : "#FEEBC8", color: item.status === "Approved" ? "#22543D" : item.status === "Rejected" ? "#822727" : "#744210" }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px", fontSize: "11px", color: "#718096" }}>
                    <div style={{ fontWeight: "bold", color: "#4a5568", marginBottom: "4px" }}>Ghi chú: {item.note || "Trống"}</div>
                    {/* Hiển thị dòng lịch sử cuối cùng */}
                    {item.history && item.history.length > 0 ? (
                      <div>
                        <div style={{ color: "#a0aec0", marginBottom: "4px" }}>• {item.history[item.history.length - 1]}</div>
                        <button 
                          onClick={() => setHistoryModal(item)}
                          style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", padding: 0, textDecoration: "underline", fontSize: "10px" }}
                        >
                          Xem tất cả lịch sử
                        </button>
                      </div>
                    ) : (
                      <div style={{ color: "#cbd5e0" }}>Chưa có lịch sử</div>
                    )}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                      <button onClick={() => handleEdit(item)} style={{ background: "none", border: "1px solid #cbd5e0", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>Sửa</button>
                      <button onClick={() => handleApprove(item.id)} style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>Duyệt</button>
                      <button onClick={() => openRejectModal(item.id)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>Từ chối</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "#999" }}>Chưa có đơn đăng ký nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL XEM TOÀN BỘ LỊCH SỬ */}
      {historyModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 200 }}>
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "500px", boxShadow: "0 20px 25px rgba(0,0,0,0.2)" }}>
            <h3 style={{ marginTop: 0 }}>Lịch sử thao tác: {historyModal.name}</h3>
            <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #edf2f7", padding: "15px", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
              {historyModal.history?.map((log: string, i: number) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: i === historyModal.history.length - 1 ? "none" : "1px solid #e2e8f0", fontSize: "13px", color: "#4a5568" }}>
                  <span style={{ color: "#3b82f6", marginRight: "8px" }}>●</span> {log}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button onClick={() => setHistoryModal(null)} style={{ ...btnStyle, backgroundColor: "#3b82f6", color: "#fff", padding: "10px 20px" }}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM THÊM / SỬA (Giữ nguyên) */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 }}>
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "600px", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ marginTop: 0 }}>{editingItem ? "Chỉnh sửa đơn" : "Thêm mới đơn đăng ký"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <Input label="Họ tên" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
              <Input label="Email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              <Input label="Số điện thoại" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} />
              <div>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", fontWeight: "bold" }}>Giới tính</label>
                <select style={formInputStyle} value={formData.gender} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, gender: e.target.value})}>
                  <option value="Nam">Nam</option><option value="Nữ">Nữ</option>
                </select>
              </div>
              <Input label="Địa chỉ" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} />
              <div>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", fontWeight: "bold" }}>Câu lạc bộ</label>
                <select style={formInputStyle} value={formData.club} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, club: e.target.value})}>
                  <option value="">Chọn CLB</option>
                  {availableClubs.map((c: string) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <Input label="Sở trường" value={formData.talent} onChange={(v: string) => setFormData({...formData, talent: v})} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", fontWeight: "bold" }}>Lý do đăng ký</label>
                <textarea 
                  style={{ ...formInputStyle, height: "80px" }} 
                  value={formData.reason} 
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, reason: e.target.value})} 
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => setShowForm(false)} style={{ ...btnStyle, backgroundColor: "#eee" }}>Hủy</button>
              <button onClick={handleSaveForm} style={{ ...btnStyle, backgroundColor: "#3b82f6", color: "#fff" }}>Lưu lại</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TỪ CHỐI (Giữ nguyên) */}
      {showRejectModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 101 }}>
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "400px" }}>
            <h4 style={{ marginTop: 0, color: "#ef4444" }}>Lý do từ chối (Bắt buộc)</h4>
            <textarea 
              style={{ ...formInputStyle, height: "100px" }} 
              placeholder="Nhập lý do tại đây..." 
              value={rejectReason} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRejectReason(e.target.value)} 
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
              <button onClick={() => setShowRejectModal(false)} style={{ ...btnStyle, backgroundColor: "#eee" }}>Hủy</button>
              <button onClick={confirmReject} style={{ ...btnStyle, backgroundColor: "#ef4444", color: "#fff" }}>Xác nhận Từ chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
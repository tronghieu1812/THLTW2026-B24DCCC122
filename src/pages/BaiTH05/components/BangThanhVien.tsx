import { useState } from "react";

export default function BangThanhVien({ data, clubs, onUpdateMembers, filterClub }: any) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [targetClub, setTargetClub] = useState("");

  // LỌC: Chỉ hiện Approved + (Nếu có filterClub thì lọc theo CLB đó)
  const displayMembers = data.filter((m: any) => {
    const isApproved = m.status === "Approved";
    return filterClub ? (isApproved && m.club === filterClub) : isApproved;
  });

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3>Thành viên {filterClub ? ` - CLB: ${filterClub}` : ""}</h3>
        <button 
          disabled={selectedIds.length === 0} 
          onClick={() => setShowMoveModal(true)}
          style={{ padding: "8px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Chuyển CLB ({selectedIds.length})
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr style={{ textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Chọn</th>
            <th style={{ padding: "12px" }}>Họ tên</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>CLB Hiện tại</th>
          </tr>
        </thead>
        <tbody>
          {displayMembers.map((m: any) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>
                <input type="checkbox" onChange={() => setSelectedIds(prev => prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id])} />
              </td>
              <td style={{ padding: "12px", fontWeight: "bold" }}>{m.name}</td>
              <td style={{ padding: "12px" }}>{m.email}</td>
              <td style={{ padding: "12px" }}>{m.club}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ... (Phần Modal Chuyển CLB giữ nguyên như trước) */}
    </div>
  );
}
import { useState, useMemo } from "react";

export default function BieuDoThongKe({ clubs, registrations }: any) {
  // 1. Tính toán dữ liệu thống kê tổng chung
  const statsSummary = useMemo(() => {
    return {
      totalClubs: clubs.length,
      pending: registrations.filter((r: any) => r.status === "Pending").length,
      approved: registrations.filter((r: any) => r.status === "Approved").length,
      rejected: registrations.filter((r: any) => r.status === "Rejected").length,
      totalReg: registrations.length,
    };
  }, [clubs, registrations]);

  // 2. Xử lý dữ liệu cho biểu đồ (Group by Club)
  const chartData = useMemo(() => {
    return clubs.map((club: any) => {
      const regOfClub = registrations.filter((r: any) => r.club === club.name);
      return {
        name: club.name,
        pending: regOfClub.filter((r: any) => r.status === "Pending").length,
        approved: regOfClub.filter((r: any) => r.status === "Approved").length,
        rejected: regOfClub.filter((r: any) => r.status === "Rejected").length,
      };
    });
  }, [clubs, registrations]);

  // Tìm giá trị cao nhất để tính chiều cao cột (scale % )
  const maxValue = Math.max(
    ...chartData.flatMap((d: any) => [d.pending, d.approved, d.rejected]),
    1 // Tránh chia cho 0
  );

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Báo cáo & Thống kê</h3>

      {/* SECTION 1: SỐ LƯỢNG CHUNG */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <StatCard label="Tổng Câu lạc bộ" value={statsSummary.totalClubs} color="#3b82f6" />
        <StatCard label="Đơn Pending" value={statsSummary.pending} color="#f59e0b" />
        <StatCard label="Đơn Approved" value={statsSummary.approved} color="#10b981" />
        <StatCard label="Đơn Rejected" value={statsSummary.rejected} color="#ef4444" />
      </div>

      {/* SECTION 2: COLUMN CHART */}
      <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
        <h4 style={{ marginTop: 0, marginBottom: "40px", color: "#475569" }}>Số lượng đơn đăng ký theo từng CLB</h4>
        
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: "300px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
          {chartData.map((item: any, idx: number) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "120px" }}>
              
              {/* Group of 3 columns */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "200px", marginBottom: "10px" }}>
                <Bar height={(item.pending / maxValue) * 100} color="#f59e0b" value={item.pending} />
                <Bar height={(item.approved / maxValue) * 100} color="#10b981" value={item.approved} />
                <Bar height={(item.rejected / maxValue) * 100} color="#ef4444" value={item.rejected} />
              </div>

              {/* Club Name (xAxis) */}
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#64748b", textAlign: "center", wordBreak: "break-word" }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Chú thích (Legend) */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          <LegendItem color="#f59e0b" label="Pending" />
          <LegendItem color="#10b981" label="Approved" />
          <LegendItem color="#ef4444" label="Rejected" />
        </div>
      </div>
    </div>
  );
}

// Component con cho thẻ thống kê
function StatCard({ label, value, color }: any) {
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderLeft: `6px solid ${color}` }}>
      <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "5px" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1e293b" }}>{value}</div>
    </div>
  );
}

// Component con cho cột biểu đồ
function Bar({ height, color, value }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "15px" }}>
      {value > 0 && <span style={{ fontSize: "10px", marginBottom: "2px", fontWeight: "bold" }}>{value}</span>}
      <div style={{ 
        height: `${height}%`, 
        width: "100%", 
        backgroundColor: color, 
        borderRadius: "4px 4px 0 0",
        minHeight: value > 0 ? "4px" : "0"
      }} />
    </div>
  );
}

// Component chú thích
function LegendItem({ color, label }: any) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: "12px", height: "12px", backgroundColor: color, borderRadius: "2px" }} />
      <span style={{ fontSize: "12px", color: "#64748b" }}>{label}</span>
    </div>
  );
}
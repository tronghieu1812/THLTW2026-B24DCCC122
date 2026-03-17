import { useState } from "react";

const ThongKe = ({ lichList, nhanVienList }: any) => {
  const [nvId, setNvId] = useState("");

  // 🔥 lọc theo nhân viên
  const lichTheoNV = lichList.filter(
    (l: any) => l.nvId === nvId
  );

  // 📊 theo ngày
  const theoNgay: any = {};
  let tongDoanhThu = 0;

  lichTheoNV.forEach((l: any) => {
    theoNgay[l.ngay] = (theoNgay[l.ngay] || 0) + 1;

    // 💰 cộng doanh thu
    tongDoanhThu += l.gia || 0;
  });

  return (
    <div>
      <h3>📊 Thống kê</h3>

      {/* chọn nhân viên */}
      <select
        value={nvId}
        onChange={(e) => setNvId(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      >
        <option value="">-- Chọn nhân viên --</option>
        {nhanVienList.map((nv: any) => (
          <option key={nv.id} value={nv.id}>
            {nv.ten}
          </option>
        ))}
      </select>

      <p>📅 Tổng lịch: {lichTheoNV.length}</p>

      <p>💰 Doanh thu: {tongDoanhThu.toLocaleString()} đ</p>

      <h4>Theo ngày:</h4>

      {Object.keys(theoNgay).length === 0 && <p>Chưa có dữ liệu</p>}

      {Object.keys(theoNgay).map((ngay) => (
        <p key={ngay}>
          {ngay}: {theoNgay[ngay]} lịch
        </p>
      ))}
    </div>
  );
};

export default ThongKe;
import { useState } from "react";

const DatLich = ({ nhanVienList, lichList, setLichList, dichVuList }: any) => {
  const [ngay, setNgay] = useState("");
  const [gio, setGio] = useState("");
  const [nvId, setNvId] = useState("");
  const [dichVuId, setDichVuId] = useState(""); // 🔥 thêm

  const datLich = () => {
    if (!ngay || !gio || !nvId || !dichVuId) {
      alert("Vui lòng nhập đầy đủ!");
      return;
    }

    const nv = nhanVienList.find((n: any) => n.id == nvId);
    if (!nv) return;

    const thu = new Date(ngay).getDay();

    const soLuong = lichList.filter(
      (l: any) => l.ngay === ngay && l.nvId === nvId
    ).length;

    let gioiHan = 0;
    if (typeof nv.gioiHan === "string") {
      const matchLimit = nv.gioiHan.match(/(\d+)/);
      gioiHan = matchLimit ? parseInt(matchLimit[1]) : 0;
    } else {
      gioiHan = nv.gioiHan;
    }

    if (soLuong >= gioiHan) {
      alert("Đã đạt giới hạn khách trong ngày!");
      return;
    }

    const match = nv.lich.match(/(\d+)h-(\d+)h\s*(?:T|Thứ)\s*(\d)/i);

    if (!match) {
      alert("Nhân viên không làm việc ngày này!");
      return;
    }

    const start = parseInt(match[1]);
    const end = parseInt(match[2]);
    const thuLam = parseInt(match[3]) - 1;

    if (thu !== thuLam) {
      alert("Nhân viên không làm việc ngày này!");
      return;
    }

    const gioDat = parseInt(gio.split(":")[0]);

    if (gioDat < start || gioDat >= end) {
      alert("Ngoài giờ làm việc!");
      return;
    }

    const trung = lichList.find(
      (l: any) => l.ngay === ngay && l.gio === gio && l.nvId === nvId
    );

    if (trung) {
      alert("Nhân viên đã có lịch!");
      return;
    }

    // 🔥 lấy dịch vụ
    const dichVu = dichVuList.find((d: any) => d.id == dichVuId);

    // ✅ thêm lịch
    setLichList([
      ...lichList,
      {
        id: Date.now(),
        ngay,
        gio,
        nvId,
        dichVuId,
        gia: dichVu?.gia || 0, // 🔥 FIX CHÍNH Ở ĐÂY
        trangThai: "Chờ duyệt",
      },
    ]);
  };

  return (
    <div>
      <h3>📅 Đặt lịch</h3>

      <input
        type="date"
        value={ngay}
        onChange={(e) => setNgay(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      />

      <input
        type="time"
        value={gio}
        onChange={(e) => setGio(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      />

      {/* 🔥 chọn nhân viên */}
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

      {/* 🔥 chọn dịch vụ */}
      <select
        value={dichVuId}
        onChange={(e) => setDichVuId(e.target.value)}
        style={{ display: "block", marginBottom: 8 }}
      >
        <option value="">-- Chọn dịch vụ --</option>
        {dichVuList.map((dv: any) => (
          <option key={dv.id} value={dv.id}>
            {dv.ten} - {dv.gia}đ
          </option>
        ))}
      </select>

      <button onClick={datLich}>Đặt</button>
    </div>
  );
};

export default DatLich;
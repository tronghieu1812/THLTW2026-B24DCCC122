import { useState } from "react";

const NhanVien = ({ setNhanVienList }: any) => {
  const [list, setList] = useState<any[]>([]);
  const [ten, setTen] = useState("");
 const [gioiHan, setGioiHan] = useState<number | "">("");
  const [lich, setLich] = useState("");

  // ➕ Thêm nhân viên
  const them = () => {
    if (!ten) return alert("Nhập tên!");

    const newList = [
      ...list,
      {
        id: Date.now(),
        ten,
        gioiHan,
        lich,
      },
    ];

    setList(newList);
    setNhanVienList(newList); // 🔥 đẩy data lên App

    setTen("");
    setGioiHan(0);
    setLich("");
  };

  // ❌ Xóa
  const xoa = (id: number) => {
    const newList = list.filter((nv) => nv.id !== id);
    setList(newList);
    setNhanVienList(newList);
  };

  // ✏️ Sửa
  const sua = (id: number) => {
    const newTen = prompt("Tên mới:");
    const newGioiHan = prompt("Giới hạn khách/ngày:");
    const newLich = prompt("Lịch làm việc:");

    const newList = list.map((nv) =>
      nv.id === id
        ? {
            ...nv,
            ten: newTen || nv.ten,
            gioiHan: newGioiHan ? Number(newGioiHan) : nv.gioiHan,
            lich: newLich || nv.lich,
          }
        : nv
    );

    setList(newList);
    setNhanVienList(newList);
  };

  return (
    <div>
      <h3>👨‍💼 Quản lý nhân viên</h3>

      <input
        placeholder="Tên nhân viên"
        value={ten}
        onChange={(e) => setTen(e.target.value)}
      />
      <input
  type="number"
  placeholder="Giới hạn khách/ngày"
  value={gioiHan}
  onChange={(e) => setGioiHan(e.target.value === "" ? "" : Number(e.target.value))}

/>

      <input
        placeholder="Lịch làm việc (vd: 9h-17h T6)"
        value={lich}
        onChange={(e) => setLich(e.target.value)}
      />

      <button onClick={them}>Thêm</button>

      <hr />

      {list.map((nv) => (
        <div key={nv.id}>
          <p>
            👤 {nv.ten} | {nv.gioiHan} khách/ngày | 🕒 {nv.lich}
          </p>

          <button onClick={() => sua(nv.id)}>Sửa</button>
          <button onClick={() => xoa(nv.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default NhanVien;
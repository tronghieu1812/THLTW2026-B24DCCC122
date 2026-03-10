import { useState } from "react";
import { KhoiKienThuc } from "../types";

interface Props {
  danhSachKhoi: KhoiKienThuc[];
  setDanhSachKhoi: (data: KhoiKienThuc[]) => void;
}

export default function KhoiKienThucComponent({
  danhSachKhoi,
  setDanhSachKhoi,
}: Props) {
  const [tenKhoi, setTenKhoi] = useState("");

  const themKhoi = () => {
    const khoiMoi: KhoiKienThuc = {
      id: Date.now(),
      ten: tenKhoi,
    };

    setDanhSachKhoi([...danhSachKhoi, khoiMoi]);
    setTenKhoi("");
  };

  return (
    <div>
      <h2>Quản lý khối kiến thức</h2>

      <input
        placeholder="Tên khối"
        value={tenKhoi}
        onChange={(e) => setTenKhoi(e.target.value)}
      />

      <button onClick={themKhoi}>Thêm</button>

      <ul>
        {danhSachKhoi.map((k) => (
          <li key={k.id}>{k.ten}</li>
        ))}
      </ul>
    </div>
  );
}
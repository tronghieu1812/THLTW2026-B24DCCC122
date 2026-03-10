import { useState } from "react";
import { MonHoc } from "../types";

interface Props {
  danhSachMon: MonHoc[];
  setDanhSachMon: (data: MonHoc[]) => void;
}

export default function MonHocComponent({
  danhSachMon,
  setDanhSachMon,
}: Props) {
  const [maMon, setMaMon] = useState("");
  const [tenMon, setTenMon] = useState("");
  const [tinChi, setTinChi] = useState(0);

  const themMon = () => {
    const monMoi: MonHoc = {
      id: Date.now(),
      maMon,
      tenMon,
      tinChi,
    };

    setDanhSachMon([...danhSachMon, monMoi]);
  };

  return (
    <div>
      <h2>Quản lý môn học</h2>

      <input placeholder="Mã môn" onChange={(e) => setMaMon(e.target.value)} />

      <input
        placeholder="Tên môn"
        onChange={(e) => setTenMon(e.target.value)}
      />

      <input
        type="number"
        placeholder="Tín chỉ"
        onChange={(e) => setTinChi(Number(e.target.value))}
      />

      <button onClick={themMon}>Thêm môn</button>

      <ul>
        {danhSachMon.map((m) => (
          <li key={m.id}>
            {m.maMon} - {m.tenMon} ({m.tinChi} tín chỉ)
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useState } from "react";
import { CauHoi, DoKho, MonHoc, KhoiKienThuc } from "../types";

interface Props {
  danhSachCauHoi: CauHoi[];
  setDanhSachCauHoi: (data: CauHoi[]) => void;
  danhSachMon: MonHoc[];
  danhSachKhoi: KhoiKienThuc[];
}

export default function CauHoiComponent({
  danhSachCauHoi,
  setDanhSachCauHoi,
  danhSachMon,
  danhSachKhoi,
}: Props) {
  const [noiDung, setNoiDung] = useState("");
  const [monHocId, setMonHocId] = useState(0);
  const [khoiId, setKhoiId] = useState(0);
  const [doKho, setDoKho] = useState<DoKho>("Dễ");

  const themCauHoi = () => {
    const cauHoiMoi: CauHoi = {
      id: Date.now(),
      monHocId,
      noiDung,
      doKho,
      khoiId,
    };

    setDanhSachCauHoi([...danhSachCauHoi, cauHoiMoi]);
  };

  return (
    <div>
      <h2>Quản lý câu hỏi</h2>

      <select onChange={(e) => setMonHocId(Number(e.target.value))}>
        <option>Chọn môn học</option>
        {danhSachMon.map((m) => (
          <option key={m.id} value={m.id}>
            {m.tenMon}
          </option>
        ))}
      </select>

      <select onChange={(e) => setKhoiId(Number(e.target.value))}>
        <option>Chọn khối kiến thức</option>
        {danhSachKhoi.map((k) => (
          <option key={k.id} value={k.id}>
            {k.ten}
          </option>
        ))}
      </select>

      <select onChange={(e) => setDoKho(e.target.value as DoKho)}>
        <option>Dễ</option>
        <option>Trung bình</option>
        <option>Khó</option>
        <option>Rất khó</option>
      </select>

      <input
        placeholder="Nội dung câu hỏi"
        onChange={(e) => setNoiDung(e.target.value)}
      />

      <button onClick={themCauHoi}>Thêm câu hỏi</button>

      <ul>
        {danhSachCauHoi.map((c) => (
          <li key={c.id}>
            {c.noiDung} - {c.doKho}
          </li>
        ))}
      </ul>
    </div>
  );
}
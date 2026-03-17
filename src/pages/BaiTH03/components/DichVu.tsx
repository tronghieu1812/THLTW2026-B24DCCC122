import { useState } from "react";

type Props = {
  setDichVuList: React.Dispatch<React.SetStateAction<any[]>>;
};

const DichVu = ({ setDichVuList }: Props) => {
  const [list, setList] = useState<any[]>([]);
  const [ten, setTen] = useState("");
  const [gia, setGia] = useState(0);
  const [tg, setTg] = useState(0);

  const them = () => {
    const dv = {
      id: Date.now(),
      ten,
      gia,
      tg,
    };

    // 👉 lưu local (hiển thị)
    setList([...list, dv]);

    // 👉 lưu global (cho DatLich + ThongKe dùng)
    setDichVuList((prev) => [...prev, dv]);
  };

  return (
    <div>
      <h3>💇 Dịch vụ</h3>

      <input
        placeholder="Tên"
        onChange={(e) => setTen(e.target.value)}
      />

      <input
        placeholder="Giá"
        type="number"
        onChange={(e) => setGia(Number(e.target.value))}
      />

      <input
        placeholder="Thời gian (phút)"
        type="number"
        onChange={(e) => setTg(Number(e.target.value))}
      />

      <button onClick={them}>Thêm</button>

      {list.map((dv) => (
        <p key={dv.id}>
          {dv.ten} - {dv.gia}đ - {dv.tg} phút
        </p>
      ))}
    </div>
  );
};

export default DichVu;
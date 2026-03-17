import { useState } from "react";

const DanhGia = ({ nhanVienList }: any) => {
  const [list, setList] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [diem, setDiem] = useState(5);
  const [nvId, setNvId] = useState("");

  const them = () => {
    if (!text || !nvId) {
      alert("Nhập nội dung và chọn nhân viên!");
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        text,
        diem,
        nvId, // 🔥 gắn nhân viên
        phanHoi: "",
      },
    ]);

    setText("");
    setDiem(5);
  };

  const phanHoi = (id: number) => {
    const rep = prompt("Phản hồi:");
    setList(
      list.map((d) =>
        d.id === id ? { ...d, phanHoi: rep } : d
      )
    );
  };

  // 🔥 lọc theo nhân viên đang chọn
  const danhGiaTheoNV = list.filter((d) => d.nvId === nvId);

  // ⭐ tính trung bình riêng
  const avg =
    danhGiaTheoNV.length > 0
      ? danhGiaTheoNV.reduce((sum, d) => sum + d.diem, 0) /
        danhGiaTheoNV.length
      : 0;

  return (
    <div>
      <h3>⭐ Đánh giá</h3>

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

      <input
        placeholder="Nội dung"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        placeholder="Số sao"
        type="number"
        min={1}
        max={5}
        value={diem}
        onChange={(e) => setDiem(Number(e.target.value))}
      />

      <button onClick={them}>Gửi</button>

      <p>⭐ Trung bình: {avg.toFixed(1)}</p>

      {/* hiển thị theo nhân viên */}
      {danhGiaTheoNV.map((d) => (
        <div key={d.id}>
          <p>
            {d.text} ({d.diem}⭐)
          </p>
          <p>Phản hồi: {d.phanHoi}</p>
          <button onClick={() => phanHoi(d.id)}>Phản hồi</button>
        </div>
      ))}
    </div>
  );
};

export default DanhGia;
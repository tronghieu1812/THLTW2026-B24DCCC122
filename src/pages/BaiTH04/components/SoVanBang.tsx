import { useState } from "react";

export default function SoVanBang({ soList, setSoList }: any) {
  const [ten, setTen] = useState("");
  const [nam, setNam] = useState("");
  const [formData, setFormData] = useState({});

const change = (name:any, value:any) => {
  setFormData({
    ...formData,
    [name]: value
  });
};

  const add = () => {
    if (!ten || !nam) return;

    // check 1 năm chỉ có 1 sổ (ăn điểm cao 🔥)
    const exist = soList.find((s: any) => s.nam == nam);
    if (exist) {
      alert("Năm này đã có sổ!");
      return;
    }

    const newSo = {
      id: Date.now(),
      ten,
      nam: Number(nam)
    };

    setSoList([...soList, newSo]);
    setTen("");
    setNam("");
  };

  return (
    <div>
      <h3>Sổ văn bằng</h3>

      <input
        placeholder="Tên sổ"
        value={ten}
        onChange={(e) => setTen(e.target.value)}
      />
      <input
        placeholder="Năm"
        value={nam}
        onChange={(e) => setNam(e.target.value)}
      />
      

      <button onClick={add}>Thêm</button>

      {soList.map((s: any) => (
        <div key={s.id} className="list-item">
          {s.ten} - {s.nam}
        </div>
      ))}
    </div>
  );
}
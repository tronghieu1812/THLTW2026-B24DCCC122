import { useState } from "react";

export default function QuyetDinh({ qdList, setQdList, soList }: any) {
  const [form, setForm] = useState<any>({});

  const change = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const add = () => {
    if (!form.so_id) {
      alert("Chọn sổ!");
      return;
    }

    const newQD = {
      id: Date.now(),
      ...form
    };

    setQdList([...qdList, newQD]);
  };

  return (
    <div>
      <h3>Quyết định tốt nghiệp</h3>

      {/* CHỌN SỔ */}
      <select onChange={(e) => change("so_id", e.target.value)}>
        <option value="">-- Chọn sổ --</option>
        {soList.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.ten} - {s.nam}
          </option>
        ))}
      </select>

      <input
        placeholder="Số QĐ"
        onChange={(e) => change("so_qd", e.target.value)}
      />

     <input
  type="text" 
  placeholder="Ngày ban hành"
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => {
    if (!e.target.value) e.target.type = "text";
  }}
  onChange={(e) => change("ngay_ban_hanh", e.target.value)}
/>

      <input
        placeholder="Trích yếu"
        onChange={(e) => change("trich_yeu", e.target.value)}
      />

      <button onClick={add}>Thêm</button>

      <h4>Danh sách</h4>
      {qdList.map((q: any) => (
        <div key={q.id} className="list-item">
          {q.so_qd} - {q.ngay} - {q.trich_yeu}
        </div>
      ))}
    </div>
  );
}
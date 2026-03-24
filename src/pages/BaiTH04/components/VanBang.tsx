import { useState } from "react";

export default function VanBang({
  vanBangList,
  setVanBangList,
  truongList,
  soList,
  qdList
}: any) {
  const [form, setForm] = useState<any>({});

  const change = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const submit = () => {
    if (!form.so_id || !form.qd_id) {
      alert("Chọn sổ và quyết định!");
      return;
    }

    // 🔥 AUTO SỐ VÀO SỔ THEO SỔ
    const listCungSo = vanBangList.filter(
      (v: any) => Number(v.so_id) === Number(form.so_id)
    );

    const so =
      listCungSo.length > 0
        ? Math.max(...listCungSo.map((v: any) => v.so_vao_so)) + 1
        : 1;

    const newVB = {
      id: Date.now(),
      so_vao_so: so,
      ...form
    };

    setVanBangList([...vanBangList, newVB]);
  };

  return (
    <div>
      <h3>Thêm văn bằng</h3>

      {/* CHỌN SỔ */}
      <select onChange={(e) => change("so_id", e.target.value)}>
        <option value="">-- Chọn sổ --</option>
        {soList.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.ten} - {s.nam}
          </option>
        ))}
      </select>

      {/* CHỌN QUYẾT ĐỊNH */}
      <select onChange={(e) => change("qd_id", e.target.value)}>
        <option value="">-- Chọn quyết định --</option>
        {qdList.map((q: any) => (
          <option key={q.id} value={q.id}>
            {q.so_qd}
          </option>
        ))}
      </select>

      {/* 5 TRƯỜNG MẶC ĐỊNH */}
      <input
        placeholder="Số hiệu văn bằng"
        onChange={(e) => change("so_hieu", e.target.value)}
      />

      <input
        placeholder="Mã sinh viên"
        onChange={(e) => change("ma_sv", e.target.value)}
      />

      <input
        placeholder="Họ tên"
        onChange={(e) => change("ho_ten", e.target.value)}
      />
      <input
  type="text"
  placeholder="Ngày sinh"
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => {
    if (!e.target.value) e.target.type = "text";
  }}
  onChange={(e) => change("ngay_sinh", e.target.value)}
/>


      {/* FIELD ĐỘNG 🔥 */}
      {truongList.map((t: any) => (
        <div key={t.id}>
          <label>{t.ten_truong}</label>

          {t.kieu_du_lieu === "String" && (
            <input onChange={(e) => change(t.id, e.target.value)} />
          )}

          {t.kieu_du_lieu === "Number" && (
            <input
              type="number"
              onChange={(e) => change(t.id, e.target.value)}
            />
          )}

          {t.kieu_du_lieu === "Date" && (
            <input
              type="date"
              onChange={(e) => change(t.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={submit}>Lưu</button>

      <h4>Danh sách văn bằng</h4>
      {vanBangList.map((v: any) => (
        <div key={v.id} className="list-item">
          <b>{v.ho_ten}</b> - {v.ma_sv} - {v.so_hieu}  
          <br />
          Ngày sinh: {v.ngay_sinh} | Số: {v.so_vao_so}
        </div>
      ))}
    </div>
  );
}
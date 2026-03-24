import { useState } from "react";

export default function TraCuu({ data, qdList, setQdList }: any) {
  const [form, setForm] = useState<any>({});
  const [result, setResult] = useState<any[]>([]);

  const change = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const search = () => {
    // 🔥 ĐẾM SỐ FIELD ĐÃ NHẬP
    const filled = Object.values(form).filter((v) => v && v !== "").length;

    if (filled < 2) {
      alert("Nhập ít nhất 2 điều kiện!");
      return;
    }

    const rs = data.filter((v: any) => {
      return (
        (!form.so_hieu || v.so_hieu?.includes(form.so_hieu)) &&
        (!form.so_vao_so || v.so_vao_so == form.so_vao_so) &&
        (!form.ma_sv || v.ma_sv?.includes(form.ma_sv)) &&
        (!form.ho_ten || v.ho_ten?.toLowerCase().includes(form.ho_ten.toLowerCase())) &&
        (!form.ngay_sinh || v.ngay_sinh === form.ngay_sinh)
      );
    });

    setResult(rs);

    // 🔥 TĂNG LƯỢT TRA CỨU THEO QUYẾT ĐỊNH
    const updatedQD = qdList.map((q: any) => {
      const count = rs.filter((r: any) => r.qd_id == q.id).length;
      return {
        ...q,
        luot_tra_cuu: (q.luot_tra_cuu || 0) + count
      };
    });

    setQdList(updatedQD);
  };

  return (
    <div>
      <h3>Tra cứu văn bằng</h3>

      {/* FORM */}
      <input placeholder="Số hiệu" onChange={(e) => change("so_hieu", e.target.value)} />
      <input placeholder="Số vào sổ" onChange={(e) => change("so_vao_so", e.target.value)} />
      <input placeholder="Mã sinh viên" onChange={(e) => change("ma_sv", e.target.value)} />
      <input placeholder="Họ tên" onChange={(e) => change("ho_ten", e.target.value)} />
      
      <label>Ngày sinh</label>
      <input type="date" onChange={(e) => change("ngay_sinh", e.target.value)} />

      <button onClick={search}>Tra cứu</button>

      <h4>Kết quả</h4>

      {result.map((r: any) => {
        const qd = qdList.find((q: any) => q.id == r.qd_id);

        return (
          <div key={r.id} className="list-item">
            <b>{r.ho_ten}</b> - {r.ma_sv}  
            <br />
            Số hiệu: {r.so_hieu} | Số vào sổ: {r.so_vao_so}
            <br />
            Ngày sinh: {r.ngay_sinh}
            <br />
            Quyết định: {qd?.so_qd} ({qd?.ngay})
          </div>
        );
      })}
    </div>
  );
}
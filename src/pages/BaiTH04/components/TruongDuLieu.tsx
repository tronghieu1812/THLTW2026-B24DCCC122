import { useState } from "react";

export default function TruongDuLieu({ truongList, setTruongList }: any) {
  const [ten, setTen] = useState("");
  const [kieu, setKieu] = useState("String");
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setTen("");
    setKieu("String");
    setEditingId(null);
  };

  const save = () => {
    if (!ten) return;

    if (editingId) {
      const updated = truongList.map((t: any) =>
        t.id === editingId
          ? { ...t, ten_truong: ten, kieu_du_lieu: kieu }
          : t
      );
      setTruongList(updated);
    } else {
      setTruongList([
        ...truongList,
        {
          id: Date.now(),
          ten_truong: ten,
          kieu_du_lieu: kieu
        }
      ]);
    }

    resetForm();
  };

  const edit = (t: any) => {
    setTen(t.ten_truong);
    setKieu(t.kieu_du_lieu);
    setEditingId(t.id);
  };

  const remove = (id: number) => {
    setTruongList(truongList.filter((t: any) => t.id !== id));
  };

  return (
    <div>
      <h3>Cấu hình biểu mẫu</h3>

      {/* FORM */}
      <input
        placeholder="Tên trường"
        value={ten}
        onChange={(e) => setTen(e.target.value)}
      />

      <select value={kieu} onChange={(e) => setKieu(e.target.value)}>
        <option value="String">String</option>
        <option value="Number">Number</option>
        <option value="Date">Date</option>
      </select>

      <button onClick={save}>
        {editingId ? "Cập nhật" : "Thêm"}
      </button>

      {editingId && (
        <button className="btn-cancel" onClick={resetForm}>
          Hủy
        </button>
      )}

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên trường</th>
            <th>Kiểu dữ liệu</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {truongList.map((t: any, index: number) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.ten_truong}</td>
              <td>{t.kieu_du_lieu}</td>
              <td>
                <button className="btn-edit" onClick={() => edit(t)}>
                  Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => remove(t.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
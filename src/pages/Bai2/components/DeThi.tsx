import { CauHoi } from "../types";

interface Props {
  danhSachCauHoi: CauHoi[];
  deThi: CauHoi[];
  setDeThi: (data: CauHoi[]) => void;
}

export default function DeThiComponent({
  danhSachCauHoi,
  deThi,
  setDeThi,
}: Props) {
  const taoDeThi = () => {
    const de = danhSachCauHoi.slice(0, 3);

    if (de.length < 3) {
      alert("Không đủ câu hỏi để tạo đề");
      return;
    }

    setDeThi(de);
  };

  return (
    <div>
      <h2>Tạo đề thi</h2>

      <button onClick={taoDeThi}>Tạo đề</button>

      <ol>
        {deThi.map((c) => (
          <li key={c.id}>
            {c.noiDung} ({c.doKho})
          </li>
        ))}
      </ol>
    </div>
  );
}
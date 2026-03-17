// LichHenList.tsx
const LichHenList = ({ lichList, setLichList }: any) => {
  const update = (id: number, status: string) => {
    setLichList(
      lichList.map((l: any) =>
        l.id === id ? { ...l, trangThai: status } : l
      )
    );
  };

  return (
    <div>
      <h3>Lịch hẹn</h3>

      {lichList.map((l: any) => (
        <div key={l.id}>
          <p>
            {l.ngay} - {l.gio} ({l.trangThai})
          </p>

          <button onClick={() => update(l.id, "Xác nhận")}>
            Xác nhận
          </button>
          <button onClick={() => update(l.id, "Hoàn thành")}>
            Hoàn thành
          </button>
          <button onClick={() => update(l.id, "Hủy")}>
            Hủy
          </button>
        </div>
      ))}
    </div>
  );
};

export default LichHenList;
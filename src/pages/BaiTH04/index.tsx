import { useState } from "react";

import SoVanBang from "./components/SoVanBang";
import TruongDuLieu from "./components/TruongDuLieu";
import VanBang from "./components/VanBang";
import TraCuu from "./components/TraCuu";
import QuyetDinh from "./components/QuyetDinh";

export default function BaiThi() {
  const [tab, setTab] = useState("vanbang");

  const [soList, setSoList] = useState<any[]>([]);
  const [truongList, setTruongList] = useState<any[]>([]);
  const [vanBangList, setVanBangList] = useState<any[]>([]);
  const [qdList, setQdList] = useState<any[]>([]);

  return (
    <>
      {/* CSS NHÚNG */}
      <style>{`
        body {
          font-family: Arial;
          background: #f4f6f9;
          margin: 0;
        }

        .container {
          max-width: 900px;
          margin: 30px auto;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .tab {
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background: #ddd;
          transition: 0.2s;
        }

        .tab:hover {
          background: #ccc;
        }

        .tab.active {
          background: #007bff;
          color: white;
        }

        .card {
          background: #fafafa;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        input, select {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin: 5px 0;
          width: 100%;
        }

        button {
          padding: 8px 12px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 5px;
        }

        button:hover {
          background: #0056b3;
        }

        .list-item {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
          .table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th {
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
}

.table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.table tr:hover {
  background: #f1f1f1;
}

.btn-edit {
  background: orange;
  margin-right: 5px;
}

.btn-delete {
  background: red;
}

.btn-cancel {
  background: gray;
  margin-left: 5px;
}
  
      `}</style>

      {/* UI */}
      <div className="container">
        <h1 className="title">🎓 Quản lý sổ văn bằng tốt nghiệp</h1>

        {/* TAB MENU */}
        <div className="tabs">
          <button className={`tab ${tab==="so" && "active"}`} onClick={()=>setTab("so")}>Sổ</button>
          <button className={`tab ${tab==="qd" && "active"}`} onClick={()=>setTab("qd")}>Quyết định</button>
          <button className={`tab ${tab==="truong" && "active"}`} onClick={()=>setTab("truong")}>Trường thông tin</button>
          <button className={`tab ${tab==="vanbang" && "active"}`} onClick={()=>setTab("vanbang")}>Văn bằng</button>
          <button className={`tab ${tab==="tracuu" && "active"}`} onClick={()=>setTab("tracuu")}>Tra cứu</button>
        </div>

        {/* CONTENT */}
        <div className="card">
          {tab === "so" && (
            <SoVanBang
              soList={soList}
              setSoList={setSoList}
            />
          )}

          {tab === "qd" && (
            <QuyetDinh
              qdList={qdList}
              setQdList={setQdList}
              soList={soList}
            />
          )}

          {tab === "truong" && (
            <TruongDuLieu
              truongList={truongList}
              setTruongList={setTruongList}
            />
          )}

          {tab === "vanbang" && (
            <VanBang
              vanBangList={vanBangList}
              setVanBangList={setVanBangList}
              truongList={truongList}
              soList={soList}
              qdList={qdList}
            />
          )}

          {tab === "tracuu" && (
            <TraCuu
  data={vanBangList}
  qdList={qdList}
  setQdList={setQdList}
/>
          )}
        </div>
      </div>
    </>
  );
}
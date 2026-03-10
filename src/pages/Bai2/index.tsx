import { useState } from "react";
import { Tabs } from "antd";
import { KhoiKienThuc, MonHoc, CauHoi } from "./types";

import KhoiKienThucComponent from "./components/KhoiKienThuc";
import MonHocComponent from "./components/MonHoc";
import CauHoiComponent from "./components/CauHoi";
import DeThiComponent from "./components/DeThi";

const { TabPane } = Tabs;

export default function Bai2() {
  const [danhSachKhoi, setDanhSachKhoi] = useState<KhoiKienThuc[]>([]);
  const [danhSachMon, setDanhSachMon] = useState<MonHoc[]>([]);
  const [danhSachCauHoi, setDanhSachCauHoi] = useState<CauHoi[]>([]);
  const [deThi, setDeThi] = useState<CauHoi[]>([]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Hệ thống quản lý ngân hàng câu hỏi</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Khối kiến thức" key="1">
          <KhoiKienThucComponent
            danhSachKhoi={danhSachKhoi}
            setDanhSachKhoi={setDanhSachKhoi}
          />
        </TabPane>

        <TabPane tab="Môn học" key="2">
          <MonHocComponent
            danhSachMon={danhSachMon}
            setDanhSachMon={setDanhSachMon}
          />
        </TabPane>

        <TabPane tab="Câu hỏi" key="3">
          <CauHoiComponent
            danhSachCauHoi={danhSachCauHoi}
            setDanhSachCauHoi={setDanhSachCauHoi}
            danhSachMon={danhSachMon}
            danhSachKhoi={danhSachKhoi}
          />
        </TabPane>

        <TabPane tab="Đề thi" key="4">
          <DeThiComponent
            danhSachCauHoi={danhSachCauHoi}
            deThi={deThi}
            setDeThi={setDeThi}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
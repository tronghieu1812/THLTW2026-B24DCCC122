import React, { useState } from "react";
import {
  Button,
  Table,
  Input,
  Modal,
  Form,
  Select,
  InputNumber,
  Card,
  Space,
  Tag
} from "antd";
import { KhoaHoc, TrangThai } from "./KieuDuLieu";

const danhSachGiangVien = [
  "Nguyễn Văn A",
  "Trần Thị B",
  "Lê Văn C",
];

export default function QuanLyKhoaHoc() {
  const [danhSach, setDanhSach] = useState<KhoaHoc[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<KhoaHoc | null>(null);
  const [search, setSearch] = useState("");
  const [locGV, setLocGV] = useState<string | undefined>();
  const [locTrangThai, setLocTrangThai] = useState<TrangThai | undefined>();
  const [form] = Form.useForm();

  const handleSave = (values: any) => {
    if (danhSach.find(x => x.ten === values.ten && x.id !== editing?.id)) {
      return alert("Tên khóa học bị trùng");
    }

    const newKH: KhoaHoc = {
      id: editing?.id || Date.now(),
      ...values
    };

    if (editing) {
      setDanhSach(danhSach.map(x => x.id === newKH.id ? newKH : x));
    } else {
      setDanhSach([...danhSach, newKH]);
    }

    setModalOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const handleDelete = (kh: KhoaHoc) => {
    if (kh.soLuong > 0) {
      return alert("Không thể xóa khóa học đã có học viên");
    }
    if (confirm("Bạn có chắc muốn xóa?")) {
      setDanhSach(danhSach.filter(x => x.id !== kh.id));
    }
  };

  const data = danhSach
    .filter(x => x.ten.toLowerCase().includes(search.toLowerCase()))
    .filter(x => !locGV || x.giangVien === locGV)
    .filter(x => !locTrangThai || x.trangThai === locTrangThai)
    .sort((a, b) => b.soLuong - a.soLuong);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tên khóa học", dataIndex: "ten" },
    { title: "Giảng viên", dataIndex: "giangVien" },
    { title: "Số lượng", dataIndex: "soLuong" },
    {
      title: "Trạng thái",
      render: (_: any, record: KhoaHoc) => {
        const color =
          record.trangThai === "Đang mở"
            ? "green"
            : record.trangThai === "Đã kết thúc"
            ? "red"
            : "orange";

        return <Tag color={color}>{record.trangThai}</Tag>;
      }
    },
    {
      title: "Hành động",
      render: (_: any, record: KhoaHoc) => (
        <Space>
          <Button
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setModalOpen(true);
            }}
          >
            Sửa
          </Button>

          <Button danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Card title="Quản lý khóa học">
      <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Input
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          placeholder="Lọc giảng viên"
          allowClear
          style={{ width: 180 }}
          onChange={setLocGV}
        >
          {danhSachGiangVien.map(gv => (
            <Select.Option key={gv}>{gv}</Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Lọc trạng thái"
          allowClear
          style={{ width: 180 }}
          onChange={setLocTrangThai}
        >
          <Select.Option value="Đang mở">Đang mở</Select.Option>
          <Select.Option value="Đã kết thúc">Đã kết thúc</Select.Option>
          <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
        </Select>

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Thêm khóa học
        </Button>
      </Space>

      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal
        visible={modalOpen}
        title={editing ? "Sửa khóa học" : "Thêm khóa học"}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item
            name="ten"
            label="Tên khóa học"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item
            name="giangVien"
            label="Giảng viên"
            rules={[{ required: true }]}
          >
            <Select>
              {danhSachGiangVien.map(gv => (
                <Select.Option key={gv}>{gv}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="soLuong" label="Số lượng">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="trangThai" label="Trạng thái">
            <Select>
              <Select.Option value="Đang mở">Đang mở</Select.Option>
              <Select.Option value="Đã kết thúc">Đã kết thúc</Select.Option>
              <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
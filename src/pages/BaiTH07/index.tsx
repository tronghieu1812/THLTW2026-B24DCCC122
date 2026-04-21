import React, { useState, useEffect } from 'react';
import { 
  Layout, Menu, Card, Col, Row, Input, Tabs, Table, Tag, Space, Button, 
  Avatar, Descriptions, Typography, Popconfirm, 
  Modal, Form, Select, message, Badge, ConfigProvider, Pagination
} from 'antd';
import {
  HomeOutlined, UserOutlined, FileTextOutlined, TagsOutlined, SearchOutlined,
  ArrowLeftOutlined, EditOutlined, DeleteOutlined, PlusOutlined,
  GithubOutlined, FacebookOutlined, LinkedinOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

/** --- INTERFACES --- */
interface BaiViet {
  id: string;
  tieuDe: string;
  slug: string;
  tomTat: string;
  noiDung: string;
  anhDaiDien: string;
  tacGia: string;
  ngayDang: string;
  theTags: string[];
  luotXem: number;
  trangThai: 'Đã đăng' | 'Nháp';
}

interface TheTag {
  id: string;
  ten: string;
}

const BlogApp: React.FC = () => {
  const [tabHienTai, setTabHienTai] = useState('1');
  const [baiVietDangXem, setBaiVietDangXem] = useState<BaiViet | null>(null);
  const [tuKhoa, setTuKhoa] = useState('');
  const [loaiTin, setLoaiTin] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // Hiển thị đúng 9 bài mỗi trang
  
  const [danhSachBaiViet, setDanhSachBaiViet] = useState<BaiViet[]>([]);
  const [danhSachThe, setDanhSachThe] = useState<TheTag[]>([
    { id: '1', ten: 'Tin Giáo vụ' },
    { id: '2', ten: 'Tin tức chung' },
    { id: '3', ten: 'Sự kiện' }
  ]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postForm] = Form.useForm();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [tagForm] = Form.useForm();
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  // Khởi tạo 20 bài viết để test phân trang 9 bài/trang
  useEffect(() => {
    const data: BaiViet[] = Array.from({ length: 20 }).map((_, i) => ({
      id: `${i + 1}`,
      tieuDe: `Bài viết hướng dẫn thực hành số ${i + 1}`,
      slug: `huong-dan-${i + 1}`,
      tomTat: 'Tóm tắt nội dung bài viết dành cho sinh viên PTIT. Hướng dẫn xây dựng ứng dụng Blog cá nhân...',
      noiDung: `Nội dung chi tiết bài viết ${i + 1}. Sinh viên cần hoàn thành các yêu cầu của bài TH07.`,
      anhDaiDien: `https://picsum.photos/seed/${i + 500}/800/450`,
      tacGia: 'Nguyễn Hồng Anh Tấn',
      ngayDang: '21/04/2026',
      theTags: i % 2 === 0 ? ['Tin Giáo vụ'] : ['Tin tức chung'],
      luotXem: Math.floor(Math.random() * 100),
      trangThai: 'Đã đăng',
    }));
    setDanhSachBaiViet(data);
  }, []);

  /** --- LOGIC XỬ LÝ --- */
  const handleViewPost = (post: BaiViet) => {
    const updated = danhSachBaiViet.map(p => 
      p.id === post.id ? { ...p, luotXem: p.luotXem + 1 } : p
    );
    setDanhSachBaiViet(updated);
    setBaiVietDangXem({ ...post, luotXem: post.luotXem + 1 });
  };

  const handleSaveTag = (values: { ten: string }) => {
    if (editingTagId) {
      setDanhSachThe(danhSachThe.map(t => t.id === editingTagId ? { ...t, ten: values.ten } : t));
      message.success('Cập nhật thẻ thành công');
    } else {
      setDanhSachThe([...danhSachThe, { id: Date.now().toString(), ten: values.ten }]);
      message.success('Thêm thẻ mới thành công');
    }
    setIsTagModalOpen(false);
    tagForm.resetFields();
  };

  const handleSavePost = (values: any) => {
    if (editingPostId) {
      setDanhSachBaiViet(danhSachBaiViet.map(p => p.id === editingPostId ? { ...p, ...values } : p));
      message.success('Cập nhật bài viết thành công');
    } else {
      const newPost = { ...values, id: Date.now().toString(), luotXem: 0, tacGia: 'Nguyễn Hồng Anh Tấn', ngayDang: '21/04/2026' };
      setDanhSachBaiViet([newPost, ...danhSachBaiViet]);
      message.success('Thêm bài viết mới thành công');
    }
    setIsPostModalOpen(false);
  };

  /** --- RENDER CONTENT --- */
  const renderContent = () => {
    if (baiVietDangXem) {
      return (
        <Card borderless>
          <Button icon={<ArrowLeftOutlined />} onClick={() => setBaiVietDangXem(null)} style={{ marginBottom: 20 }}>Quay lại</Button>
          <Title level={2}>{baiVietDangXem.tieuDe}</Title>
          <img src={baiVietDangXem.anhDaiDien} alt="cover" style={{ width: '100%', borderRadius: 12, marginBottom: 20, maxHeight: 400, objectFit: 'cover' }} />
          <Paragraph style={{fontSize: 16}}>{baiVietDangXem.noiDung}</Paragraph>
          <Text type="secondary italic">Lượt xem: {baiVietDangXem.luotXem}</Text>
        </Card>
      );
    }

    switch (tabHienTai) {
      case '1': // TRANG CHỦ
        const filtered = danhSachBaiViet.filter(p => 
            (loaiTin === 'Tất cả' || p.theTags.includes(loaiTin)) &&
            p.tieuDe.toLowerCase().includes(tuKhoa.toLowerCase())
        );
        // Cắt dữ liệu hiển thị đúng 9 bài theo trang hiện tại
        const dataHienThi = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Title level={3} style={{margin: 0}}>BẢN TIN MỚI NHẤT</Title>
                <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm bài viết..." style={{ width: 300, borderRadius: 20 }} onChange={e => {setTuKhoa(e.target.value); setCurrentPage(1);}} />
            </div>
            <Tabs defaultActiveKey="Tất cả" onChange={key => {setLoaiTin(key); setCurrentPage(1);}} items={['Tất cả', ...danhSachThe.map(t => t.ten)].map(t => ({ label: t, key: t }))} />
            <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
              {dataHienThi.map(p => (
                <Col span={8} key={p.id}>
                  <Card hoverable cover={<img src={p.anhDaiDien} style={{ height: 160, objectFit: 'cover' }} />} onClick={() => handleViewPost(p)}>
                    <Card.Meta title={p.tieuDe} description={<Paragraph ellipsis={{ rows: 2 }}>{p.tomTat}</Paragraph>} />
                    <div style={{marginTop: 10, fontSize: 12, color: '#bfbfbf'}}>{p.ngayDang} • {p.luotXem} lượt xem</div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination 
                style={{ marginTop: 40, textAlign: 'center' }} 
                current={currentPage} 
                pageSize={pageSize} 
                total={filtered.length} 
                onChange={setCurrentPage} 
                showSizeChanger={false}
            />
          </>
        );

      case '3': // QUẢN LÝ BÀI VIẾT
        return (
          <Card title="Quản lý bài viết" extra={<Button type="primary" danger icon={<PlusOutlined />} onClick={() => { setEditingPostId(null); postForm.resetFields(); setIsPostModalOpen(true); }}>Thêm bài viết</Button>}>
            <Table dataSource={danhSachBaiViet} rowKey="id" columns={[
              { title: 'Tiêu đề', dataIndex: 'tieuDe' },
              { title: 'Thẻ', dataIndex: 'theTags', render: (tags: string[]) => tags.map(t => <Tag key={t}>{t}</Tag>) },
              { title: 'Lượt xem', dataIndex: 'luotXem' },
              { title: 'Thao tác', render: (p: BaiViet) => (
                <Space>
                  <Button type="text" icon={<EditOutlined />} onClick={() => { setEditingPostId(p.id); postForm.setFieldsValue(p); setIsPostModalOpen(true); }} />
                  <Popconfirm title="Xóa bài viết?" onConfirm={() => setDanhSachBaiViet(danhSachBaiViet.filter(x => x.id !== p.id))}><Button type="text" danger icon={<DeleteOutlined />} /></Popconfirm>
                </Space>
              )}
            ]} />
          </Card>
        );

      case '4': // QUẢN LÝ THẺ
        return (
          <Card title="QUẢN LÝ THẺ" extra={<Button type="primary" danger icon={<PlusOutlined />} onClick={() => { setEditingTagId(null); tagForm.resetFields(); setIsTagModalOpen(true); }}>Thêm thẻ mới</Button>}>
            <Table dataSource={danhSachThe} rowKey="id" pagination={false} columns={[
              { title: 'Tên thẻ', dataIndex: 'ten', render: (t: string) => <Tag color="red">{t}</Tag> },
              { title: 'Số bài dùng', render: (r: TheTag) => danhSachBaiViet.filter(p => p.theTags.includes(r.ten)).length },
              { title: 'Thao tác', render: (r: TheTag) => (
                <Space>
                  <Button type="link" icon={<EditOutlined />} onClick={() => { setEditingTagId(r.id); tagForm.setFieldsValue(r); setIsTagModalOpen(true); }}>Sửa</Button>
                  <Popconfirm title="Xóa thẻ?" onConfirm={() => setDanhSachThe(danhSachThe.filter(t => t.id !== r.id))}><Button type="link" danger>Xóa</Button></Popconfirm>
                </Space>
              )}
            ]} />
          </Card>
        );

      case '2': // GIỚI THIỆU
        return (
          <Card title="THÔNG TIN TÁC GIẢ">
            <Row gutter={32} align="middle">
              <Col span={8} style={{ textAlign: 'center' }}>
                <Avatar size={150} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tan" />
                <Title level={3} style={{ marginTop: 15 }}>Nguyễn Hồng Anh Tấn</Title>
                <Space size="large" style={{fontSize: 24}}><GithubOutlined /><FacebookOutlined /><LinkedinOutlined /></Space>
              </Col>
              <Col span={16}>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Tiểu sử">Sinh viên Học viện Công nghệ Bưu chính Viễn thông.</Descriptions.Item>
                  <Descriptions.Item label="Kỹ năng"><Tag color="blue">React</Tag><Tag color="green">Ant Design</Tag></Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        );
      default: return null;
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#cc0000' } }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" width={250} style={{ borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, background: '#cc0000', borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold' }}>P</div>
            <b style={{ color: '#cc0000' }}>LẬP TRÌNH WEB - RIPT</b>
          </div>
          <Menu mode="inline" selectedKeys={[tabHienTai]} onClick={({ key }) => { setTabHienTai(key); setBaiVietDangXem(null); setCurrentPage(1); }}
            items={[
              { key: '1', icon: <HomeOutlined />, label: 'Trang chủ' },
              { key: '2', icon: <UserOutlined />, label: 'Giới thiệu' },
              { key: '3', icon: <FileTextOutlined />, label: 'Quản lý bài viết' },
              { key: '4', icon: <TagsOutlined />, label: 'Quản lý thẻ' },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
            <Space><Avatar style={{ backgroundColor: '#cc0000' }}>T</Avatar><b>NGUYỄN HỒNG ANH TẤN</b></Space>
          </Header>
          <Content style={{ padding: '32px', background: '#f5f7f9' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>{renderContent()}</div>
          </Content>
        </Layout>

        <Modal title={editingTagId ? "Sửa thẻ" : "Thêm thẻ"} open={isTagModalOpen} onOk={() => tagForm.submit()} onCancel={() => setIsTagModalOpen(false)}>
          <Form form={tagForm} layout="vertical" onFinish={handleSaveTag}>
            <Form.Item name="ten" label="Tên thẻ" rules={[{ required: true }]}><Input /></Form.Item>
          </Form>
        </Modal>

        <Modal title={editingPostId ? "Sửa bài viết" : "Thêm bài viết"} open={isPostModalOpen} onOk={() => postForm.submit()} onCancel={() => setIsPostModalOpen(false)} width={700}>
          <Form form={postForm} layout="vertical" onFinish={handleSavePost}>
            <Form.Item name="tieuDe" label="Tiêu đề" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="theTags" label="Thẻ" rules={[{ required: true }]}><Select mode="multiple">{danhSachThe.map(t => <Select.Option key={t.ten} value={t.ten}>{t.ten}</Select.Option>)}</Select></Form.Item>
            <Form.Item name="noiDung" label="Nội dung"><Input.TextArea rows={4} /></Form.Item>
          </Form>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default BlogApp;
import React from 'react';
import { KhoaHoc } from './FormKhoaHoc';

interface Props {
    danhSach: KhoaHoc[];
    onEdit: (k: KhoaHoc) => void;
    onDelete: (id: number) => void;
}

const BangDanhSach = ({ danhSach, onEdit, onDelete }: Props) => {
    return (
        <table 
    style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginTop: '10px',
        border: '1px solid black' 
    }}
>
    <thead>
        <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ border: '1px solid black', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Tên khóa học</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Giảng viên</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Số học viên</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Trạng thái</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Hành động</th>
        </tr>
    </thead>
    <tbody>
        {danhSach.length > 0 ? (
            danhSach.map(kh => (
                <tr key={kh.id}>
                    <td style={{ border: '1px solid black', padding: '10px' }}>{kh.id}</td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>{kh.ten}</td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>{kh.giangVien}</td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>{kh.soLuongHocVien}</td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>{kh.trangThai}</td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <button onClick={() => onEdit(kh)} style={{ marginRight: '5px' }}>Sửa</button>
                        <button onClick={() => onDelete(kh.id)} style={{ color: 'red' }}>Xóa</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '10px', border: '1px solid black' }}>
                    Không có dữ liệu khóa học.
                </td>
            </tr>
        )}
    </tbody>
</table>
    );
};

export default BangDanhSach;
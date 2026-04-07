export interface DiemDen {
  id: string;
  ten: string;
  diaDiem: string;
  loaiHinh: 'bien' | 'nui' | 'thanhpho';
  giaThamKhao: number;
  danhGia: number;
  hinhAnh: string;
  moTa: string;
  phiLuuTru: number;
  phiAnUong: number;
  phiDiChuyen: number;
}

export interface LichTrinhNgay {
  ngay: number;
  cacDiemDen: DiemDen[];
}
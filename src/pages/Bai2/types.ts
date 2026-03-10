export type DoKho = "Dễ" | "Trung bình" | "Khó" | "Rất khó";

export interface KhoiKienThuc {
  id: number;
  ten: string;
}

export interface MonHoc {
  id: number;
  maMon: string;
  tenMon: string;
  tinChi: number;
}

export interface CauHoi {
  id: number;
  monHocId: number;
  noiDung: string;
  doKho: DoKho;
  khoiId: number;
}
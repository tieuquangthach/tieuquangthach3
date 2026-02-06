
import React, { useState } from 'react';
import { AppData, DeKiemTra } from '../types';

interface ExamsProps {
  data: AppData;
  onStartExam: (exam: DeKiemTra) => void;
}

const Exams: React.FC<ExamsProps> = ({ data, onStartExam }) => {
  const [filterType, setFilterType] = useState<'all' | '15p' | '45p' | 'hk'>('all');

  // Mock data bổ sung nếu data.tatCaDeKiemTra ít (để demo giao diện)
  const mockExams: DeKiemTra[] = [
    {
      id: 'mock-1',
      tenDe: 'Kiểm tra 15 phút - Đại số Chương 1',
      moTa: 'Ôn tập kiến thức về căn bậc hai và hằng đẳng thức.',
      lop: '9',
      thoiGian: 15,
      taoBoi: 'Thầy Thạch',
      ngayTao: new Date().toISOString(),
      cauHoiIds: []
    },
    {
      id: 'mock-2',
      tenDe: 'Đề thi giữa Học kì 1',
      moTa: 'Tổng hợp kiến thức Đại số và Hình học từ đầu năm.',
      lop: '9',
      thoiGian: 45,
      taoBoi: 'Thầy Thạch',
      ngayTao: new Date().toISOString(),
      cauHoiIds: []
    },
    {
      id: 'mock-3',
      tenDe: 'Thi thử vào lớp 10 - Đề số 01',
      moTa: 'Đề thi bám sát cấu trúc đề thi tuyển sinh của Sở GD&ĐT.',
      lop: '9',
      thoiGian: 90,
      taoBoi: 'Thầy Thạch',
      ngayTao: new Date().toISOString(),
      cauHoiIds: []
    }
  ];

  const allExams = [...data.tatCaDeKiemTra, ...mockExams];

  const filteredExams = allExams.filter(exam => {
    if (filterType === 'all') return true;
    if (filterType === '15p') return exam.thoiGian <= 15;
    if (filterType === '45p') return exam.thoiGian > 15 && exam.thoiGian <= 45;
    if (filterType === 'hk') return exam.thoiGian > 45;
    return true;
  });

  const getBadgeColor = (minutes: number) => {
    if (minutes <= 15) return 'bg-green-100 text-green-700 border-green-200';
    if (minutes <= 45) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-purple-100 text-purple-700 border-purple-200';
  };

  const getIcon = (minutes: number) => {
    if (minutes <= 15) return 'timer';
    if (minutes <= 45) return 'timelapse';
    return 'history_edu';
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl shadow-red-200 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                Khu vực thi cử
             </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
            Phòng thi trực tuyến
          </h2>
          <p className="text-red-100 font-medium text-lg opacity-90 leading-relaxed">
            Rèn luyện bản lĩnh phòng thi với các đề kiểm tra chất lượng cao. Thời gian làm bài được tính chính xác từng giây.
          </p>
        </div>
        <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[250px] text-white/10 rotate-12 pointer-events-none">
          edit_document
        </span>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border-4 border-white/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-10 left-1/2 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        <button 
          onClick={() => setFilterType('all')}
          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${filterType === 'all' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white border border-slate-100 text-slate-400 hover:text-slate-600'}`}
        >
          Tất cả đề thi
        </button>
        <button 
          onClick={() => setFilterType('15p')}
          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${filterType === '15p' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white border border-slate-100 text-slate-400 hover:text-green-600'}`}
        >
          15 Phút
        </button>
        <button 
          onClick={() => setFilterType('45p')}
          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${filterType === '45p' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-100 text-slate-400 hover:text-blue-600'}`}
        >
          1 Tiết (45')
        </button>
        <button 
          onClick={() => setFilterType('hk')}
          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${filterType === 'hk' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white border border-slate-100 text-slate-400 hover:text-purple-600'}`}
        >
          Thi Học Kỳ
        </button>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
            {/* Top Badge */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getBadgeColor(exam.thoiGian)}`}>
                <span className="material-symbols-outlined text-sm">{getIcon(exam.thoiGian)}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{exam.thoiGian} phút</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-lg">favorite</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1">
              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                {exam.tenDe}
              </h3>
              <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6">
                {exam.moTa || 'Đề thi chuẩn kiến thức sách giáo khoa, bao gồm trắc nghiệm và tự luận.'}
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap gap-2 mb-8">
                 <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Lớp {exam.lop}</span>
                 <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Môn Toán</span>
                 <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">20 câu hỏi</span>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => onStartExam(exam)}
              className="relative z-10 w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner group-hover:shadow-lg active:scale-95"
            >
              Bắt đầu làm bài
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            
            {/* Background Hover Effect */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;

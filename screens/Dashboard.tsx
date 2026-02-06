
import React, { useState, useEffect } from 'react';
import { AppData, NguoiDung, PhieuBaiTap, HocSinh } from '../types';

interface DashboardProps {
  data: AppData;
  user: NguoiDung | null;
  onNavigateToLesson: (id: string) => void;
  onNavigateToAI: () => void;
  onOpenWorksheet: (worksheet: PhieuBaiTap) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, user, onNavigateToLesson, onNavigateToAI, onOpenWorksheet }) => {
  const isGiaoVien = user?.vaiTro === 'giaoVien';
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- LOGIC SLIDESHOW ---
  const slides = [
    {
      id: 1,
      title: isGiaoVien ? "Quản lý lớp học hiệu quả" : "Chinh phục điểm 10 Toán",
      desc: isGiaoVien 
        ? "Công cụ hỗ trợ soạn bài, giao bài tập và theo dõi tiến độ học sinh toàn diện." 
        : "Luyện tập mỗi ngày với kho bài tập đa dạng và sự hỗ trợ từ trợ lý AI thông minh.",
      bg: "bg-gradient-to-r from-blue-600 to-indigo-700",
      icon: "school",
      image: "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-3972.jpg?w=740&t=st=1709999999~exp=1710000599~hmac=abcdef", // Placeholder hoặc bỏ nếu dùng thuần CSS
      buttonText: "Bắt đầu ngay",
      action: () => {} // Default action
    },
    {
      id: 2,
      title: "Đấu trường Toán học",
      desc: "Tham gia thi đua trên Bảng Phong Thần. Xem ai là người giải toán nhanh nhất tuần này!",
      bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      icon: "emoji_events",
      buttonText: "Xem xếp hạng",
      action: () => {} // Could trigger navigation in parent if needed
    },
    {
      id: 3,
      title: "Trợ lý AI MathPro",
      desc: "Gặp khó khăn? Chụp ảnh bài toán và nhận hướng dẫn giải chi tiết ngay lập tức.",
      bg: "bg-gradient-to-r from-purple-600 to-pink-600",
      icon: "smart_toy",
      buttonText: "Hỏi AI ngay",
      action: onNavigateToAI
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Tự động chuyển sau 5s
    return () => clearInterval(timer);
  }, [slides.length]);

  // --- LOGIC HIỂN THỊ DỮ LIỆU ---
  
  // 1. Xác định khối lớp để lọc bài tập
  const studentGradeStr = (!isGiaoVien && data.hocSinh.lop !== '--') 
    ? data.hocSinh.lop.match(/\d+/)?.[0] 
    : null;
  
  // 2. Lấy 4 phiếu bài tập mới nhất
  const worksheetsToDisplay = data.danhSachPhieuBaiTap
    .filter(w => {
       const matchGrade = !studentGradeStr || w.lop === studentGradeStr;
       const isConsolidation = w.monHoc === 'Củng cố' || w.monHoc === 'Tự luyện';
       const isEssay = w.monHoc === 'Tự luận';
       const matchType = isGiaoVien ? true : (isConsolidation || isEssay); 
       return matchGrade && matchType;
    })
    .slice(0, 4);

  // Hàm helper xác định nhãn loại bài tập
  const getWorksheetLabel = (ws: PhieuBaiTap) => {
     if (ws.monHoc === 'Củng cố' || ws.monHoc === 'Tự luyện') return 'TỰ LUYỆN';
     if (ws.monHoc === 'Tự luận') return 'TỰ LUẬN';
     return 'LUYỆN TẬP';
  };

  // Hàm helper xác định màu sắc badge dựa trên loại bài
  const getBadgeColorClass = (ws: PhieuBaiTap) => {
    if (ws.monHoc === 'Củng cố' || ws.monHoc === 'Tự luyện') {
        return 'bg-emerald-500 border-emerald-600 shadow-[0_4px_10px_rgba(16,185,129,0.4)]';
    }
    if (ws.monHoc === 'Tự luận') {
        return 'bg-rose-500 border-rose-600 shadow-[0_4px_10px_rgba(225,29,72,0.4)]';
    }
    return 'bg-[#0055ff] border-[#0044cc] shadow-[0_4px_10px_rgba(0,85,255,0.4)]';
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* --- HERO SLIDESHOW SECTION --- */}
      <section className="relative w-full h-[280px] md:h-[320px] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-100 group">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${slide.bg} flex items-center px-8 md:px-16
              ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
            `}
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            <span className="material-symbols-outlined absolute right-10 bottom-[-40px] text-[250px] text-white/10 rotate-12">{slide.icon}</span>

            {/* Content */}
            <div className="relative z-10 max-w-2xl text-white space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Nổi bật
                 </span>
                 <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg font-medium opacity-90 max-w-lg leading-relaxed">
                {slide.desc}
              </p>
              
              <button 
                onClick={slide.action}
                className="mt-4 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-3 group/btn"
              >
                {slide.buttonText}
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}

        {/* Slide Indicators (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
        
        {/* Navigation Buttons (Hidden on mobile, show on hover) */}
        <button 
            onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-20"
        >
            <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button 
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-20"
        >
            <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </section>

      {/* --- USER WELCOME (Small) --- */}
      <section className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {isGiaoVien ? `Thầy Tiêu Quang Thạch` : `Xin chào, ${data.hocSinh.ten.split(' ').pop()}!`}
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
             Chúc một ngày tốt lành!
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-teal-100 shadow-sm flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full animate-pulse ${isGiaoVien ? 'bg-blue-500' : 'bg-teal-500'}`}></div>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
             {isGiaoVien ? 'Giáo viên' : `Lớp ${data.hocSinh.lop}`}
           </span>
        </div>
      </section>

      {/* SECTION 1: 4 BÀI TẬP MỚI NHẤT */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">assignment_add</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Bài tập mới nhất</h3>
          </div>
          <button className="text-teal-600 font-bold text-xs uppercase tracking-widest hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">Xem tất cả</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {worksheetsToDisplay.map((ws, index) => {
             return (
             <div 
                key={ws.id} 
                onClick={() => onOpenWorksheet(ws)}
                className="group relative bg-white rounded-[2rem] p-6 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center overflow-hidden"
             >
                {/* Decorative Gradient Header */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
                
                {/* Badge Mới */}
                {index === 0 && (
                  <div className="absolute top-0 left-0 bg-[#ef4444] text-white text-[9px] font-black px-3 py-1.5 rounded-br-xl uppercase tracking-widest z-20 shadow-lg shadow-red-200">
                    Mới nhất
                  </div>
                )}

                {/* Header Pills (Khối Lớp + Loại Bài Tập) */}
                <div className="relative z-10 flex items-center justify-center gap-2 mb-5 w-full mt-2">
                    {/* Pill 1: TOÁN + LỚP (Màu Cam) */}
                    <span className="bg-[#ff9f0a] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_4px_10px_rgba(255,159,10,0.4)] border border-[#fb8c00]">
                        TOÁN {ws.lop}
                    </span>
                    {/* Pill 2: LOẠI BÀI TẬP (Màu sắc động) */}
                    <span 
                        className={`text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                        ${getBadgeColorClass(ws)}`}
                    >
                        {getWorksheetLabel(ws)}
                    </span>
                </div>
                
                {/* Title (To, Đậm, In Hoa) */}
                <h4 className="relative z-10 text-xl font-black text-slate-800 uppercase leading-snug mb-3 group-hover:text-[#0055ff] transition-colors line-clamp-2 px-1">
                  {ws.tenPhieu}
                </h4>
                
                {/* Info Line */}
                <p className="relative z-10 text-[10px] font-bold text-slate-400 mb-6 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                   {new Date(ws.ngayTao).toLocaleDateString('vi-VN')}
                </p>

                {/* Footer Action */}
                <div className="relative z-10 mt-auto w-full">
                   <div className="w-full py-3.5 bg-[#f0f9ff] text-[#0055ff] rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-[#0055ff] group-hover:text-white transition-all flex items-center justify-center gap-2">
                     {isGiaoVien ? 'Xem chi tiết' : 'Làm bài ngay'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </div>
                </div>
             </div>
          )})}
          
          {/* Empty State */}
          {worksheetsToDisplay.length === 0 && (
            <div className="col-span-full bg-slate-50 rounded-[2rem] py-16 text-center border-2 border-dashed border-slate-200">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                 <span className="material-symbols-outlined text-3xl text-slate-300">history_edu</span>
               </div>
               <p className="text-slate-400 font-bold text-sm">Hiện chưa có bài tập mới.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Quote */}
      <div className="text-center py-4 opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Không có áp lực • Không có kim cương</p>
      </div>
    </div>
  );
};

export default Dashboard;

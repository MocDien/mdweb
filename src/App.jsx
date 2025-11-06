import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Circle } from 'lucide-react'

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const hideTimeoutRef = useRef(null)
  const showTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menus = [
    { name: 'Trang chủ' },
    { name: 'Cà phê', sub: ['Ngũ hành', 'Daily', 'Vị truyền thống'] },
    { name: 'Sáng tạo', sub: ['Thiết kế', 'In ấn', 'Kiến trúc'] },
    { name: 'Nông sản', sub: ['Hạt dinh dưỡng', 'Đặc sản', 'Vì sức khỏe'] },
    { name: 'Về Mộc Điền' },
    { name: 'Liên hệ' },
  ]

  const handleMouseEnter = (menu) => {
  // B» to n b»™ delay show
  if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
  if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
  setActiveDropdown(menu) // Mở ngay lập tức
}

const handleMouseLeave = () => {
  // Giữ delay trong 300ms ‘»ƒ ngỈ°»i d¹ng rª chu»™t xu»‘ng menu ph»¥
  if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
  hideTimeoutRef.current = setTimeout(() => {
    setActiveDropdown(null)
  }, 400)
};

  return (
    <div className="bg-dark text-white font-inter">
      <div
        className={`fixed w-full z-50 top-0 transition-all duration-700 ease-in-out backdrop-blur-md`}
        style={{
          backgroundColor: `rgba(11, 7, 6, ${scrollY > 50 ? 0.85 : 1})`,
          boxShadow: `0 4px 20px rgba(0,0,0,${Math.min(scrollY / 200, 0.3)})`,
        }}
      >
        {/* Top info bar */}
        <div className="text-sm text-gray-300 py-4 border-b border-[#1a1a1a] bg-black">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full">
                  <MapPin size={10} className="text-[#0b0706]" />
                </div>
                <span>50/2/37 Quang Trung, P. Gò Vấp, TP. Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full">
                  <Phone size={10} className="text-[#0b0706]" />
                </div>
                <span>+84 332 41 43 44</span>
              </div>
            </div>

            <div className="flex gap-2">
              {['VN', 'EN'].map((lang, i) => (
                <button
                  key={i}
                  className="w-8 h-8 flex items-center justify-center bg-brand text-[#0b0706] text-[10px] font-medium rounded-full hover:scale-110 transition-all duration-500 shadow-md"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navbar */}
        <header className="border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
            <img
              src="/assets/logo-mocdien.png"
              alt="Moc Dien"
              className="h-10 hover:scale-105 transition-transform duration-500"
            />
            <nav className="hidden lg:flex items-center gap-8 text-[15px] relative">
              {menus.map((menu, i) => (
                <div
                 key={i}
                 className="relative group"
                 onMouseEnter={() => handleMouseEnter(menu.name)}
                 onMouseLeave={(e) => {
                 const related = e.relatedTarget;
    // Ki»ƒm tra nº¿u chu»™t vº«n ‘ang »Ÿ trong dropdown th¬ KH”NG ‘³ng
                 if (!e.currentTarget.contains(related)) {handleMouseLeave();}
                                      }}
                 >
  <a 
	href="#" className="menu-trigger relative flex items-center gap-1 transition-all duration-300 capitalize group-hover:text-brand">
    {menu.name}
    {menu.sub && <Circle size={6} className="text-brand ml-1" />}
    <span className="absolute left-1/2 bottom-[-6px] w-0 h-[1px] bg-brand transition-all duration-300 group-hover:w-full group-hover:left-0" />
  </a>

  {menu.sub && activeDropdown === menu.name && (
                    <div
      className="absolute top-full left-0 mt-[6px] bg-[#0b0706] border border-brand/30 rounded-lg shadow-xl flex flex-col origin-top transform min-w-[220px] z-50 py-[6px] animate-dropdown"
      onMouseEnter={() => handleMouseEnter(menu.name)}
      onMouseLeave={handleMouseLeave}
                    >
      {menu.sub.map((sub, idx) => (
        <a
          key={idx}
          href="#"
          className="block text-left px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-[#1a1a1a]/70 border-b border-brand/30 last:border-0 transition-all duration-300"
        >
          {sub}
        </a>
                       ))}
                    </div>
                   )}
                </div>
              ))}
            </nav>
          </div>
        </header>
      </div>
 
	 {/* Hero Section */}
      <section
        className="relative bg-cover bg-top min-h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden mt-[80px]"
        style={{ backgroundImage: "url('/assets/bg-coffee.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-5xl px-4 animate-fadeInUp">
          <h1 className="font-caveat text-4xl text-white drop-shadow-lgg">ĐẾN TỪ SỰ THẤU HIỂU</h1>
          <img
            src="/assets/chon-logo.png"
            alt="Chon"
            className="mx-auto h-20 mb-3 hover:brightness-105 hover:scale-105 transition-transform duration-700"
          />
          <h2 className="text-5xl font-authentic tracking-wide text-white font-regular drop-shadow-lg">Mocdien in VietNam</h2>
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {['card-coffee.png', 'card-food.png', 'card-art.png'].map((img, i) => (
              <div
                key={i}
                className="w-57 h-[30rem] bg-[#0] rounded-[2rem] hover:brightness-150 overflow-hidden transition-all duration-700 hover:scale-105 shadow-lg"
              >
                <img
                  src={`/assets/${img}`}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
{/* === Phần Cà phê luận / Coffee Insight === */}
<section className="bg-[#0b0706] text-white py-24">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0">

    {/* Bên trái: hình ảnh lớn */}
    <div className="relative h-[600px] md:h-auto overflow-hidden">
     <motion.img
         src="/assets/coffee-pick.jpg"
         alt="Thu hoạch cà phê"
         className="w-full h-full object-cover"
         style={{
          y: useTransform(useScroll().scrollY, [0, 100], [0, -10]),}}
     />
      <div className="absolute bottom-3 left-6 text-xs text-gray-300 tracking-wider">
        1500m Coffee
      </div>
    </div>

    {/* Bên phải: nội dung bài viết */}
    <div className="bg-[#0] px-10 py-14 flex flex-col justify-center">
      <span className="text-brand uppercase tracking-wider text-sm mb-3">
        Coffee Insight
      </span>
      <h2 className="text-4xl font-playfair font-semibold mb-8">Cà phê luận</h2>

      {/* Danh sách bài viết */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Bài viết 1 */}
        <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
          <img
            src="/assets/coffee-craft.jpg"
            alt="Craft Coffee"
            className="w-full h-44 object-cover"
          />
          <div className="p-5">
            <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
              Sự trỗi dậy của cà phê thủ công – Craft Coffee
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Craft Coffee, một thuật ngữ khá mới trong ngành cà phê, đề cập đến việc tạo ra tách cà phê chất lượng cao với tâm huyết và kỹ năng thủ công...
            </p>
            <p className="text-gray-500 text-xs mt-4">Tháng 8 26, 2019</p>
          </div>
        </div>

        {/* Bài viết 2 */}
        <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
          <img
            src="/assets/coffee-legend.jpg"
            alt="Đoàn Triệu Nhạn"
            className="w-full h-44 object-cover"
          />
          <div className="p-5">
            <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
              Bác Đoàn Triệu Nhạn và cuộc đại khẩn hoang ngành cà phê
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dù chưa từng gặp gỡ, nhưng những đóng góp của bác Đoàn Triệu Nhạn được ghi lại qua sách, tài liệu và cả những cây cà phê...
            </p>
            <p className="text-gray-500 text-xs mt-4">Tháng 1 6, 2025</p>
          </div>
        </div>
      </div>

    {/* Nút "Nhiều hơn" */}
      <div className="mt-10">
    {/* Nút "Nhiều hơn" – hiệu ứng chuyển động mềm mại */}
        <button className="group relative flex items-center gap-2 border border-gray-500 px-7 py-3 rounded-full text-sm uppercase tracking-wider overflow-hidden transition-all duration-700 hover:bg-brand hover:border-brand hover:text-black">
          <span className="relative z-10 font-medium transition-all duration-500 group-hover:translate-x-1">
          Nhiều hơn</span>
          <span className="relative z-10 text-lg font-bold transition-transform duration-500 ease-in-out group-hover:translate-x-1"> </span>
    {/* Hiệu ứng ánh sáng vàng quét qua khi hover */}
     <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>
        </button>
      </div>
    </div>
   </div>
   </section>
   {/* === Phần Canh tác & Chế biến / Grow & Process === */}
<section className="bg-[#0b0706] text-white py-24">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Tiêu đề */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
      <div>
        <span className="text-brand text-sm uppercase tracking-wider border-l-2 border-brand pl-3">
          Grow & Process
        </span>
        <h2 className="text-4xl font-playfair font-semibold mt-3">Canh tác & Chế biến</h2>
      </div>

      {/* Nút xem tất cả */}
      <button className="group flex items-center gap-2 text-sm uppercase tracking-wider text-brand border border-brand px-5 py-2 rounded-full hover:bg-brand hover:text-black transition-all duration-500 mt-5 sm:mt-0">
        <span className="group-hover:translate-x-1 transition-all duration-300">Xem tất cả</span>
        <span className="text-lg font-bold group-hover:translate-x-1 transition-all duration-300">›</span>
      </button>
    </div>

    {/* Danh sách bài viết */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Bài viết 1 */}
      <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
        <img src="/assets/coffee-grow1.jpg" alt="SHG Coffee" className="w-full h-44 object-cover" />
        <div className="p-5">
          <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
            Cà phê SHG là gì? đặc điểm của cà phê Strictly High Grown (SHG)
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cà phê SHG được trồng ở độ cao trên 1.200m, mang lại hương vị đậm đà và độ chua cân bằng tự nhiên...
          </p>
          <p className="text-gray-500 text-xs mt-4">Tháng 7 12, 2017</p>
        </div>
      </div>

      {/* Bài viết 2 */}
      <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
        <img src="/assets/coffee-grow2.jpg" alt="Tưới cà phê" className="w-full h-44 object-cover" />
        <div className="p-5">
          <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
            Canh tác 08: Kỹ thuật tưới nước cho cây cà phê
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tưới nước đúng thời điểm và lượng nước vừa phải giúp cây cà phê phát triển khỏe mạnh, tăng năng suất bền vững...
          </p>
          <p className="text-gray-500 text-xs mt-4">Tháng 1 19, 2023</p>
        </div>
      </div>

      {/* Bài viết 3 */}
      <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
        <img src="/assets/coffee-grow3.jpg" alt="Sơ chế ướt" className="w-full h-44 object-cover" />
        <div className="p-5">
          <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
            Sơ chế ướt có còn là tiêu chuẩn của ngành cà phê?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Phương pháp sơ chế ướt là một trong những kỹ thuật phổ biến nhất, giúp tạo hương vị thanh và trong cho cà phê...
          </p>
          <p className="text-gray-500 text-xs mt-4">Tháng 4 4, 2025</p>
        </div>
      </div>

      {/* Bài viết 4 */}
      <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
        <img src="/assets/coffee-grow4.jpg" alt="Cà phê nhân xanh" className="w-full h-44 object-cover" />
        <div className="p-5">
          <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
            Hoạt độ nước và chất lượng cà phê nhân xanh
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Việc kiểm soát độ ẩm trong cà phê nhân xanh là yếu tố quan trọng quyết định chất lượng và độ tươi lâu của hạt cà phê.
          </p>
          <p className="text-gray-500 text-xs mt-4">Tháng 2 12, 2025</p>
        </div>
      </div>

      {/* Bài viết 5 */}
      <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
        <img src="/assets/coffee-grow5.jpg" alt="Sơ chế cà phê" className="w-full h-44 object-cover" />
        <div className="p-5">
          <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
            Sơ chế cà phê: Các quy trình then chốt
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tổng quan các phương pháp sơ chế cà phê từ Washed, Natural, Honey đến Wet-Hulled – mỗi kỹ thuật tạo hương vị riêng biệt.
          </p>
          <p className="text-gray-500 text-xs mt-4">Tháng 1 12, 2025</p>
        </div>
      </div>

      {/* Bài viết 6 */}
      <div className="bg-[#181818] rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(243,178,58,0.3)] transition-all duration-500">
        <img src="/assets/coffee-grow6.jpg" alt="Thu hoạch cà phê" className="w-full h-44 object-cover" />
        <div className="p-5">
          <h3 className="text-[17px] font-semibold text-[#b0d4ff] mb-2 hover:text-brand transition-all duration-300">
            Canh tác bền vững: Thu hoạch và bảo quản hạt cà phê
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Các kỹ thuật thu hoạch đúng thời điểm và quy trình bảo quản hiện đại giúp bảo toàn hương vị tự nhiên của cà phê.
          </p>
          <p className="text-gray-500 text-xs mt-4">Tháng 3 8, 2025</p>
        </div>
      </div>
    </div>

    {/* Nút Nhiều hơn */}
    <div className="flex justify-center mt-12">
      <button className="group relative flex items-center gap-2 border border-gray-500 px-7 py-3 rounded-full text-sm uppercase tracking-wider overflow-hidden transition-all duration-700 hover:bg-brand hover:border-brand hover:text-black">
        <span className="relative z-10 font-medium transition-all duration-500 group-hover:translate-x-1">
          Nhiều hơn
        </span>
        <span className="relative z-10 text-lg font-bold transition-transform duration-500 ease-in-out group-hover:translate-x-1">
          ›
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>
      </button>
    </div>

  </div>
</section>
    </div>
  )
}

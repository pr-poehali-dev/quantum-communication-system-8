export default function Footer() {
  return (
    <div
      className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
          <div className="bg-neutral-900 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 h-full w-full flex flex-col justify-between">
            <div className="flex shrink-0 gap-8 sm:gap-12 lg:gap-20">
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-orange-400 text-xs sm:text-sm tracking-widest">Меню</h3>
                <a href="#shashlik" className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base">Шашлык</a>
                <a href="#salads" className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base">Закуски</a>
                <a href="#drinks" className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base">Напитки</a>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-orange-400 text-xs sm:text-sm tracking-widest">Контакты</h3>
                <a href="tel:+78212000000" className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base">Телефон</a>
                <span className="text-neutral-400 text-sm sm:text-base">Сыктывкар</span>
                <a href="#map" className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base">Как добраться</a>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-orange-400 text-xs sm:text-sm tracking-widest">Режим работы</h3>
                <span className="text-neutral-400 text-sm sm:text-base">Пн–Чт: 11:00–23:00</span>
                <span className="text-neutral-400 text-sm sm:text-base">Пт–Вс: 11:00–00:00</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
              <h1 className="text-[15vw] sm:text-[13vw] lg:text-[11vw] leading-[0.8] mt-4 sm:mt-6 lg:mt-10 text-white font-bold tracking-tight">
                ДЫРНОС
              </h1>
              <p className="text-neutral-500 text-sm sm:text-base">{new Date().getFullYear()} Шашлычный двор Дырнос</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

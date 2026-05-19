import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";

const PHONES = [
  { label: "+7 (8212) 55-38-04", href: "tel:+78212553804" },
  { label: "+7 (8212) 27-27-47", href: "tel:+78212272747" },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile()) {
      // на мобиле — звоним на первый номер
      window.location.href = PHONES[0].href;
    } else {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img
          src="https://cdn.poehali.dev/projects/591951c8-f9ba-4198-bc69-6911aff115b4/files/1fc9830e-e2ef-4c92-9211-d5656ba0357d.jpg"
          alt="Шашлычный двор Дырнос"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="uppercase tracking-[0.3em] text-orange-400 text-sm md:text-base mb-4">Сыктывкар</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
          ШАШЛЫЧНЫЙ<br />ДВОР ДЫРНОС
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-10">
          Настоящий армянский шашлык — мягкое мясо, живой огонь и аромат дыма
        </p>
        <button
          onClick={handleClick}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white uppercase tracking-widest text-sm px-8 py-4 transition-colors duration-300 cursor-pointer"
        >
          Забронировать стол
        </button>
      </div>

      {/* Модальное окно для десктопа */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-neutral-900 p-10 flex flex-col items-center gap-6 min-w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white uppercase tracking-widest text-sm">Позвоните нам</h2>
            {PHONES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="text-orange-400 hover:text-orange-300 text-2xl font-bold tracking-wide transition-colors"
              >
                {p.label}
              </a>
            ))}
            <button
              onClick={() => setShowModal(false)}
              className="text-neutral-500 hover:text-white text-sm uppercase tracking-widest transition-colors mt-2"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
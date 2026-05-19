import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
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
          Настоящий кавказский шашлык — мягкое мясо, живой огонь и аромат дыма
        </p>
        <a
          href="tel:+78212000000"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white uppercase tracking-widest text-sm px-8 py-4 transition-colors duration-300"
        >
          Забронировать стол
        </a>
      </div>
    </div>
  );
}

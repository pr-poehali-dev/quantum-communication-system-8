import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="https://cdn.poehali.dev/projects/591951c8-f9ba-4198-bc69-6911aff115b4/files/48c9f3c5-1cee-44ec-abda-535c1d8ae4df.jpg"
            alt="Шашлычный двор"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>

      <h3 className="absolute top-12 right-6 text-orange-400 uppercase z-10 text-sm md:text-base lg:text-lg tracking-widest">
        Традиции и вкус
      </h3>

      {/* Блок бизнес-ланч */}
      <div className="absolute top-1/2 left-6 md:left-16 -translate-y-1/2 z-10 border border-orange-400/60 bg-black/50 backdrop-blur-sm p-6 md:p-8 max-w-xs">
        <p className="text-orange-400 uppercase tracking-widest text-xs mb-3">Специальное предложение</p>
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Бизнес-ланч</h2>
        <p className="text-neutral-300 text-sm mb-4">С 11:00 до 15:00 — от 100 рублей!</p>
        <div className="w-8 h-[2px] bg-orange-500" />
      </div>

      <p className="absolute bottom-12 right-6 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl z-10 leading-tight">
        Каждая порция — это история: армянский маринад по семейному рецепту, уголь из настоящих дров и мясо, которое тает во рту.
      </p>
    </div>
  );
}
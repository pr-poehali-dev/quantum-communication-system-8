import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const CUISINES = [
  {
    id: "russian",
    title: "Русская кухня",
    description: "Наваристые супы, пельмени, блины и домашние блюда",
    image: "https://cdn.poehali.dev/projects/591951c8-f9ba-4198-bc69-6911aff115b4/files/cb2a644b-ff7d-49ea-80ba-f9063fd76d38.jpg",
  },
  {
    id: "european",
    title: "Европейская кухня",
    description: "Пасты, стейки, свежие салаты и блюда гриль",
    image: "https://cdn.poehali.dev/projects/591951c8-f9ba-4198-bc69-6911aff115b4/files/d30854f9-4176-425c-a364-e513090174b9.jpg",
  },
  {
    id: "caucasian",
    title: "Кавказская кухня",
    description: "Шашлык, долма, лаваш и блюда на живом огне",
    image: "https://cdn.poehali.dev/projects/591951c8-f9ba-4198-bc69-6911aff115b4/files/1ad6ea34-0728-43a0-8ba1-99e07f937db3.jpg",
  },
];

export default function Menu() {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Шапка */}
      <header className="px-6 py-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest text-sm"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
        <span className="text-neutral-600">|</span>
        <span className="text-white uppercase tracking-widest text-sm font-bold">ДЫРНОС</span>
      </header>

      {/* Заголовок */}
      <div className="px-6 pt-4 pb-10 text-center">
        <p className="text-orange-400 uppercase tracking-[0.3em] text-sm mb-3">Шашлычный двор</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Наше меню</h1>
      </div>

      {/* Карточки кухонь */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
        {CUISINES.map((cuisine) => (
          <div
            key={cuisine.id}
            className="relative overflow-hidden cursor-pointer group min-h-[320px] md:min-h-0"
            onMouseEnter={() => setHovered(cuisine.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Фото */}
            <img
              src={cuisine.image}
              alt={cuisine.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${hovered === cuisine.id ? "scale-110" : "scale-100"}`}
            />

            {/* Затемнение */}
            <div className={`absolute inset-0 transition-colors duration-500 ${hovered === cuisine.id ? "bg-black/60" : "bg-black/50"}`} />

            {/* Контент */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className={`transition-transform duration-500 ${hovered === cuisine.id ? "-translate-y-2" : "translate-y-0"}`}>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">{cuisine.title}</h2>
                <p className={`text-neutral-300 text-sm leading-relaxed transition-all duration-500 ${hovered === cuisine.id ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"}`}>
                  {cuisine.description}
                </p>
                <div className={`mt-4 flex items-center gap-2 text-orange-400 text-sm uppercase tracking-widest transition-all duration-500 ${hovered === cuisine.id ? "opacity-100" : "opacity-0"}`}>
                  <span>Смотреть</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Футер */}
      <div className="px-6 py-6 text-center">
        <p className="text-neutral-600 text-sm">Забронировать стол: <a href="tel:+78212553804" className="text-orange-400 hover:text-orange-300 transition-colors">+7 (8212) 55-38-04</a></p>
      </div>
    </div>
  );
}

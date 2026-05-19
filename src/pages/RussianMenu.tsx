import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

type MenuItem = { name: string; weight: string; price: number };
type Category = { id: string; label: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: "mangal",
    label: "Горячие блюда на мангале",
    items: [
      { name: "Баранина корейка", weight: "100гр", price: 350 },
      { name: "Баранина корейка в тандыре", weight: "1000гр (+500гр овощи)", price: 3700 },
      { name: "Баранья мякоть в тандыре", weight: "1000гр (+500гр овощи)", price: 3700 },
      { name: "Вырезка говяжья", weight: "100гр", price: 390 },
      { name: "Грибы шампиньоны", weight: "100гр", price: 170 },
      { name: "Картофель в беконе", weight: "100гр", price: 200 },
      { name: "Картофель на мангале", weight: "100гр", price: 80 },
      { name: "Корейка свиная", weight: "100гр", price: 170 },
      { name: "Куриная грудка", weight: "100гр", price: 150 },
      { name: "Куриные крылышки", weight: "100гр", price: 150 },
      { name: "Люля кебаб в лаваше", weight: "150гр", price: 330 },
      { name: "Люля кебаб из баранины", weight: "150гр", price: 320 },
      { name: "Люля-кебаб говядина", weight: "150гр", price: 280 },
      { name: "Люля-кебаб из курицы", weight: "150гр", price: 250 },
      { name: "Мякоть баранины", weight: "100гр", price: 350 },
      { name: "Овощи на костре", weight: "100гр", price: 130 },
      { name: "Перепелка", weight: "100гр", price: 250 },
      { name: "Печень говяжья", weight: "100гр", price: 230 },
      { name: "Рулет в лаваше с сыром, ветчиной и томатами", weight: "", price: 220 },
      { name: "Рулетик из лаваша с куриной грудкой, салатом и соусом", weight: "", price: 220 },
      { name: "Рулетик из лаваша с сыром и помидорами", weight: "", price: 180 },
      { name: "Рыба дорадо", weight: "100гр", price: 290 },
      { name: "Свиная вырезка", weight: "100гр", price: 180 },
      { name: "Свиная шейка в тандыре", weight: "1000гр (+500гр овощи)", price: 2000 },
      { name: "Свинина шейка", weight: "100гр", price: 170 },
      { name: "Свиные ребра", weight: "100гр", price: 170 },
      { name: "Семга на мангале", weight: "100гр", price: 490 },
      { name: "Сердечки куриные", weight: "100гр", price: 160 },
      { name: "Сибас", weight: "100гр", price: 290 },
      { name: "Тигровые креветки", weight: "100гр", price: 450 },
      { name: "Филе индейки", weight: "100гр", price: 170 },
      { name: "Филе куриного бедра без кости", weight: "100гр", price: 150 },
      { name: "Форель", weight: "100гр", price: 290 },
      { name: "Шаурма с курицей", weight: "", price: 250 },
      { name: "Шаурма со свининой", weight: "", price: 280 },
    ],
  },
  {
    id: "sauces",
    label: "Соусы",
    items: [
      { name: "Аджика", weight: "100гр", price: 60 },
      { name: "Нар-шараб", weight: "100гр", price: 120 },
      { name: "Соус тартар", weight: "100гр", price: 60 },
      { name: "Сюзьма соус", weight: "100гр", price: 60 },
    ],
  },
  {
    id: "garnish",
    label: "Гарниры",
    items: [
      { name: "Картофель отварной с зеленью", weight: "100гр", price: 70 },
      { name: "Картофель фри", weight: "100гр", price: 130 },
    ],
  },
  {
    id: "hot_snacks",
    label: "Горячие закуски",
    items: [
      { name: "Блинчики с говядиной и зеленью", weight: "150гр", price: 300 },
      { name: "Блинчики с семгой", weight: "150гр", price: 330 },
      { name: "Жюльен с грибами", weight: "150гр", price: 250 },
      { name: "Жюльен с грибами и курицей", weight: "150гр", price: 290 },
      { name: "Закуска с тигровыми креветками", weight: "100гр", price: 480 },
      { name: "Креветки в панировке", weight: "150гр", price: 650 },
      { name: "Самса с говядиной", weight: "200гр", price: 150 },
      { name: "Сырные палочки с соусом тар-тар", weight: "170гр", price: 400 },
      { name: "Шляпки шампиньонов запеченные под сырной корочкой", weight: "150гр", price: 280 },
    ],
  },
  {
    id: "cold_snacks",
    label: "Холодные закуски",
    items: [
      { name: "Ассорти из солений", weight: "200гр", price: 280 },
      { name: "Бастурма и суджух", weight: "100гр", price: 350 },
      { name: "Говяжий язык с хреном", weight: "140гр", price: 350 },
      { name: "Зелень", weight: "50гр", price: 290 },
      { name: "Лимонная нарезка", weight: "", price: 100 },
      { name: "Маслины, оливки", weight: "100гр", price: 290 },
      { name: "Мясное ассорти", weight: "150гр", price: 350 },
      { name: "Овечий сыр", weight: "100гр", price: 330 },
      { name: "Овощное ассорти", weight: "170гр", price: 280 },
      { name: "Рулеты из баклажана", weight: "150гр", price: 330 },
      { name: "Сельдь с картофелем", weight: "200гр", price: 290 },
      { name: "Семга слабосоленая", weight: "130гр", price: 430 },
      { name: "Сырное ассорти", weight: "120гр", price: 300 },
    ],
  },
  {
    id: "salads",
    label: "Салаты",
    items: [
      { name: "Салат «Идеал»", weight: "150гр", price: 280 },
      { name: "Салат «Греческий»", weight: "150гр", price: 270 },
      { name: "Салат «Деревенский»", weight: "150гр", price: 220 },
      { name: "Салат «Оливье»", weight: "150гр", price: 280 },
      { name: "Салат «Салат из телятины»", weight: "150гр", price: 350 },
      { name: "Салат «Тбилиси»", weight: "150гр", price: 350 },
      { name: "Салат «Цезарь с креветками»", weight: "150гр", price: 350 },
      { name: "Салат «Цезарь с семгой»", weight: "150гр", price: 350 },
      { name: "Салат «Цезарь»", weight: "150гр", price: 300 },
    ],
  },
  {
    id: "hot_main",
    label: "Горячие блюда",
    items: [
      { name: "Стейк из семги", weight: "120гр", price: 490 },
      { name: "Жаркое в сливочно-сметанном соусе", weight: "300гр", price: 270 },
      { name: "Жаркое по-домашнему", weight: "300гр", price: 330 },
      { name: "Куриная грудка тушеная с овощами", weight: "180гр", price: 280 },
      { name: "Пельмени", weight: "250гр", price: 270 },
      { name: "Плов из баранины на углях", weight: "1000гр", price: 1500 },
      { name: "Плов из говядины на углях", weight: "1000гр", price: 1200 },
      { name: "Толма", weight: "200гр", price: 350 },
      { name: "Форель с эстрагоном", weight: "100гр", price: 290 },
      { name: "Эскалоп с овощами", weight: "300гр", price: 330 },
    ],
  },
  {
    id: "bread",
    label: "Хлеб",
    items: [
      { name: "Лаваш", weight: "", price: 90 },
      { name: "Матнакаш (1 кус)", weight: "", price: 5 },
      { name: "Матнакаш (целая лепешка)", weight: "", price: 70 },
      { name: "Ржаной хлеб", weight: "", price: 5 },
    ],
  },
  {
    id: "soups",
    label: "Супы",
    items: [
      { name: "Борщ украинский", weight: "330гр", price: 280 },
      { name: "Куриный бульон с яйцом и гренками", weight: "350гр", price: 260 },
      { name: "Окрошка на мацони", weight: "300гр", price: 240 },
      { name: "Солянка мясная сборная", weight: "340гр", price: 300 },
      { name: "Хашлама", weight: "350гр", price: 350 },
      { name: "Чанахи", weight: "350гр", price: 350 },
    ],
  },
  {
    id: "dessert",
    label: "Десерт",
    items: [
      { name: "Добавки к мороженному", weight: "", price: 20 },
      { name: "Мороженое «Пломбир»", weight: "", price: 180 },
      { name: "Мороженое «Шоколадное»", weight: "", price: 180 },
      { name: "Наполеон с заварным кремом", weight: "", price: 100 },
      { name: "Пахлава", weight: "", price: 180 },
      { name: "Тарелка фруктовая", weight: "", price: 400 },
      { name: "Торт «Чизкейк в ассортименте»", weight: "", price: 160 },
      { name: "Финики", weight: "100гр", price: 100 },
    ],
  },
  {
    id: "beer",
    label: "Пиво",
    items: [
      { name: "Амстел светлое", weight: "0.5л", price: 220 },
      { name: "Армянское пиво Киликия светлое", weight: "0.5л", price: 300 },
      { name: "Бад светлое", weight: "0.5л", price: 220 },
      { name: "Балтика 0 безалкагольное", weight: "0.5л", price: 220 },
      { name: "Великопоповетский Козел темное", weight: "0.5л", price: 220 },
      { name: "Жатецкий гусь светлое", weight: "0.5л", price: 220 },
      { name: "Котайк светлое", weight: "0.5л", price: 300 },
      { name: "Разливное пиво Жигулевское", weight: "0.5л", price: 220 },
      { name: "Разливное пиво Чешское", weight: "0.5л", price: 220 },
      { name: "Хугарден светлое нефильтрованное", weight: "0.5л", price: 220 },
    ],
  },
  {
    id: "beer_snacks",
    label: "К пиву",
    items: [
      { name: "Арахис", weight: "", price: 150 },
      { name: "Фисташки", weight: "", price: 280 },
      { name: "Чипсы", weight: "", price: 150 },
    ],
  },
  {
    id: "drinks",
    label: "Напитки",
    items: [
      { name: "Вода бутылированная газ./без газа", weight: "0.5л", price: 70 },
      { name: "Кока кола, Фанта, Спрайт", weight: "0.5л", price: 170 },
      { name: "Лимонад «Натархари»", weight: "0.5л", price: 200 },
      { name: "Минеральная вода «Джермук»", weight: "0.5л", price: 200 },
      { name: "Морс клюквенный", weight: "1л", price: 250 },
      { name: "Натуральный компот, сок из Армении", weight: "1л", price: 350 },
      { name: "Сок «Добрый»", weight: "1л", price: 250 },
    ],
  },
  {
    id: "coffee",
    label: "Кофе",
    items: [
      { name: "Американо", weight: "", price: 120 },
      { name: "Глясе", weight: "", price: 200 },
      { name: "Капучино", weight: "", price: 150 },
      { name: "Кофе по-восточному в турке", weight: "", price: 100 },
      { name: "Латте", weight: "", price: 200 },
      { name: "Эспрессо", weight: "", price: 80 },
    ],
  },
];

type CartItem = MenuItem & { count: number };

export default function RussianMenu() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("mangal");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, count: c.count + 1 } : c);
      return [...prev, { ...item, count: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === name);
      if (existing && existing.count > 1) return prev.map((c) => c.name === name ? { ...c, count: c.count - 1 } : c);
      return prev.filter((c) => c.name !== name);
    });
  };

  const totalCount = cart.reduce((s, c) => s + c.count, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.count, 0);
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Шапка */}
      <header className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur border-b border-neutral-800 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/menu")} className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
            <Icon name="ArrowLeft" size={16} />
            Меню
          </button>
          <span className="text-neutral-700">|</span>
          <span className="text-white font-bold uppercase tracking-widest text-sm">ДЫРНОС</span>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 text-sm uppercase tracking-widest"
        >
          <Icon name="ShoppingCart" size={16} />
          Корзина
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-neutral-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </header>

      {/* Заголовок */}
      <div className="px-4 md:px-8 pt-8 pb-4">
        <p className="text-orange-400 uppercase tracking-[0.3em] text-xs mb-2">Шашлычный двор Дырнос</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-1">Меню</h1>
        <p className="text-neutral-500 text-sm">Доставка с 10:00 до 22:00 · 260 ₽ по городу · 1–1,5 часа</p>
      </div>

      {/* Категории */}
      <div className="sticky top-[65px] z-20 bg-neutral-950/95 backdrop-blur border-b border-neutral-800 px-4 md:px-8 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest transition-colors flex-shrink-0 ${
                activeCategory === cat.id
                  ? "bg-orange-500 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Блюда */}
      <div className="flex-1 px-4 md:px-8 py-8">
        <h2 className="text-xl font-bold mb-6 text-white">{currentCategory.label}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentCategory.items.map((item) => {
            const inCart = cart.find((c) => c.name === item.name);
            return (
              <div
                key={item.name}
                className="bg-neutral-900 border border-neutral-800 hover:border-orange-500/40 transition-colors flex flex-col"
              >
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-white font-medium text-sm leading-snug mb-1 flex-1">{item.name}</p>
                  {item.weight && <p className="text-neutral-500 text-xs mb-3">{item.weight}</p>}
                  <div className="flex items-center justify-between mt-3 gap-2">
                    <span className="text-orange-400 font-bold text-base">{item.price.toLocaleString("ru-RU")} ₽</span>
                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="w-7 h-7 bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                        >
                          <Icon name="Minus" size={12} />
                        </button>
                        <span className="text-white text-sm font-bold w-4 text-center">{inCart.count}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-7 h-7 bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
                        >
                          <Icon name="Plus" size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1 bg-neutral-800 hover:bg-orange-500 transition-colors px-3 py-1.5 text-xs uppercase tracking-widest"
                      >
                        <Icon name="Plus" size={12} />
                        В корзину
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Корзина — боковая панель */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-neutral-900 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
              <h2 className="text-white font-bold uppercase tracking-widest text-sm">Корзина</h2>
              <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <p className="text-neutral-500 text-sm text-center mt-12">Корзина пуста</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
                      <div className="flex-1">
                        <p className="text-white text-sm leading-snug">{item.name}</p>
                        {item.weight && <p className="text-neutral-500 text-xs mt-0.5">{item.weight}</p>}
                        <p className="text-orange-400 text-sm font-bold mt-1">{(item.price * item.count).toLocaleString("ru-RU")} ₽</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                        <button onClick={() => removeFromCart(item.name)} className="w-6 h-6 bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors">
                          <Icon name="Minus" size={10} />
                        </button>
                        <span className="text-white text-sm w-4 text-center">{item.count}</span>
                        <button onClick={() => addToCart(item)} className="w-6 h-6 bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors">
                          <Icon name="Plus" size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-neutral-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-400 text-sm">Итого</span>
                  <span className="text-white font-bold text-lg">{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
                <a
                  href="tel:+78212553804"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 uppercase tracking-widest text-sm transition-colors"
                >
                  Позвонить и заказать
                </a>
                <p className="text-neutral-600 text-xs text-center mt-2">+7 (8212) 55-38-04</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

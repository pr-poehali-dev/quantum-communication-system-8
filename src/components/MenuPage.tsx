import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { MENU_CATEGORIES, MenuItem } from "@/data/menuData";

interface MenuPageProps {
  title: string;
}

type CartItem = MenuItem & { count: number };

export default function MenuPage({ title }: MenuPageProps) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
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
  const currentCategory = MENU_CATEGORIES.find((c) => c.id === activeCategory)!;

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
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-1">{title}</h1>
        <p className="text-neutral-500 text-sm">Доставка с 10:00 до 22:00 · 260 ₽ по городу · 1–1,5 часа</p>
      </div>

      {/* Категории */}
      <div className="sticky top-[65px] z-20 bg-neutral-950/95 backdrop-blur border-b border-neutral-800 px-4 md:px-8 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {MENU_CATEGORIES.map((cat) => (
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
                        <button onClick={() => removeFromCart(item.name)} className="w-7 h-7 bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors">
                          <Icon name="Minus" size={12} />
                        </button>
                        <span className="text-white text-sm font-bold w-4 text-center">{inCart.count}</span>
                        <button onClick={() => addToCart(item)} className="w-7 h-7 bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors">
                          <Icon name="Plus" size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item)} className="flex items-center gap-1 bg-neutral-800 hover:bg-orange-500 transition-colors px-3 py-1.5 text-xs uppercase tracking-widest">
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

      {/* Корзина */}
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
                <a href="tel:+78212553804" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 uppercase tracking-widest text-sm transition-colors">
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

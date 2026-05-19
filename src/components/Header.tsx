interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-base uppercase tracking-widest font-bold">ДЫРНОС</div>
        <nav className="flex gap-8">
          <a
            href="#menu"
            className="text-white hover:text-orange-300 transition-colors duration-300 uppercase text-sm"
          >
            Меню
          </a>
          <a
            href="#contact"
            className="text-white hover:text-orange-300 transition-colors duration-300 uppercase text-sm"
          >
            Контакты
          </a>
        </nav>
      </div>
    </header>
  );
}

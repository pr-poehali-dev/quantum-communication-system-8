export default function Featured() {
  const advantages = [
    { title: "Живой огонь", desc: "Готовим только на настоящих углях — никаких грилей и газа" },
    { title: "Свежее мясо", desc: "Маринуем каждый день: свинина, баранина, курица и говядина" },
    { title: "Своя атмосфера", desc: "Уютный двор под открытым небом в сердце Сыктывкара" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/591951c8-f9ba-4198-bc69-6911aff115b4/files/fc52c7fb-a01a-438d-856f-edfa18e6ba8d.jpg"
          alt="Шашлык на мангале"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-widest text-orange-500">Почему выбирают нас</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Мы не просто готовим мясо — мы создаём атмосферу настоящего кавказского застолья прямо в Сыктывкаре.
        </p>
        <div className="flex flex-col gap-5 mb-10">
          {advantages.map((item) => (
            <div key={item.title} className="border-l-2 border-orange-500 pl-4">
              <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
              <p className="text-neutral-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <a
          href="#menu"
          className="bg-black text-white border border-black px-6 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-widest"
        >
          Смотреть меню
        </a>
      </div>
    </div>
  );
}

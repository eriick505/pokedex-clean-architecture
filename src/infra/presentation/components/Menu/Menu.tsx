import { IconHome, IconPokeball } from "@presentation/components";

export function Menu() {
  // const router = useRouter();

  // const isActiveRoute = (path: string) => path === router.pathname;
  const isActiveRoute = (path: string) => true;

  const menuList = [
    {
      path: "/",
      label: "Home",
      icon: <IconHome />,
    },
    {
      path: "/pokedex",
      label: "Pokedex",
      icon: <IconPokeball />,
    },
  ];

  const activeMenuStyle = `
    text-red-500
    before:content-['']
    before:absolute
    before:bottom-0
    before:w-full
    before:h-1 before:bg-red-500
  `;

  const handleActiveMenuStyle = (path: string) =>
    isActiveRoute(path) ? activeMenuStyle : "";

  return (
    <nav>
      <ul className="flex">
        {menuList.map(({ label, path, icon }) => (
          <li
            key={label}
            className={`
              py-7 mr-5 last:mr-0 relative text-gray-500 
              ${handleActiveMenuStyle(path)}
            `}
          >
            <a href={path} className="flex items-center">
              <span className="inline-block mr-2 text-3xl">{icon}</span>
              <span className="text-sm font-bold">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

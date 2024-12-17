import { Link } from "react-router-dom";
import { useNavbar } from "./use-navbar";
import { INavbarItem, NAVBAR_ITEMS } from "./navbar-config";

const NavItem = ({ item }: { item: INavbarItem }) => {
  return (
    <li className={`nav-item ${item.active ? "bg-red-400" : ""}`}>
      <Link
        to={item.path}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
      >
        <span>{item.name}</span>
      </Link>
      {item.children && (
        <ul className="pl-4">
          {item.children.map((child, index) => (
            <NavItem key={index} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Navbar = () => {
  const { navbarItems } = useNavbar({ items: NAVBAR_ITEMS });

  return (
    <nav className="w-64 h-screen bg-white border-r">
      <div className="p-4">
        <ul className="space-y-2">
          {navbarItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };

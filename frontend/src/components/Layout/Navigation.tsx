import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavigationProps = {
  navItems: NavItem[];
};

type NavItem = {
  path: string;
  label: string;
};

const Navigation = ({ navItems }: NavigationProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="hidden md:flex" aria-label="Main navigation">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                to={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;

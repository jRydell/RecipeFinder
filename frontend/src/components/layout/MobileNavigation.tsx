import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useAuthStore } from "@/stores/auth.store";

type NavItem = {
  path: string;
  label: string;
};

type MobileMenuProps = {
  navItems: NavItem[];
};

const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[240px]"
        aria-label="Mobile navigation"
      >
        <nav aria-label="Mobile navigation menu">
          <ul className="flex flex-col gap-4 mt-8 list-none p-0 m-0">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-lg font-medium"
                  aria-current={isActive(item.path) ? "page" : undefined}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="text-lg font-medium"
                aria-label={
                  isAuthenticated
                    ? "Log out of your account"
                    : "Log in to your account"
                }
              >
                {isAuthenticated ? "Log out" : "Log in"}
              </Link>
            </li>
          </ul>

          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <span className="text-muted-foreground" id="theme-label">
              Theme
            </span>
            <ThemeToggle aria-labelledby="theme-label" />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

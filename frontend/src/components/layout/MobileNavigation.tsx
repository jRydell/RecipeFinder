import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

import { BookOpen, Utensils, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

type NavItem = {
  path: string;
  label: string;
};

type MobileMenuProps = {
  navItems: NavItem[];
};

const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const { isAuthenticated, logout } = useAuthStore();
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
        className="w-[320px] px-4 pt-6 pb-8 flex flex-col"
        aria-label="Mobile navigation"
      >
        <nav
          aria-label="Mobile navigation menu"
          className="flex flex-col h-full flex-1"
        >
          <ul className="flex flex-col gap-3 mt-2 list-none p-0 m-0">
            {navItems.map((item) => (
              <li key={item.path} className="">
                <SheetClose asChild>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 w-full rounded-md px-2 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-current={isActive(item.path) ? "page" : undefined}
                    aria-label={item.label}
                  >
                    {item.path === "/categories" ? (
                      <Utensils className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
            {!isAuthenticated && (
              <li>
                <SheetClose asChild>
                  <Link
                    to="/login"
                    className="w-full rounded-md px-2 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Log in"
                  >
                    Log in
                  </Link>
                </SheetClose>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <SheetClose asChild>
                  <button
                    onClick={() => logout()}
                    className="w-full rounded-md px-2 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                    aria-label="Log out"
                    type="button"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Log out
                  </button>
                </SheetClose>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-border">
          <span
            className="font-medium text-base px-2 py-2 rounded-md"
            id="theme-label"
          >
            <ThemeToggle aria-labelledby="theme-label" />
            Theme
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

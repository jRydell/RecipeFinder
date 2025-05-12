import { Link } from "react-router-dom";
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

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px]">
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-lg font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/login" className="text-lg font-medium">
            {isAuthenticated ? "Log out" : "Log in"}
          </Link>

          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <span className="text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { ThemeToggle } from "../ThemeToggle";
import Navigation from "./Navigation";
import MobileMenu from "./MobileNavigation";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navItems = [
    { path: "/categories", label: "Categories" },
    { path: "/my-recipes", label: "My Recipes" },
  ];

  return (
    <header
      className="border-b bg-background sticky top-0 z-30"
      role="banner"
      aria-label="Site header"
    >
      <div className="container flex h-16 items-center px-4">
        <Link to="/" aria-label="Home" className="font-bold text-xl mr-6">
          RecipeFinder
        </Link>
        <Navigation navItems={navItems} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              onClick={() => isAuthenticated && logout()}
              aria-label={isAuthenticated ? "Log out" : "Log in"}
            >
              {isAuthenticated ? "Log out" : "Log in"}
            </Button>
          </Link>
        </div>
        <MobileMenu navItems={navItems} />
      </div>
    </header>
  );
};

import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./MobileNavigation";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { BookOpen, Utensils } from "lucide-react";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navItems = [
    { path: "/categories", label: "Categories" },
    { path: "/my-recipes", label: "My Recipes" },
  ];

  return (
    <header
      className="border-b bg-background sticky top-0 z-30 w-full"
      role="banner"
      aria-label="Site header"
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8 w-full">
        <Link
          to="/"
          aria-label="Home"
          className="font-bold text-xl mr-4 sm:mr-6 whitespace-nowrap"
        >
          RecipeFinder
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex">
          <Link
            to="/categories"
            className={
              "xl:flex hidden items-center gap-2 " +
              navigationMenuTriggerStyle()
            }
            aria-label="Categories"
          >
            <Utensils className="w-4 h-4" /> Categories
          </Link>
          <Link
            to="/my-recipes"
            className={
              "md:flex hidden items-center gap-2 " +
              navigationMenuTriggerStyle()
            }
            aria-label="My Recipes"
          >
            <BookOpen className="w-4 h-4" /> My Recipes
          </Link>
        </nav>

        <div className="ml-auto hidden md:flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <Link
            to="/login"
            className={navigationMenuTriggerStyle()}
            onClick={() => isAuthenticated && logout()}
            aria-label={isAuthenticated ? "Log out" : "Log in"}
            style={{ cursor: "pointer" }}
          >
            {isAuthenticated ? "Log out" : "Log in"}
          </Link>
        </div>
        {/* Mobile hamburger and login, ThemeToggle+links hidden on mobile */}
        <div className="md:hidden ml-auto flex items-center">
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

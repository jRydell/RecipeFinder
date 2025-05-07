import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle"; // Added import

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Icons
import { Menu, Search } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import ScrollToTop from "../ScrollToTop";
import { BUILD_DATE } from "@/utils/lastUpdate";

const Layout = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/*Header/Navigation */}
      <header className="border-b bg-background sticky top-0 z-30">
        <div className="container flex h-16 items-center px-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl mr-6">
            RecipeFinder
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/" className={isActive("/") ? "font-bold" : ""}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    to="/categories"
                    className={isActive("/categories") ? "font-bold" : ""}
                  >
                    Categories
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    to="/my-recipes"
                    className={isActive("/my-recipes") ? "font-bold" : ""}
                  >
                    My Recipes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - Search and Account */}
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />

            <Link to="/">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>

            {/* Account Button */}
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                onClick={() => isAuthenticated && logout()}
              >
                {isAuthenticated ? "Sign out" : "Sign in"}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium">
                    Home
                  </Link>
                  <Link to="/categories" className="text-lg font-medium">
                    Categories
                  </Link>
                  <Link to="/my-recipes" className="text-lg font-medium">
                    My Recipes
                  </Link>
                  <Link to="/login" className="text-lg font-medium">
                    Sign in
                  </Link>
                  {/* Theme toggle in mobile menu*/}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t">
                    <span className="text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © RecipeFinder. All rights reserved.
              <span className="block md:inline md:ml-2">
                Last updated: {BUILD_DATE}
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                to="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

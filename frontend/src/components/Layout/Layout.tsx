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

const Layout = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modern Header with Navigation */}
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
                <Link to="/">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={isActive("/")}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/categories">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={isActive("/categories")}
                  >
                    Categories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/my-recipes">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={isActive("/my-recipes")}
                  >
                    My Recipes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - Search and Account */}
          <div className="ml-auto flex items-center space-x-4">
            {/* Theme Toggle - Added here */}
            <ThemeToggle />

            <Link to="/">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>

            {/* Account Button */}
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign in
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
                  {/* Theme toggle in mobile menu - Added here */}
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

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RecipeFinder. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Terms
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

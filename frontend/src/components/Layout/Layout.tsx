import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow" aria-label="Main content">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

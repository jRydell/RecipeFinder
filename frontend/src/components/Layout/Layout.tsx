import { Outlet } from "react-router-dom";

import { ScrollToTop } from "./ScrollToTop";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />

      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer />
    </div>
  );
};

export default Layout;

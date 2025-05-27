import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

import { Header } from "./Header";
import { Footer } from "./Footer";
import Banner from "./Banner";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <Banner />{" "}
      <main className="flex-grow" aria-label="Main content">
        <div className="container max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

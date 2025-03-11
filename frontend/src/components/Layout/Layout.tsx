import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col text-center">
      {/* Header/Navigation */}
      <header className="bg-slate-800 text-white shadow-md w-full">
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col items-center">
          <div className="text-xl font-bold mb-4">Project Unknown</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/health"
                  className="hover:text-blue-300 transition-colors"
                >
                  Health Check
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-blue-300 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/my-recipes"
                  className="hover:text-blue-300 transition-colors"
                >
                  My recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-300 transition-colors"
                >
                  Log in
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content with centered text */}
      <main className="flex-grow flex justify-center w-full">
        <div className="max-w-3xl w-full mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 w-full">
        <div className="max-w-3xl mx-auto px-6">
          © {new Date().getFullYear()} Project Unknown
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-6 bg-background"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span
              aria-label={`Copyright ${year} RecipeFinder. All rights reserved.`}
            >
              © {year} RecipeFinder. All rights reserved.
            </span>
            <span
              className="block md:inline md:ml-2"
              aria-label={`Last updated: ${new Date().toLocaleDateString()}`}
            >
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-4 list-none p-0 m-0">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  aria-label="About us"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  aria-label="Contact us"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  aria-label="Terms and Conditions"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  aria-label="Privacy policy"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

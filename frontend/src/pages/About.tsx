import { Link } from "react-router-dom";
import { ExternalLink, Code, Server, Github, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About RecipeFinder</h1>

      <section className="mb-8">
        <div className="bg-muted p-5 rounded-lg mb-5 border border-muted-foreground/20">
          <p className="font-medium">
            RecipeFinder was developed by Johan Rydell as a final project for
            the Frontend Developer program at Yrkeshögskolan Borås. This
            full-stack application demonstrates knowledge in modern web
            development technologies, CI/CD practices, and deployment
            strategies.
          </p>
        </div>

        <p className="mb-4 text-lg">
          RecipeFinder helps users find, save and rate recipes. The app lets you
          search and browse recipes from The MealDB API, save favorites to a
          MySQL database, and share your opinions through ratings and comments.
          Built with React and Node.js.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Blocks className="h-5 w-5 text-primary" />
          Project Features
        </h2>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>User authentication with JWT</li>
          <li>Recipe search and discovery powered by The MealDB API</li>
          <li>Personal recipe collection management</li>
          <li>Recipe rating system</li>
          <li>Comments functionality</li>
          <li>Responsive design for mobile and desktop</li>
          <li>Dark/light theme support</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Frontend Technologies
        </h2>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>React 19 with TypeScript 5.7</li>
          <li>React Router 7 for navigation</li>
          <li>Shadcn UI as the primary component library</li>
          <li>Tailwind CSS 4 for styling</li>
          <li>Zustand 5 for state management</li>
          <li>Zod for input validation</li>
          <li>Axios for API requests</li>
          <li>Vite 6 as build tool</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          Backend Technologies
        </h2>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Node.js with Express 4.21</li>
          <li>TypeScript 5.6 for type safety</li>
          <li>MySQL database with mysql2 driver</li>
          <li>JWT authentication</li>
          <li>BCrypt for password hashing</li>
          <li>RESTful API architecture</li>
          <li>Environment configuration with dotenv</li>
          <li>CORS handling for secure cross-origin requests</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Github className="h-5 w-5 text-primary" />
          CI/CD & Deployment
        </h2>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>GitHub Actions for CI/CD pipelines</li>
          <li>Automated build checks on pull requests</li>
          <li>Automated deployment to production on merge to main branch</li>
          <li>Self-hosted Ubuntu server</li>
          <li>Nginx web server as a reverse proxy</li>
          <li>PM2 process manager for Node.js backend</li>
        </ul>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 justify-center my-10">
        <Button asChild>
          <a
            href="https://github.com/jRydell/projectunknown"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact" className="flex items-center gap-2">
            Contact Developer
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default About;

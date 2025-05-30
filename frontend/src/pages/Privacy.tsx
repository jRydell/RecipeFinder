import {
  Database,
  ShieldCheck,
  Server,
  ExternalLink,
  HardDrive,
  UserCog,
  Clock,
  RefreshCw,
  Info,
} from "lucide-react";

const Privacy = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          1. Information We Collect
        </h2>
        <p className="mb-2">We collect and store the following information:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>
            <strong>Account Information:</strong> Username, email address, and
            securely hashed password
          </li>
          <li>
            <strong>Saved Recipes:</strong> Which recipes you've saved to your
            profile
          </li>
          <li>
            <strong>Ratings:</strong> Your ratings for recipes (1-5 stars)
          </li>
          <li>
            <strong>Comments:</strong> Any comments you post on recipes
          </li>
          <li>
            <strong>Timestamps:</strong> When you created your account, saved
            recipes, or posted ratings and comments
          </li>
        </ul>
        <p className="mb-2">
          We do not store your recipe search history or track your browsing
          activity within the application.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          2. How We Use Your Information
        </h2>
        <p className="mb-2">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>To create and manage your user account</li>
          <li>To provide our recipe saving, rating, and commenting features</li>
          <li>
            To display your comments and ratings to other users (associated with
            your username)
          </li>
          <li>To keep track of which recipes you've saved for easy access</li>
        </ul>
      </section>{" "}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          3. Data Storage and Security
        </h2>
        <p className="mb-2">
          Your data is stored in a secure MySQL database with appropriate
          safeguards:
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>Passwords are securely hashed, not stored in plain text</li>
          <li>Database access is restricted to authorized administrators</li>
          <li>Regular security updates are applied to all systems</li>
        </ul>
        <p className="mb-2">
          <strong>Educational Environment Disclaimer:</strong> While we
          implement security best practices as part of this learning project,
          this system may not meet enterprise-level security standards. No
          method of transmission over the internet or electronic storage is 100%
          secure.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          4. Educational Use and Data Sharing
        </h2>
        <p className="mb-2">
          <strong>Academic Context:</strong> As this is an educational project:
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>
            Your data may be reviewed by instructors or evaluators for
            educational assessment
          </li>
          <li>
            Anonymized usage patterns may be analyzed for learning purposes
          </li>
          <li>
            Code and database structure may be shared in academic contexts
          </li>
          <li>
            Personal identifying information will not be shared outside the
            educational context
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-primary" />
          5. Third-Party Services
        </h2>
        <p className="mb-2">
          Our application uses a third-party recipe database (TheMealDB API) to
          provide recipe information. When you search for recipes, your search
          terms are sent to this service, but we do not share your personal
          information.
        </p>
        <p className="mb-2">
          We do not sell or rent your personal information to third parties.
        </p>
      </section>{" "}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-primary" />
          6. Local Storage
        </h2>
        <p className="mb-2">
          We use your browser's local storage capability to store authentication
          tokens. This allows you to remain logged in between sessions. This
          data remains on your device and is not transmitted to our servers.
        </p>
      </section>{" "}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          7. User Rights
        </h2>
        <p className="mb-2">You have the right to:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>
            Delete your account and associated data (including your saved
            recipes, ratings, and comments)
          </li>
          <li>Request a copy of your data</li>
        </ul>{" "}
        <p className="mb-2">
          To exercise these rights, please contact us at the email address
          provided in our Contact page.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          8. Data Retention and Project Lifecycle
        </h2>
        <p className="mb-2">
          <strong>During Active Development:</strong> We retain your personal
          information for as long as your account is active and the project is
          being developed or evaluated.
        </p>
        <p className="mb-2">
          <strong>Project Conclusion:</strong> When this educational project
          concludes, all user data may be permanently deleted. We will make
          reasonable efforts to notify active users before any planned data
          deletion.
        </p>
        <p className="mb-2">
          <strong>Account Deletion:</strong> When you delete your account, all
          associated data (including saved recipes, ratings, and comments) will
          be permanently removed from our database.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          9. Privacy Policy Updates
        </h2>
        <p className="mb-2">
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by posting the new policy on this page.
        </p>
      </section>{" "}
      <div className="flex items-center gap-2 mt-8 justify-center">
        <Info className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Last updated: May 30, 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;

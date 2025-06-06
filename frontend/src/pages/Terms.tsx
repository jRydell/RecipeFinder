import {
  CheckCircle,
  UserCircle,
  MessageSquare,
  ExternalLink,
  ShieldAlert,
  ShieldX,
  FileText,
  Globe,
  Info,
} from "lucide-react";

const Terms = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Educational Project Notice
        </h2>
        <p className="mb-2">
          This application is a student project created for educational purposes
          as part of a Frontend Developer program. It is currently under active
          development and provided "as-is" without warranties or guarantees of
          continued support, maintenance, or availability.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          1. Acceptance of Terms
        </h2>
        <p className="mb-2">
          By accessing or using this recipe application, you agree to be bound
          by these Terms and Conditions. If you do not agree with any part of
          these terms, you may not use our service.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-primary" />
          2. User Accounts
        </h2>
        <p className="mb-2">
          To use certain features of the application, you must register for an
          account. You are responsible for maintaining the confidentiality of
          your account information and for all activities that occur under your
          account.
        </p>
        <p className="mb-2">
          You must provide accurate and complete information when creating an
          account, and you agree to update your information to keep it accurate
          and current.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          3. User Content
        </h2>
        <p className="mb-2">
          By submitting ratings, comments, or other content, you grant us a
          non-exclusive, royalty-free license to use, display, and distribute
          your content in connection with our service.
        </p>
        <p className="mb-2">
          You are solely responsible for the content you submit. Your content
          must not violate any applicable laws or infringe on third-party
          rights.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-primary" />
          4. Third-Party Content
        </h2>
        <p className="mb-2">
          This application uses recipe data from external sources. We do not
          claim ownership of this third-party content and provide attribution
          where required.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          5. Prohibited Activities
        </h2>
        <p className="mb-2">You agree not to:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Use the service for any illegal purpose</li>
          <li>Post harmful, offensive, or inappropriate content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use automated methods to scrape or extract data</li>
          <li>Interfere with the proper functioning of the service</li>
        </ul>
      </section>{" "}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShieldX className="h-5 w-5 text-primary" />
          6. Service Availability & Educational Nature
        </h2>
        <p className="mb-2">
          <strong>No Service Guarantees:</strong> This is an educational project
          with no guaranteed uptime, availability, or continued operation. The
          service may be discontinued, modified, or become unavailable at any
          time without notice.
        </p>
        <p className="mb-2">
          <strong>Development Status:</strong> This application is under active
          development. Features may change, data may be lost, and functionality
          may be interrupted as part of the development process.
        </p>
        <p className="mb-2">
          <strong>No Commercial Use:</strong> This service is provided for
          educational demonstration purposes only and is not intended for
          commercial or production use.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShieldX className="h-5 w-5 text-primary" />
          7. Limitation of Liability
        </h2>{" "}
        <p className="mb-2">
          To the maximum extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages
          resulting from your use or inability to use our service. Given the
          educational and developmental nature of this project, you acknowledge
          that data loss, service interruptions, and functionality changes may
          occur without warning.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          8. Data and Privacy Notice
        </h2>
        <p className="mb-2">
          <strong>Educational Environment:</strong> Any data you provide may be
          used for educational purposes and demonstration. Do not submit
          sensitive or personal information beyond what is necessary for account
          creation.
        </p>
        <p className="mb-2">
          <strong>Data Retention:</strong> We make no guarantees about data
          retention. Your account data, saved recipes, and reviews may be
          deleted as part of development, testing, or project conclusion.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          9. Modifications to Terms
        </h2>
        <p className="mb-2">
          We reserve the right to modify these Terms and Conditions at any time.
          Continued use of the service after such modifications constitutes your
          acceptance of the revised terms.
        </p>
      </section>{" "}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          10. Governing Law
        </h2>
        <p className="mb-2">
          These Terms shall be governed by and construed in accordance with the
          laws of Sweden, without regard to its conflict of law provisions.
        </p>
      </section>
      <div className="flex items-center gap-2 mt-8 justify-center">
        <Info className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Last updated: May 30, 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;

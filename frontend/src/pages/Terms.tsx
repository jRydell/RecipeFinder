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
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShieldX className="h-5 w-5 text-primary" />
          6. Limitation of Liability
        </h2>
        <p className="mb-2">
          To the maximum extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages
          resulting from your use or inability to use our service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          7. Modifications to Terms
        </h2>
        <p className="mb-2">
          We reserve the right to modify these Terms and Conditions at any time.
          Continued use of the service after such modifications constitutes your
          acceptance of the revised terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          8. Governing Law
        </h2>
        <p className="mb-2">
          These Terms shall be governed by and construed in accordance with the
          laws of Sweden, without regard to its conflict of law provisions.
        </p>
      </section>

      <div className="flex items-center gap-2 mt-8 justify-center">
        <Info className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Last updated: May 7, 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;

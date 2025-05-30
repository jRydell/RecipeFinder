import { Mail, User, Bug, Database, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>{" "}
      <section className="mb-8">
        <p className="mb-4 text-lg">
          If you have any questions, concerns, or feedback about my recipe
          application, please don't hesitate to reach out:
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Contact Information
        </h2>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <p>
              <strong>Developer:</strong> Johan Rydell
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <p>
              <strong>Email:</strong> Coming soon
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <p>
              <strong>Location:</strong> Sweden
            </p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Account Support
        </h2>
        <p className="mb-2">
          For issues related to your account, please include your username in
          your message (but never send your password).
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Bug className="h-5 w-5 text-primary" />
          Bug Reports
        </h2>
        <p className="mb-2">
          When reporting a bug, please include the following information:
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Description of the issue</li>
          <li>Steps to reproduce the problem</li>
          <li>The device and browser you were using</li>
          <li>Screenshots if applicable</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Data Requests
        </h2>
        <p className="mb-2">
          To request access to your data or deletion of your account, please
          email me with the subject line "Data Request" or "Account Deletion
          Request".
        </p>
      </section>
      <div className="flex justify-center mt-10">
        <Button asChild size="lg">
          <a href="mailto:coming-soon@example.com">
            <Mail className="mr-2 h-4 w-4" /> Email Me
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Contact;

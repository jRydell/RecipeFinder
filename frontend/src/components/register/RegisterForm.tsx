import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "../shared/ErrorMessage";
import { Checkbox } from "@/components/ui/checkbox";

const registerSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 5 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [agreement, setAgreement] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    const { data, error } = await register(
      values.username,
      values.email,
      values.password
    );
    if (data) {
      void navigate("/");
    } else {
      setError(error || "Registration failed");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >
        {error && <ErrorMessage error={error} />}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="yourUsername" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="•••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center gap-2 mt-6">
          <Checkbox
            id="terms"
            checked={agreement}
            onCheckedChange={(checked) => setAgreement(checked === true)}
          />
          <label htmlFor="terms" className="text-sm font-normal cursor-pointer">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
        <Button
          type="submit"
          className="w-full mt-6"
          disabled={loading || !agreement}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter"),
  password: z
    .string()
    .min(5, "Passowrd minimal 5 karakter")
    .max(50, "Password maksimal 50 karakter"),
});

type LoginFromSchema = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const form = useForm<LoginFromSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { control, handleSubmit } = form;
  const { login, loading, error } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    const token = await login(values);

    if (token) {
      window.location.href = "/dashboard";
    }
  });

  return (
    <Form {...form}>
      {error && (
        <div className="text-red-500 font-bold text-lg px-2 py-1 mb-2">
          {error}
        </div>
      )}
      <form className="space-y-2" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="John Doe" />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="******" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700"
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;

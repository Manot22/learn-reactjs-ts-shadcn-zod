import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter"),

  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(50, "Password maksimal 50 karakter"),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { control, handleSubmit } = form;
  const { register, error, loading } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    const token = await register(values);

    if (token) {
      window.location.href = "/";
    }
  });

  return (
    <Form {...form}>
      {error && (
        <div className="text-red-500 font-bold text-lg px-2 py-1 mb-2">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-2">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="user@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700"
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

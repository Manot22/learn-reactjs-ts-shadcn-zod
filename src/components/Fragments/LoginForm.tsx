import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAuth } from "@/hooks/useAuth";
import { type LoginFormSchema, LoginSchema } from "@/schemas/auth.schema";

const LoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
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
                <FormMessage />
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
              <FormMessage />
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

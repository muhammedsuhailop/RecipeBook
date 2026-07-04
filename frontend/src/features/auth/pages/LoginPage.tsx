import { useState, type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AuthLayout } from "@/shared/components/layout/AuthLayout";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/loginSchema";
import { getErrorMessage, getFieldErrors } from "@/utils/getErrorMessage";

export function LoginPage(): ReactElement {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values);
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (field === "email" || field === "password") {
          setError(field, { message });
        }
      });
      toast.error(getErrorMessage(error, "Unable to sign in"));
    }
  });

  return (
    <>
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <AuthLayout
        title="Welcome back to RecipeBook"
        subtitle="Sign in to discover new dishes and access your saved recipes."
        footer={
          <p className="text-slate-600 dark:text-slate-400">
            New here?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
            >
              Create an account
            </Link>
          </p>
        }
      >
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="rounded-md p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />
          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}

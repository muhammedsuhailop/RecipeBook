import { useState, type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { AuthLayout } from "@/shared/components/layout/AuthLayout";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/registerSchema";
import { getErrorMessage, getFieldErrors } from "@/utils/getErrorMessage";

const REGISTER_FIELDS = [
  "name",
  "email",
  "phone",
  "password",
  "confirmPassword",
] as const;
type RegisterFieldName = (typeof REGISTER_FIELDS)[number];

function isRegisterField(value: string): value is RegisterFieldName {
  return (REGISTER_FIELDS as readonly string[]).includes(value);
}

export function RegisterPage(): ReactElement {
  const navigate = useNavigate();
  const { register: registerUserAction } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUserAction({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      toast.success("Account created — please sign in.");
      navigate("/login", { replace: true });
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (isRegisterField(field)) {
          setError(field, { message });
        }
      });
      toast.error(getErrorMessage(error, "Unable to create account"));
    }
  });

  return (
    <>
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <AuthLayout
        title="Create your RecipeBook"
        subtitle="Save recipes, plan meals, cook better."
        footer={
          <p className="text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <Input
            label="Name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.name?.message}
            {...register("name")}
          />
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
            label="Phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 9040302010"
            leftIcon={<Phone className="h-4 w-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
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
          <Input
            label="Confirm password"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repeat your password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="rounded-md p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Create account
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToastMessages } from "@/hooks/toast-messages";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("Register");
  const { showError, showSuccess } = useToastMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const registerSchema = z
    .object({
      firstname: z.string().min(1, { message: t("validationErrors.firstNameRequired") }),
      lastname: z.string().min(1, { message: t("validationErrors.lastNameRequired") }),
      email: z.string().email({ message: t("validationErrors.invalidEmail") }),
      phone: z.string().min(1, { message: t("validationErrors.phoneRequired") }),
      password: z.string().min(8, { message: t("validationErrors.passwordMinLength") }),
      confirmPassword: z.string().min(8, { message: t("validationErrors.passwordMinLength") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validationErrors.passwordsDoNotMatch"),
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.register({
        name: data.firstname,
        surname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log("response", response);
      if (response.success) {
        showSuccess(t("registrationSuccess") || "Kaydınız başarılı!", 3000);
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t("registrationFailed");
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* Sol Taraf - Resim Alanı */}
          <div className="order-2 lg:order-1 h-96 lg:min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent"></div>
            
            {/* Gerçek Görsel - Full Coverage */}
            <img
              src="https://a-static.besthdwallpaper.com/cloudy-and-plane-travel-design-of-the-most-beautiful-places-to-visit-in-wallpaper-1152x768-94521_36.jpg"
              alt="Register Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sağ Taraf - Form */}
          <div className="flex flex-col justify-center items-center order-1 lg:order-2 px-6 lg:px-12 py-8 lg:py-0">
            {/* Form Card */}
            <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
              {/* Logo / Başlık */}
              <div className="space-y-2">
                <Link href="/" className="inline-block mb-2">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Rotaly
                  </div>
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {t("title") || "Hesap Oluştur"}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("subtitle") || "Birkaç adımda başlayın"}
                </p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                  {/* Ad ve Soyad Satırı */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-200">
                            {t("firstName") || "Ad"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ad"
                              {...field}
                              disabled={isLoading}
                              className="h-9 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-200">
                            {t("lastName") || "Soyad"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Soyad"
                              {...field}
                              disabled={isLoading}
                              className="h-9 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {t("email") || "E-posta"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@example.com"
                            {...field}
                            disabled={isLoading}
                            className="h-9 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Telefon */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {t("phone") || "Telefon"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+90 5XX XXX XXXX"
                            {...field}
                            disabled={isLoading}
                            className="h-9 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Şifre */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {t("password") || "Şifre"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              disabled={isLoading}
                              className="h-9 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Şifre Tekrar */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {t("confirmPassword") || "Şifreyi Onayla"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              disabled={isLoading}
                              className="h-9 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                              disabled={isLoading}
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 mt-4 text-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        {t("registerButtonLoading") || "Kayıt yapılıyor..."}
                      </div>
                    ) : (
                      t("registerButton") || "Kayıt Ol"
                    )}
                  </Button>
                </form>
              </Form>

              {/* Login Linki */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 text-center text-xs">
                  {t("haveAccount") || "Zaten hesabınız var mı?"}{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
                  >
                    {t("loginLink") || "Giriş Yap"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
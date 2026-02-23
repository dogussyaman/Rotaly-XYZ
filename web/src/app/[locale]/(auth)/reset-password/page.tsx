"use client";

import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToastMessages } from "@/hooks/toast-messages";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const t = useTranslations("ResetPassword");
  const { showError, showSuccess } = useToastMessages();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Şifre sıfırlama için form schema
  const resetPasswordSchema = z.object({
    email: z.string().email({ message: t("invalidEmail") || "Invalid email address" }),
  });

  type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(data.email);
      if (response.success) {
        showSuccess(t("resetSuccess") || "Sıfırlama bağlantısı e-postanıza gönderildi.", 5000);
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t("resetError");
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
              alt="Reset Password Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sağ Taraf - Form */}
          <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2 px-6 lg:px-12 py-8 lg:py-0">
            {/* Geri Butonu */}
            <Link
              href="/login"
              className="flex items-center gap-2 w-fit text-slate-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>{t("back") || "Geri Dön"}</span>
            </Link>

            {/* Logo / Başlık */}
            <div className="space-y-3 mb-4">
              <Link href="/" className="inline-block mb-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300">
                  Rotaly
                </div>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t("title") || "Şifre Sıfırla"}
              </h1>
              <p className="text-lg text-slate-300">
                {t("description") || "E-posta adresinizi girin ve sıfırlama bağlantısını alın"}
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        {t("email") || "E-posta"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("emailPlaceholder") || "example@email.com"}
                          {...field}
                          disabled={isLoading}
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg rounded-lg transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      {t("sending") || "Gönderiliyor..."}
                    </div>
                  ) : (
                    t("submit") || "Gönder"
                  )}
                </Button>
              </form>
            </Form>

            {/* Alternatif Seçenekler */}
            <div className="pt-4 border-t border-slate-700 space-y-3">
              <p className="text-slate-400 text-sm">
                {t("noEmail") || "Hesabınıza erişemediğinizde mi?"}
              </p>
              <div className="flex gap-3">
                <Link
                  href="/register"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg hover:bg-slate-700 transition-colors duration-200 text-center"
                >
                  {t("createAccount") || "Hesap Oluştur"}
                </Link>
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
};

export default ResetPassword;

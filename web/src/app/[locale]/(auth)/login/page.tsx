"use client";

import { useRouter } from "@/i18n/routing";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToastMessages } from "@/hooks/toast-messages";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import LoginForm from "@/components/auth/login-form";
import OTPVerificationDialog from "@/components/auth/otp-verification-dialog";
import CloseVerificationDialog from "@/components/auth/close-verification-dialog";
import { createLoginLogic } from "@/components/auth/login-logic";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginSuccess } = useToastMessages();
  const [open, setOpen] = useState(false);
  const [closeVerify, setCloseVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSchema = z.object({
    email: z.string().email({ message: t("invalidEmail") }),
    password: z.string().min(8, { message: t("invalidPassword") }),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login logic'ini oluştur
  const { handleLogin, handleOtpSubmit } = createLoginLogic({
    router,
    dispatch,
    loginSuccess,
    setOpen,
  });

  // Timer bittiğinde çağrılacak fonksiyon
  const handleTimeUp = useCallback(() => {
    // Modal kapatılmasın, sadece mesaj göster
    toast.error(
      "Doğrulama süresi doldu. Şifre yenile butonunu kullanabilirsiniz."
    );
  }, []);

  // OTP submit fonksiyonu - useCallback ile optimize et
  const otpSubmit = useCallback(async () => {
    if (isSubmitting) return; // Çift tıklamayı engelle
    
    setIsSubmitting(true);
    
    try {
      await handleOtpSubmit(otp, () => {
        setOpen(false);
        setOtp("");
        form.reset();
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, handleOtpSubmit, form, isSubmitting]);

  // OTP değişikliğini handle et
  const handleOtpChange = useCallback((value: string) => {
    setOtp(value);
  }, []);

  // Dialog açılma durumunu handle et
  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isSubmitting) { // Sadece submit edilmiyorsa değiştir
      setOpen(isOpen);
      if (!isOpen) {
        setOtp(""); // Dialog kapanırken OTP'yi temizle
      }
    }
  }, [isSubmitting]);

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
              alt="Login Hero"
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
                  {t("title") || "Hoş Geldiniz"}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("subtitle") || "Hesabınıza giriş yapın"}
                </p>
              </div>

              {/* Form */}
              <LoginForm form={form} onSubmit={handleLogin} />

              {/* Kayıt Linki */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 text-center text-xs">
                  {t("noAccount") || "Henüz hesabınız yok mu?"}{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
                  >
                    {t("register") || "Kayıt Ol"}
                  </Link>
                </p>
              </div>

              {/* Forgot Password */}
              <div className="text-center pt-2">
                <Link
                  href="/reset-password"
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  {t("forgotPassword") || "Şifremi Unuttum?"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gerçek hesap doğrulama dialogu */}
      <OTPVerificationDialog
        open={open}
        onOpenChange={handleOpenChange}
        otp={otp}
        onOtpChange={handleOtpChange}
        onSubmit={otpSubmit}
        onTimeUp={handleTimeUp}
        title="Hesabı Doğrula"
        description="Lütfen doğrulama kodunu giriniz. Doğrulama kodu 6 haneli olmalıdır."
        email={form.getValues("email")}
      />

      {/* Çıkış onay dialogu */}
      <CloseVerificationDialog
        open={closeVerify}
        onOpenChange={setCloseVerify}
        onConfirm={() => {
          setCloseVerify(false);
        }}
        onCancel={() => setCloseVerify(false)}
      />

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

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useI18n } from '@/lib/i18n'
import { getSupabaseClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


type UserRole = 'customer' | 'hotel_owner' | 'admin' | 'support'

function triggerCloudTransition(callback: () => void) {
  const cloudWrap = document.getElementById('cloud-wrap')
  if (cloudWrap) {
    cloudWrap.classList.add('cloud-open')
  }
  // After clouds part, navigate
  setTimeout(() => {
    callback()
  }, 1800)
}

export default function LoginPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [isCheckLogin, setIsCheckLogin] = useState(false)

  const redirectByRole = (role: UserRole, mustChangePassword: boolean) => {
    if (role === 'hotel_owner' && mustChangePassword) {
      triggerCloudTransition(() => router.push('/auth/change-password'))
      return
    }
    if (role === 'admin') triggerCloudTransition(() => router.push('/admin'))
    else if (role === 'support') triggerCloudTransition(() => router.push('/support-dashboard'))
    else if (role === 'hotel_owner') triggerCloudTransition(() => router.push('/hotel-owner'))
    else triggerCloudTransition(() => router.push('/'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const supabase = getSupabaseClient()
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (error) {
          toast.error(error.message)
          return
        }
        const userId = data.user?.id
        if (userId) {
          const { data: profile } = await supabase
            .from('users')
            .select('role, must_change_password')
            .eq('id', userId)
            .single()
          if (profile) {
            toast.success(t('auth.loginSuccess'))
            redirectByRole(profile.role as UserRole, profile.must_change_password ?? false)
          } else {
            toast.success(t('auth.loginSuccess'))
            triggerCloudTransition(() => router.push('/'))
          }
        } else {
          toast.success(t('auth.loginSuccess'))
          triggerCloudTransition(() => router.push('/'))
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800))
        toast.success(t('auth.loginSuccess'))
        triggerCloudTransition(() => router.push('/'))
      }
    } catch {
      toast.error(t('auth.loginError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const supabase = getSupabaseClient()
      if (supabase) {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        if (error) {
          toast.error(error.message)
          return
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800))
        toast.success(t('auth.loginSuccess'))
        triggerCloudTransition(() => router.push('/'))
      }
    } catch {
      toast.error(t('auth.loginError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoHome = () => {
    triggerCloudTransition(() => router.push('/'))
  }

  return (
    <div className="card-enter">
      {/* Login card — glass morphism on sky */}
      {!isCheckLogin ? (
        <>
          <div className="relative rounded-[28px] p-[32px_36px] w-full"
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 32px 80px rgba(0,80,160,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            {/* Logo */}
            <div className="text-center mb-5">
              <span className="logo-float text-[2rem] block mb-1">✈️</span>
              <h1
                className="text-[1.8rem] font-light tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1a1a2e' }}
              >
                Rota<span className="italic" style={{ color: '#c9a84c' }}>ly</span>
              </h1>
            </div>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-10 mb-3 rounded-[12px] font-medium text-gray-700 border-[rgba(90,150,210,0.3)] hover:border-[rgba(90,150,210,0.5)] text-sm"
              style={{
                background: 'rgba(255,255,255,0.55)',
                fontFamily: "'Jost', sans-serif",
              }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('auth.continueWithGoogle')}
            </Button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full opacity-30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-3 text-[0.68rem] tracking-[0.18em] font-medium" style={{ color: 'rgba(30,40,80,0.6)', background: 'transparent' }}>
                  {t('common.or')}
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-[0.68rem] tracking-[0.18em] uppercase font-medium"
                  style={{ color: 'rgba(30,40,80,0.6)' }}
                >
                  {t('auth.email')}
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors" style={{ color: 'rgba(90,100,140,0.45)' }} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@rotaly.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11 h-[40px] rounded-[12px] text-sm"
                    style={{
                      border: '1.5px solid rgba(90,150,210,0.3)',
                      background: 'rgba(255,255,255,0.55)',
                      color: '#1a1a2e',
                      fontFamily: "'Jost', sans-serif",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[0.68rem] tracking-[0.18em] uppercase font-medium"
                    style={{ color: 'rgba(30,40,80,0.6)' }}
                  >
                    {t('auth.password')}
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    style={{ color: '#5aabdf' }}
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(90,100,140,0.45)' }} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 pr-11 h-[40px] rounded-[12px] text-sm"
                    style={{
                      border: '1.5px solid rgba(90,150,210,0.3)',
                      background: 'rgba(255,255,255,0.55)',
                      color: '#1a1a2e',
                      fontFamily: "'Jost', sans-serif",
                    }}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" style={{ color: 'rgba(90,100,140,0.5)' }} />
                    ) : (
                      <Eye className="h-4 w-4" style={{ color: 'rgba(90,100,140,0.5)' }} />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer" style={{ color: 'rgba(30,40,80,0.6)' }}>
                  {t('auth.rememberMe')}
                </Label>
              </div>

              {/* Login button — sky blue gradient */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 border-none rounded-[12px] text-white text-[0.8rem] font-medium tracking-[0.2em] uppercase cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #5aabdf 0%, #2d7fc1 100%)',
                  fontFamily: "'Jost', sans-serif",
                  boxShadow: '0 8px 28px rgba(45,127,193,0.4)',
                }}
              >
                {isLoading ? t('common.loading') : 'Keşfetmeye Başla →'}
              </button>
            </form>

            {/* Go to homepage */}
            <button
              type="button"
              onClick={handleGoHome}
              className="w-full mt-2 py-2.5 border-none rounded-[12px] text-[0.78rem] font-medium tracking-[0.15em] uppercase cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.35)',
                color: 'rgba(30,40,80,0.7)',
                fontFamily: "'Jost', sans-serif",
                backdropFilter: 'blur(10px)',
              }}
            >
              Ana Sayfaya Git
            </button>

            {/* Links */}
            <div className="text-center mt-3 text-[0.75rem]" style={{ color: 'rgba(30,40,80,0.5)' }}>
              {t('auth.noAccount')}{' '}
              <Link href="/auth/register" className="font-medium hover:underline" style={{ color: '#5aabdf' }}>
                {t('common.register')}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <DotLottieReact
            src="https://lottie.host/60353d36-c8f4-4146-a52b-b5851c58577e/7Hs5YEwsTA.lottie"
            loop
            autoplay
          />
        </>
      )}
    </div>
  )
}

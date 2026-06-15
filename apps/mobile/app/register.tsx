import { Fonts } from '@/constants/fonts'
import { useState } from 'react'
import { View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import * as LucideIcons from 'lucide-react-native'
import KoreWordmark from '@/components/atoms/KoreWordmark'
import { GoogleButton, Input, Text } from '@/components/atoms'
import { useForm, Controller } from 'react-hook-form'
import { useSafeAreaInsets }   from 'react-native-safe-area-context'
import { useTranslation }      from 'react-i18next'
import { Link }                from 'expo-router'
import { useThemeColors }      from '@/hooks/useThemeColors'
import { useAuth }             from '@/providers/AuthProvider'
import { useGoogleAuth }       from '@/hooks/useGoogleAuth'
import { colors, spacing, corners, typeScale, lightTheme } from '@kore/tokens'

interface RegisterForm {
  name:            string
  email:           string
  password:        string
  confirmPassword: string
}

const PASSWORD_COMPLEXITY = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/

export default function RegisterScreen() {
  const insets = useSafeAreaInsets()
  const theme  = useThemeColors()
  const { t }  = useTranslation()
  const { register, loginGoogle } = useAuth()
  const { control, handleSubmit, setError, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>()
  const [showPassword, setShowPassword]               = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { loading: googleLoading, signIn: handleGoogleSignIn, isAvailable: googleAvailable } = useGoogleAuth(async idToken => {
    try {
      await loginGoogle(idToken)
    } catch {
      setError('root', { message: t('auth.googleError') })
    }
  })

  const handleGoogle = async () => {
    if (!googleAvailable) {
      setError('root', { message: t('auth.googleUnavailable') })
      return
    }
    try {
      await handleGoogleSignIn()
    } catch {
      setError('root', { message: t('auth.googleError') })
    }
  }

  const onSubmit = async ({ email, password }: RegisterForm) => {
    try {
      await register(email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      const msg  = code === 'auth/email-already-in-use' ? 'Este email ya está registrado' : 'Error al crear la cuenta'
      setError('root', { message: msg })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing.xl, paddingTop: insets.top + spacing.xl }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <KoreWordmark fontSize={40} color={theme.accent} style={{ marginBottom: spacing.l }} />
        <Text variant="h1" style={{ marginBottom: spacing.xs }}>{t('auth.registerTitle')}</Text>
        <Text variant="body-light" color={theme.foregroundSecondary} style={{ marginBottom: spacing['2xl'] }}>
          {t('auth.registerSubtitle')}
        </Text>

        {/* Google */}
        <View style={{ marginBottom: spacing.l }}>
          <GoogleButton onPress={handleGoogle} loading={googleLoading}>
            {t('auth.continueWithGoogle')}
          </GoogleButton>
        </View>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.m, marginBottom: spacing.l }}>
          <View style={{ flex: 1, height: 0.5, backgroundColor: theme.border }} />
          <Text style={{ fontFamily: Fonts.uiSemiBold, fontSize: typeScale.mobile.xs, letterSpacing: 0.8, color: theme.foregroundTertiary, textTransform: 'uppercase' }}>
            {t('auth.orWithEmail')}
          </Text>
          <View style={{ flex: 1, height: 0.5, backgroundColor: theme.border }} />
        </View>

        {/* Form */}
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Campo obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: spacing.m }}>
              <Input
                label={t('auth.name')}
                placeholder="Tu nombre"
                autoCapitalize="words"
                autoComplete="name"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{ required: 'Campo obligatorio', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' } }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: spacing.m }}>
              <Input
                label={t('auth.email')}
                placeholder="tu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required:  'Campo obligatorio',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
            pattern:   { value: PASSWORD_COMPLEXITY, message: t('auth.passwordComplexity') },
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: spacing.m }}>
              <Input
                label={t('auth.password')}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                rightIcon={
                  <Pressable
                    onPress={() => setShowPassword(prev => !prev)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword
                      ? <LucideIcons.EyeOff size={18} color={theme.foregroundTertiary} />
                      : <LucideIcons.Eye size={18} color={theme.foregroundTertiary} />}
                  </Pressable>
                }
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Campo obligatorio',
            validate: value => value === watch('password') || t('auth.passwordsDontMatch'),
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: spacing.m }}>
              <Input
                label={t('auth.confirmPassword')}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                rightIcon={
                  <Pressable
                    onPress={() => setShowConfirmPassword(prev => !prev)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showConfirmPassword
                      ? <LucideIcons.EyeOff size={18} color={theme.foregroundTertiary} />
                      : <LucideIcons.Eye size={18} color={theme.foregroundTertiary} />}
                  </Pressable>
                }
              />
            </View>
          )}
        />

        {errors.root && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s, padding: spacing.m, borderRadius: corners.s, backgroundColor: theme.errorDim, marginBottom: spacing.m }}>
            <LucideIcons.CircleAlert size={16} color={theme.errorFg} />
            <Text style={{ fontFamily: Fonts.uiSemiBold, fontSize: typeScale.mobile.s, color: theme.errorFg, flex: 1 }}>
              {errors.root.message}
            </Text>
          </View>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityLabel={t('auth.register')}
          style={({ pressed }) => ({
            backgroundColor: pressed ? colors.accentDark : colors.accent,
            borderRadius:    corners.full,
            padding:         spacing.l,
            alignItems:      'center',
            minHeight:       48,
            opacity:         isSubmitting ? 0.6 : 1,
            marginBottom:    spacing.xl,
          })}
        >
          <Text style={{ fontFamily: Fonts.uiSemiBold, fontSize: typeScale.mobile.s, letterSpacing: 1, textTransform: 'uppercase', color: lightTheme.foreground.primaryOnAccent }}>
            {isSubmitting ? t('auth.creatingAccount') : t('auth.register')}
          </Text>
        </Pressable>

        <Text variant="body-sm" color={theme.foregroundSecondary} style={{ textAlign: 'center' }}>
          {t('auth.haveAccountPrefix')}{' '}
          <Link href="/login" style={{ color: theme.accent, fontFamily: Fonts.uiSemiBold }}>
            {t('auth.haveAccountAction')}
          </Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

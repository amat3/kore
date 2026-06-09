import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useSafeAreaInsets }   from 'react-native-safe-area-context'
import { Link }                from 'expo-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth }                from '@/lib/firebase'
import { useThemeColors }      from '@/hooks/useThemeColors'
import { useAuth }             from '@/providers/AuthProvider'
import { colors, spacing, corners, typeScale } from '@kore/tokens'

interface LoginForm { email: string; password: string }

export default function LoginScreen() {
  const insets = useSafeAreaInsets()
  const theme  = useThemeColors()
  const { login } = useAuth()
  const { control, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm<LoginForm>()

  const handleForgotPassword = async () => {
    const email = getValues('email')
    if (!email) {
      Alert.alert('Introduce tu email', 'Escribe tu email en el campo de arriba y pulsa "Olvidé mi contraseña".')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      Alert.alert('Email enviado', `Revisa tu bandeja de entrada en ${email}`)
    } catch {
      Alert.alert('Error', 'No hemos encontrado ese email')
    }
  }

  const onSubmit = async ({ email, password }: LoginForm) => {
    try {
      await login(email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      const msg  = code === 'auth/invalid-credential' ? 'Credenciales incorrectas' : 'Error al iniciar sesión'
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
        <Text style={{ fontFamily: 'CormorantGaramond-SemiBold', fontSize: 40, color: theme.foreground, marginBottom: spacing.xs }}>
          KORE
        </Text>
        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: typeScale.mobile.m, color: theme.foregroundSecondary, marginBottom: spacing['2xl'] }}>
          Inicia sesión para continuar
        </Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: 'Campo obligatorio', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' } }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.foregroundTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              style={{
                fontFamily:      'DMSans-Regular',
                fontSize:        typeScale.mobile.m,
                color:           theme.foreground,
                backgroundColor: theme.surfaceLow,
                borderRadius:    corners.m,
                borderWidth:     0.5,
                borderColor:     errors.email ? colors.error : theme.border,
                padding:         spacing.l,
                marginBottom:    spacing.s,
                minHeight:       48,
              }}
            />
          )}
        />
        {errors.email && (
          <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: colors.error, marginBottom: spacing.s }}>
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Campo obligatorio', minLength: { value: 6, message: 'Mínimo 6 caracteres' } }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={theme.foregroundTertiary}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              style={{
                fontFamily:      'DMSans-Regular',
                fontSize:        typeScale.mobile.m,
                color:           theme.foreground,
                backgroundColor: theme.surfaceLow,
                borderRadius:    corners.m,
                borderWidth:     0.5,
                borderColor:     errors.password ? colors.error : theme.border,
                padding:         spacing.l,
                marginBottom:    spacing.m,
                minHeight:       48,
              }}
            />
          )}
        />
        {errors.password && (
          <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: colors.error, marginBottom: spacing.s }}>
            {errors.password.message}
          </Text>
        )}

        {errors.root && (
          <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: colors.error, marginBottom: spacing.m }}>
            {errors.root.message}
          </Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityLabel="Iniciar sesión"
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
          <Text style={{ fontFamily: 'DMSans-Regular', fontWeight: '600', fontSize: typeScale.mobile.m, color: '#FFFFFF' }}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleForgotPassword}
          accessibilityRole="button"
          accessibilityLabel="Olvidé mi contraseña"
          style={{ alignItems: 'center', marginBottom: spacing.m, minHeight: 44, justifyContent: 'center' }}
        >
          <Text style={{ fontFamily: 'DMSans-Regular', fontSize: typeScale.mobile.s, color: theme.foregroundTertiary }}>
            Olvidé mi contraseña
          </Text>
        </Pressable>

        <Link href="/register" style={{ textAlign: 'center', fontFamily: 'DMSans-Regular', fontSize: typeScale.mobile.s, color: theme.foregroundSecondary }}>
          ¿No tienes cuenta? Regístrate
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

import { Fonts } from '@/constants/fonts'
import { Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import KoreWordmark from '@/components/atoms/KoreWordmark'
import { useForm, Controller } from 'react-hook-form'
import { useSafeAreaInsets }   from 'react-native-safe-area-context'
import { Link }                from 'expo-router'
import { useThemeColors }      from '@/hooks/useThemeColors'
import { useAuth }             from '@/providers/AuthProvider'
import { colors, spacing, corners, typeScale } from '@kore/tokens'

interface RegisterForm { name: string; email: string; password: string }

export default function RegisterScreen() {
  const insets = useSafeAreaInsets()
  const theme  = useThemeColors()
  const { register } = useAuth()
  const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterForm>()

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
        <KoreWordmark fontSize={40} color={theme.foreground} style={{ marginBottom: spacing.xs }} />
        <Text style={{ fontFamily: Fonts.uiRegular, fontSize: typeScale.mobile.m, color: theme.foregroundSecondary, marginBottom: spacing['2xl'] }}>
          Crea tu cuenta
        </Text>

        {(['name', 'email', 'password'] as const).map(field => (
          <Controller
            key={field}
            control={control}
            name={field}
            rules={{
              required: 'Campo obligatorio',
              ...(field === 'email'    && { pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' } }),
              ...(field === 'password' && { minLength: { value: 6, message: 'Mínimo 6 caracteres' } }),
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder={field === 'name' ? 'Nombre' : field === 'email' ? 'Email' : 'Contraseña'}
                  placeholderTextColor={theme.foregroundTertiary}
                  keyboardType={field === 'email' ? 'email-address' : 'default'}
                  autoCapitalize={field === 'name' ? 'words' : 'none'}
                  secureTextEntry={field === 'password'}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    fontFamily:      Fonts.uiRegular,
                    fontSize:        typeScale.mobile.m,
                    color:           theme.foreground,
                    backgroundColor: theme.surfaceLow,
                    borderRadius:    corners.m,
                    borderWidth:     0.5,
                    borderColor:     errors[field] ? colors.error : theme.border,
                    padding:         spacing.l,
                    marginBottom:    spacing.s,
                    minHeight:       48,
                  }}
                />
                {errors[field] && (
                  <Text style={{ fontFamily: Fonts.uiRegular, fontSize: 12, color: colors.error, marginBottom: spacing.s }}>
                    {errors[field]?.message}
                  </Text>
                )}
              </>
            )}
          />
        ))}

        {errors.root && (
          <Text style={{ fontFamily: Fonts.uiRegular, fontSize: 12, color: colors.error, marginBottom: spacing.m }}>
            {errors.root.message}
          </Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityLabel="Crear cuenta"
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
          <Text style={{ fontFamily: Fonts.uiSemiBold, fontSize: typeScale.mobile.m, color: '#FFFFFF' }}>
            {isSubmitting ? 'Creando...' : 'Crear cuenta'}
          </Text>
        </Pressable>

        <Link href="/login" style={{ textAlign: 'center', fontFamily: Fonts.uiRegular, fontSize: typeScale.mobile.s, color: theme.foregroundSecondary }}>
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

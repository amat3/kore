import * as LucideIcons from 'lucide-react-native'
import { useThemeColors } from '@/hooks/useThemeColors'

type LucideKeys = keyof typeof LucideIcons

// Solo los iconos que son componentes SVG (descartar constantes no-componente)
export type IconName = LucideKeys

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps {
  name:   IconName
  size?:  IconSize | number
  color?: string
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export const Icon = ({ name, size = 'md', color }: IconProps) => {
  const theme      = useThemeColors()
  const LucideIcon = LucideIcons[name] as React.ComponentType<{ size: number; color: string }>
  const px         = typeof size === 'number' ? size : sizeMap[size]
  return <LucideIcon size={px} color={color ?? theme.foreground} />
}

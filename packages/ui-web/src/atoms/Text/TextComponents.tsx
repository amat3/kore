/**
 * Componentes nombrados — patrón createTypoComponent adaptado a KORE.
 * Usa Text directamente si necesitas más control sobre variant y as.
 */
import Text, { TextProps } from './Text'

type TextBaseProps = Omit<TextProps, 'variant'>

export const Display  = (props: TextBaseProps) => <Text variant="display"  {...props} />
export const Heading1 = (props: TextBaseProps) => <Text variant="h1"       {...props} />
export const Heading2 = (props: TextBaseProps) => <Text variant="h2"       {...props} />
export const Heading3 = (props: TextBaseProps) => <Text variant="h3"       {...props} />
export const Overline = (props: TextBaseProps) => <Text variant="overline" {...props} />
export const Body     = (props: TextBaseProps) => <Text variant="body"     {...props} />
export const BodySm   = (props: TextBaseProps) => <Text variant="body-sm"  {...props} />
export const Caption  = (props: TextBaseProps) => <Text variant="caption"  {...props} />

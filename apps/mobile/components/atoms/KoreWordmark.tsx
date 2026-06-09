import { View, Text, type ViewStyle } from 'react-native'
import { Fonts }                       from '@/constants/fonts'

interface KoreWordmarkProps {
  fontSize?: number
  color?:    string
  style?:    ViewStyle
}

const KoreWordmark = ({
  fontSize = 40,
  color    = '#B05E3A',
  style,
}: KoreWordmarkProps) => (
  <View style={[{ flexDirection: 'row', alignItems: 'baseline' }, style]}>
    {'KORE'.split('').map((letter, i) => (
      <Text
        key={i}
        style={{
          fontFamily: Fonts.displaySemiBold,
          fontSize,
          color,
          lineHeight: fontSize * 0.9,
          includeFontPadding: false,
        }}
        aria-hidden={i > 0}
      >
        {letter}
      </Text>
    ))}
  </View>
)

export default KoreWordmark

import { View, Text, Pressable, ScrollView }       from 'react-native'
import * as LucideIcons                            from 'lucide-react-native'
import { spacing, corners, typeScale, letterSpacing } from '@kore/tokens'
import { Fonts }                                   from '@/constants/fonts'
import { useThemeColors }                          from '@/hooks/useThemeColors'
import { Input }                                   from '@/components/atoms'

export interface FilterItem {
  id:        string
  label:     string
  selected?: boolean
}

export interface FilterBarProps {
  filters:            FilterItem[]
  onFilterToggle?:    (id: string) => void
  onSearch?:          (value: string) => void
  searchValue?:       string
  searchPlaceholder?: string
  hideSearch?:        boolean
  hideTags?:          boolean
}

const FilterBar = ({
  filters,
  onFilterToggle,
  onSearch,
  searchValue       = '',
  searchPlaceholder = 'Buscar...',
  hideSearch        = false,
  hideTags          = false,
}: FilterBarProps) => {
  const theme = useThemeColors()

  return (
    <View style={{ gap: spacing.m }}>
      {!hideSearch && (
        <Input
          value={searchValue}
          onChangeText={onSearch}
          placeholder={searchPlaceholder}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Buscar entrenamientos"
          leftIcon={<LucideIcons.Search size={16} color={theme.foregroundTertiary} />}
          clearable
          onClear={() => onSearch?.('')}
        />
      )}

      {!hideTags && filters.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.s }}
        >
          {filters.map(filter => (
            <Pressable
              key={filter.id}
              onPress={() => onFilterToggle?.(filter.id)}
              accessibilityRole="button"
              accessibilityLabel={`${filter.selected ? 'Quitar' : 'Aplicar'} filtro: ${filter.label}`}
            >
              <View style={{
                height:            24,
                paddingHorizontal: spacing.xs,
                borderRadius:      corners.xs,
                borderWidth:       1.5,
                borderColor:       filter.selected ? theme.strokeAccent : theme.border,
                backgroundColor:   filter.selected ? theme.accentLight  : theme.backgroundSolid,
                alignItems:        'center',
                justifyContent:    'center',
              }}>
                <Text style={{
                  fontFamily:    Fonts.uiSemiBold,
                  fontSize:      typeScale.mobile.xs,
                  letterSpacing: letterSpacing.spacious,
                  textTransform: 'uppercase',
                  color:         filter.selected ? theme.accentDarkOnSurface : theme.foregroundSecondary,
                }}>
                  {filter.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default FilterBar

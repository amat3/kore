import { View, TextInput, Pressable, ScrollView } from 'react-native'
import styled                                      from '@emotion/native'
import * as LucideIcons                            from 'lucide-react-native'
import { colors, spacing, corners, typeScale }     from '@kore/tokens'
import { Fonts }                                   from '@/constants/fonts'
import { useThemeColors }                          from '@/hooks/useThemeColors'

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
        <SearchWrapper $borderColor={theme.border} $bg={theme.backgroundCard}>
          <LucideIcons.Search size={16} color={theme.foregroundTertiary} />
          <SearchInput
            value={searchValue}
            onChangeText={onSearch}
            placeholder={searchPlaceholder}
            placeholderTextColor={theme.foregroundTertiary}
            $color={theme.foreground}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Buscar entrenamientos"
          />
          {searchValue.length > 0 && (
            <Pressable
              onPress={() => onSearch?.('')}
              accessibilityRole="button"
              accessibilityLabel="Limpiar búsqueda"
              hitSlop={8}
            >
              <LucideIcons.X size={14} color={theme.foregroundTertiary} />
            </Pressable>
          )}
        </SearchWrapper>
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
              <TagChip $selected={!!filter.selected} $accent={colors.accent} $border={theme.border}>
                <TagLabel $selected={!!filter.selected} $accent={colors.accent} $fg={theme.foregroundSecondary}>
                  {filter.label}
                </TagLabel>
              </TagChip>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const SearchWrapper = styled.View<{ $borderColor: string; $bg: string }>`
  flex-direction:     row;
  align-items:        center;
  gap:                ${spacing.s}px;
  padding-vertical:   ${spacing.s}px;
  padding-horizontal: ${spacing.m}px;
  border-radius:      ${corners.m}px;
  border-width:       0.5px;
  border-color:       ${({ $borderColor }) => $borderColor};
  background-color:   ${({ $bg }) => $bg};
`

const SearchInput = styled.TextInput<{ $color: string }>`
  flex:        1;
  font-family: ${Fonts.uiRegular};
  font-size:   ${typeScale.mobile.m}px;
  color:       ${({ $color }) => $color};
  padding:     0;
`

const TagChip = styled.View<{ $selected: boolean; $accent: string; $border: string }>`
  padding-vertical:   ${spacing.xs}px;
  padding-horizontal: ${spacing.m}px;
  border-radius:      ${corners.xl}px;
  border-width:       0.5px;
  border-color:       ${({ $selected, $accent, $border }) => $selected ? $accent : $border};
  background-color:   ${({ $selected, $accent }) => $selected ? `${$accent}1A` : 'transparent'};
`

const TagLabel = styled.Text<{ $selected: boolean; $accent: string; $fg: string }>`
  font-family: ${Fonts.uiRegular};
  font-size:   ${typeScale.mobile.s}px;
  color:       ${({ $selected, $accent, $fg }) => $selected ? $accent : $fg};
`

export default FilterBar

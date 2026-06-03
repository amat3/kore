// ── Atoms: Text ───────────────────────────────────────────────────────────
export { Text }                          from './atoms/Text'
export type { TextProps, TextVariant }   from './atoms/Text'

export {
  Display,
  Heading1,
  Heading2,
  Heading3,
  Overline,
  Body,
  BodyLight,
  BodySm,
  Caption,
} from './atoms/Text/TextComponents'

// ── Atoms: Button ─────────────────────────────────────────────────────────
export { default as Button }           from './atoms/Button/Button'
export type { ButtonProps } from './atoms/Button/Button'

// ── Atoms: Spinner ────────────────────────────────────────────────────────
export { Spinner }          from './atoms/Spinner/Spinner'

// ── Atoms: Badge ──────────────────────────────────────────────────────────
export { default as Badge }          from './atoms/Badge/Badge'
export type { BadgeProps } from './atoms/Badge/Badge'

// ── Atoms: Icon ───────────────────────────────────────────────────────────
export { default as Icon }          from './atoms/Icon/Icon'
export type { IconProps, IconName } from './atoms/Icon/Icon'
export type { IconSize, IconColor } from './atoms/Icon/Icon.styles'

// ── Atoms: Input ──────────────────────────────────────────────────────────
export { default as Input }           from './atoms/Input/Input'
export type { InputProps } from './atoms/Input/Input'
export type { InputState, InputSize }          from './atoms/Input/Input.styles'

// ── Atoms: SearchInput ────────────────────────────────────────────────────
export { default as SearchInput }        from './atoms/SearchInput/SearchInput'
export type { SearchInputProps }         from './atoms/SearchInput/SearchInput'

// ── Atoms: Tag ────────────────────────────────────────────────────────────
export { default as Tag, TagGroup }     from './atoms/Tag/Tag'
export type { TagProps, TagGroupProps } from './atoms/Tag/Tag'
export type { TagVariant, TagSize }     from './atoms/Tag/Tag.styles'

// ── Atoms: Avatar ─────────────────────────────────────────────────────────
export { default as Avatar, AvatarGroup }     from './atoms/Avatar/Avatar'
export type { AvatarProps, AvatarGroupProps } from './atoms/Avatar/Avatar'
export type { AvatarSize, DotStatus }         from './atoms/Avatar/Avatar.styles'

// ── Atoms: Card ───────────────────────────────────────────────────────────
export { default as Card }   from './atoms/Card/Card'
export type { CardProps }    from './atoms/Card/Card'

// ── Atoms: LottieIcon ─────────────────────────────────────────────────────
export { default as LottieIcon }   from './atoms/LottieIcon/LottieIcon'
export type { LottieIconProps }    from './atoms/LottieIcon/LottieIcon'

// ── Atoms: StatCard ───────────────────────────────────────────────────────
export { default as StatCard }          from './atoms/StatCard/StatCard'
export type { StatCardProps, StatTrend } from './atoms/StatCard/StatCard'

// ── Molecules: WorkoutCard ────────────────────────────────────────────────
export { default as WorkoutCard }                from './molecules/WorkoutCard/WorkoutCard'
export type { WorkoutCardProps, WorkoutLevel }   from './molecules/WorkoutCard/WorkoutCard'

// ── Molecules: FilterBar ──────────────────────────────────────────────────
export { default as FilterBar }                  from './molecules/FilterBar/FilterBar'
export type { FilterBarProps, FilterItem }       from './molecules/FilterBar/FilterBar'

// ── Molecules: StreakBadge ────────────────────────────────────────────────
export { default as StreakBadge }              from './molecules/StreakBadge/StreakBadge'
export type { StreakBadgeProps, StreakVariant } from './molecules/StreakBadge/StreakBadge'

// ── Molecules: NavBar ─────────────────────────────────────────────────────
export { default as NavBar }         from './molecules/NavBar/NavBar'
export type { NavBarProps, NavItem } from './molecules/NavBar/NavBar'

import React$1 from 'react';
import * as _emotion_utils from '@emotion/utils';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { icons } from 'lucide-react';

declare const variantStyles$3: {
    readonly display: _emotion_utils.SerializedStyles;
    readonly h1: _emotion_utils.SerializedStyles;
    readonly h2: _emotion_utils.SerializedStyles;
    readonly h3: _emotion_utils.SerializedStyles;
    readonly overline: _emotion_utils.SerializedStyles;
    readonly body: _emotion_utils.SerializedStyles;
    readonly 'body-light': _emotion_utils.SerializedStyles;
    readonly 'body-sm': _emotion_utils.SerializedStyles;
    readonly caption: _emotion_utils.SerializedStyles;
    readonly button: _emotion_utils.SerializedStyles;
};
type TextVariant = keyof typeof variantStyles$3;

/**
 * @kore/ui-web — Text
 *
 * Átomo tipográfico base de KORE.
 * Usa CSS vars de @kore/tokens para todos los valores visuales.
 *
 * @example
 * <Text variant="h1">Entrena sin límites</Text>
 * <Text variant="overline" as="span">Fuerza · 45 min</Text>
 * <Text variant="body" as="p">Descripción del entrenamiento</Text>
 */

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'li' | 'strong' | 'em';
interface TextProps {
    /** Rol semántico visual — mapea a typeRoles de @kore/tokens */
    variant?: TextVariant;
    /** Elemento HTML renderizado. Por defecto se infiere del variant */
    as?: TextTag;
    children: React$1.ReactNode;
    className?: string;
    /** Heredar el color del padre en lugar de usar el token */
    inheritColor?: boolean;
}
declare const Text: React$1.ForwardRefExoticComponent<TextProps & React$1.RefAttributes<HTMLElement>>;

type TextBaseProps = Omit<TextProps, 'variant'>;
declare const Display: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const Heading1: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const Heading2: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const Heading3: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const Overline: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const Body: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const BodyLight: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const BodySm: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;
declare const Caption: (props: TextBaseProps) => react_jsx_runtime.JSX.Element;

declare const variantStyles$2: {
    readonly solid: _emotion_utils.SerializedStyles;
    readonly outlined: _emotion_utils.SerializedStyles;
    readonly ghost: _emotion_utils.SerializedStyles;
};
declare const sizeStyles$4: {
    readonly sm: _emotion_utils.SerializedStyles;
    readonly md: _emotion_utils.SerializedStyles;
    readonly lg: _emotion_utils.SerializedStyles;
};
type ButtonVariant = keyof typeof variantStyles$2;
type ButtonSize = keyof typeof sizeStyles$4;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    width?: 'hug' | 'full';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    /** Solo icono — requiere aria-label obligatorio */
    iconOnly?: boolean;
    /** Renderizar como <a> para links */
    as?: 'button' | 'a';
    href?: string;
}
declare const Button: ({ variant, size, width, isLoading, leftIcon, rightIcon, iconOnly, disabled, children, type, ...props }: ButtonProps) => react_jsx_runtime.JSX.Element;

declare const Spinner: ({ size }: {
    size?: "sm" | "md";
}) => react_jsx_runtime.JSX.Element;

declare const variantStyles$1: {
    readonly default: _emotion_utils.SerializedStyles;
    readonly accent: _emotion_utils.SerializedStyles;
    readonly success: _emotion_utils.SerializedStyles;
    readonly error: _emotion_utils.SerializedStyles;
    readonly warning: _emotion_utils.SerializedStyles;
    readonly solid: _emotion_utils.SerializedStyles;
};
declare const sizeStyles$3: {
    readonly sm: _emotion_utils.SerializedStyles;
    readonly md: _emotion_utils.SerializedStyles;
};
type BadgeVariant = keyof typeof variantStyles$1;
type BadgeSize = keyof typeof sizeStyles$3;

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    /** Icono a la izquierda del texto */
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
declare const Badge: ({ variant, size, icon, children, className, }: BadgeProps) => react_jsx_runtime.JSX.Element;

declare const iconSizes: {
    readonly xs: 12;
    readonly sm: 16;
    readonly md: 20;
    readonly lg: 24;
    readonly xl: 32;
};
declare const iconColors: {
    readonly default: "var(--foreground-primary-on-surface)";
    readonly muted: "var(--foreground-secondary-on-surface)";
    readonly accent: "var(--foreground-accent-on-surface)";
    readonly success: "var(--foreground-success-on-surface)";
    readonly error: "var(--foreground-error-on-surface)";
    readonly inherit: "currentColor";
};
type IconSize = keyof typeof iconSizes;
type IconColor = keyof typeof iconColors;

type IconName = keyof typeof icons;
interface IconProps {
    /** Nombre del icono de Lucide (PascalCase). Ej: "Dumbbell", "ChevronRight" */
    name: IconName;
    size?: IconSize;
    color?: IconColor;
    className?: string;
    /** Requerido si el icono NO es decorativo */
    'aria-label'?: string;
    /** Usar cuando el icono es puramente decorativo */
    'aria-hidden'?: boolean | 'true' | 'false';
    strokeWidth?: number;
}
declare const Icon: ({ name, size, color, className, strokeWidth, ...ariaProps }: IconProps) => react_jsx_runtime.JSX.Element | null;

declare const stateStyles: {
    readonly default: _emotion_utils.SerializedStyles;
    readonly error: _emotion_utils.SerializedStyles;
    readonly success: _emotion_utils.SerializedStyles;
    readonly disabled: _emotion_utils.SerializedStyles;
};
declare const sizeStyles$2: {
    readonly sm: _emotion_utils.SerializedStyles;
    readonly md: _emotion_utils.SerializedStyles;
    readonly lg: _emotion_utils.SerializedStyles;
};
type InputState = keyof typeof stateStyles;
type InputSize = keyof typeof sizeStyles$2;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    state?: InputState;
    size?: InputSize;
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    fullWidth?: boolean;
}
declare const Input: ({ state, size, label, helperText, errorText, successText, leftIcon, rightIcon, clearable, onClear, fullWidth, disabled, id, value, defaultValue, onChange, ...props }: InputProps) => react_jsx_runtime.JSX.Element;

interface SearchInputProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    onSearch?: (value: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    className?: string;
    autoFocus?: boolean;
}
declare const SearchInput: ({ onSearch, onClear, onChange, size, fullWidth, ...props }: SearchInputProps) => react_jsx_runtime.JSX.Element;

declare const variantStyles: {
    readonly default: _emotion_utils.SerializedStyles;
    readonly selected: _emotion_utils.SerializedStyles;
    readonly solid: _emotion_utils.SerializedStyles;
};
declare const sizeStyles$1: {
    readonly sm: _emotion_utils.SerializedStyles;
    readonly md: _emotion_utils.SerializedStyles;
    readonly lg: _emotion_utils.SerializedStyles;
};
type TagVariant = keyof typeof variantStyles;
type TagSize = keyof typeof sizeStyles$1;

interface TagProps {
    variant?: TagVariant;
    size?: TagSize;
    /** Icono a la izquierda */
    icon?: React.ReactNode;
    children: React.ReactNode;
    /** Muestra botón para eliminar el tag */
    dismissible?: boolean;
    /** Callback al pulsar el dismiss */
    onDismiss?: (e: React.MouseEvent) => void;
    /** Callback al pulsar el tag */
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    className?: string;
    /** Para accesibilidad — describe la acción del tag */
    'aria-label'?: string;
}
interface TagGroupProps {
    tags: {
        id: string;
        label: string;
        selected?: boolean;
        icon?: React.ReactNode;
    }[];
    onToggle?: (id: string) => void;
    size?: TagSize;
    className?: string;
}
declare const Tag: ({ variant, size, icon, children, dismissible, onDismiss, onClick, disabled, className, "aria-label": ariaLabel, }: TagProps) => react_jsx_runtime.JSX.Element;
declare const TagGroup: ({ tags, onToggle, size, className }: TagGroupProps) => react_jsx_runtime.JSX.Element;

declare const sizeStyles: {
    readonly xs: _emotion_utils.SerializedStyles;
    readonly sm: _emotion_utils.SerializedStyles;
    readonly md: _emotion_utils.SerializedStyles;
    readonly lg: _emotion_utils.SerializedStyles;
    readonly xl: _emotion_utils.SerializedStyles;
    readonly '2xl': _emotion_utils.SerializedStyles;
};
declare const dotColorStyles: {
    readonly online: _emotion_utils.SerializedStyles;
    readonly offline: _emotion_utils.SerializedStyles;
    readonly busy: _emotion_utils.SerializedStyles;
    readonly away: _emotion_utils.SerializedStyles;
};
type AvatarSize = keyof typeof sizeStyles;
type DotStatus = keyof typeof dotColorStyles;

interface AvatarProps {
    /** Nombre del usuario — usado para iniciales y accesibilidad */
    name: string;
    /** URL de la imagen de perfil */
    src?: string;
    size?: AvatarSize;
    /** Indicador de estado online/offline/busy/away */
    status?: DotStatus;
    /** Borde de color alrededor (para avatar destacado) */
    ring?: boolean;
    className?: string;
}
interface AvatarGroupProps {
    users: {
        name: string;
        src?: string;
    }[];
    /** Máximo de avatares visibles antes del contador */
    max?: number;
    size?: AvatarSize;
    className?: string;
}
declare const Avatar: ({ name, src, size, status, ring, className, }: AvatarProps) => react_jsx_runtime.JSX.Element;
declare const AvatarGroup: ({ users, max, size, className, }: AvatarGroupProps) => react_jsx_runtime.JSX.Element;

interface CardProps {
    children: React.ReactNode;
    /** Activa hover, tap feedback y cursor pointer */
    interactive?: boolean;
    onClick?: () => void;
    className?: string;
    /** Para accesibilidad — describe el contenido */
    'aria-label'?: string;
    role?: string;
}
declare const Card: ({ children, interactive, onClick, className, ...ariaProps }: CardProps) => react_jsx_runtime.JSX.Element;

type StatTrend = 'up' | 'down' | 'neutral';
interface StatCardProps {
    /** Valor principal — número o texto */
    value: string | number;
    /** Etiqueta descriptiva */
    label: string;
    /** Icono decorativo (usa <Icon name="..." />) */
    icon?: React.ReactNode;
    /** Dirección del cambio respecto al periodo anterior */
    trend?: StatTrend;
    /** Texto del cambio — p. ej. "+12%" o "3 más" */
    trendValue?: string;
    className?: string;
}
declare const StatCard: ({ value, label, icon, trend, trendValue, className, }: StatCardProps) => react_jsx_runtime.JSX.Element;

type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';
interface WorkoutCardProps {
    title: string;
    category: string;
    duration: number;
    level?: WorkoutLevel;
    imageSrc?: string;
    imageAlt?: string;
    onClick?: () => void;
    onFavorite?: () => void;
    completed?: boolean;
    favorited?: boolean;
    className?: string;
}
declare const WorkoutCard: ({ title, category, duration, level, imageSrc, imageAlt, onClick, onFavorite, completed, favorited, className, }: WorkoutCardProps) => react_jsx_runtime.JSX.Element;

interface FilterItem {
    id: string;
    label: string;
    selected?: boolean;
    icon?: React.ReactNode;
}
interface FilterBarProps {
    /** Lista de filtros */
    filters: FilterItem[];
    /** Callback al toglear un filtro */
    onFilterToggle?: (id: string) => void;
    /** Callback de búsqueda — se dispara en Enter y al limpiar */
    onSearch?: (value: string) => void;
    /** Valor controlado del search */
    searchValue?: string;
    searchPlaceholder?: string;
    /** Ocultar el SearchInput */
    hideSearch?: boolean;
    /** Ocultar los Tags */
    hideTags?: boolean;
    /**
     * stacked  → search arriba, tags abajo (default)
     * inline   → search a la izquierda, tags a la derecha (solo desktop)
     */
    layout?: 'stacked' | 'inline';
    className?: string;
}
declare const FilterBar: ({ filters, onFilterToggle, onSearch, searchValue, searchPlaceholder, hideSearch, hideTags, layout, className, }: FilterBarProps) => react_jsx_runtime.JSX.Element;

type StreakVariant = 'active' | 'inactive' | 'record';
interface StreakBadgeProps {
    /** Número de días de racha */
    count: number;
    variant?: StreakVariant;
    /** Texto bajo el contador. Por defecto "días" */
    label?: string;
    /** Tamaño del badge */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
declare const StreakBadge: ({ count, variant, label, size, className, }: StreakBadgeProps) => react_jsx_runtime.JSX.Element;

interface NavItem {
    id: string;
    label: string;
    icon: IconName;
    iconActive?: IconName;
}
interface NavBarProps {
    /** ID del item activo */
    activeId?: string;
    /** Items personalizados — por defecto usa los 4 de KORE */
    items?: NavItem[];
    /** Callback al pulsar un item */
    onNavigate?: (id: string) => void;
    /** Logo para el desktop — por defecto "KORE" en tipografía display */
    logo?: React.ReactNode;
    className?: string;
}
declare const NavBar: ({ activeId, items, onNavigate, logo, className, }: NavBarProps) => react_jsx_runtime.JSX.Element;

export { Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarSize, Badge, type BadgeProps, Body, BodyLight, BodySm, Button, type ButtonProps, Caption, Card, type CardProps, Display, type DotStatus, FilterBar, type FilterBarProps, type FilterItem, Heading1, Heading2, Heading3, Icon, type IconColor, type IconName, type IconProps, type IconSize, Input, type InputProps, type InputSize, type InputState, NavBar, type NavBarProps, type NavItem, Overline, SearchInput, type SearchInputProps, Spinner, StatCard, type StatCardProps, type StatTrend, StreakBadge, type StreakBadgeProps, type StreakVariant, Tag, TagGroup, type TagGroupProps, type TagProps, type TagSize, type TagVariant, Text, type TextProps, type TextVariant, WorkoutCard, type WorkoutCardProps, type WorkoutLevel };

"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Avatar: () => Avatar_default,
  AvatarGroup: () => AvatarGroup,
  Badge: () => Badge_default,
  Body: () => Body,
  BodyLight: () => BodyLight,
  BodySm: () => BodySm,
  Button: () => Button_default,
  Caption: () => Caption,
  Card: () => Card_default,
  Display: () => Display,
  FilterBar: () => FilterBar_default,
  Heading1: () => Heading1,
  Heading2: () => Heading2,
  Heading3: () => Heading3,
  Icon: () => Icon_default,
  Input: () => Input_default,
  NavBar: () => NavBar_default,
  Overline: () => Overline,
  SearchInput: () => SearchInput_default,
  Spinner: () => Spinner,
  StatCard: () => StatCard_default,
  StreakBadge: () => StreakBadge_default,
  Tag: () => Tag_default,
  TagGroup: () => TagGroup,
  Text: () => Text_default,
  WorkoutCard: () => WorkoutCard_default
});
module.exports = __toCommonJS(index_exports);

// src/atoms/Text/Text.tsx
var import_react2 = __toESM(require("react"));
var import_styled = __toESM(require("@emotion/styled"));

// src/atoms/Text/Text.styles.ts
var import_react = require("@emotion/react");
var baseTextStyles = import_react.css`
  margin:  0;
  padding: 0;
  color:   var(--foreground-primary-on-surface);
`;
var variantStyles = {
  display: import_react.css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-5xl);
    line-height:     var(--line-height-very-dense);
    letter-spacing:  var(--letter-spacing-very-dense);
  `,
  h1: import_react.css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-4xl);
    line-height:     var(--line-height-dense);
    letter-spacing:  var(--letter-spacing-dense);
  `,
  h2: import_react.css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-3xl);
    line-height:     var(--line-height-dense);
    letter-spacing:  var(--letter-spacing-dense);
  `,
  h3: import_react.css`
    font-family:     var(--font-family-display);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-2xl);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-moderate);
  `,
  overline: import_react.css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-xs);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-wide);
    text-transform:  uppercase;
    color:           var(--foreground-accent-on-surface);
  `,
  body: import_react.css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-regular);
    font-size:       var(--scale-m);
    line-height:     var(--line-height-spacious);
    letter-spacing:  var(--letter-spacing-moderate);
  `,
  "body-light": import_react.css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-m);
    line-height:     var(--line-height-spacious);
    letter-spacing:  var(--letter-spacing-moderate);
  `,
  "body-sm": import_react.css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-regular);
    font-size:       var(--scale-s);
    line-height:     var(--line-height-spacious);
    letter-spacing:  var(--letter-spacing-moderate);
  `,
  caption: import_react.css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-light);
    font-size:       var(--scale-xs);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-moderate);
    color:           var(--foreground-secondary-on-surface);
  `,
  button: import_react.css`
    font-family:     var(--font-family-ui);
    font-weight:     var(--font-weight-semibold);
    font-size:       var(--scale-s);
    line-height:     var(--line-height-moderate);
    letter-spacing:  var(--letter-spacing-spacious);
    text-transform:  uppercase;
  `
};

// src/atoms/Text/Text.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var defaultTag = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  overline: "span",
  body: "p",
  "body-light": "p",
  "body-sm": "p",
  caption: "span",
  button: "span"
};
var Text = import_react2.default.forwardRef(({
  variant = "body",
  as,
  children,
  className,
  inheritColor = false
}, ref) => {
  const tag = as ?? defaultTag[variant];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    TextStyled,
    {
      ref,
      as: tag,
      $variant: variant,
      $inheritColor: inheritColor,
      className,
      children
    }
  );
});
Text.displayName = "Text";
var TextStyled = import_styled.default.p`
  ${baseTextStyles}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $inheritColor }) => $inheritColor && "color: inherit;"}
`;
var Text_default = Text;

// src/atoms/Text/TextComponents.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Display = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "display", ...props });
var Heading1 = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "h1", ...props });
var Heading2 = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "h2", ...props });
var Heading3 = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "h3", ...props });
var Overline = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "overline", ...props });
var Body = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "body", ...props });
var BodyLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "body-light", ...props });
var BodySm = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "body-sm", ...props });
var Caption = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Text_default, { variant: "caption", ...props });

// src/atoms/Button/Button.tsx
var import_styled3 = __toESM(require("@emotion/styled"));

// src/atoms/Spinner/Spinner.tsx
var import_styled2 = __toESM(require("@emotion/styled"));
var import_react3 = require("@emotion/react");

// src/atoms/Icon/Icon.tsx
var import_lucide_react = require("lucide-react");

// src/atoms/Icon/Icon.styles.ts
var iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};
var iconColors = {
  default: "var(--foreground-primary-on-surface)",
  muted: "var(--foreground-secondary-on-surface)",
  accent: "var(--foreground-accent-on-surface)",
  success: "var(--foreground-success-on-surface)",
  error: "var(--foreground-error-on-surface)",
  inherit: "currentColor"
};

// src/atoms/Icon/Icon.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Icon = ({
  name,
  size = "md",
  color = "default",
  className,
  strokeWidth = 1.5,
  ...ariaProps
}) => {
  const LucideIcon = import_lucide_react.icons[name];
  if (!LucideIcon) {
    console.warn(`@kore/ui-web Icon: "${name}" no existe en Lucide.`);
    return null;
  }
  const px = iconSizes[size];
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    LucideIcon,
    {
      width: px,
      height: px,
      color: iconColors[color],
      strokeWidth,
      className,
      style: { flexShrink: 0, display: "inline-block" },
      ...ariaProps
    }
  );
};
var Icon_default = Icon;

// src/atoms/Spinner/Spinner.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var spin = import_react3.keyframes`
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
`;
var sizes = { sm: 14, md: 18 };
var Spinner = ({ size = "md" }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SpinnerWrapper, { $size: sizes[size], "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon_default, { name: "Loader", size: size === "sm" ? "xs" : "sm", color: "inherit" }) });
var SpinnerWrapper = import_styled2.default.span`
  display:    inline-flex;
  align-items: center;
  justify-content: center;
  width:      ${({ $size }) => $size}px;
  height:     ${({ $size }) => $size}px;
  animation:  ${spin} 600ms linear infinite;
  flex-shrink: 0;
  color:      currentColor;
`;

// src/atoms/Button/Button.styles.ts
var import_react4 = require("@emotion/react");
var variantStyles2 = {
  solid: import_react4.css`
    background-color: var(--background-accent-solid);
    color:            var(--foreground-primary-on-accent);
    border:           2px solid transparent;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 12%);
    }
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 20%);
    }
  `,
  outlined: import_react4.css`
    background-color: transparent;
    color:            var(--foreground-accent-on-surface);
    border:           2px solid var(--stroke-accent);

    &:hover:not(:disabled) {
      background-color: var(--background-accent-dim);
    }
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-dim), var(--background-accent-solid) 20%);
    }
  `,
  ghost: import_react4.css`
    background-color: transparent;
    color:            var(--foreground-accent-on-surface);
    border:           2px solid transparent;

    &:hover:not(:disabled) {
      background-color: var(--background-accent-dim);
    }
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--background-accent-dim), var(--background-accent-solid) 15%);
    }
  `
};
var sizeStyles = {
  sm: import_react4.css`
    height:          var(--sizing-xl);       /* 32px */
    padding-inline:  var(--spacing-m);
    font-size:       var(--scale-xs);
    gap:             var(--spacing-2xs);
  `,
  md: import_react4.css`
    height:          var(--sizing-2xl);      /* 40px */
    padding-inline:  var(--spacing-l);
    font-size:       var(--scale-s);
    gap:             var(--spacing-xs);
  `,
  lg: import_react4.css`
    height:          var(--sizing-3xl);      /* 48px */
    padding-inline:  var(--spacing-xl);
    font-size:       var(--scale-m);
    gap:             var(--spacing-xs);
  `
};
var baseButtonStyles = import_react4.css`
  /* Reset */
  appearance:  none;
  border:      none;
  background:  none;
  cursor:      pointer;
  text-decoration: none;

  /* Layout */
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;

  /* Forma */
  border-radius:   var(--radius-full);

  /* Tipografía */
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;

  /* Transición */
  transition: background-color 150ms ease, opacity 150ms ease;

  /* Estados */
  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 3px;
  }

  &:disabled {
    cursor:  not-allowed;
    opacity: 0.4;
  }
`;

// src/atoms/Button/Button.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Button = ({
  variant = "solid",
  size = "md",
  width = "hug",
  isLoading = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  disabled,
  children,
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    ButtonStyled,
    {
      $variant: variant,
      $size: size,
      $width: width,
      $iconOnly: iconOnly,
      disabled: isDisabled,
      type,
      "aria-busy": isLoading,
      ...props,
      children: [
        leftIcon && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { "aria-hidden": "true", children: leftIcon }),
        isLoading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Spinner, { size: size === "sm" ? "sm" : "md" }) : !iconOnly && children,
        rightIcon && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { "aria-hidden": "true", children: rightIcon })
      ]
    }
  );
};
var ButtonStyled = import_styled3.default.button`
  ${baseButtonStyles}
  ${({ $variant }) => variantStyles2[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  /* Ancho */
  width: ${({ $width }) => $width === "full" ? "100%" : "auto"};

  /* Icon only — ratio 1:1, sin padding inline */
  ${({ $iconOnly, $size }) => $iconOnly && `
    padding-inline: 0;
    width: ${$size === "sm" ? "var(--sizing-xl)" : $size === "lg" ? "var(--sizing-3xl)" : "var(--sizing-2xl)"};
  `}
`;
var Button_default = Button;

// src/atoms/Badge/Badge.tsx
var import_styled4 = __toESM(require("@emotion/styled"));

// src/atoms/Badge/Badge.styles.ts
var import_react5 = require("@emotion/react");
var variantStyles3 = {
  default: import_react5.css`
    background-color: var(--background-surface-solid);
    color:            var(--foreground-secondary-on-surface);
    border:           1px solid var(--stroke-secondary-on-surface);
  `,
  accent: import_react5.css`
    background-color: var(--background-accent-light);
    color:            var(--foreground-accent-dark-on-surface);
    border:           1px solid var(--stroke-accent-dim);
  `,
  success: import_react5.css`
    background-color: var(--background-success-dim);
    color:            var(--foreground-success-on-surface);
    border:           1px solid transparent;
  `,
  error: import_react5.css`
    background-color: var(--background-error-dim);
    color:            var(--foreground-error-on-surface);
    border:           1px solid transparent;
  `,
  warning: import_react5.css`
    background-color: color-mix(in srgb, var(--background-surface-solid), orange 15%);
    color:            #92400E;
    border:           1px solid transparent;
  `,
  solid: import_react5.css`
    background-color: var(--background-accent-solid);
    color:            var(--foreground-primary-on-accent);
    border:           1px solid transparent;
  `
};
var sizeStyles2 = {
  sm: import_react5.css`
    height:         20px;
    padding-inline: var(--spacing-xs);
    font-size:      var(--scale-2xs);
    gap:            var(--spacing-2xs);

    svg {
      width:  10px;
      height: 10px;
    }
  `,
  md: import_react5.css`
    height:         24px;
    padding-inline: var(--spacing-s);
    font-size:      var(--scale-xs);
    gap:            var(--spacing-2xs);

    svg {
      width:  12px;
      height: 12px;
    }
  `
};
var baseBadgeStyles = import_react5.css`
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;
  border-radius:   var(--radius-full);
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;
  line-height:     1;
  flex-shrink:     0;
`;

// src/atoms/Badge/Badge.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Badge = ({
  variant = "default",
  size = "md",
  icon,
  children,
  className
}) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
  BadgeStyled,
  {
    $variant: variant,
    $size: size,
    className,
    children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { "aria-hidden": "true", children: icon }),
      children
    ]
  }
);
var BadgeStyled = import_styled4.default.span`
  ${baseBadgeStyles}
  ${({ $variant }) => variantStyles3[$variant]}
  ${({ $size }) => sizeStyles2[$size]}
`;
var Badge_default = Badge;

// src/atoms/Input/Input.tsx
var import_react7 = require("react");
var import_styled5 = __toESM(require("@emotion/styled"));

// src/atoms/Input/Input.styles.ts
var import_react6 = require("@emotion/react");
var stateStyles = {
  default: import_react6.css`
    border-color: var(--stroke-secondary-on-surface);

    &:hover {
      border-color: var(--stroke-primary-on-surface);
    }
    &:focus-within {
      border-color:  var(--stroke-accent);
      box-shadow:    0 0 0 3px var(--stroke-accent-dim);
    }
  `,
  error: import_react6.css`
    border-color: var(--stroke-error);
    background-color: color-mix(in srgb, var(--background-input-default), var(--background-error-dim) 30%);

    &:hover {
      border-color: var(--foreground-error-on-surface);
    }
    &:focus-within {
      border-color: var(--stroke-error);
      box-shadow:   0 0 0 3px var(--background-error-dim);
    }
  `,
  success: import_react6.css`
    border-color: var(--stroke-success);
    background-color: color-mix(in srgb, var(--background-input-default), var(--background-success-dim) 30%);

    &:focus-within {
      border-color: var(--stroke-success);
      box-shadow:   0 0 0 3px var(--background-success-dim);
    }
  `,
  disabled: import_react6.css`
    opacity:        0.5;
    cursor:         not-allowed;
    pointer-events: none;
    border-color:   var(--stroke-secondary-on-surface);
  `
};
var sizeStyles3 = {
  sm: import_react6.css`
    height:     var(--sizing-xl);     /* 32px */
    padding-inline: var(--spacing-s);
    font-size:  var(--scale-s);
    gap:        var(--spacing-2xs);

    .kore-input-label {
      font-size: var(--scale-xs);
    }
  `,
  md: import_react6.css`
    height:     var(--sizing-2xl);    /* 40px */
    padding-inline: var(--spacing-m);
    font-size:  var(--scale-m);
    gap:        var(--spacing-xs);

    .kore-input-label {
      font-size: var(--scale-s);
    }
  `,
  lg: import_react6.css`
    height:     var(--sizing-3xl);    /* 48px */
    padding-inline: var(--spacing-l);
    font-size:  var(--scale-m);
    gap:        var(--spacing-xs);

    .kore-input-label {
      font-size: var(--scale-m);
    }
  `
};
var baseWrapperStyles = import_react6.css`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  width:          100%;
`;
var baseFieldStyles = import_react6.css`
  display:          flex;
  align-items:      center;
  width:            100%;
  background-color: var(--background-input-default);
  border:           1.5px solid transparent;
  border-radius:    var(--corners-default-field);
  transition:       border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
  overflow:         hidden;

  /* El input nativo dentro */
  input {
    flex:             1;
    min-width:        0;
    background:       transparent;
    border:           none;
    outline:          none;
    color:            var(--foreground-primary-on-surface);
    font-family:      var(--font-family-ui);
    font-weight:      var(--font-weight-regular);
    letter-spacing:   var(--letter-spacing-moderate);
    caret-color:      var(--foreground-accent-on-surface);

    &::placeholder {
      color:   var(--foreground-tertiary-on-surface);
      opacity: 1;
    }

    &:disabled {
      cursor: not-allowed;
    }

    /* Ocultar controles nativos de number */
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      appearance: none;
    }

    /* Estilo del texto seleccionado */
    &::selection {
      background-color: var(--background-accent-dim);
    }
  }

  /* Iconos dentro del field */
  .kore-input-icon {
    display:     flex;
    align-items: center;
    flex-shrink: 0;
    color:       var(--foreground-secondary-on-surface);
    transition:  color 150ms ease;
  }

  &:focus-within .kore-input-icon {
    color: var(--foreground-accent-on-surface);
  }

  /* Botón de limpiar */
  .kore-input-clear {
    display:          flex;
    align-items:      center;
    flex-shrink:      0;
    cursor:           pointer;
    color:            var(--foreground-secondary-on-surface);
    background:       none;
    border:           none;
    padding:          0;
    border-radius:    50%;
    transition:       color 150ms ease, opacity 150ms ease;
    opacity:          0;
    pointer-events:   none;

    &:hover { color: var(--foreground-primary-on-surface); }
  }

  /* Mostrar clear solo cuando hay contenido */
  &:has(input:not(:placeholder-shown)) .kore-input-clear {
    opacity:        1;
    pointer-events: auto;
  }
`;
var labelStyles = import_react6.css`
  font-family:    var(--font-family-ui);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  color:          var(--foreground-secondary-on-surface);
  transition:     color 150ms ease;
  line-height:    1;
`;
var helperStyles = import_react6.css`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-moderate);
  color:       var(--foreground-secondary-on-surface);
`;
var errorTextStyles = import_react6.css`
  ${helperStyles}
  color: var(--foreground-error-on-surface);
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
`;
var successTextStyles = import_react6.css`
  ${helperStyles}
  color: var(--foreground-success-on-surface);
`;

// src/atoms/Input/Input.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Input = ({
  state,
  size = "md",
  label,
  helperText,
  errorText,
  successText,
  leftIcon,
  rightIcon,
  clearable = false,
  onClear,
  fullWidth = true,
  disabled,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}) => {
  const autoId = (0, import_react7.useId)();
  const inputId = id ?? autoId;
  const resolvedState = errorText ? "error" : successText ? "success" : disabled ? "disabled" : state ?? "default";
  const handleClear = () => {
    const input = document.getElementById(inputId);
    if (input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(input, "");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    }
    onClear?.();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(WrapperStyled, { $fullWidth: fullWidth, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      LabelStyled,
      {
        htmlFor: inputId,
        className: "kore-input-label",
        $size: size,
        $state: resolvedState,
        children: label
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(FieldStyled, { $state: resolvedState, $size: size, children: [
      leftIcon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "kore-input-icon", "aria-hidden": "true", children: leftIcon }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "input",
        {
          id: inputId,
          disabled,
          value,
          defaultValue,
          onChange,
          "aria-invalid": resolvedState === "error",
          "aria-describedby": errorText ? `${inputId}-error` : successText ? `${inputId}-success` : helperText ? `${inputId}-helper` : void 0,
          ...props
        }
      ),
      clearable && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          type: "button",
          className: "kore-input-clear",
          onClick: handleClear,
          "aria-label": "Limpiar campo",
          tabIndex: -1,
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { name: "X", size: "xs", color: "inherit" })
        }
      ),
      rightIcon && !clearable && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "kore-input-icon", "aria-hidden": "true", children: rightIcon }),
      resolvedState === "error" && !rightIcon && !clearable && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "span",
        {
          className: "kore-input-icon",
          "aria-hidden": "true",
          style: { color: "var(--foreground-error-on-surface)" },
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { name: "CircleAlert", size: "sm", color: "inherit" })
        }
      ),
      resolvedState === "success" && !rightIcon && !clearable && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "span",
        {
          className: "kore-input-icon",
          "aria-hidden": "true",
          style: { color: "var(--foreground-success-on-surface)" },
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { name: "CircleCheck", size: "sm", color: "inherit" })
        }
      )
    ] }),
    errorText && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(ErrorTextStyled, { id: `${inputId}-error`, role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { name: "CircleAlert", size: "xs", color: "inherit" }),
      errorText
    ] }),
    successText && !errorText && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(SuccessTextStyled, { id: `${inputId}-success`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { name: "CircleCheck", size: "xs", color: "inherit" }),
      successText
    ] }),
    helperText && !errorText && !successText && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(HelperTextStyled, { id: `${inputId}-helper`, children: helperText })
  ] });
};
var WrapperStyled = import_styled5.default.div`
  ${baseWrapperStyles}
  width: ${({ $fullWidth }) => $fullWidth ? "100%" : "auto"};
`;
var LabelStyled = import_styled5.default.label`
  ${labelStyles}
  font-size: ${({ $size }) => $size === "sm" ? "var(--scale-xs)" : $size === "lg" ? "var(--scale-m)" : "var(--scale-s)"};
  color: ${({ $state }) => $state === "error" ? "var(--foreground-error-on-surface)" : $state === "success" ? "var(--foreground-success-on-surface)" : "var(--foreground-secondary-on-surface)"};
`;
var FieldStyled = import_styled5.default.div`
  ${baseFieldStyles}
  ${({ $state }) => stateStyles[$state]}
  ${({ $size }) => sizeStyles3[$size]}
`;
var HelperTextStyled = import_styled5.default.p`${helperStyles}`;
var ErrorTextStyled = import_styled5.default.p`${errorTextStyles}`;
var SuccessTextStyled = import_styled5.default.p`${successTextStyles}`;
var Input_default = Input;

// src/atoms/SearchInput/SearchInput.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var SearchInput = ({
  onSearch,
  onClear,
  onChange,
  size = "md",
  fullWidth = true,
  ...props
}) => {
  const handleChange = (e) => {
    onSearch?.(e.target.value);
    onChange?.(e);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onSearch?.("");
      onClear?.();
      e.currentTarget.blur();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    Input_default,
    {
      type: "text",
      role: "searchbox",
      "aria-label": "Buscar",
      size,
      fullWidth,
      clearable: true,
      leftIcon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon_default, { name: "Search", size: "sm", color: "inherit" }),
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onClear: () => {
        onSearch?.("");
        onClear?.();
      },
      ...props
    }
  );
};
var SearchInput_default = SearchInput;

// src/atoms/Tag/Tag.tsx
var import_styled6 = __toESM(require("@emotion/styled"));

// src/atoms/Tag/Tag.styles.ts
var import_react8 = require("@emotion/react");
var variantStyles4 = {
  default: import_react8.css`
    background-color: var(--background-surface-solid);
    color:            var(--foreground-secondary-on-surface);
    border:           1.5px solid var(--stroke-secondary-on-surface);

    &:hover:not([aria-disabled="true"]) {
      border-color:     var(--stroke-primary-on-surface);
      color:            var(--foreground-primary-on-surface);
    }
    &:active:not([aria-disabled="true"]) {
      background-color: var(--background-action-push);
    }
  `,
  selected: import_react8.css`
    background-color: var(--background-accent-light);
    color:            var(--foreground-accent-dark-on-surface);
    border:           1.5px solid var(--stroke-accent);

    &:hover:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-light), var(--background-accent-solid) 10%);
    }
    &:active:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-light), var(--background-accent-solid) 20%);
    }
  `,
  solid: import_react8.css`
    background-color: var(--background-accent-solid);
    color:            var(--foreground-primary-on-accent);
    border:           1.5px solid transparent;

    &:hover:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 10%);
    }
    &:active:not([aria-disabled="true"]) {
      background-color: color-mix(in srgb, var(--background-accent-solid), black 20%);
    }
  `
};
var sizeStyles4 = {
  sm: import_react8.css`
    height:         24px;
    padding-inline: var(--spacing-xs);
    font-size:      var(--scale-xs);
    gap:            var(--spacing-2xs);
    border-radius:  var(--radius-xs);

    .kore-tag-dismiss {
      width:  14px;
      height: 14px;
    }
  `,
  md: import_react8.css`
    height:         32px;
    padding-inline: var(--spacing-s);
    font-size:      var(--scale-s);
    gap:            var(--spacing-xs);
    border-radius:  var(--radius-s);

    .kore-tag-dismiss {
      width:  16px;
      height: 16px;
    }
  `,
  lg: import_react8.css`
    height:         40px;
    padding-inline: var(--spacing-m);
    font-size:      var(--scale-m);
    gap:            var(--spacing-xs);
    border-radius:  var(--radius-m);

    .kore-tag-dismiss {
      width:  18px;
      height: 18px;
    }
  `
};
var baseTagStyles = import_react8.css`
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;
  cursor:          pointer;
  user-select:     none;
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;
  line-height:     1;
  flex-shrink:     0;
  transition:      background-color 150ms ease, border-color 150ms ease,
                   color 150ms ease, opacity 150ms ease;

  /* Focus accesible */
  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 2px;
  }

  /* Disabled */
  &[aria-disabled="true"] {
    opacity: 0.4;
    cursor:  not-allowed;
  }

  /* Botón de dismiss */
  .kore-tag-dismiss {
    display:         flex;
    align-items:     center;
    justify-content: center;
    flex-shrink:     0;
    border-radius:   50%;
    color:           currentColor;
    opacity:         0.6;
    transition:      opacity 150ms ease, background-color 150ms ease;

    &:hover {
      opacity:          1;
      background-color: color-mix(in srgb, currentColor, transparent 80%);
    }
  }
`;

// src/atoms/Tag/Tag.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var DismissIcon = () => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
] });
var Tag = ({
  variant = "default",
  size = "md",
  icon,
  children,
  dismissible = false,
  onDismiss,
  onClick,
  disabled = false,
  className,
  "aria-label": ariaLabel
}) => {
  const handleDismiss = (e) => {
    e.stopPropagation();
    onDismiss?.(e);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    TagStyled,
    {
      $variant: variant,
      $size: size,
      onClick: disabled ? void 0 : onClick,
      "aria-disabled": disabled,
      "aria-pressed": variant === "selected" ? true : void 0,
      "aria-label": ariaLabel,
      role: onClick ? "button" : void 0,
      tabIndex: onClick && !disabled ? 0 : void 0,
      className,
      onKeyDown: (e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick(e);
        }
      },
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children }),
        dismissible && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "button",
          {
            type: "button",
            className: "kore-tag-dismiss",
            onClick: handleDismiss,
            "aria-label": `Eliminar ${typeof children === "string" ? children : ""}`,
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DismissIcon, {})
          }
        )
      ]
    }
  );
};
var TagGroup = ({ tags, onToggle, size = "md", className }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TagGroupStyled, { className, children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  Tag,
  {
    variant: tag.selected ? "selected" : "default",
    size,
    icon: tag.icon,
    onClick: () => onToggle?.(tag.id),
    "aria-label": `${tag.selected ? "Quitar filtro" : "Aplicar filtro"}: ${tag.label}`,
    children: tag.label
  },
  tag.id
)) });
var TagStyled = import_styled6.default.span`
  ${baseTagStyles}
  ${({ $variant }) => variantStyles4[$variant]}
  ${({ $size }) => sizeStyles4[$size]}
`;
var TagGroupStyled = import_styled6.default.div`
  display:   flex;
  flex-wrap: wrap;
  gap:       var(--spacing-xs);
`;
var Tag_default = Tag;

// src/atoms/Avatar/Avatar.tsx
var import_react10 = require("react");
var import_styled7 = __toESM(require("@emotion/styled"));

// src/atoms/Avatar/Avatar.styles.ts
var import_react9 = require("@emotion/react");
var sizeStyles5 = {
  xs: import_react9.css`
    width:     24px;
    height:    24px;
    font-size: var(--scale-2xs);

    .kore-avatar-dot {
      width:  6px;
      height: 6px;
      border-width: 1px;
    }
  `,
  sm: import_react9.css`
    width:     32px;
    height:    32px;
    font-size: var(--scale-xs);

    .kore-avatar-dot {
      width:  8px;
      height: 8px;
      border-width: 1.5px;
    }
  `,
  md: import_react9.css`
    width:     40px;
    height:    40px;
    font-size: var(--scale-s);

    .kore-avatar-dot {
      width:  10px;
      height: 10px;
      border-width: 2px;
    }
  `,
  lg: import_react9.css`
    width:     56px;
    height:    56px;
    font-size: var(--scale-m);

    .kore-avatar-dot {
      width:  12px;
      height: 12px;
      border-width: 2px;
    }
  `,
  xl: import_react9.css`
    width:     80px;
    height:    80px;
    font-size: var(--scale-l);

    .kore-avatar-dot {
      width:  14px;
      height: 14px;
      border-width: 2.5px;
    }
  `,
  "2xl": import_react9.css`
    width:     112px;
    height:    112px;
    font-size: var(--scale-xl);

    .kore-avatar-dot {
      width:  16px;
      height: 16px;
      border-width: 3px;
    }
  `
};
var fallbackColors = [
  { bg: "#B05E3A", text: "#F7F4F1" },
  // terracota KORE
  { bg: "#4338CA", text: "#F7F4F1" },
  // índigo
  { bg: "#059669", text: "#F7F4F1" },
  // esmeralda
  { bg: "#0F766E", text: "#F7F4F1" },
  // teal
  { bg: "#7C3AED", text: "#F7F4F1" },
  // violeta
  { bg: "#C2410C", text: "#F7F4F1" },
  // naranja oscuro
  { bg: "#0369A1", text: "#F7F4F1" },
  // azul
  { bg: "#9D174D", text: "#F7F4F1" }
  // rosa
];
var dotColorStyles = {
  online: import_react9.css`background-color: var(--background-success-solid);`,
  offline: import_react9.css`background-color: var(--foreground-tertiary-on-surface);`,
  busy: import_react9.css`background-color: var(--background-error-solid);`,
  away: import_react9.css`background-color: #F59E0B;`
};
var baseAvatarStyles = import_react9.css`
  position:        relative;
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  border-radius:   50%;
  flex-shrink:     0;
  overflow:        hidden;
  user-select:     none;
  font-family:     var(--font-family-ui);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-moderate);
  line-height:     1;

  img {
    width:      100%;
    height:     100%;
    object-fit: cover;
  }
`;
var baseDotStyles = import_react9.css`
  position:      absolute;
  bottom:        0;
  right:         0;
  border-radius: 50%;
  border-style:  solid;
  border-color:  var(--background-surface-low);
  flex-shrink:   0;
`;

// src/atoms/Avatar/Avatar.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
var getColorIndex = (name) => {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % fallbackColors.length;
};
var Avatar = ({
  name,
  src,
  size = "md",
  status,
  ring = false,
  className
}) => {
  const [imgError, setImgError] = (0, import_react10.useState)(false);
  const showImage = src && !imgError;
  const initials = getInitials(name);
  const colorIndex = getColorIndex(name);
  const { bg, text } = fallbackColors[colorIndex];
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    AvatarStyled,
    {
      $size: size,
      $bg: showImage ? "transparent" : bg,
      $textColor: text,
      $ring: ring,
      className,
      role: "img",
      "aria-label": name,
      title: name,
      children: [
        showImage ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "img",
          {
            src,
            alt: name,
            onError: () => setImgError(true),
            loading: "lazy"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { "aria-hidden": "true", children: initials }),
        status && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          DotStyled,
          {
            $status: status,
            className: "kore-avatar-dot",
            "aria-label": `Estado: ${status}`
          }
        )
      ]
    }
  );
};
var AvatarGroup = ({
  users,
  max = 4,
  size = "md",
  className
}) => {
  const visible = users.slice(0, max);
  const overflow = users.length - max;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(AvatarGroupStyled, { className, children: [
    visible.map((user, i) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AvatarGroupItem, { $index: i, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Avatar, { name: user.name, src: user.src, size }) }, user.name + i)),
    overflow > 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AvatarGroupItem, { $index: visible.length, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(OverflowAvatar, { $size: size, "aria-label": `${overflow} m\xE1s`, title: `${overflow} m\xE1s`, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { "aria-hidden": "true", children: [
      "+",
      overflow
    ] }) }) })
  ] });
};
var AvatarStyled = import_styled7.default.div`
  ${baseAvatarStyles}
  ${({ $size }) => sizeStyles5[$size]}
  background-color: ${({ $bg }) => $bg};
  color:            ${({ $textColor }) => $textColor};

  ${({ $ring }) => $ring && `
    outline:        3px solid var(--stroke-accent);
    outline-offset: 2px;
  `}
`;
var DotStyled = import_styled7.default.span`
  ${baseDotStyles}
  ${({ $status }) => dotColorStyles[$status]}
`;
var AvatarGroupStyled = import_styled7.default.div`
  display:     flex;
  align-items: center;
`;
var AvatarGroupItem = import_styled7.default.div`
  margin-left: ${({ $index }) => $index === 0 ? "0" : "-10px"};
  z-index:     ${({ $index }) => 10 - $index};
  position:    relative;

  /* Borde blanco entre avatares superpuestos */
  & > * {
    outline:        2px solid var(--background-surface-low);
    outline-offset: 0;
  }
`;
var OverflowAvatar = import_styled7.default.div`
  ${baseAvatarStyles}
  ${({ $size }) => sizeStyles5[$size]}
  background-color: var(--background-surface-solid);
  color:            var(--foreground-secondary-on-surface);
  font-size:        var(--scale-xs);
`;
var Avatar_default = Avatar;

// src/atoms/Card/Card.tsx
var import_styled8 = __toESM(require("@emotion/styled"));
var import_react11 = require("@emotion/react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var baseStyles = import_react11.css`
  display:          flex;
  flex-direction:   column;
  border-radius:    var(--corners-default-card);
  overflow:         hidden;
  border:           0.5px solid var(--stroke-secondary-on-surface);
  background:       var(--background-surface-low);
  width:            100%;
  transition:       border-color 200ms ease, transform 200ms ease;
`;
var interactiveStyles = import_react11.css`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-accent);
      transform:    translateY(-2px);
    }
  }

  &:active {
    transform:    scale(0.99);
    border-color: var(--stroke-accent-dim);
  }

  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 2px;
  }
`;
var Card = ({
  children,
  interactive = false,
  onClick,
  className,
  ...ariaProps
}) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
  CardStyled,
  {
    $interactive: interactive || !!onClick,
    onClick,
    className,
    tabIndex: onClick ? 0 : void 0,
    onKeyDown: (e) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick();
      }
    },
    ...ariaProps,
    children
  }
);
var CardStyled = import_styled8.default.article`
  ${baseStyles}
  ${({ $interactive }) => $interactive && interactiveStyles}
`;
var Card_default = Card;

// src/atoms/StatCard/StatCard.tsx
var import_styled9 = __toESM(require("@emotion/styled"));
var import_react12 = require("@emotion/react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var StatCard = ({
  value,
  label,
  icon,
  trend = "neutral",
  trendValue,
  className
}) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Wrapper, { className, children: [
  /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(TopRow, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Label, { variant: "overline", as: "span", children: label }),
    icon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(IconSlot, { "aria-hidden": "true", children: icon })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Value, { variant: "h1", as: "p", children: value }),
  trendValue && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(TrendRow, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TrendIndicator, { $trend: trend, "aria-label": `Tendencia: ${trendValue}`, children: trend === "up" ? "\u2191" : trend === "down" ? "\u2193" : "\u2013" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TrendText, { $trend: trend, children: trendValue })
  ] })
] });
var Wrapper = import_styled9.default.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xl);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  transition:     border-color 150ms, box-shadow 150ms;

  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-accent-dim);
      box-shadow:   0 4px 16px color-mix(in srgb, var(--background-accent-solid) 8%, transparent);
    }
  }
`;
var TopRow = import_styled9.default.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
`;
var Label = (0, import_styled9.default)(Text_default)`
  color: var(--foreground-tertiary-on-surface);
`;
var IconSlot = import_styled9.default.span`
  color:      var(--foreground-accent-on-surface);
  flex-shrink: 0;
`;
var Value = (0, import_styled9.default)(Text_default)`
  line-height: 1;
  margin:      0;
`;
var trendColor = ($trend) => import_react12.css`
  color: ${$trend === "up" ? "var(--foreground-success-on-surface)" : $trend === "down" ? "var(--foreground-error-on-surface)" : "var(--foreground-tertiary-on-surface)"};
`;
var TrendRow = import_styled9.default.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-2xs);
  margin-top:  var(--spacing-2xs);
`;
var TrendIndicator = import_styled9.default.span`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-semibold);
  ${({ $trend }) => trendColor($trend)}
`;
var TrendText = import_styled9.default.span`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-regular);
  ${({ $trend }) => trendColor($trend)}
`;
var StatCard_default = StatCard;

// src/molecules/WorkoutCard/WorkoutCard.tsx
var import_styled10 = __toESM(require("@emotion/styled"));
var import_jsx_runtime13 = require("react/jsx-runtime");
var levelLabel = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado"
};
var WorkoutCard = ({
  title,
  category,
  duration,
  level,
  imageSrc,
  imageAlt,
  onClick,
  completed = false,
  favorited = false,
  className
}) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
  Card_default,
  {
    interactive: !!onClick,
    onClick,
    className: `${className ?? ""} kore-workout-card`,
    "aria-label": `${title} \u2014 ${category}, ${duration} minutos`,
    role: "article",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(ImageWrapper, { className: "kore-card-image", children: [
        imageSrc ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("img", { src: imageSrc, alt: imageAlt ?? title, loading: "lazy" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Placeholder, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Icon_default, { name: "Dumbbell", size: "lg", color: "muted" }) }),
        completed && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CompletedBadge, { "aria-label": "Completado", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Icon_default, { name: "Check", size: "xs", color: "inherit" }) }),
        favorited && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(FavoriteBadge, { "aria-label": "Favorito", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Icon_default, { name: "Heart", size: "sm", color: "inherit" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Body2, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Overline2, { variant: "overline", as: "span", children: category }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Title, { variant: "h3", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(MetaRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(MetaText, { variant: "body-sm", as: "span", children: [
            duration,
            " min"
          ] }),
          level && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MetaDot, { variant: "body-sm", as: "span", "aria-hidden": "true", children: "\xB7" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MetaText, { variant: "body-sm", as: "span", children: levelLabel[level] })
          ] })
        ] })
      ] })
    ]
  }
);
var ImageWrapper = import_styled10.default.div`
  position:     relative;
  width:        100%;
  aspect-ratio: 4 / 3;
  overflow:     hidden;
  background:   var(--background-surface-solid);

  img {
    width:      100%;
    height:     100%;
    object-fit: cover;
    display:    block;
    transition: transform 400ms ease;
  }

  @media (hover: hover) {
    .kore-workout-card:hover & img {
      transform: scale(1.03);
    }
  }
`;
var Placeholder = import_styled10.default.div`
  width:           100%;
  height:          100%;
  display:         flex;
  align-items:     center;
  justify-content: center;
`;
var Body2 = import_styled10.default.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  padding:        var(--spacing-m);
`;
var MetaRow = import_styled10.default.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-xs);
`;
var Overline2 = (0, import_styled10.default)(Text_default)`
  line-height: 1;
`;
var Title = (0, import_styled10.default)(Text_default)`
  letter-spacing:     var(--letter-spacing-dense);
  line-height:        var(--line-height-dense);
  margin:             0;
  display:            -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:           hidden;
`;
var MetaText = (0, import_styled10.default)(Text_default)`
  font-weight: var(--font-weight-light);
  color:       var(--foreground-secondary-on-surface);
  line-height: 1;
`;
var MetaDot = (0, import_styled10.default)(Text_default)`
  color:       var(--foreground-tertiary-on-surface);
  line-height: 1;
`;
var CompletedBadge = import_styled10.default.div`
  position:         absolute;
  top:              var(--spacing-xs);
  right:            var(--spacing-xs);
  width:            24px;
  height:           24px;
  border-radius:    50%;
  background-color: var(--background-success-solid);
  color:            #fff;
  display:          flex;
  align-items:      center;
  justify-content:  center;
`;
var FavoriteBadge = import_styled10.default.div`
  position: absolute;
  top:      var(--spacing-xs);
  left:     var(--spacing-xs);
  color:    var(--foreground-accent-on-surface);
  filter:   drop-shadow(0 1px 2px rgba(0,0,0,0.2));
`;
var WorkoutCard_default = WorkoutCard;

// src/molecules/FilterBar/FilterBar.tsx
var import_styled11 = __toESM(require("@emotion/styled"));

// src/molecules/FilterBar/FilterBar.styles.ts
var import_react13 = require("@emotion/react");
var baseWrapperStyles2 = import_react13.css`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-s);
  width:          100%;
`;
var tagsRowStyles = import_react13.css`
  display:    flex;
  gap:        var(--spacing-xs);
  overflow-x: auto;
  overflow-y: visible;
  padding-block: 2px;      /* espacio para el focus ring */

  /* Ocultar scrollbar visualmente pero mantener funcional */
  scrollbar-width:    none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }

  /* En desktop — wrap si hay espacio */
  @media (min-width: 600px) {
    flex-wrap:  wrap;
    overflow-x: visible;
  }
`;
var inlineWrapperStyles = import_react13.css`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-m);
  width:       100%;

  .kore-filterbar-search {
    flex-shrink: 0;
    width:       240px;
  }

  .kore-filterbar-tags {
    flex: 1;
    min-width: 0;
  }
`;

// src/molecules/FilterBar/FilterBar.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var FilterBar = ({
  filters,
  onFilterToggle,
  onSearch,
  searchValue,
  searchPlaceholder = "Buscar...",
  hideSearch = false,
  hideTags = false,
  layout = "stacked",
  className
}) => {
  const tagsSection = !hideTags && filters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TagsRow, { className: "kore-filterbar-tags", children: filters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    Tag_default,
    {
      variant: filter.selected ? "selected" : "default",
      size: "md",
      icon: filter.icon,
      onClick: () => onFilterToggle?.(filter.id),
      "aria-label": `${filter.selected ? "Quitar" : "Aplicar"} filtro: ${filter.label}`,
      children: filter.label
    },
    filter.id
  )) });
  const searchSection = !hideSearch && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    SearchInput_default,
    {
      value: searchValue,
      placeholder: searchPlaceholder,
      onSearch,
      className: "kore-filterbar-search"
    }
  );
  if (layout === "inline") {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(InlineWrapper, { className, children: [
      searchSection,
      tagsSection
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(StackedWrapper, { className, children: [
    searchSection,
    tagsSection
  ] });
};
var StackedWrapper = import_styled11.default.div`
  ${baseWrapperStyles2}
`;
var InlineWrapper = import_styled11.default.div`
  ${inlineWrapperStyles}
`;
var TagsRow = import_styled11.default.div`
  ${tagsRowStyles}
`;
var FilterBar_default = FilterBar;

// src/molecules/StreakBadge/StreakBadge.tsx
var import_react14 = require("react");
var import_styled12 = __toESM(require("@emotion/styled"));
var import_react15 = require("@emotion/react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var pulse = import_react15.keyframes`
  0%, 100% { transform: scale(1);    }
  50%       { transform: scale(1.15); }
`;
var countUp = import_react15.keyframes`
  from { transform: translateY(6px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
`;
var variantConfig = {
  active: {
    iconName: "Flame",
    iconColor: "#F97316",
    bgColor: "color-mix(in srgb, #F97316, transparent 85%)",
    textColor: "var(--foreground-primary-on-surface)",
    animated: true
  },
  inactive: {
    iconName: "Flame",
    iconColor: "var(--foreground-tertiary-on-surface)",
    bgColor: "var(--background-surface-solid)",
    textColor: "var(--foreground-tertiary-on-surface)",
    animated: false
  },
  record: {
    iconName: "Trophy",
    iconColor: "#F59E0B",
    bgColor: "color-mix(in srgb, #F59E0B, transparent 85%)",
    textColor: "var(--foreground-primary-on-surface)",
    animated: true
  }
};
var sizeConfig = {
  sm: { wrapper: 56, icon: "sm", countSize: 18, labelSize: 9 },
  md: { wrapper: 72, icon: "md", countSize: 28, labelSize: 10 },
  lg: { wrapper: 88, icon: "lg", countSize: 36, labelSize: 11 }
};
var useAnimatedCount = (target, active) => {
  const [display, setDisplay] = (0, import_react14.useState)(target);
  const prevRef = (0, import_react14.useRef)(target);
  (0, import_react14.useEffect)(() => {
    if (!active || prevRef.current === target) {
      setDisplay(target);
      return;
    }
    const start = prevRef.current;
    const diff = target - start;
    const duration = Math.min(Math.abs(diff) * 40, 800);
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return display;
};
var StreakBadge = ({
  count,
  variant = "active",
  label = "d\xEDas",
  size = "md",
  className
}) => {
  const config = variantConfig[variant];
  const sizeConf = sizeConfig[size];
  const displayCount = useAnimatedCount(count, config.animated);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    Wrapper2,
    {
      $size: sizeConf.wrapper,
      $bgColor: config.bgColor,
      $animated: config.animated,
      className,
      "aria-label": `Racha de ${count} ${label}`,
      role: "status",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(IconWrapper, { $animated: config.animated, $color: config.iconColor, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon_default, { name: config.iconName, size: sizeConf.icon, color: "inherit" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(CountWrapper, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Count,
            {
              $size: sizeConf.countSize,
              $color: config.textColor,
              children: displayCount
            },
            displayCount
          ),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Label2, { $size: sizeConf.labelSize, $color: config.textColor, children: label })
        ] })
      ]
    }
  );
};
var Wrapper2 = import_styled12.default.div`
  display:         inline-flex;
  align-items:     center;
  gap:             var(--spacing-xs);
  padding:         var(--spacing-xs) var(--spacing-m);
  border-radius:   var(--radius-full);
  background:      ${({ $bgColor }) => $bgColor};
  border:          1px solid color-mix(in srgb, currentColor, transparent 80%);
  user-select:     none;
`;
var IconWrapper = import_styled12.default.span`
  display:    flex;
  align-items: center;
  color:      ${({ $color }) => $color};
  animation:  ${({ $animated }) => $animated ? `${pulse} 2s ease-in-out infinite` : "none"};
  transform-origin: bottom center;
`;
var CountWrapper = import_styled12.default.div`
  display:        flex;
  flex-direction: column;
  align-items:    center;
  line-height:    1;
  gap:            var(--spacing-3xs);
`;
var Count = import_styled12.default.span`
  font-family:  var(--font-family-display);
  font-size:    ${({ $size }) => $size}px;
  font-weight:  var(--font-weight-semibold);
  color:        ${({ $color }) => $color};
  line-height:  1;
  animation:    ${countUp} 300ms ease-out;
`;
var Label2 = import_styled12.default.span`
  font-family:    var(--font-family-ui);
  font-size:      ${({ $size }) => $size}px;
  font-weight:    var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
  opacity:        0.7;
`;
var StreakBadge_default = StreakBadge;

// src/molecules/NavBar/NavBar.tsx
var import_styled13 = __toESM(require("@emotion/styled"));

// src/molecules/NavBar/NavBar.styles.ts
var import_react16 = require("@emotion/react");
var mobileNavStyles = import_react16.css`
  position:                 fixed;
  bottom:                   12px;
  left:                     12px;
  right:                    12px;
  z-index:                  var(--z-overlay);
  display:                  flex;
  align-items:              center;
  height:                   64px;
  padding-inline:           var(--spacing-xs);
  background:               var(--background-bars-glass);
  backdrop-filter:          blur(16px);
  -webkit-backdrop-filter:  blur(16px);
  border:                   0.5px solid var(--stroke-secondary-on-surface);
  border-radius:            var(--radius-xl);
  box-shadow:               0 4px 24px rgba(0, 0, 0, 0.08);

  @media (min-width: 600px) {
    display: none;
  }
`;
var desktopNavStyles = import_react16.css`
  display:          none;
  align-items:      center;
  justify-content:  space-between;
  height:           60px;
  padding-inline:   var(--spacing-2xl);
  background:       var(--background-header-default);
  backdrop-filter:  blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom:    0.5px solid var(--stroke-secondary-on-surface);
  position:         sticky;
  top:              0;
  z-index:          var(--z-overlay);

  @media (min-width: 600px) {
    display: flex;
  }
`;
var mobileItemStyles = import_react16.css`
  flex:              1;
  display:           flex;
  flex-direction:    column;
  align-items:       center;
  justify-content:   center;
  gap:               3px;
  cursor:            pointer;
  padding-block:     var(--spacing-xs);
  border:            none;
  background:        none;
  color:             var(--foreground-tertiary-on-surface);
  transition:        color 200ms ease;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: -2px;
    border-radius:  var(--radius-s);
  }
`;
var desktopItemStyles = import_react16.css`
  display:        flex;
  align-items:    center;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  border:         none;
  background:     none;
  cursor:         pointer;
  color:          var(--foreground-secondary-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  transition:     color 200ms ease, background-color 200ms ease;
  white-space:    nowrap;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: var(--background-action-hover);
    color:            var(--foreground-primary-on-surface);
  }

  &[aria-current="page"] {
    color:            var(--foreground-accent-on-surface);
    background-color: var(--background-accent-dim);
  }

  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 2px;
  }
`;
var mobileLabelStyles = import_react16.css`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-2xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  line-height:    1;
`;
var desktopItemsStyles = import_react16.css`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-2xs);
`;
var activePillStyles = import_react16.css`
  display:          flex;
  flex-direction:   column;
  align-items:      center;
  gap:              3px;
  padding:          var(--spacing-2xs) var(--spacing-m);
  border-radius:    var(--radius-full);
  background-color: var(--background-accent-dim);
  color:            var(--foreground-accent-on-surface);
  transition:       background-color 200ms ease, color 200ms ease;
`;

// src/molecules/NavBar/NavBar.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var DEFAULT_ITEMS = [
  { id: "home", label: "Inicio", icon: "House", iconActive: "House" },
  { id: "workouts", label: "Entrenamientos", icon: "Dumbbell", iconActive: "Dumbbell" },
  { id: "activity", label: "Mi actividad", icon: "ChartLine", iconActive: "ChartLine" },
  { id: "profile", label: "Perfil", icon: "CircleUser", iconActive: "CircleUser" }
];
var NavBar = ({
  activeId,
  items = DEFAULT_ITEMS,
  onNavigate,
  logo,
  className
}) => {
  const handleNav = (id) => onNavigate?.(id);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(MobileNav, { className, role: "navigation", "aria-label": "Navegaci\xF3n principal", children: items.map((item) => {
      const isActive = item.id === activeId;
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        MobileItem,
        {
          type: "button",
          onClick: () => handleNav(item.id),
          "aria-current": isActive ? "page" : void 0,
          "aria-label": item.label,
          children: isActive ? /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(ActivePill, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Icon_default, { name: item.iconActive ?? item.icon, size: "sm", color: "inherit", strokeWidth: 2 }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(MobileLabel, { children: item.label })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Icon_default, { name: item.icon, size: "sm", color: "inherit", strokeWidth: 1.5 }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(MobileLabel, { children: item.label })
          ] })
        },
        item.id
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(DesktopNav, { className, role: "navigation", "aria-label": "Navegaci\xF3n principal", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LogoWrapper, { children: logo ?? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LogoText, { children: "KORE" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DesktopItems, { children: items.map((item) => {
        const isActive = item.id === activeId;
        return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
          DesktopItem,
          {
            type: "button",
            onClick: () => handleNav(item.id),
            "aria-current": isActive ? "page" : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                Icon_default,
                {
                  name: isActive && item.iconActive ? item.iconActive : item.icon,
                  size: "xs",
                  color: "inherit",
                  strokeWidth: isActive ? 2 : 1.5
                }
              ),
              item.label
            ]
          },
          item.id
        );
      }) })
    ] })
  ] });
};
var MobileNav = import_styled13.default.nav`${mobileNavStyles}`;
var DesktopNav = import_styled13.default.header`${desktopNavStyles}`;
var MobileItem = import_styled13.default.button`${mobileItemStyles}`;
var DesktopItem = import_styled13.default.button`${desktopItemStyles}`;
var ActivePill = import_styled13.default.div`${activePillStyles}`;
var MobileLabel = import_styled13.default.span`${mobileLabelStyles}`;
var DesktopItems = import_styled13.default.div`${desktopItemsStyles}`;
var LogoWrapper = import_styled13.default.div`
  display:     flex;
  align-items: center;
`;
var LogoText = import_styled13.default.span`
  font-family:    var(--font-family-display);
  font-size:      var(--scale-xl);
  font-weight:    var(--font-weight-light);
  letter-spacing: var(--letter-spacing-wide);
  color:          var(--foreground-accent-on-surface);
  line-height:    1;
`;
var NavBar_default = NavBar;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Avatar,
  AvatarGroup,
  Badge,
  Body,
  BodyLight,
  BodySm,
  Button,
  Caption,
  Card,
  Display,
  FilterBar,
  Heading1,
  Heading2,
  Heading3,
  Icon,
  Input,
  NavBar,
  Overline,
  SearchInput,
  Spinner,
  StatCard,
  StreakBadge,
  Tag,
  TagGroup,
  Text,
  WorkoutCard
});
//# sourceMappingURL=index.js.map
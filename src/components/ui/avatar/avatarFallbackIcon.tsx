import type { ReactElement } from "react";

/**
 * The person icon an Avatar shows with no image, initials or children. It lives apart from
 * `defaultAvatarTheme` so the theme module stays free of React: the build marks every module
 * that imports React `'use client'`, and a Server Component reading `defaultTheme.avatar`
 * would get a client reference instead of the theme.
 */
export const avatarFallbackIcon = (): ReactElement =>
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.5-8 5.5V21h16v-1.5c0-3-3.6-5.5-8-5.5z" />
  </svg>;

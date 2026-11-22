import type { ReactElement } from "react";

/**
 * The chevron drawn between Breadcrumb items. It lives apart from
 * `defaultBreadcrumbSeparatorTheme` so the theme module stays free of React and readable from
 * a Server Component (the build marks every module that imports React `'use client'`).
 */
export const breadcrumbSeparatorIcon = (): ReactElement =>
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
  </svg>;

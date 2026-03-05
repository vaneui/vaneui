import { TRUNCATE } from "../props/categoryBuilders";

/** Categories for NavLink label sub-theme — truncation, overflow, whitespace, width */
export const NAV_LINK_LABEL_CATEGORIES = [...TRUNCATE, 'overflow', 'whitespace', 'width'] as const;

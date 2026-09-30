import { TRUNCATE } from "../props/categoryBuilders";

/** Categories for NavLink label sub-theme — truncation, overflow, whitespace, width, flex grow */
export const NAV_LINK_LABEL_CATEGORIES = [...TRUNCATE, 'overflow', 'whitespace', 'width', 'flex'] as const;

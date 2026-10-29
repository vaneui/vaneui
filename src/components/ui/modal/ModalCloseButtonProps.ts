import type { ButtonProps } from "../button/ButtonProps";

/**
 * ModalCloseButton props: Button's props without link and loading forms. It renders through
 * Button's theme, so every Button prop applies; its own defaults (the × look) come from
 * ThemeProvider `modal.closeButton` and lose to the props you pass.
 */
export type ModalCloseButtonProps = Omit<ButtonProps, 'href' | 'tag' | 'loading'>;

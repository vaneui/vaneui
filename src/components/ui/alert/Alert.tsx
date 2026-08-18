import { forwardRef } from 'react';
import type { AlertProps } from "./AlertProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultAlertTheme } from "./defaultAlertTheme";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ polite, ...props }, ref) {
    const theme = useTheme();
    // alert interrupts the user, status waits for a pause; both are live regions
    const role = polite ? 'status' : 'alert';
    return <ThemedComponent ref={ref} theme={theme?.alert ?? defaultAlertTheme} role={role} {...props} />
  }
);

Alert.displayName = 'Alert';

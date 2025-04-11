import React, { createContext, useContext } from 'react';
import { ButtonSettings } from '../ui/settings/buttonSettings';
import { ButtonClasses } from '../ui/classes/buttonClasses';

// Define the shape of our theme props
export interface ThemeProps {
  button?: {
    settings?: Partial<ButtonSettings>;
    classes?: Partial<ButtonClasses>;
  };
}

// Create the context with a default value
const ThemeContext = createContext<ThemeProps | undefined>(undefined);

// Props for the ThemeProvider component
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeProps;
}

// ThemeProvider component
export function ThemeProvider({
  children,
  theme = {},
}: ThemeProviderProps) {
  // Initialize with default or provided values
  const buttonSettings = new ButtonSettings(theme.button?.settings || {});
  const buttonClasses = Object.assign(new ButtonClasses(), theme.button?.classes || {});

  // Create the context value
  const contextValue: ThemeProps = {
    button: {
      settings: buttonSettings,
      classes: buttonClasses,
    },
  };

  // Provide the context to children
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = (): ThemeProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

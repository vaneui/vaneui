import React, { createContext, useContext } from 'react';
import { ButtonSettings } from '../ui/settings/buttonSettings';
import { ButtonClasses } from '../ui/classes/buttonClasses';

// Define the shape of our theme context
interface ThemeContextType {
  button: {
    settings: ButtonSettings;
    classes: ButtonClasses;
  };
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the shape of our theme props
interface ThemeProps {
  button?: {
    settings?: Partial<ButtonSettings>;
    classes?: Partial<ButtonClasses>;
  };
}

// Props for the ThemeProvider component
interface ThemeProviderProps {
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
  const contextValue: ThemeContextType = {
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
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

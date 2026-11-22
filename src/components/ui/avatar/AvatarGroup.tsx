import { Children, forwardRef, isValidElement } from 'react';
import type { AvatarGroupProps } from "./AvatarGroupProps";
import type { SizeKey } from "../props";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { AvatarGroupContext } from "./AvatarGroupContext";
import { Avatar } from "./Avatar";
import { defaultAvatarGroupTheme } from "./defaultAvatarGroupTheme";

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ max, total, children, ...props }, ref) {
    const theme = useTheme();
    const groupTheme = theme?.avatarGroup ?? defaultAvatarGroupTheme;
    // the group's resolved size (explicit prop > theme default) is the avatars' size default
    const size = (pickFirstTruthyKeyByCategory(
      props as unknown as Record<string, unknown>,
      groupTheme.defaults as unknown as Record<string, unknown>,
      'size'
    ) ?? null) as SizeKey | null;

    const items = Children.toArray(children).filter(isValidElement);
    const limit = typeof max === 'number' && Number.isFinite(max) && max >= 0 ? Math.floor(max) : items.length;
    const shown = items.slice(0, limit);
    const count = Math.max(typeof total === 'number' && Number.isFinite(total) ? Math.floor(total) : 0, items.length);
    const rest = count - shown.length;

    return (
      <AvatarGroupContext.Provider value={size}>
        <ThemedComponent ref={ref} theme={groupTheme} role="group" {...props}>
          {shown}
          {rest > 0 ? <Avatar>{`+${rest}`}</Avatar> : null}
        </ThemedComponent>
      </AvatarGroupContext.Provider>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

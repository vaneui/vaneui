import { forwardRef, useMemo, useRef, useState } from 'react';
import type React from 'react';
import type { AvatarProps } from "./AvatarProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { withLabelSizeDefault } from "../label/LabelSizeContext";
import { useIsomorphicLayoutEffect } from "../../utils/isomorphicLayoutEffect";
import { useAvatarGroupSize } from "./AvatarGroupContext";
import { getInitials } from "./avatarInitials";
import { defaultAvatarTheme } from "./defaultAvatarTheme";

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar({ src, alt, name, imgProps, children, ...props }, ref) {
    const theme = useTheme();
    const avatarThemeBase = theme?.avatar ?? defaultAvatarTheme;
    // inside an AvatarGroup, the group's size is this avatar's size default; an explicit prop wins
    const groupSize = useAvatarGroupSize();
    const avatarTheme = useMemo(
      () => withLabelSizeDefault(avatarThemeBase, groupSize),
      [avatarThemeBase, groupSize]
    );

    // the src that failed, so a new src gets its own try
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const showImage = !!src && failedSrc !== src;

    // An image that failed before hydration fired its error event before React listened:
    // a complete image with no pixels is a failed one.
    useIsomorphicLayoutEffect(() => {
      const img = imgRef.current;
      if (img && src && img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
        setFailedSrc(src);
      }
    }, [src]);

    const label = alt ?? name;
    const onImgError = imgProps?.onError;
    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (src) setFailedSrc(src);
      onImgError?.(event);
    };

    // Without an image the avatar is a picture made of text or an icon: with a name it is
    // announced as one image of that name, and its letters are not read out one by one.
    const pictureRole = !showImage && label ? { role: 'img' as const, 'aria-label': label } : undefined;

    let content: React.ReactNode;
    if (showImage) {
      content = (
        <img
          {...imgProps}
          ref={imgRef}
          className="vane-avatar-image"
          src={src}
          alt={label ?? ''}
          onError={handleError}
        />
      );
    } else if (children !== undefined && children !== null && children !== false) {
      content = children;
    } else {
      const initials = name ? getInitials(name) : '';
      content = initials || avatarTheme.themes.fallbackElement();
    }

    return (
      <ThemedComponent ref={ref} theme={avatarTheme} {...pictureRole} {...props}>
        {content}
      </ThemedComponent>
    );
  }
);

Avatar.displayName = 'Avatar';

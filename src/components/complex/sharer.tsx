import React from 'react';

type Platform = 'fb' | 'li' | 'x' | 'th' | 'em' | 'wa' | 'tg' | 're';

interface SocialShareCommonProps {
  url?: string;
  text?: string;
  width?: number;
  height?: number;
  isLink?: boolean;
  isBlank?: boolean;
  platforms?: Platform[];
  containerComponent?: React.ElementType;
  buttonComponent?: React.ElementType;
  buttonComponents?: Partial<Record<Platform, React.ElementType>>;
}

interface FacebookShareProps {
  hashtag?: string;
}

interface TwitterShareProps {
  hashtags?: string;
  via?: string;
  related?: string;
  inReplyTo?: string;
}

interface EmailShareProps {
  title?: string;
  to?: string;
}

interface WhatsAppShareProps {
  to?: string;
  web?: boolean;
}

interface SocialShareProps extends SocialShareCommonProps {
  facebookProps?: FacebookShareProps;
  twitterProps?: TwitterShareProps;
  emailProps?: EmailShareProps;
  whatsappProps?: WhatsAppShareProps;
}

interface ShareConfig {
  shareUrl: string;
  getParams: () => { [key: string]: string | number | boolean | undefined };
}

const buildQueryString = (
  params: { [key: string]: string | number | boolean | undefined }
): string => {
  const validKeys = Object.keys(params).filter(
    key => params[key] !== undefined && params[key] !== ''
  );
  return validKeys.length > 0
    ? '?' +
        validKeys
          .map(key => `${key}=${encodeURIComponent(String(params[key]))}`)
          .join('&')
    : '';
};

export const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  text = '',
  width = 600,
  height = 480,
  isLink = false,
  isBlank = true,
  platforms,
  containerComponent,
  buttonComponent,
  buttonComponents,
  facebookProps = {},
  twitterProps = {},
  emailProps = {},
  whatsappProps = {},
}) => {
  const shareConfigs: { [key in Platform]: ShareConfig } = {
    fb: {
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
      getParams: () => ({
        u: url,
        hashtag: facebookProps.hashtag
          ? facebookProps.hashtag.startsWith('#')
            ? facebookProps.hashtag
            : `#${facebookProps.hashtag}`
          : '',
        quote: text,
      }),
    },
    li: {
      shareUrl: 'https://www.linkedin.com/shareArticle',
      getParams: () => ({
        url,
      }),
    },
    x: {
      shareUrl: 'https://x.com/intent/tweet',
      getParams: () => ({
        text,
        url,
        hashtags: twitterProps.hashtags,
        via: twitterProps.via,
        related: twitterProps.related,
        in_reply_to: twitterProps.inReplyTo,
      }),
    },
    th: {
      shareUrl: 'https://threads.net/intent/post',
      getParams: () => ({
        text: `${text} ${url}`,
      }),
    },
    em: {
      shareUrl: 'mailto:' + (emailProps.to || ''),
      getParams: () => ({
        subject: emailProps.title,
        body: `${text}\n${url}`,
      }),
    },
    wa: {
      shareUrl: whatsappProps.web
        ? 'https://web.whatsapp.com/send'
        : 'https://wa.me/',
      getParams: () => ({
        phone: whatsappProps.to,
        text: `${text} ${url}`,
      }),
    },
    tg: {
      shareUrl: 'https://t.me/share',
      getParams: () => ({
        text,
        url,
      }),
    },
    re: {
      shareUrl: 'https://www.reddit.com/submit',
      getParams: () => ({
        url,
        title: text,
      }),
    },
  };

  const platformLabels: { [key in Platform]: string } = {
    fb: 'Facebook',
    li: 'LinkedIn',
    x: 'X',
    th: 'Threads',
    em: 'Email',
    wa: 'WhatsApp',
    tg: 'Telegram',
    re: 'Reddit',
  };

  const buildShareUrl = (config: ShareConfig): string => {
    const params = config.getParams();
    const queryString = buildQueryString(params);
    return config.shareUrl + queryString;
  };

  const openShareWindow = (shareUrl: string): void => {
    if (isLink) {
      if (isBlank) {
        window.open(shareUrl, '_blank');
      } else {
        window.location.href = shareUrl;
      }
    } else {
      const left = window.innerWidth / 2 - width / 2 + window.screenX;
      const top = window.innerHeight / 2 - height / 2 + window.screenY;
      const popParams = `scrollbars=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      const newWindow = window.open(shareUrl, '', popParams);
      if (newWindow) {
        newWindow.focus();
      }
    }
  };

  const handleShare = (key: Platform): void => {
    const config = shareConfigs[key];
    if (!config) return;
    const shareUrl = buildShareUrl(config);
    openShareWindow(shareUrl);
  };

  const ContainerComponent = containerComponent || 'div';
  const DefaultButton = buttonComponent || 'button';
  const platformsToShow: Platform[] =
    platforms || (Object.keys(shareConfigs) as Platform[]);

  return (
    <ContainerComponent>
      {platformsToShow.map(key => {
        const Button = (buttonComponents && buttonComponents[key]) || DefaultButton;
        const label = platformLabels[key] || key;
        return (
          <Button
            key={key}
            onClick={() => handleShare(key)}
            title={`Share on ${label}`}
          >
            {label}
          </Button>
        );
      })}
    </ContainerComponent>
  );
};

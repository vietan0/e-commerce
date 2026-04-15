import { Icon } from '@iconify/react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { type MouseEvent, useState } from 'react';
import theme from '@/app/theme';
import locales from '@/src/i18n/locales';

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const t = useTranslations('common');
  const currentLocale = useLocale();

  async function changeLanguage(locale: string) {
    await cookieStore.set('locale', locale);
    window.location.reload();
  }

  return (
    <>
      <IconButton
        aria-controls={open ? 'language-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        aria-label={t('Toggle language')}
        color="inherit"
        id="language-btn"
        onClick={handleClick}
        title={t('Toggle language')}
      >
        <Icon fontSize={20} icon="material-symbols:translate-rounded" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        id="language-menu"
        onClose={handleClose}
        open={open}
        slotProps={{
          list: {
            'aria-labelledby': 'language-btn',
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        {locales.map((locale) => (
          <MenuItem
            key={locale.code}
            onClick={() => changeLanguage(locale.code)}
            selected={locale.code === currentLocale}
          >
            {locale.code === currentLocale && (
              <ListItemIcon>
                <Icon
                  fontSize={20}
                  icon="material-symbols:check-rounded"
                  style={{
                    color: theme.palette.primary.main,
                  }}
                />
              </ListItemIcon>
            )}
            <ListItemText
              inset={locale.code !== currentLocale}
              slotProps={{
                primary: {
                  fontSize: 14,
                },
              }}
            >
              {locale.name}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

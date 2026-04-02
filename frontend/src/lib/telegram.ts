export const getTelegramUser = () => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    return tg.initDataUnsafe.user;
  }
  return null;
};

export const expandTelegramApp = () => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }
};

export const closeTelegramApp = () => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    tg.close();
  }
};

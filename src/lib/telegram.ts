// Telegram WebApp types (subset we use)
interface ThemeParams {
  bg_color?: string
  button_color?: string
  button_text_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  secondary_bg_color?: string
}

interface HapticFeedback {
  impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void
  selectionChanged: () => void
}

interface BackButton {
  show: () => void
  hide: () => void
  onClick: (callback: () => void) => void
  offClick: (callback: () => void) => void
}

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  colorScheme: 'light' | 'dark'
  themeParams: ThemeParams
  HapticFeedback: HapticFeedback
  BackButton: BackButton
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

function getTg(): TelegramWebApp | undefined {
  return typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined
}

export function initTelegram(): void {
  const tg = getTg()
  if (!tg) return
  tg.ready()
  tg.expand()
  applyTheme(tg)
}

function applyTheme(tg: TelegramWebApp): void {
  const root = document.documentElement
  const scheme = tg.colorScheme ?? 'dark'
  root.classList.toggle('dark', scheme === 'dark')
  const params = tg.themeParams || {}
  if (params.bg_color) root.style.setProperty('--tg-theme-bg-color', params.bg_color)
  if (params.button_color) root.style.setProperty('--tg-theme-button-color', params.button_color)
  if (params.button_text_color) root.style.setProperty('--tg-theme-button-text-color', params.button_text_color)
  if (params.text_color) root.style.setProperty('--tg-theme-text-color', params.text_color)
  if (params.hint_color) root.style.setProperty('--tg-theme-hint-color', params.hint_color)
  if (params.link_color) root.style.setProperty('--tg-theme-link-color', params.link_color)
  if (params.secondary_bg_color) root.style.setProperty('--tg-theme-secondary-bg-color', params.secondary_bg_color)
}

export function hapticLight(): void {
  getTg()?.HapticFeedback?.impactOccurred?.('light')
}

export function showBackButton(callback: () => void): () => void {
  const tg = getTg()
  if (!tg?.BackButton) return () => {}
  tg.BackButton.show()
  tg.BackButton.onClick(callback)
  return () => {
    tg.BackButton.offClick(callback)
    tg.BackButton.hide()
  }
}

export function hideBackButton(): void {
  getTg()?.BackButton?.hide()
}

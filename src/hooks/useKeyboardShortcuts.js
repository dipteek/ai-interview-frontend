// src/hooks/useKeyboardShortcuts.js
import { useEffect } from 'react'

export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key
      const ctrl = event.ctrlKey || event.metaKey
      const shift = event.shiftKey
      const alt = event.altKey

      let shortcutKey = ''
      if (ctrl) shortcutKey += 'Ctrl+'
      if (shift) shortcutKey += 'Shift+'
      if (alt) shortcutKey += 'Alt+'
      shortcutKey += key

      if (shortcuts[shortcutKey]) {
        event.preventDefault()
        shortcuts[shortcutKey](event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

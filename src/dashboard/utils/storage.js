const PREFIX = 'fg_'

export const storage = {
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(PREFIX + key)
      return val === null ? fallback : JSON.parse(val)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      // storage full or unavailable
    }
  },
  remove(key) {
    localStorage.removeItem(PREFIX + key)
  },
}

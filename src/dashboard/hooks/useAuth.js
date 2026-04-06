import { useState, useCallback } from 'react'
import { storage } from '../utils/storage'

const DEFAULT_PIN = '1234'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => storage.get('auth') === true
  )

  const login = useCallback((pin) => {
    const savedPin = storage.get('pin') || DEFAULT_PIN
    if (pin === savedPin) {
      storage.set('auth', true)
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    storage.remove('auth')
    setIsAuthenticated(false)
  }, [])

  const changePin = useCallback((oldPin, newPin) => {
    const savedPin = storage.get('pin') || DEFAULT_PIN
    if (oldPin !== savedPin) return false
    storage.set('pin', newPin)
    return true
  }, [])

  return { isAuthenticated, login, logout, changePin }
}

import { useState, useCallback } from 'react'
import { storage } from '../utils/storage'
import { emptyFinanciar } from '../utils/calculations'

function loadTarguri() {
  return storage.get('targuri', [])
}

export function useTarguri() {
  const [targuri, setTarguri] = useState(loadTarguri)

  const persist = useCallback((updated) => {
    storage.set('targuri', updated)
    setTarguri(updated)
  }, [])

  const addTarg = useCallback((data) => {
    const targ = {
      id:        crypto.randomUUID(),
      nume:      data.nume     || 'Târg fără nume',
      locatie:   data.locatie  || '',
      data:      data.data     || new Date().toISOString().slice(0, 10),
      status:    data.status   || 'in_asteptare',
      ...emptyFinanciar(),
      createdAt: new Date().toISOString(),
    }
    persist([...loadTarguri(), targ])
    return targ
  }, [persist])

  const updateTarg = useCallback((id, patch) => {
    persist(loadTarguri().map(t => t.id === id ? { ...t, ...patch } : t))
  }, [persist])

  const deleteTarg = useCallback((id) => {
    persist(loadTarguri().filter(t => t.id !== id))
  }, [persist])

  const getTarg = useCallback((id) => {
    return loadTarguri().find(t => t.id === id) || null
  }, [])

  return { targuri, addTarg, updateTarg, deleteTarg, getTarg }
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  user: string | null
  setUser: (user: string) => void
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: string) => set({ user }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    },
  ),
)

export default useStore

import React, { createContext, useEffect, useState } from 'react'
import NavBar, { Url } from './navbar'
import { axiosWithApi } from '@lib/client/axios'
import { ToastContainer } from 'react-toastify'

const urls: Url[] = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/test',
    name: 'Test',
  },
  {
    url: '/about',
    name: 'About',
  },
  {
    url: '/contact',
    name: 'Contact',
  },
]

export interface User {
  email: string | undefined
  first_name: string | undefined
  last_name: string | undefined
  id: string | undefined
}

export const HistoryContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([
  [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
])

export const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([
  {
    email: undefined,
    first_name: undefined,
    last_name: undefined,
    id: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
])

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  const [user, setUser] = useState<User>({
    email: undefined,
    first_name: undefined,
    last_name: undefined,
    id: undefined,
  })

  useEffect(() => {
    if (user.id !== undefined) return

    axiosWithApi
      .get('/user')
      .then((response) => setUser({ ...response.data.user } as User))
      .catch((e) => {
        if (e.response.status === 401) {
          axiosWithApi
            .get('/authentication/refresh')
            .then((response) => setUser({ ...response.data.user } as User))
            .catch((e) => {
              if (e.response.status !== 401) console.error(e.message)
            })
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <HistoryContext.Provider value={[history, setHistory]}>
          <NavBar urls={urls} authenticated={user.id !== undefined} />
          {children}
        </HistoryContext.Provider>
      </UserContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </>
  )
}

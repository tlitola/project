import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BaseRouter } from 'next/dist/shared/lib/router/router'
import React, { useContext, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { axiosWithApi } from '@lib/client/axios'
import { UserContext } from './layout'
import { toast } from 'react-toastify'

export interface Url {
  url: string
  name: string
}

interface Props {
  history: string[]
  urls: Url[]
  authenticated: boolean
}

export const protectedSites = ['/protected']

const NavBar: React.FC<Props> = ({ history, urls, authenticated }) => {
  const [showMenu, setShowMenu] = useState(false)

  const router = useRouter()

  const [, setUser] = useContext(UserContext)

  const onMenuClick = useMemo(
    () =>
      debounce(() => setShowMenu((prev) => !prev), 100, {
        leading: true,
        trailing: false,
      }),
    []
  )

  const onLogoutClick = useMemo(
    () =>
      debounce(
        () => {
          axiosWithApi
            .get('/authentication/logout')
            .then(() => {
              setUser({
                email: undefined,
                first_name: undefined,
                last_name: undefined,
                id: undefined,
              })
              toast.info('Logged out')

              if (protectedSites.includes(router.pathname)) {
                router.push('/')
              }
            })
            .catch((e) => console.error(e))
        },
        1000,
        {
          leading: true,
          trailing: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
      <nav className="bg-white sticky top-0 flex z-10 md:w-10/12 h-16 flex-auto items-center flex-wrap rounded m-auto px-3">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-6">
            <Image src="/logo.svg" width={24} height={24} alt="project" />
            <p className="text-2xl text-rose-700 ml-1 p-2 font-bold">Project</p>
          </a>
        </Link>

        <span
          className={
            'hidden md:inline-flex md:flex-row md:mx-auto md:w-auto md:items-center h-full'
          }
        >
          {urls.map((url) => (
            <Link key={url.name} href={url.url}>
              <a
                className={`${
                  router.pathname == url.url
                    ? 'text-gray-500 border-b-2 border-slate-400'
                    : ''
                } h-full px-4 font-bold text-md inline-flex items-center justify-center hover:text-gray-500 active:text-gray-300`}
              >
                {url.name}
              </a>
            </Link>
          ))}
        </span>

        <span className="hidden md:inline-flex md:flex-row md:w-[124px] md:items-center">
          {authenticated ? (
            <>
              <button
                className="h-full pr-4  font-bold text-md text-slate-700 hover:text-gray-500 active:text-gray-300"
                onClick={onLogoutClick}
              >
                Log Out
              </button>
              <Link href="/profile">
                <a className="p-2 inline-flex items-center">
                  <Image src={'/profile.svg'} height={24} width={24} alt="profile" />
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="h-full pr-4 font-bold text-md text-slate-700 hover:text-gray-500 active:text-gray-300">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="h-full font-bold text-md text-rose-700 hover:text-rose-500 active:text-rose-300">
                  Sign up
                </a>
              </Link>
            </>
          )}
        </span>
        <span className="md:hidden ml-auto inline-flex items-center">
          {authenticated && (
            <button
              className="h-full pr-4  font-bold text-md text-slate-700 hover:text-gray-500 active:text-gray-300"
              onClick={onLogoutClick}
            >
              Log Out
            </button>
          )}
          <Link href={authenticated ? '/profile' : '/signup'}>
            <a className="p-2">
              <Image src={'/profile.svg'} height={24} width={24} alt="profile" />
            </a>
          </Link>
        </span>

        <button
          className=" inline-flex p-3 rounded md:hidden text-white"
          onClick={onMenuClick}
        >
          <Image src="/hamburger_icon.svg" width={24} height={24} alt="menu" />
        </button>
      </nav>

      {showMenu && (
        <span
          className={'fixed flex z-20 flex-col bg-white w-4/5 h-screen md:hidden'}
        >
          {urls.map((url) => (
            <Link key={url.name} href={url.url}>
              <a
                className={`${
                  router.pathname == url.url ? 'text-gray-500' : ''
                } p-4 font-bold text-md border-t border-slate-300 inline-flex items-center active:text-gray-400`}
              >
                {url.name}
              </a>
            </Link>
          ))}
        </span>
      )}
    </>
  )
}

export default NavBar

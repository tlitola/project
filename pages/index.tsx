import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import { useContext, useEffect } from 'react'
import { HistoryContext } from '@components/layout'

const Home: NextPage = () => {
  const [, setHistory] = useContext(HistoryContext)

  useEffect(() => {
    setHistory((prev) => [...prev, router.pathname])
    console.log(process.env.HTTPS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className="h-30"
        src={'/bg.svg'}
        width={1920}
        height={1082}
        alt=""
        layout="responsive"
      />
    </>
  )
}

export default Home

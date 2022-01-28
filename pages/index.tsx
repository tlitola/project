import type { NextPage } from 'next'
import Head from 'next/head'
import { Navigation } from '../components/navigation/navigation'

const Home: NextPage = () => {
  return (
    <Navigation>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Hello World</div>
    </Navigation>
  )
}

export default Home

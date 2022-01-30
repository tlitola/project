import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components/layout'

const Home: NextPage = () => {
	return (
		<Layout>
			<Head>
				<title>Create Next App</title>
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
		</Layout>
	)
}

export default Home

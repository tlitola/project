import { NextPage } from 'next'
import router from 'next/router'
import { useContext, useEffect } from 'react'
import { HistoryContext } from '../components/layout'

const Contact: NextPage = () => {
	const [, setHistory] = useContext(HistoryContext)

	useEffect(() => {
		setHistory((prev) => [...prev, router.pathname])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <p>Contact</p>
}
export default Contact

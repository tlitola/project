import { NextPage } from 'next'
import { HistoryContext, Layout } from '../components/layout'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import Joi from 'joi'
import { DebounceInput } from 'react-debounce-input'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const ReactTooltip = dynamic(() => import('react-tooltip'), {
	ssr: false,
})

const formSchema = Joi.object().keys({
	email: Joi.string()
		.trim()
		.email({ tlds: { allow: false } })
		.label('Email'),
})

interface Form {
	email: ''
	password: ''
	[index: string]: string
}

const Login: NextPage = () => {
	const router = useRouter()

	const [form, setForm] = useState<Form>({
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState({
		email: '',
	})

	const [history] = useContext(HistoryContext)

	const onChange = (field: string, value: string): void => {
		if (value.length === 0) {
			setErrors((prev) => ({ ...prev, [field]: '' }))
			return
		}
		const validate = formSchema.validate({ [field]: value })
		if (validate.error !== undefined) {
			setErrors((prev) => ({ ...prev, [field]: validate.error.message }))
			setForm((prev) => ({ ...prev, [field]: value }))
		} else {
			setErrors((prev) => ({ ...prev, [field]: '' }))
			setForm((prev) => ({ ...prev, [field]: value }))
		}
	}

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault()
		const error: Array<[string, string]> = []
		const validate = formSchema.validate({ email: form.email })
		if (validate.error !== undefined) {
			error.push(['email', validate.error.message])
		}

		if (error.length !== 0) {
			setErrors((prev) => {
				let tempError = { ...prev }

				error.forEach((el) => {
					tempError = { ...tempError, [el[0]]: el[1] }
				})
				return tempError
			})
			return
		}
		if (history.length === 0) {
			router.push('/')
		} else router.push(history[history.length - 1])
	}

	return (
		<>
			<Head>
				<title>Log in</title>
			</Head>
			<Image
				src="/bg-3.png"
				alt=""
				layout="fill"
				objectFit="cover"
				objectPosition="center"
			/>
			<section className="bg-white absolute h-[60%] top-[20%] w-[80%] left-[10%] lg:w-[40%] md:h-[50%] md:top-[25%] lg:left-[30%] z-10 drop-shadow-[0_0_35px_rgba(0,0,0,0.5)] ">
				<form className="flex flex-col items-center justify-center w-4/5 md:w-2/3 mx-auto mt-5 md:mt-12 ">
					<h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-7">Log in</h1>
					<p className="self-start pl-1 mb-1 font-bold text-md">Email</p>
					<DebounceInput
						value={form.email}
						data-tip={errors.email}
						debounceTimeout={300}
						onChange={(e) => onChange('email', e.target.value)}
						type="email"
						placeholder="you@example.com"
						className={`w-full mb-2 placeholder:italic placeholder:text-slate-400 ${
							errors.email
								? 'border-rose-500 focus:ring-1 focus:border-rose-500 focus:ring-red-500'
								: ''
						}`}
					/>
					<p className="self-start pl-1 mb-1 font-bold text-md">Password</p>
					<DebounceInput
						value={form.password}
						debounceTimeout={300}
						onChange={(e) => onChange('password', e.target.value)}
						type="password"
						placeholder="Password"
						className="w-full  placeholder:italic placeholder:text-slate-400"
					/>

					<p className="mb-3 text-sm self-end cursor-pointer hover:text-slate-600 active:text-black select-none">
						Forgot password?
					</p>

					<button
						onClick={(e) => onSubmit(e)}
						className="font-bold text-slate-100 text-lg bg-blue-600 w-full h-10 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-slate-100"
					>
						Log In
					</button>

					<p className="text-sm mx-auto mt-3">
						If you don{"'"}t have an account, you can{' '}
						<Link href="/signup">
							<a>
								<b>Sign up</b>
							</a>
						</Link>{' '}
						instead
					</p>
				</form>
			</section>
			<ReactTooltip place="bottom" type="error" effect="solid" />
		</>
	)
}

export default Login

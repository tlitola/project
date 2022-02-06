import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import Joi from 'joi'
import { DebounceInput } from 'react-debounce-input'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HistoryContext, UserContext } from '@components/layout'
const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
})
import { axiosWithApi } from '@lib/client/axios'
import { pick } from 'lodash'
import { toast } from 'react-toastify'

const formSchema = Joi.object().keys({
  first_name: Joi.string().trim().token().min(3).max(30).label('First name'),
  last_name: Joi.string().trim().token().min(3).max(30).label('Last name'),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .label('Email'),
  password: Joi.string().trim().min(8).label('Password'),
  terms: Joi.boolean()
    .equal(true)
    .error(new Error('You must accept the terms of service')),
})

interface Form {
  first_name: ''
  last_name: ''
  email: ''
  password: ''
  terms: boolean
  [index: string]: string | boolean
}

const Signup: NextPage = () => {
  const router = useRouter()

  const [form, setForm] = useState<Form>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    terms: false,
  })

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    terms: '',
  })

  const [history] = useContext(HistoryContext)
  const [, setUser] = useContext(UserContext)

  const onChange = (field: string, value: string | boolean): void => {
    if (field !== 'terms' && value.toString().length === 0) {
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

    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        const validate = formSchema.validate({ [key]: form[key] })
        if (validate.error !== undefined) {
          error.push([key, validate.error.message])
        }
      }
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

    axiosWithApi
      .post('/authentication/signup', {
        user: pick(form, ['email', 'last_name', 'first_name', 'password']),
      })
      .then((response) => {
        setUser(response.data.user)
        toast.success('Signed up')
        if (history.length === 0) {
          router.push('/signup')
        } else router.push(history[history.length - 1])
      })
      .catch((e) => toast.error(e.response.data))
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Image
        src="/bg-2.png"
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <section className="bg-white absolute h-[80%] top-[10%] w-[80%] left-[10%] md:w-1/2 md:h-[70%] md:top-[15%] md:left-1/4 z-10 drop-shadow-[0_0_35px_rgba(0,0,0,0.5)] ">
        <form className="flex flex-col items-center justify-center w-4/5 md:w-2/3 mx-auto mt-5 md:mt-12 ">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-7">Sign up</h1>
          <h1 className="text-md mb-3 self-start hidden md:block">
            Welcome to <b>Project</b>! Enter your information below to sign up to
            this test website
          </h1>
          <span className="inline-flex items-center justify-center mb-1 w-full">
            <p className="w-1/2 pl-1 font-bold text-md">Fist name</p>
            <p className="w-1/2 pl-1 font-bold text-md">Last name</p>
          </span>
          <span className="inline-flex items-center justify-center mb-2 w-full">
            <DebounceInput
              value={form.first_name}
              data-tip={errors.first_name}
              debounceTimeout={300}
              onChange={(e) => onChange('first_name', e.target.value)}
              type="text"
              placeholder="First name"
              className={`w-1/2 placeholder:italic placeholder:text-slate-400 ${
                errors.first_name
                  ? 'border-rose-500 focus:ring-1 focus:border-rose-500 focus:ring-red-500'
                  : ''
              }`}
            />
            <DebounceInput
              value={form.last_name}
              data-tip={errors.last_name}
              debounceTimeout={300}
              onChange={(e) => onChange('last_name', e.target.value)}
              type="text"
              placeholder="Last name"
              className={`w-1/2 placeholder:italic placeholder:text-slate-400 ${
                errors.last_name
                  ? 'border-rose-500 focus:ring-1 focus:border-rose-500 focus:ring-red-500'
                  : ''
              }`}
            />
          </span>
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
            data-tip={errors.password}
            debounceTimeout={300}
            onChange={(e) => onChange('password', e.target.value)}
            type="password"
            placeholder="Password"
            className={`w-full mb-1 placeholder:italic placeholder:text-slate-400 ${
              errors.password
                ? 'border-rose-500 focus:ring-1 focus:border-rose-500 focus:ring-red-500'
                : ''
            }`}
          />
          <PasswordStrengthBar className="w-full" password={form.password} />

          <span className="flex w-full mb-4">
            <input
              data-tip={errors.terms}
              checked={form.terms}
              onChange={(e) => onChange('terms', e.target.checked)}
              type="checkbox"
              placeholder="Confirm password"
              className={`self-start my-auto ${
                errors.terms ? 'border-rose-500 outline-1 outline-rose-500 ' : ''
              }`}
            />
            <p className="my-auto text-sm ml-2">
              I have read and agree to the{' '}
              <Link href="/terms">
                <a>
                  <em>terms of service </em>
                </a>
              </Link>
            </p>
          </span>
          <button
            onClick={(e) => onSubmit(e)}
            className="font-bold text-slate-100 text-lg bg-rose-600 w-full h-10 hover:bg-rose-500 hover:text-white active:bg-rose-600 active:text-slate-100"
          >
            Sign up
          </button>

          <p className="text-sm mx-auto mt-2">
            If you already have an account, you can{' '}
            <Link href="/login">
              <a>
                <b>log in</b>
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
export default Signup

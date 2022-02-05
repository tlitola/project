import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { HistoryContext } from '@components/layout'
import { GetServerSideProps } from 'next'
import { protectClientRequest } from '@lib/api/middleware/protectClientRequest'
import { toast } from 'react-toastify'
import { protectSite } from '@lib/client/protectSite'

interface Props {
  redirect?: string
}

const Protected: NextPage<Props> = ({ redirect }) => {
  const [, setHistory] = useContext(HistoryContext)
  const router = useRouter()

  useEffect(() => {
    setHistory((prev) => [...prev, router.pathname])
    protectSite(redirect, router)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>There is nothing to see here</p>
}

export default Protected

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (await protectClientRequest(ctx)) return { props: { redirect: 'login' } }

  return {
    props: {},
  }
}

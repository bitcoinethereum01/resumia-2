import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from 'components/layout/Layout'
import { Provider } from 'react-redux'
import { store } from 'components/store'
import { Toaster } from 'react-hot-toast'
import { appWithTranslation } from 'next-i18next'

function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {

  return (
    <SessionProvider 
      session={session}
      refetchOnWindowFocus={false}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster position='top-right' />
        <div id="modal" className=""></div>
      </Provider>
    </SessionProvider>
  )
}

export default appWithTranslation(App);
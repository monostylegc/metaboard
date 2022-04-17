import '../styles/globals.css'
import { useEffect } from 'react'

import { useWeb3 } from '../lib/web3store';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  const { loadProvider } = useWeb3()

  useEffect(() => {
    loadProvider()
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </>
  )
}

export default MyApp

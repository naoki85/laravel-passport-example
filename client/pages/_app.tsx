import { SWRConfig } from 'swr'
import fetch from '../lib/fetchJson'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        },
        shouldRetryOnError: false
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
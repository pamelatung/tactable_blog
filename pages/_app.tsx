import '@/styles/global.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type {AppProps} from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <Script
        id="tm-container"
        dangerouslySetInnerHTML={{
          __html: `
              (function (w, d, s, l, h, m) {
                  w[l] = w[l] || [];
                  var f = d.getElementsByTagName(s)[0],
                      j = d.createElement(s), dl = l != 'dmpkitdl' ? '&l=' + l : '';
                  j.async = true;
                  j.src = '//' + m + '/tm.js?id=' + h + dl;
                  f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dmpkitdl', 'f97d4fa5-b0d7-4931-b031-d53771dd034a', 'static.ctm.services.dmpkit');
          `,
        }}
        onLoad={() => {
          console.log('TM container has loaded')
        }}
      />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}

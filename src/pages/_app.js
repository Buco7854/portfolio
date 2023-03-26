import '@/styles/globals.css'
import {ThemeProvider} from "next-themes";

export default function App({ Component, pageProps }) {
  return(
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          <Component {...pageProps}/>
      </ThemeProvider>
  )
}

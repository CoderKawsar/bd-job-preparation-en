
import Providers from '@/lib/Providers'
import './globals.css'
import ToastProvider from '@/lib/ToastProvider'



export const metadata = {
  title: 'ইজি জব প্রিপারেশন ',
  description: 'Easy Job Preparetion | Easy Job Preparetion',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en" data-theme='light'>
        <body>
          <ToastProvider>
            {children}
          </ToastProvider>
        </body>
      </html>
    </Providers>
  )
}

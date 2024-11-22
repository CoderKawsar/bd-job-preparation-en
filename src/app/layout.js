import Providers from "@/lib/Providers";
import "./globals.css";
import ToastProvider from "@/lib/ToastProvider";

export const metadata = {
  title: "বিডি জব প্রিপারেশন ",
  description: "BD Job Preparation | BD Job Preparation",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </html>
    </Providers>
  );
}

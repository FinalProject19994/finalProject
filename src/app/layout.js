import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

export const metadata = {
  title: "Core Skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

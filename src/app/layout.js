import "./globals.css";

export const metadata = {
  title: "JobBoard Pro | Find Developer Jobs",
  description:
    "A Next.js job board app for searching and filtering developer jobs.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
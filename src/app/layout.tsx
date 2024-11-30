// import type { Metadata } from "next";
// // import localFont from "next/font/local";
// import { Inter as FontSans } from "next/font/google";
// import { cn } from "@/lib/utils";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"

// // const geistSans = localFont({
// //   src: "./fonts/GeistVF.woff",
// //   variable: "--font-geist-sans",
// //   weight: "100 900",
// // });
// // const geistMono = localFont({
// //   src: "./fonts/GeistMonoVF.woff",
// //   variable: "--font-geist-mono",
// //   weight: "100 900",
// // });


// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "Payplan",
//   description: "Payplan is a personal finance app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
// <>
//       <html lang="en" suppressHydrationWarning>
//         <head />
//         <body
//           className={cn(
//             "min-h-screen bg-background font-sans antialiased",
//             fontSans.variable
//           )}
//         >
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             disableTransitionOnChange
//           >
//             {children}
//             <Toaster />
//           </ThemeProvider>
//         </body>
//       </html>
//     </>  );
// }


import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Magic UI",
  description: "The startup template from Magic UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1️⃣ Font Configuration Refactoring
const primarySans = Geist({
  variable: "--font-primary-sans",
  subsets: ["latin"],
  display: 'swap',
});

const primaryMono = Geist_Mono({
  variable: "--font-primary-mono",
  subsets: ["latin"],
  display: 'swap',
});

// 2️⃣ Enhanced & Unique Metadata (Originality Boost)
export const metadata = {
  title: {
    default: "Md Sadik | Full-Stack Engineer & System Architect",
    template: "%s | Md Sadik"
  },
  description: 
    "Personal engineering portfolio of Md Sadik. Featuring high-performance Full Stack systems, AI/ML integrations, and production-grade web architecture.",
  
  keywords: [
    "Md Sadik", 
    "System Architect", 
    "Lead Full Stack Engineer", 
    "MERN Stack Developer", 
    "AI/ML Enthusiast", 
    "Next.js Specialist", 
    "Software Engineering Portfolio"
  ],

  // Metadata branding refresh
  metadataBase: new URL("https://sadikaslam.vercel.app"), 
  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo.png",
  },

  // Refactored OpenGraph logic
  openGraph: {
    title: "Md Sadik - Portfolio & Engineering Craft",
    description: "Architecting scalable digital solutions and production-ready applications.",
    url: "https://sadikaslam.vercel.app",
    siteName: "Md Sadik Digital",
    images: [
      {
        url: "/profile.png", // Aapka profile image OG image ki tarah kaam karega
        width: 1200,
        height: 630,
        alt: "Md Sadik Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Md Sadik | Full-Stack Lead",
    description: "Turning complex problems into elegant digital realities.",
    images: ["/profile.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 3️⃣ Refactored Root Component Logic
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${primarySans.variable} 
          ${primaryMono.variable} 
          min-h-screen bg-background text-primary antialiased selection:bg-primary/10
        `}
      >
        <main className="relative flex min-col flex-col overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
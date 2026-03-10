import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Whatsapp from "@/components/Whatsapp";
import { Toaster } from "sonner";

// 1. Setup the font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta", // This creates a CSS variable
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rapticomputers.com"), 
  title: {
    default: "Rapti Computers | Best Computer Institute in Saharanpur",
    template: "%s | Rapti Computers",
  },
  description: "Rapti Computers is Saharanpur’s most trusted computer institute offering O Level, CCC, Tally, and professional computer courses.",
  keywords: ["Rapti Computers", "Computer Institute", "O Level Saharanpur", "CCC course Saharanpur"],
  authors: [{ name: "Rapti Computers" }],
  creator: "Rapti Computers",
  
  // 2. Combined OpenGraph (No duplicates!)
  openGraph: {
    title: "Rapti Computers | Best Computer Institute in Saharanpur",
    description: "Join Rapti Computers for O Level, CCC, and professional computer courses in Saharanpur.",
    url: "https://rapticomputers.com",
    siteName: "Rapti Computers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Path relative to public folder
        width: 1200,
        height: 630,
        alt: "Rapti Computers Institute",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rapti Computers | Computer Institute in Saharanpur",
    description: "Trusted computer coaching institute in Saharanpur for O Level and CCC courses.",
    images: ["/og-image.png"], 
  },

  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/icon.ico",
  },

  verification: {
    google: 'ZRQZe3NbqZVQmfxQYxHF85PHH6XVkTxcdB5V1ymn5dw'
  },

  alternates: {
    canonical: "https://rapticomputers.com",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font variable to the body */}
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <Navbar />
        
        {/* SEO Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ComputerTrainingSchool",
              name: "Rapti Computers",
              url: "https://rapticomputers.com",
              logo: "https://rapticomputers.com/icon.ico",
              description: "Best computer institute in Saharanpur offering O Level, CCC, Tally and professional computer courses.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Opp. Baliya Kheri Block, Krishna Nagar, Delhi Road",
                addressLocality: "Saharanpur",
                addressRegion: "Uttar Pradesh",
                postalCode: "247001",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7618550475",
                contactType: "customer service",
                areaServed: "IN",
              },
            }),
          }}
        />
        
        <Whatsapp />
        <main>{children}</main>
        <Toaster position="top-right" richColors /> {/* 2. Add this line */}
      </body>
    </html>
  );
}
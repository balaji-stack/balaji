import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Roboto } from "next/font/google";
import "./globals.scss";
import Providers from "@/redux/Provider";
config.autoAddCss = false;
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elah Project",
  description: "Elah Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="page_wrapper"><Providers>{children}</Providers></div>
      </body>
    </html>
  );
}

import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}

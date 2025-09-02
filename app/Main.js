"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { usePathname } from "next/navigation";

const Main = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      )}
    </>
  );
};

export default Main;

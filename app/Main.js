"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import LiveStreamModal from "@/components/LiveStreamModal";
import { usePathname } from "next/navigation";

const Main = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <main>
          <LiveStreamModal />
          <Header />
          {children}
          <Footer />
        </main>
      )}
    </>
  );
};

export default Main;

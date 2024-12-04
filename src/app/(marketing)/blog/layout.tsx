// import { SiteFooter } from "@/components/site-footer";
// import { SiteHeader } from "@/components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <>
      {/* <SiteFooter /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

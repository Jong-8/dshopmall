import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";

export default function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <>
      <Header title={`DSHOPMALL | ${title}`} description={title} />
      <ContentLayout>
        <div className="max-w-[832px] m-auto px-4 pt-[60px] pb-[70px] max-md:px-3">
          <div className="text-sm font-bold text-center mb-8">{title}</div>
          <div className="max-md:text-sm">{children}</div>
        </div>
      </ContentLayout>
      <Footer />
    </>
  );
}

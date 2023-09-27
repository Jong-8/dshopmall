import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";

export default function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <>
      <Header title={`DSHOPMALL | ${title}`} description={title} />
      <ContentLayout>
        <div className="max-w-[832px] m-auto px-4 pt-[60px] pb-[70px]">
          <div className="text-sm font-bold text-center mb-8">{title}</div>
          <div>{children}</div>
        </div>
      </ContentLayout>
      <Footer />
    </>
  );
}

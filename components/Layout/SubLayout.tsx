import ContentLayout from "./ContentLayout";
import Footer from "./Footer";
import Header from "./Header";

export default function SubLayout({ children, title }: SubLayoutProps) {
  return (
    <>
      <Header title={title} description={title} />
      <ContentLayout>
        <div className="w-[400px] m-auto pt-[60px] pb-[70px]">
          <div className="font-bold text-xl leading-8 tracking-wider mb-10">
            {title}
          </div>
          <div>{children}</div>
        </div>
      </ContentLayout>
      <Footer />
    </>
  );
}

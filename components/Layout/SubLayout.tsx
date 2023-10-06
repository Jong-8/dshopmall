import ContentLayout from "./ContentLayout";
import Footer from "./Footer";
import Header from "./Header";

export default function SubLayout({ children, title }: SubLayoutProps) {
  return (
    <>
      <Header title={title} description={title} />
      <ContentLayout>
        <div className="w-[400px] m-auto pt-[60px] pb-[70px] max-md:w-[100%] max-md:px-3 max-md:pt-[40px]">
          <div className="font-bold text-xl leading-8 tracking-wider mb-10 max-md:mb-8 max-md:text-lg">
            {title}
          </div>
          <div>{children}</div>
        </div>
      </ContentLayout>
      <Footer />
    </>
  );
}

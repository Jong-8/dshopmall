import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";

export default function Order() {
  return (
    <>
      <Header title="주문하기" description="주문하기" />
      <ContentLayout>주문페이지</ContentLayout>
      <Footer />
    </>
  );
}

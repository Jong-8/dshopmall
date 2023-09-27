import ContentLayout from "@components/Layout/ContentLayout";
import ContentTitle from "@components/Layout/ContentTitle";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";

export default function Dshop() {
  return (
    <>
      <Header title="DSHOPMALL | DSHOP" description="DSHOP" />
      <ContentLayout>
        <ContentTitle title="dshop" />
      </ContentLayout>
      <Footer />
    </>
  );
}

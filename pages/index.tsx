import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Main from "@components/Main";

export default function Home() {
  return (
    <>
      <Header title="DSHOPMALL" description="디샵몰" />
      <ContentLayout>
        <Main />
      </ContentLayout>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

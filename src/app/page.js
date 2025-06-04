import CommenLayout from "@components/layout/CommenLayout";
import BannerSearch from "./_components/BannerSearch";
export const metadata = {
  title: 'Home',
  description: 'Login or sign up to access the Restaurant app.',
};

export default function Home() {
  return (
    <CommenLayout>
      <section>
        <div className="wrapper">
          <div className="container">
            <BannerSearch/>
          </div>
        </div>
      </section>
    </CommenLayout>
  );
}

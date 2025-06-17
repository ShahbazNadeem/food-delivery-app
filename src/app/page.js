import CommenLayout from "@components/layout/CommenLayout";
import BannerSearch from "./_components/BannerSearch";
import { homePageFeatured } from "./data/data";
import Banner from "./_components/Banner";
import FeaturedProductsCard from "@components/FeaturedProductsCard";
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
            <BannerSearch />
          </div>
        </div>
      </section>

      <section>
        <div className="wrapper mt-10">
          <Banner showDetails={false} />
        </div>
      </section>

      <section>
        <div className="wrapper mt-10">
          <div className="container">
            <FeaturedProductsCard data={homePageFeatured} />
          </div>
        </div>
      </section>
    </CommenLayout>
  );
}

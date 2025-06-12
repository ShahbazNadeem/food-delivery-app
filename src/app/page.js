import CommenLayout from "@components/layout/CommenLayout";
import BannerSearch from "./_components/BannerSearch";
import FeaturedProducts from "./_components/FeaturedProducts";
import { homePageFeatured } from "./data/data";
import Banner from "./_components/Banner";
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
        <div className="wrapper">
          <Banner showDetails={false} />
        </div>
      </section>

      <section>
        <div className="wrapper">
          <div className="container">
            <FeaturedProducts>
              {homePageFeatured.map((item) => (
                <FeaturedProducts.Card key={item.id}>
                  <FeaturedProducts.Image src={item.img} alt={item.name} />
                  {/* <FeaturedProducts.Details>
                    <FeaturedProducts.Title>{item.name}</FeaturedProducts.Title>
                    <FeaturedProducts.Price>Rs.{item.price}</FeaturedProducts.Price>
                  </FeaturedProducts.Details> */}
                </FeaturedProducts.Card>
              ))}
            </FeaturedProducts>
          </div>
        </div>
      </section>
    </CommenLayout>
  );
}

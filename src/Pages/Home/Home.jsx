import Banner from "../../Components/Banner/Banner";
import FeaturedProduct from "../../Components/FeaturedProducts/FeaturedProduct";
import TrendingProducts from "../../Components/TrendingProducts/TendingProducts";


const Home = () => {
  return (
    <section>
      <Banner></Banner>
      <FeaturedProduct></FeaturedProduct>
      <TrendingProducts></TrendingProducts>
    </section>
  );
};

export default Home;

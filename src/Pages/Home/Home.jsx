import Banner from "../../Components/Banner/Banner";
import FeaturedProduct from "../../Components/FeaturedProducts/FeaturedProduct";
import OurTeam from "../../Components/OurTeam/OurTeam";
import TrendingProducts from "../../Components/TrendingProducts/TendingProducts";


const Home = () => {
  return (
    <section>
      <Banner></Banner>
      <FeaturedProduct></FeaturedProduct>
      <TrendingProducts></TrendingProducts>
      <OurTeam></OurTeam>
    </section>
  );
};

export default Home;

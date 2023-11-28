import Featured from "../../Components/Featured/Featured";
import Trending from "../../Components/Trending/Trending";
import About from "../About/About";
import Banner from "../Banner/Banner";
import CouponPage from "../CouponPage/CouponPage";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Trending></Trending>
            <CouponPage></CouponPage>
            <About></About>
            
        </div>
    );
};

export default Home;
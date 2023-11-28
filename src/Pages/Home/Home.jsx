import Featured from "../../Components/Featured/Featured";
import Trending from "../../Components/Trending/Trending";
import About from "../About/About";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Trending></Trending>
            <About></About>
            
        </div>
    );
};

export default Home;
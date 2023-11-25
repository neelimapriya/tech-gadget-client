import Featured from "../../Components/Featured/Featured";
import Trending from "../../Components/Trending/Trending";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Trending></Trending>
            
        </div>
    );
};

export default Home;

import logo from '../../assets/logo-12.png'
const About = () => {
    return (
        <div className='text-center '>
            <h2>About </h2>
            <div className='max-w-xl mx-auto flex justify-center items-center '>
            <img src={logo} className="w-28" alt="" />
            <h2 className="text-sm md:text-2xl font-serif text-red-700 font-bold">
              Tech Gadget
            </h2>
            </div>
            <div>

            </div>
        </div>
    );
};

export default About;
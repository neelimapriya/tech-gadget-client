import logo from "../../assets/logo-12.png";
const About = () => {
  return (
    <div className="text-center bg-black py-5">
      <div className="max-w-xl mx-auto flex justify-center items-center ">
        <img src={logo} className="w-28" alt="" />
        <h2 className="text-sm md:text-2xl font-serif text-red-700 font-bold">
          Tech Gadget
        </h2>
      </div>

      <div className="text-white text-center max-w-3xl m-auto">
        <h2 className="text-3xl font-bold py-4 underline">About Tech Gadget</h2>
        <p>
        Tech Gadget surfaces the best new products, every day. It`s a place
          for product-loving enthusiasts to share and geek out about the latest
          mobile apps, websites, hardware projects, and tech creations.
        </p>
      </div>
    </div>
  );
};

export default About;

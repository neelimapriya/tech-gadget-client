import Swal from "sweetalert2";
import logo from "../../assets/logo-12.png";

const Contact = () => {
  const handleSend = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const text = form.text.value;
    console.log(email, name, text);
    const contactData = { email, name, text };

    if (contactData) {
      Swal.fire("Thank you!", "We will contact you soon!", "success");
      form.reset();
    }
  };

  return (
    <div>
      <div className="bg-black text-white h-56 ">
        <h2 className="pt-32 flex justify-center items-center text-2xl md:text-4xl font-serif font-semibold text-red-700">
          Contact us
        </h2>
      </div>

      <div className="mt-10 p-5 flex flex-col md:flex-row max-w-5xl mx-auto text-black font-serif">
        <div className=" md:w-1/2">
          <div className="flex items-center mb-4">
            <img src={logo} alt="" className="w-16" />
            <h2 className="text-red-700 text-2xl font-serif font-semibold">
              Tech Gadget
            </h2>
          </div>
          <h2 className="text-2xl font-semibold font-serif mb-3">
            Contact Information
          </h2>
          <hr className="w-32 " />
          <h2 className="text-2xl font-semibold">+44 20 3519 2700</h2>

          <h2 className="text-2xl font-semibold">contact@techgadget.com</h2>
          <div className="flex items-center ">
            <p className="text-base mb-3">
              Send us an email or use contact form
            </p>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 md:ml-20">
          <h2 className="text-2xl font-semibold font-serif">
            SEND US A MESSAGE
          </h2>
          <hr className="w-52 " />
          <form onSubmit={handleSend} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-serif">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="First and Last Name"
                className="border border-black p-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="border w-full border-black p-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="border border-black p-2"
                id="text"
                name="text"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Send"
                className="btn bg-black text-white hover:bg-slate-700"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

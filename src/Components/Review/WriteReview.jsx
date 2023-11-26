import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const WriteReview = ({Id}) => {
    const axiosSecure=useAxiosSecure()
    const { user } = useAuth();
    const email = user?.email;
    const name = user?.displayName;
    const photo = user?.photoURL;
  
    
  
    const today = new Date();
    const time = today.toLocaleString();
  
    const handleSubmitReview = (e) => {
      e.preventDefault();
      const form = e.target;
      const text = form.text.value;
      const rating = form.rating.value;
      const ProductId=Id
      const object = { text, rating, photo, name, time, email,ProductId };
      console.log(object);
    
      axiosSecure.post("/review", object).then((res) => {
        if (res.data.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Review added",
                showConfirmButton: false,
                timer: 1500
              });
          form.reset()
        } 
      });

     
    };


    return (
        <div className="mt-10">
            <div className="bg-black py-5 ">
            <h2 className="text-2xl font-bold font-serif text-red-700 text-center animate-pulse">Write a Review for this Product</h2>
            </div>
            <div className="pt-10 bg-slate-300  mx-auto">
        <form onSubmit={handleSubmitReview} className="grid justify-center">
          <label className="label  justify-center">
            
          </label>
          <div className=" ">
            <div className="ml-3">
              <span className="label-text font-serif">Write review</span>
              <textarea
                className=" flex justify-center border-black  p-2 mx-auto "
                id="text"
                name="text"
                rows="4"
                cols="50"
                required
              ></textarea>
            </div>
            <div className="form-control  mx-auto w-24 md:w-52">
              <label className="label">
                <span className="label-text">Ratings </span>
              </label>
              <label className="input-group">
                <select name="rating" className="select w-full select-bordered">
                  <option disabled selected>
                    rate
                  </option>
                  <option>1</option>
                  <option>1.5</option>
                  <option>2</option>
                  <option>2.5</option>
                  <option>3</option>
                  <option>3.5</option>
                  <option>4</option>
                  <option>4.5</option>
                  <option>5</option>
                </select>
              </label>
            </div>
          </div>
          <input
            disabled={!user}
            type="submit"
            value="Send"
            className="btn active bg-black hover:bg-slate-600 text-white w-1/3 mx-auto"
          />
        </form>
      </div>
      
        </div>
    );
};

export default WriteReview;
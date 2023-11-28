import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutForm = () => {

    const stripe = useStripe();
    const element = useElements();

    const handleSubmit =async (e)=>{
        e.preventDefault();
        if(!stripe || !element){
            return
        }
        const card =element.getElement(CardElement)
        if(!card){
            return
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#848ee0",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex items-center justify-center mt-3 ">
      <button className="btn mt-2 bg-blue-700 text-white w-32 hover:bg-green-700">
        Pay
      </button>
      </div>
        </form>
    );
};

export default CheckOutForm;
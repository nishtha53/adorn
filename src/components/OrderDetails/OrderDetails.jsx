import "./OrderDetails.css"
import { useNavigate } from "react-router-dom";
import { useAddress } from "../../contexts/address-context";
import { useCart } from "../../contexts/cart-context";
import { useAuth } from "../../contexts/auth-context";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const {
      cartState: { cart },
      deliveryCharges,
      totalPriceWithoutDiscount,
      totalCheckoutAmount,
      clearCart
    } = useCart();
    const {
      addressState: { addresses, selectedAddressId },
    } = useAddress();
  
  
    const currentAddress = addresses.find(({ _id }) => _id === selectedAddressId);
  
   
      
    const handlePaymentSuccess = () => {
      navigate("/order-successful");
      clearCart();
    };
  
    const loadScript = async (url) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = url;
  
        script.onload = () => {
          resolve(true);
        };
  
        script.onerror = () => {
          resolve(false);
        };
  
        document.body.appendChild(script);
      });
    };
  
    const displayRazorpay = async () => {
      try {
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );
  
        if (!res) {
          console.log("error")
          return;
        }
        const razorpayOptions = {
          key: "rzp_test_HpzCIW6GwqWcop",
          amount: totalCheckoutAmount * 100,
          currency: "INR",
          name: "Adorn",
          description: "Thank You For Ordering",
          handler: (response) => handlePaymentSuccess(response),
          prefill: {
            name: currentUser?.firstName,
            email: currentUser?.email,
            contact: currentAddress?.mobile,
          },
          notes: {
            address: currentAddress,
          },
          theme: {
            color: "#914041",
          },
        }; 
        if (currentAddress) {
          const razorpayInstance = new window.Razorpay(razorpayOptions);
          razorpayInstance.open();
        } else {
          //toast.error("Please select an address to proceed further.");
        }   
      }
      catch(e) {
        console.log(e)
      }
    }
  
    

    
  
    return (
      <div className="order-details-container">
        <div className="title">Order Summary</div>
        <div className="order-items-wrapper">
          {cart?.map((cartItem) => (
            <div key={cartItem._id} className="item">
              <div>
                {cartItem.title} (&#8377;{cartItem.price} X {cartItem.qty})
              </div>
              <div>&#8377;{cartItem.price * cartItem.qty}</div>
            </div>
          ))}
        </div>
        <div className="title">Price-details</div>
        <div className="order-items-wrapper">
          <div className="item">
            <div>Total Price</div>
            <div>&#8377;{totalPriceWithoutDiscount}</div>
          </div>
          <div className="item">
            <div>Delivery Charges</div>
            <div>&#8377;{deliveryCharges}</div>
          </div>
          <div className="item grand-total">
            <div>Grand Total</div>
            <div>&#8377;{totalCheckoutAmount}</div>
          </div>
        </div>
        <div className="title">Deliver To</div>
        <div className="order-items-wrapper address-wrap">
          {currentAddress ? (
            <>
              <div className="address-name">{currentAddress.name}</div>
              <div>
                {currentAddress.street}, {currentAddress.city} -{" "}
                {currentAddress.zipcode}
              </div>
              <div>
                {currentAddress.state}, {currentAddress.country}
              </div>
              <div>{currentAddress.mobile}</div>
            </>
          ) : (
            <p>Add an Address to Proceed.</p>
          )}
        </div>
        <button
          className="place-order-btn"
          onClick={displayRazorpay}
        >
          Place Order
        </button>
      </div>
    );
  };
  
  export default OrderDetails;

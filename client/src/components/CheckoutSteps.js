function CheckoutSteps(props) {

  return (
      <div className="checkout-steps">
          <div className={props.step1 ? 'active':''}><span>Signin</span> {props.step1 ? <img src="../images/check.png" alt="checkout"></img>:''}</div>
          <div className={props.step2 ? 'active':''}><span>Shipping</span> {props.step2 ? <img src="../images/check.png" alt="checkout"></img>:''}</div>
          <div className={props.step3 ? 'active':''}><span>Checkout</span> {props.step3 ? <img src="../images/check.png" alt="checkout"></img>:''}</div>
          <div className={props.step4 ? 'active':''}><span>Review</span> {props.step4 ? <img src="../images/check.png" alt="checkout"></img>:''}</div>
      </div>)
}

export default CheckoutSteps;
import Button from "@/app/components/ui/Button/Button";

const ConfirmMation = () => {
  return (
    <div className="flex flex-col py-[30px]">
      <h1 className="text-center text-4xl font-bold h-[100px] mb-10">
        Booking Confirmation
      </h1>
      <hr></hr>
      <div className="lg:p-15 xl:p-20 text-left border-[1px] my-10 p-5 md:p-10">
        <div className="container">
          <h3 className="text-2xl font-bold">Booking Details</h3>
          <p className="my-5 ">
            <span className="inline-block mx-5 text-[#3b4249]">check-in:</span>
            December 15, 2023 , from 11:00 am
          </p>
          <p className="my-5">
            <span className="inline-block mx-5 text-[#3b4249]">check-out:</span>
            December 15, 2023 , from 11:00 am
          </p>
        </div>
        <hr className="my-10 " />
        <div className="container">
          <h4 className="font-bold">Choose Rate</h4>
          <div className="container">
            <div className="my-5">
              <input id="none_refund_rdo" type="radio" name="refundable" />
              <label htmlFor="none_refund_rdo" className="mx-5 font-bold">
                Non-Refundable, €1,560
              </label>
              <p className="text-md text-[#767b80]">
                If for a some reason you need to cancel the reservation, this
                action not not be applied to this type of payment. All bookings
                will be automatically stored in online booking system without
                cancellation.
              </p>
            </div>
            <div className="my-5">
              <input id="refund_rdo" type="radio" name="refundable" />
              <label htmlFor="refund_rdo" className="mx-5 font-bold">
                Refundable, €1,640 {"(+5%)"}
              </label>
              <p className="text-md text-[#767b80]">
                Providing you want to reject your reservation in two days before
                the actual arrival, money for the booking can be successfully
                given back to you without any excessive procedures.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col lg:p-15 xl:p-20 text-left border-[1px] my-10  p-5 md:p-10">
        <div className="container">
          <h4 className="font-bold">Coupon Code: </h4>
          <div className="flex container">
            <input
              type="text"
              className="container h-[50px] border-[1px] outline-none p-2"
            ></input>
            <Button />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:p-15 xl:p-20 text-left border-[1px] my-10  p-5 md:p-10">
        <h4 className="font-bold">Your Information: </h4>
        <div className="my-5">
          <label htmlFor="firstName" className="font-medium">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            className="container h-[50px] border-[1px] outline-none p-2"
          ></input>
        </div>
        <div className="my-5">
          <label htmlFor="lastName" className="font-medium">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            className="container h-[50px] border-[1px] outline-none p-2"
          ></input>
        </div>
        <div className="my-5">
          <label htmlFor="email" className="font-medium">
            Email*
          </label>
          <input
            type="text"
            id="email"
            className="container h-[50px] border-[1px] outline-none p-2"
          ></input>
        </div>
        <div className="my-5">
          <label htmlFor="phone" className="font-medium">
            Phone*
          </label>
          <input
            type="text"
            id="phone"
            className=" container h-[50px] border-[1px] outline-none p-2"
          ></input>
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="note" className="container font-medium">
            Note
          </label>
          <textarea
            id="note"
            className="container outline-none border-[1px] p-5"
            rows={5}
            cols={60}
            name="text"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col lg:p-15 xl:p-20 text-left border-[1px] my-10  p-5 md:p-10">
        <h4 className="font-bold">Payment Method: </h4>
        <div className="my-5">
          <input id="Arrival" type="radio" name="payment" />
          <label htmlFor="Arrival" className="mx-5 font-bold">
            Pay on Arrival
          </label>
          <p className="text-md text-[#767b80]">Pay with cash on arrival.</p>
        </div>
        <div className="my-5">
          <input id="bank" type="radio" name="payment" />
          <label htmlFor="bank" className="mx-5 font-bold">
            Direct Bank Transfer
          </label>
          <p className="text-md text-[#767b80]">
            Make your payment directly into our bank account. Please use your
            Booking ID as the payment reference.
          </p>
        </div>
        <div className="my-5">
          <input id="card" type="radio" name="payment" />
          <label htmlFor="card" className="mx-5 font-bold">
            Pay by Card (Stripe)
          </label>
          <p className="text-md text-[#767b80]">
            Pay with your credit card via Stripe. Use the card number
            4242424242424242 with CVC 123, a valid expiration date and random
            5-digit ZIP-code to test a payment.
          </p>
        </div>
      </div>
      <Button></Button>
    </div>
  );
};
export default ConfirmMation;

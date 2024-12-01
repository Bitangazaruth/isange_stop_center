import React, { useState } from "react";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
import cred from "../../public/images/cr.jpg";
import pay from "../../public/images/paypal-logo-0.png";
import momo from "../../public/images/momo.jpg";
const Subscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [duration, setDuration] = useState<string>("monthly");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [paymentModalVisible, setPaymentModalVisible] =
    useState<boolean>(false);
  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setModalVisible(true); // Show the modal when a plan is selected
  };
  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
  };

  const subscribe = () => {
    if (selectedPlan !== "") {
      setPaymentModalVisible(true); // Show payment modal when subscribing
    } else {
      alert("Please select a plan before subscribing.");
    }
  };

  const getPrice = (basePrice: number) => {
    if (duration === "monthly") {
      return basePrice;
    } else {
      // Assuming yearly price is discounted by 20%
      return basePrice * 12 * 0.8;
    }
  };

  const renderPrice = (basePrice: number) => {
    const price = getPrice(basePrice);
    return `$${price.toFixed(2)} / ${duration}`;
  };

  return (
    <div className="flex justify-center items-center h-auto overflow-hidden ml-10 mr-10">
      <div className="container bg-ground mt-1 mx-auto  items-center rounded-md">
        <div className="ml-5"> 
          <Link to="/admin/tablesub">
            <button className="text-1xl font-semibold rounded-md text-gray-700 h-10 w-40 hover:bg-green-800 hover:text-white bg-white mb-4">
              Subscribers
            </button>
            <Outlet/> 
          </Link>

          <h1 className="text-2xl font-semibold text-gray-700 mb-2 ">
            Plans & Pricing
          </h1>
          <div className="mb-4 flex text-sm text-gray-700">
            Whether your time-saving automation needs are large or small,
            <br /> we’re here to help you scale.
            <div className="flex ml-12 mb-6">
              <button
                className={`rounded-full w-20 text-sm ${
                  duration === "monthly"
                    ? "focus:bg-green-800 focus:text-white"
                    : ""
                }`}
                onClick={() => handleDurationChange("monthly")}
              >
                MONTHLY
              </button>
              <button
                className={`text-sm ml-1 rounded-lg w-20 ${
                  duration === "yearly"
                    ? "focus:bg-green-800 focus:text-white"
                    : ""
                }`}
                onClick={() => handleDurationChange("yearly")}
              >
                YEARLY
              </button>
            </div>
          </div>

          <div className="flex h-80">
            <div className="flex rounded-lg justify-between">
              {/* Plan 1 */}
              <PlanCard
                planName="Starter"
                price={89}
                features={["Feature 1", "Feature 2", "Feature 3"]}
                selectedPlan={selectedPlan}
                handlePlanSelect={handlePlanSelect}
                renderPrice={renderPrice}
                modalVisible={modalVisible}
                duration={duration}
                subscribe={subscribe}
              />

              {/* Plan 2 */}
              <PlanCard
                planName="Individual"
                price={99}
                features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
                selectedPlan={selectedPlan}
                handlePlanSelect={handlePlanSelect}
                renderPrice={renderPrice}
                modalVisible={modalVisible}
                duration={duration}
                subscribe={subscribe}
              />

              {/* Plan 3 */}
              <PlanCard
                planName="Company"
                price={149}
                features={[
                  "Feature 1",
                  "Feature 2",
                  "Feature 3",
                  "Feature 4",
                  "Feature 5",
                ]}
                selectedPlan={selectedPlan}
                handlePlanSelect={handlePlanSelect}
                renderPrice={renderPrice}
                modalVisible={modalVisible}
                duration={duration}
                subscribe={subscribe}
              />
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <PlanDetailsModal
          plan={selectedPlan}
          duration={duration}
          price={getPrice(
            selectedPlan === "Starter"
              ? 89
              : selectedPlan === "Individual"
              ? 99
              : 149
          )}
          features={
            selectedPlan === "Starter"
              ? ["Feature 1", "Feature 2", "Feature 3"]
              : selectedPlan === "Individual"
              ? ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
              : [
                  "Feature 1",
                  "Feature 2",
                  "Feature 3",
                  "Feature 4",
                  "Feature 5",
                ]
          }
          startdate={startDate}
          enddate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
          onClose={() => setModalVisible(false)}
          onSubscribe={subscribe}
          paymentModalVisible={paymentModalVisible}
          setPaymentModalVisible={setPaymentModalVisible}
        />
      )}
    </div>
  );
};

interface PlanCardProps {
  planName: string;
  price: number;
  features: string[];
  selectedPlan: string;
  handlePlanSelect: (plan: string) => void;
  renderPrice: (basePrice: number) => string;
  modalVisible: boolean;
  duration: string;
  subscribe: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  price,
  features,
  selectedPlan,
  handlePlanSelect,
  renderPrice,
  modalVisible,
}) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md transition-transform hover:scale-90 text-gray-800 hover:bg-green-800 hover:text-white items-center mr-6">
      <button
        className={`focus:bg-green-800 focus:text-white w-60 h-80 hover:text-white focus:scale-90 rounded-lg ${
          modalVisible && selectedPlan === planName ? "bg-gray-200" : ""
        }`}
        onClick={() => handlePlanSelect(planName)}
      >
        <div className="flex mt-3 items-center">
          <p className="font-bold text-xl  ml-9">{renderPrice(price)}</p>
          <p className="text-xs mt-3"></p>
        </div>
        <h2 className="text-xl font-semibold  mt-3   mr-12">{planName}</h2>
        <p className="text-xs">Unleash the power of automation</p>
        <OfferDetails features={features} />
        <button className="mt-3 w-44  mr-6 h-7 bg-green-800 text-white focus:bg-white focus:text-gray-800 rounded-lg">
          <p className="mr-9">Choose plan</p>
        </button>
      </button>
    </div>
  );
};

interface OfferDetailsProps {
  features: string[];
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ features }) => {
  return (
    <>
      {features.map((feature, index) => (
        <div
          key={index}
          className="mt-3 ml-5 text-xs flex items-center focus:bg-green-800 focus:text-white"
        >
          <BiSolidCheckboxChecked />
          <p className="ml-2">{feature}</p>
        </div>
      ))}
    </>
  );
};

interface PlanDetailsModalProps {
  plan: string;
  duration: string;
  price: number;
  features: string[]; // Explicitly typed as an array of strings
  startdate: string; // Changed to string type
  enddate: string; // Changed to string type
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClose: () => void;
  onSubscribe: () => void;
  paymentModalVisible: boolean;
  setPaymentModalVisible: (visible: boolean) => void;
}

const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({
  plan,
  duration,
  price,
  features,
  startdate,
  enddate,
  onStartDateChange,
  onEndDateChange,
  onClose,
  onSubscribe,
  paymentModalVisible,
  setPaymentModalVisible,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-7/12 flex flex-col items-center">
        <h2 className="text-4xl text-inherit font-semibold  mb-4">
          Purchase Details
        </h2>
        <div className="flex">
          <div>
            <p>
              <strong>Plan:</strong> {plan}
            </p>
            <p>
              <strong>Duration:</strong> {duration}
            </p>
            <p>
              <strong>Cost:</strong> ${price.toFixed(2)}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              <input
                className="border rounded-md w-80 h-10 bg-white"
                type="date"
                value={startdate}
                onChange={(e) => onStartDateChange(e.target.value)}
              />
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              <input
                className="border rounded-md w-80 h-10 bg-white"
                type="date"
                value={enddate}
                onChange={(e) => onEndDateChange(e.target.value)}
              />
            </p>
          </div>
          <div className="ml-32 w-60">
            <p>
              <strong>Features:</strong>{" "}
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </p>
          </div>
        </div>
        <div className="flex w-80 justify-between ">
          <button
            className="mt-10 bg-green-800 text-white rounded w-32   hover:bg-white hover:text-gray-800"
            onClick={() => {
              onSubscribe();
              setPaymentModalVisible(true);
            }}
          >
            subscribe
          </button>
         
          <button
            className=" mt-10 mr-10  bg-green-800 text-white rounded w-32 hover:bg-white hover:text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        {paymentModalVisible && (
          <PaymentModal
            onClose={() => setPaymentModalVisible(false)}
            onPaymentComplete={() => {
              console.log("Payment completed");
              onClose(); // Close the plan details modal after payment
            }}
          />
        )}
      </div>
    </div>
  );
};

interface PaymentModalProps {
  onClose: () => void;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  onClose,
  onPaymentComplete,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-5/12 flex flex-col items-center">
        <h2 className="text-3xl text-inherit font-semibold  mb-4">
          Choose Payment Method
        </h2>

        {/* Add your payment method options here */}
        <div className="flex flex-col">
          <div className="justify-between">
            <div className="flex  w-auto justify-between">
              <div
                className="mt-8 font-semibold flex text-sm  text-black rounded w-28 "
                onClick={() => {
                  onPaymentComplete();
                  onClose();
                }}
              >
                CreditCard
                <div className=" w-24 h-3 ml-2   ">
                  <img src={cred} alt="" />
                </div>
              </div>
              <input
                className="border mt-8 border-green-800 ml-4  w-64 rounded-md  h-8 bg-white"
                type="text"
                placeholder="Enter Creditcard Number"
              />
            </div>
            <div className="flex">
              <div
                className="mt-7 flex text-sm justify-between text-black font-semibold    "
                onClick={() => {
                  onPaymentComplete();
                  onClose();
                  
                }}
              >
               <div className="">MomoPay</div> 
                <div className=" w-10 h-4 ml-2">
                  <img src={momo} alt="" />
                </div>
              </div>
              <input
                className="border ml-4 mt-8  rounded-md  h-8 w-64 border-green-800 bg-white"
                type="text"
                placeholder="Enter Momo Number"
              />
            </div>
            <div className="flex  ">
              <div
                className="mt-8 font-semibold flex text-sm text-black rounded "
              >
                PayPal
                <div className=" w-10 h-5  ml-2">
                  <img src={pay} alt="" />
                </div>
              </div>
              <input
                className="border ml-10 mt-8 rounded-md  h-8 border-green-800 w-64 hover:border-green-800 bg-white"
                type="text"
                placeholder="Enter Paypal number"
              />
            </div>
          </div>
          <div className="flex justify-between   ">
            <button
              className=" mt-10 bg-green-800 text-white rounded w-44 hover:bg-white hover:text-gray-800"
              onClick={onPaymentComplete}
            >
              Complete Payment
            </button>
            <button
              className=" mt-10 ml-8  bg-green-800 text-white rounded w-32   hover:bg-white hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

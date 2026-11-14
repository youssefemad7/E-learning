import { useState } from "react";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import { PaymentMethodSelector } from "../Component/Checkout/Paymentmethodselector";
import { CardDetailsForm } from "../Component/Checkout/Carddetailsform";
import { OrderSummary } from "../Component/Checkout/Ordersummary";
import { OffersSection } from "../Component/Checkout/Offerssection";

const cartItems = [
  {
    id: "1",
    title: "Adipiscing elit, sed do eiusmod tempor",
    description: "Lorem ipsum dollar sit amet...",
    price: 24.69,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop",
  },
  {
    id: "2",
    title: "Sed do eiusmod tempor adipiscing elit",
    description: "Lorem ipsum dollar sit amet...",
    price: 24.69,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=150&fit=crop",
  },
];

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleConfirmPayment = () => {
    // TODO: integrate payment API here
    console.log("Payment confirmed:", { selectedPayment, saveInfo });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2D3E50]">Checkout</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Complete your purchase securely below
            </p>
          </div>

          {/* Main 2-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
            {/* Left: Checkout Form */}
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-sm">
              <PaymentMethodSelector
                selected={selectedPayment}
                onSelect={setSelectedPayment}
              />
              <CardDetailsForm
                saveInfo={saveInfo}
                onSaveInfoChange={setSaveInfo}
                onSubmit={handleConfirmPayment}
              />
            </div>

            {/* Right: Order Summary */}
            <OrderSummary cartItems={cartItems} discount={0} tax={5} />
          </div>

          {/* Offers Section */}
          <OffersSection onSeeAll={() => console.log("See all offers")} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

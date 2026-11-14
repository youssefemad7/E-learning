interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  discount?: number;
  tax?: number;
}

export function OrderSummary({
  cartItems,
  discount = 0,
  tax = 5,
}: OrderSummaryProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - discount + tax;

  return (
    <div className="bg-[#2D3E50] rounded-2xl p-6 lg:p-8 text-white h-fit sticky top-6">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 pb-4 border-b border-white/10 last:border-0"
          >
            <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0 bg-white/10">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-white/50 mt-0.5 line-clamp-1">
                {item.description}
              </p>
              <p className="font-bold mt-1.5 text-[#49BBBD]">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Coupon Discount</span>
          <span className={discount > 0 ? "text-green-400 font-medium" : ""}>
            {discount > 0 ? `-${discount}%` : "—"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold pt-3 mt-1 border-t border-white/20">
          <span>Total</span>
          <span className="text-[#49BBBD] text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center gap-2 text-white/40 text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Secured by 256-bit SSL encryption</span>
      </div>
    </div>
  );
}

import { cn } from "../../../lib/utils";

const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "P" },
  { id: "amex", name: "American Express", icon: "AE" },
  { id: "visa", name: "Visa", icon: "V" },
  { id: "mastercard", name: "Mastercard", icon: "MC" },
];

interface PaymentMethodSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-muted-foreground mb-3 block">
        Card Type
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            aria-pressed={selected === method.id}
            aria-label={method.name}
            className={cn(
              "h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49BBBD]",
              selected === method.id
                ? "border-[#49BBBD] bg-[#49BBBD]/10 shadow-sm"
                : "border-border hover:border-[#49BBBD]/50 hover:bg-muted/30",
            )}
          >
            <span className="font-bold text-base tracking-wide">
              {method.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

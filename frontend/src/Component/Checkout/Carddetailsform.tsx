import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface CardDetailsFormProps {
  saveInfo: boolean;
  onSaveInfoChange: (value: boolean) => void;
  onSubmit: () => void;
}

export function CardDetailsForm({
  saveInfo,
  onSaveInfoChange,
  onSubmit,
}: CardDetailsFormProps) {
  return (
    <div className="space-y-5">
      {/* Name on Card */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Name on Card
        </label>
        <Input
          placeholder="Enter name on card"
          className="h-12 focus:ring-2 focus:ring-[#49BBBD]/40"
        />
      </div>

      {/* Card Number */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Card Number
        </label>
        <Input
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          className="h-12 tracking-wider focus:ring-2 focus:ring-[#49BBBD]/40"
        />
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Expiration Date
          </label>
          <Input
            placeholder="MM / YY"
            maxLength={5}
            className="h-12 focus:ring-2 focus:ring-[#49BBBD]/40"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            CVC
          </label>
          <Input
            placeholder="• • •"
            maxLength={4}
            className="h-12 focus:ring-2 focus:ring-[#49BBBD]/40"
          />
        </div>
      </div>

      {/* Save Info */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="save-info"
          checked={saveInfo}
          onCheckedChange={(checked) => onSaveInfoChange(checked as boolean)}
        />
        <label
          htmlFor="save-info"
          className="text-sm text-muted-foreground cursor-pointer select-none"
        >
          Save my information for faster checkout
        </label>
      </div>

      {/* Submit */}
      <Button
        onClick={onSubmit}
        className="w-full h-12 bg-[#49BBBD] hover:bg-[#3da9ab] active:scale-[0.98] text-white text-base font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Confirm Payment
      </Button>
    </div>
  );
}

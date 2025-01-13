import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useState } from "react";

const DonateForm = () => {
  const [amount, setAmount] = useState<number>(10);
  const presetAmounts = [10, 25, 50, 100, 250];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant={"default"}>
          Donate now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Donation</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Amount Selection */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </div>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="pl-6"
                  />
                </div>
              </div>
              <Button variant="secondary" onClick={() => setAmount(0)}>
                Custom Amount
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset ? "default" : "outline"}
                  onClick={() => setAmount(preset)}
                  className="flex-1"
                >
                  ${preset}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Select Payment Method</h3>
            <RadioGroup defaultValue="test" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="test" id="test" />
                <Label htmlFor="test">Test Donation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="offline" id="offline" />
                <Label htmlFor="offline">Offline Donation</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last Name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="Your Email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Leave A Comment</Label>
              <Textarea id="comment" placeholder="Leave A Comment..." />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Agree To Terms?</Label>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Donation Total:</span>
            <span className="text-lg font-bold">${amount.toFixed(2)}</span>
          </div>

          {/* Submit Button */}
          <Button className="w-full" size="lg">
            Donate now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { DonateForm };

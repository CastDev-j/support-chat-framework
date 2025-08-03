import { FiMail, FiUserCheck, FiX } from "react-icons/fi";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface Props {
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (open: boolean) => void;
}

export const RightPanel = ({
  isRightPanelOpen,
  setIsRightPanelOpen,
}: Props) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-30 w-80 bg-background border-l transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:block",
        isRightPanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-14 border-b px-4 flex items-center justify-between">
        <h2 className="font-medium">Contact details</h2>
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setIsRightPanelOpen(false)}
        >
          <FiX className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center pb-6 border-b">
          <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl mb-3">
            G5
          </div>
          <h3 className="font-semibold text-lg">G5 Customer</h3>
          <p className="text-sm text-muted-foreground">Premium Account</p>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>

        <div className="py-4 space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-1">
              <FiMail className="w-4 h-4" /> Contact Info
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>customer@g5.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>(555) 123-4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer ID:</span>
                <span>G5-12345</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-1">
              <FiUserCheck className="w-4 h-4" /> Account Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span>Premium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member since:</span>
                <span>Jan 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last bill:</span>
                <span>$150.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full">
            View full profile
          </Button>
        </div>
      </div>
    </div>
  );
};

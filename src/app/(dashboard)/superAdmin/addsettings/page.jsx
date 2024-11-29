"use client";

import InsideShippingCharge from "@/components/dashboard/admin/InsideShippingCharge copy";
import OutsideShippingCharge from "@/components/dashboard/admin/OutsideShippingCharge";

const Settings = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-4">সেটিংস</h2>
      <InsideShippingCharge />
      <OutsideShippingCharge />
    </div>
  );
};

export default Settings;

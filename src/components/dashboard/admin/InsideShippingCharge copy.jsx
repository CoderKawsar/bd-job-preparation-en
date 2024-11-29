import {
  useAddOrEditShippingChargeMutation,
  useGetShipppingChargeInsideDhakaQuery,
} from "@/redux/api/settingsApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const InsideShippingCharge = () => {
  const { register, handleSubmit, reset } = useForm();

  const { data: shippingChargeInsideDhaka, isLoading: isLoadingInsideDhaka } =
    useGetShipppingChargeInsideDhakaQuery();

  const [addOrEditShippingCharge, { isLoading: isSubmitting }] =
    useAddOrEditShippingChargeMutation();

  const onSubmit = async (data) => {
    try {
      const payload = {
        shipping_charge: Number(data.shipping_charge_inside_dhaka),
        is_outside_dhaka: false,
      };
      const insideResult = await addOrEditShippingCharge(payload);

      if (insideResult?.data?._id) {
        toast.success("Shipping charge updated successfully!");
      } else {
        toast.error("Failed to update shipping charge.");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update shipping charge.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-5 flex items-center">
      <div className="mb-4 flex items-center">
        <label className="block text-sm font-bold mb-2">
          Shipping Charge Inside Dhaka
        </label>
        <input
          type="text"
          name="shipping_charge_inside_dhaka"
          defaultValue={shippingChargeInsideDhaka}
          {...register("shipping_charge_inside_dhaka", { required: true })}
          className="w-full border border-gray-300 p-2 rounded-l-md"
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md"
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default InsideShippingCharge;

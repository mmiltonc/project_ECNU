import { FormDataType } from "@/app/types/formData";
import { PayPalButtonStyle } from "@paypal/paypal-js";
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

type Props = {
  formData: FormDataType;
  className: string;
};

export default function PayPalComponent(props: Props) {
  const router = useRouter();
  const { formData, className } = props;

  const options: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
  };

  const style: PayPalButtonStyle = {
    layout: "horizontal",
    color: "blue",
    shape: "rect",
  };

  const createOrder = async () => {
    console.log("formData: ", formData);
    const response = await fetch("/api/paypal", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const order = await response.json();
    console.log("order: ", order);
    return order.id;
  };

  const onApprove = async (data: any, actions: any) => {
    console.log("aprobado: ", data);
    const order = await actions.order.capture();
    console.log("order: ", order);
    router.push("/?modal=purchaseSuccess");
  };

  const onCancel = (data: any) => {
    console.log("cancelacion id: ", data);
  };

  const onError = (data: any) => {
    router.push("/?modal=purchaseFailed");
    console.log("error: ", data);
  };

  return (
    <PayPalScriptProvider options={options}>
      <PayPalButtons
        className={className}
        style={style}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

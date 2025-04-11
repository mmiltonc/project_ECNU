import { render } from "@react-email/render";
import PaymentSuccessfulTemplate from "../payment_successful_template";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import PaymentRejectedTemplate from "../payment_rejected_template";
import PaymentPendingTemplate from "../payment_pending_template";
const isDevelopmentMode = process.env.NODE_ENV === "development";

function EmailPreview() {
  const props = PaymentSuccessfulTemplate.PreviewProps;
  const html = render(
    <div className="flex flex-col gap-[40px]">
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Exitoso</h2>
        <PaymentSuccessfulTemplate {...props} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Rechazado</h2>
        <PaymentRejectedTemplate {...props} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Pendiente</h2>
        <PaymentPendingTemplate {...props} />
      </div>
    </div>
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function NotFound() {
  return null;
}

export default isDevelopmentMode ? EmailPreview : NotFound;

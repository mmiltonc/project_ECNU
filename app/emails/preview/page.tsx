import { render } from "@react-email/render";
import PaymentSuccessfulTemplate from "../payment_successful_template";

import PaymentRejectedTemplate from "../payment_rejected_template";
import PaymentPendingTemplate from "../payment_pending_template";
import OwnerPaymentSuccessfulTemplate from "../owner_payment_successful_template";
import CreateUserErrorTemplate from "../create_user_error_template";
import UpdateUserErrorTemplate from "../update_user_error_template";
const isDevelopmentMode = ["development", "local"].includes(process.env.NODE_ENV);

async function EmailPreview() {
  const PaymentSuccessProps = PaymentSuccessfulTemplate.PreviewProps;
  const PaymentRejectedProps = PaymentRejectedTemplate.PreviewProps;
  const PaymentPendingProps = PaymentPendingTemplate.PreviewProps;
  const OwnerPaymentSuccessfulProps =
    OwnerPaymentSuccessfulTemplate.PreviewProps;
  const CreateUserErrorProps = CreateUserErrorTemplate.PreviewProps;
  const UpdateUserErrorProps = UpdateUserErrorTemplate.PreviewProps;
  const html = await render(
    <div className="flex flex-col gap-[40px]">
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Exitoso</h2>
        <PaymentSuccessfulTemplate {...PaymentSuccessProps} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Rechazado</h2>
        <PaymentRejectedTemplate {...PaymentRejectedProps} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Pendiente</h2>
        <PaymentPendingTemplate {...PaymentPendingProps} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Pendiente</h2>
        <OwnerPaymentSuccessfulTemplate {...OwnerPaymentSuccessfulProps} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Pendiente</h2>
        <CreateUserErrorTemplate {...CreateUserErrorProps} />
      </div>
      <hr />
      <div>
        <h2 className="text-black text-3xl font-bold">Pago Pendiente</h2>
        <UpdateUserErrorTemplate {...UpdateUserErrorProps} />
      </div>
    </div>
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function NotFound() {
  return null;
}

export default isDevelopmentMode ? EmailPreview : NotFound;

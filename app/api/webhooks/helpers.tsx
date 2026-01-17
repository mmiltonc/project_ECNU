type MercadoPagoStatusType =
  | "APPROVED"
  | "AUTHORIZED"
  | "PENDING"
  | "IN_PROCESS"
  | "IN_MEDIATION"
  | "REJECTED"
  | "CANCELLED"
  | "REFUNDED"
  | "CHARGED_BACK";

type PayPalStatusType =
  | "CREATED"
  | "APPROVED"
  | "COMPLETED"
  | "PENDING"
  | "DENIED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

type PaymentStatusType = MercadoPagoStatusType | PayPalStatusType;

export const PaymentStatus = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
};

const getMercadopagoStatus = (status: PaymentStatusType) => {
  if (status === "PENDING") return PaymentStatus.PENDING;
  if (status === "APPROVED") return PaymentStatus.APPROVED;
  if (status === "AUTHORIZED") return PaymentStatus.PENDING;
  if (status === "IN_PROCESS") return PaymentStatus.PENDING;
  if (status === "IN_MEDIATION") return PaymentStatus.PENDING;
  if (status === "REJECTED") return PaymentStatus.REJECTED;
  if (status === "CANCELLED") return PaymentStatus.REJECTED;
  if (status === "REFUNDED") return PaymentStatus.REJECTED;
  if (status === "CHARGED_BACK") return PaymentStatus.REJECTED;
};

const getPaypalStatus = (status: PaymentStatusType) => {
  if (status === "COMPLETED") return PaymentStatus.APPROVED;
  if (status === "APPROVED") return PaymentStatus.PENDING;
  if (status === "CREATED") return PaymentStatus.PENDING;
  if (status === "PENDING") return PaymentStatus.PENDING;
  if (status === "DENIED") return PaymentStatus.REJECTED;
  if (status === "FAILED") return PaymentStatus.REJECTED;
  if (status === "CANCELLED") return PaymentStatus.REJECTED;
  if (status === "REFUNDED") return PaymentStatus.REJECTED;
  if (status === "PARTIALLY_REFUNDED") return PaymentStatus.REJECTED;
};

export const getStatus = (status: string, gatewayId: string) => {
  const normalizedStatus = String(status).toUpperCase() as PaymentStatusType;
  if (gatewayId === "paypal") return getPaypalStatus(normalizedStatus);
  if (gatewayId === "mercadopago")
    return getMercadopagoStatus(normalizedStatus);
  return "";
};

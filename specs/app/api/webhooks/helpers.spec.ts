import { getStatus, PaymentStatus } from "@/app/api/webhooks/helpers";

describe("webhook status helpers", () => {
  describe("MercadoPago statuses", () => {
    it("maps APPROVED to APPROVED", () => {
      expect(getStatus("APPROVED", "mercadopago")).toBe(
        PaymentStatus.APPROVED
      );
    });

    it("maps lowercase approved to APPROVED", () => {
      expect(getStatus("approved", "mercadopago")).toBe(
        PaymentStatus.APPROVED
      );
    });

    it("maps PENDING to PENDING", () => {
      expect(getStatus("PENDING", "mercadopago")).toBe(PaymentStatus.PENDING);
    });

    it("maps AUTHORIZED to PENDING", () => {
      expect(getStatus("AUTHORIZED", "mercadopago")).toBe(
        PaymentStatus.PENDING
      );
    });

    it("maps IN_PROCESS to PENDING", () => {
      expect(getStatus("IN_PROCESS", "mercadopago")).toBe(
        PaymentStatus.PENDING
      );
    });

    it("maps IN_MEDIATION to PENDING", () => {
      expect(getStatus("IN_MEDIATION", "mercadopago")).toBe(
        PaymentStatus.PENDING
      );
    });

    it("maps REJECTED to REJECTED", () => {
      expect(getStatus("REJECTED", "mercadopago")).toBe(
        PaymentStatus.REJECTED
      );
    });

    it("maps CANCELLED to REJECTED", () => {
      expect(getStatus("CANCELLED", "mercadopago")).toBe(
        PaymentStatus.REJECTED
      );
    });

    it("maps REFUNDED to REJECTED", () => {
      expect(getStatus("REFUNDED", "mercadopago")).toBe(
        PaymentStatus.REJECTED
      );
    });

    it("maps CHARGED_BACK to REJECTED", () => {
      expect(getStatus("CHARGED_BACK", "mercadopago")).toBe(
        PaymentStatus.REJECTED
      );
    });
  });

  describe("PayPal statuses", () => {
    it("maps COMPLETED to APPROVED", () => {
      expect(getStatus("COMPLETED", "paypal")).toBe(PaymentStatus.APPROVED);
    });

    it("maps lowercase completed to APPROVED", () => {
      expect(getStatus("completed", "paypal")).toBe(PaymentStatus.APPROVED);
    });

    it("maps APPROVED to PENDING", () => {
      expect(getStatus("APPROVED", "paypal")).toBe(PaymentStatus.PENDING);
    });

    it("maps CREATED to PENDING", () => {
      expect(getStatus("CREATED", "paypal")).toBe(PaymentStatus.PENDING);
    });

    it("maps PENDING to PENDING", () => {
      expect(getStatus("PENDING", "paypal")).toBe(PaymentStatus.PENDING);
    });

    it("maps DENIED to REJECTED", () => {
      expect(getStatus("DENIED", "paypal")).toBe(PaymentStatus.REJECTED);
    });

    it("maps FAILED to REJECTED", () => {
      expect(getStatus("FAILED", "paypal")).toBe(PaymentStatus.REJECTED);
    });

    it("maps CANCELLED to REJECTED", () => {
      expect(getStatus("CANCELLED", "paypal")).toBe(PaymentStatus.REJECTED);
    });

    it("maps REFUNDED to REJECTED", () => {
      expect(getStatus("REFUNDED", "paypal")).toBe(PaymentStatus.REJECTED);
    });

    it("maps PARTIALLY_REFUNDED to REJECTED", () => {
      expect(getStatus("PARTIALLY_REFUNDED", "paypal")).toBe(
        PaymentStatus.REJECTED
      );
    });
  });

  it("returns an empty string for unknown gateways", () => {
    expect(getStatus("APPROVED", "unknown")).toBe("");
  });

  it("returns undefined for unknown statuses on known gateways", () => {
    expect(getStatus("UNKNOWN", "mercadopago")).toBeUndefined();
    expect(getStatus("UNKNOWN", "paypal")).toBeUndefined();
  });
});

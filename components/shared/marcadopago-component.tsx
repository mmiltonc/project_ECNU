"use client";

import { FormDataType } from "@/app/types/formData";
import mercadopagoLogo from "@/public/images/mercado-pago-logo.png";
import Image from "next/image";

type Props = {
  formData: FormDataType;
  className: string;
};

/* TODO: Hacer ventana de loading */
export default function MercadopagoComponent(props: Props) {
  const { formData, className } = props;

  const handleSubmit = async () => {
    const response = await fetch("/api/mercadopago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { url } = await response.json();

    window.location.href = url;
  };

  return (
    <button formAction={handleSubmit} className={className}>
      <Image
        src={mercadopagoLogo}
        alt="mercado pago logo"
        width="120"
        height="50"
      />
    </button>
  );
}

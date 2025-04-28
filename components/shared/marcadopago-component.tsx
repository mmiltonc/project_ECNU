"use client"

import { FormDataType } from "@/app/types/formData";
import mercadopagoLogo from "@/public/images/mercado-pago-logo.png";
import Image from "next/image";

type MercadopagoComponentProps = {
  formData: FormDataType;
};

export default function MercadopagoComponent(
  formData: MercadopagoComponentProps
) {

  /* TODO: Hacer ventana de loading */

  const handleSubmit = async () => {
    const response = await fetch("/api/mercadopago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { url } = await response.json();

    window.location.href = url
  };

  return (
    <button
      formAction={handleSubmit}
      className="border-2 border-gray-500 rounded-md"
    >
      <Image
        src={mercadopagoLogo}
        alt="mercado pago logo"
        className="w-36 h-24"
      />
    </button>
  );
}

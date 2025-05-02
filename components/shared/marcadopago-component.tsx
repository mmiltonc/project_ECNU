"use client"

import { FormDataType } from "@/app/types/formData";
import mercadopagoLogo from "@/public/images/mercado-pago-logo.png";
import Image from "next/image";

type Props = {
  formData: FormDataType;
};

/* TODO: Hacer ventana de loading */
export default function MercadopagoComponent( props: Props ) {
  const {formData} = props

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

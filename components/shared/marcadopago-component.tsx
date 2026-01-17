"use client";

import { FormDataType } from "@/app/types/formData";
import mercadopagoLogo from "@/public/images/mercado-pago-logo.png";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

type Props = {
  formData: FormDataType;
  className: string;
};

/* TODO: Hacer ventana de loading */
export default function MercadopagoComponent(props: Props) {
  const { formData, className } = props;
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchMP = async () => {
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

  const handleSubmit = async () => {
    setButtonLoading(true);
    fetchMP();
  };

  return (
    <button
      disabled={buttonLoading}
      formAction={handleSubmit}
      className={classNames([className, { loading: buttonLoading }])}
    >
      <div className="loading-circle">
        <CircularProgress size="34px" />
      </div>
      <Image
        src={mercadopagoLogo}
        alt="mercado pago logo"
        width="120"
        height="50"
      />
    </button>
  );
}

"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { useModal } from "@/app/context/useModal";
import {
  COUNTRIES,
  FormDataType,
  PHONE_CODES,
  PlansTypes,
  PlanType,
} from "@/app/types/formData";
import AnimatedText from "@/components/shared/animatedText";
import CardDesktop from "@/components/shared/card-desktop";
import MercadopagoComponent from "@/components/shared/marcadopago-component";
import PayPalComponent from "@/components/shared/paypal-component";
import plansData from "@/app/data/plans.json";
import { useRouter } from "next/navigation";
import {
  desktop,
  desktopLarge,
  fontSize1,
  fontSize2,
  fontSize3,
  fontSize4,
  fontSize5,
  mobile,
  space,
  tablet,
} from "@/styles/global";
import { useLenis } from "lenis/react";
import { Button, MenuItem, SelectProps, TextField } from "@mui/material";
import classNames from "classnames";
import CloseIcon from "@mui/icons-material/Close";
export const dynamic = "force-static";
import Joi from "joi";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const MODAL_PURCHASE_SUCCESS = "purchaseSuccess";
const MODAL_PURCHASE_FAILED = "purchaseFailed";
const MODAL_PROGRAMS = "programs";

const styles = css`
  width: 100%;

  strong {
    font-weight: 600;
  }

  i {
    color: #87a7cb;
    font-style: normal;
  }

  .article-program {
    padding: ${space(3)} ${space(3)};

    ${desktop(css`
      padding: ${space(20)} ${space(10)} 0;
    `)}

    .header {
      margin-bottom: ${space(4)};

      ${desktop(css`
        margin-bottom: ${space(8)};
      `)}

      .title {
        ${fontSize2};
        font-family: var(--font-jost);
        font-weight: 900;
        text-transform: uppercase;

        ${desktop(css`
          ${fontSize1};
        `)}
      }

      .subtitle {
        ${fontSize3};
        font-family: var(--font-jost);
        font-weight: 900;
        color: #fd5f44;
        margin-bottom: 24px;
        text-transform: uppercase;

        ${desktop(css`
          ${fontSize2};
        `)}
      }
    }

    .container {
      position: relative;

      ${tablet(css`
        padding: 0 ${space(10)} ${space(10)} ${space(25)};
        margin-bottom: ${space(10)};
      `)}

      &:before {
        content: "";
        position: absolute;
        left: 82px;
        top: -30px;
        height: calc(100% - 32px);
        width: 17px;
        transform: rotate(180deg);
        background-image: url(images/pasos-hormiga.png);
        background-repeat: repeat-y;
        background-size: contain;
        mix-blend-mode: soft-light;

        ${mobile(css`
          display: none;
        `)}
      }

      &:after {
        content: "";
        position: absolute;
        left: 50px;
        bottom: -10px;
        height: 80px;
        width: 80px;
        transform: rotate(180deg);
        background-image: url(images/hormiga-arriba.png);
        background-repeat: no-repeat;
        background-size: contain;
        mix-blend-mode: soft-light;

        ${mobile(css`
          display: none;
        `)}
      }

      .text-section {
        margin-bottom: 32px;

        .heading {
          font-family: var(--font-jost);
          ${fontSize3};
          font-weight: 600;
          margin-bottom: 16px;
        }
        .text {
          font-family: var(--font-jost);
          ${fontSize3};
          line-height: 1.2;
        }

        .list {
          font-family: var(--font-jost);
          ${fontSize3};
          line-height: 1.2;
          list-style: inside decimal;
        }
      }
    }

    .cards {
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 32px;
      width: 100vw;
      position: relative;
      left: ${space(-3)};
      padding: ${space(6)} ${space(3)};
      margin-bottom: ${space(3)};
      background-image: radial-gradient(
        closest-side,
        #fd5f44,
        #051422
      ) !important;

      ${tablet(css`
        padding: ${space(6)} 0;
        min-height: auto;
        left: 0;
        width: auto;
        align-items: center;
        flex-direction: column;
        display: flex;
        flex-direction: initial;
      `)}

      .card {
        width: 100%;
        border-radius: ${space(1)};
        box-shadow: 0 -1px 1px -1px #fd5f4402, 0 -10px 30px 10px #fd5f4405,
          0 1px 1px 0px #fd5f4422, 0 10px 30px 10px #fd5f4433;

        background: linear-gradient(
          to bottom,
          #051422dd 50%,
          #05142255 60%,
          #05142200 100%
        );

        ${tablet(css`
          width: 330px;
        `)}

        &.gym-virtual {
          height: 536px;
        }

        &.calistenia-online {
          height: 660px;
        }

        &.card-image {
          filter: grayscale(0.8) brightness(0.8);
          background-size: cover;
          background-position: center;

          &.gym-virtual {
            background-image: url(/images/gym_virtual_image.jpg);
          }

          &.calistenia-online {
            background-image: url(/images/calistenia_online.jpg);
          }

          &.hide {
            ${mobile(css`
              display: none;
            `)}
          }
        }

        &.card-background {
          background-position: top left;
        }

        .card-content {
          display: flex;
          gap: ${space(2)};
          flex-direction: column;
          height: 100%;
          padding: ${space(3)};
          border: 1px solid #ffffff22;
          border-radius: ${space(1)};
          position: relative;
          overflow: hidden;

          &:before {
            content: "";
            background-image: url(/images/card-background.jpg);
            mix-blend-mode: darken;
            background-position: center left;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
          }

          .title {
            font-size: 27px;
            line-height: 1;
            font-family: var(--font-jost);
            font-weight: 800;
            color: var(--white-color);
            text-transform: uppercase;
            mix-blend-mode: screen;
          }

          .separator {
            border-color: #ffffff22;
            margin: ${space(1)} 0 ${space(1 / 2)};
          }

          .price {
            display: flex;
            gap: ${space(2)};
            flex-direction: column;

            .price-usd {
              display: flex;
              gap: ${space(1)};
              margin: ${space(1)} auto;
              position: relative;
              left: -8px;

              .amount {
                font-family: var(--font-nunito-sans);
                display: flex;
                align-items: center;
                color: var(--white-color);

                .amount-sign {
                  font-size: 30px;
                  line-height: 1;
                  font-weight: 800;
                }
                .amount-number {
                  font-size: 70px;
                  line-height: 1;
                  font-weight: 800;
                }
              }
              .amount-details {
                width: 0;
                white-space: nowrap;
                color: var(--secondary-color);
                font-size: 13px;
                line-height: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-bottom: ${space(4 / 3)};
                text-transform: uppercase;

                .amount-currency {
                }
                .amount-period {
                  font-weight: 600;
                }
              }
            }

            .price-ars {
              display: flex;
              gap: ${space(1)};
              align-items: baseline;

              .info {
                font-size: 13px;
                line-height: 1;
                text-transform: uppercase;
              }
            }
          }

          .included,
          .requirements {
            font-size: 16px;
            line-height: 1;
            font-family: var(--font-jost);
            font-weight: 400;
          }

          .list {
            font-size: 16px;
            line-height: 1.2;
            display: flex;
            gap: ${space(1)};
            flex-direction: column;
            font-family: var(--font-jost);
            color: var(--white-color);
            margin-bottom: ${space(2)};

            .item {
              display: flex;
              gap: ${space(1)};

              .item-disc {
                font-size: 16px;
                line-height: 1;
                color: var(--secondary-color);
                position: relative;
                top: 1px;
              }
            }
          }
        }
      }
    }

    .plan-cta {
      ${fontSize4};
      font-family: var(--font-oswald);
      padding: ${space(2)} ${space(3)};
      margin: ${space(1)} 0 ${space(0)};
      border-radius: 10px;
      text-transform: uppercase;
      display: block;
      transition: 600ms ease all;
      background-color: var(--primary-color);
      width: 100%;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.28),
        0 2px 4px rgba(0, 0, 0, 0.24), 0 -1px 3px rgba(0, 0, 0, 0.2);

      &:hover {
        box-shadow: 0 4px 5px rgba(70, 70, 70, 0.24),
          0 1px 10px rgba(70, 70, 70, 0.28), 0 2px 4px rgba(70, 70, 70, 0.24),
          0 -1px 3px rgba(70, 70, 70, 0.2);
        transform: scale(1.02);
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: #051422a0;
    z-index: 1012;
    backdrop-filter: blur(2px);

    &.open {
      display: flex;
    }

    .modal-content {
      position: relative;
      max-width: 500px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      ${desktop(css`
        height: auto;
        width: 90%;
      `)}

      .modal-close-button {
        display: block;
        width: 24px;
        height: 24px;
        color: var(--white-color);
        opacity: 0.5;
        position: absolute;
        right: ${space(2)};
        top: ${space(2)};
        cursor: pointer;
        z-index: 1008;

        &:hover {
          opacity: 1;
        }
      }

      .modal-scroll-wrapper {
        width: 100%;
        background-color: var(--white-color);
        color: var(--background-color);
        font-family: var(--font-jost);
        max-height: 100%;
        overflow-y: auto;
        touch-action: auto;
        overscroll-behavior: contain;
        height: 100%;

        ${desktop(css`
          height: auto;
          border-radius: ${space(1)};
          max-height: 862px;
          height: 100%;
        `)}

        .content {
          max-height: 100vh;
          height: max-content;

          .content-header {
            .video {
              width: 100%;
              z-index: 1007;
              cursor: pointer;
            }
          }

          .content-body {
            ${fontSize4};
            display: flex;
            flex-direction: column;
            padding: ${space(3)} ${space(3)};
            height: 100%;
            gap: ${space(2)};

            .title {
              ${fontSize3};
              font-family: var(--font-jost);
              font-weight: 600;
            }

            .form {
              display: contents;

              .fields {
                ${fontSize5};
                display: flex;
                flex-direction: column;
                gap: ${space(2)};

                .field {
                  display: flex;
                  flex-direction: column;
                  gap: ${space(1)};

                  .select-option {
                    font-family: var(--font-jost);
                  }

                  em {
                    font-family: var(--font-jost);
                    opacity: 0.6;
                  }

                  .field-adornment {
                    font-family: var(--font-jost);
                    margin-right: ${space(1)};
                  }
                }

                .submit {
                  display: flex;
                  gap: ${space(1)};
                  justify-content: flex-end;
                }
              }

              .payment-form {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .header {
                  .payment-details {
                    margin-bottom: ${space(2)};
                    .payment-details-partial {
                      padding: ${space(1)} 0;
                      display: flex;
                      justify-content: space-between;
                    }

                    span {
                      display: flex;
                      align-items: flex-start;
                      gap: ${space(0.5)};

                      small {
                        padding-top: 2px;
                        text-decoration: underline;
                      }
                    }
                  }

                  .payment-action {
                    display: flex;
                    flex-direction: column;
                    gap: ${space(1)};

                    ${desktop(css`
                      flex-direction: initial;
                      justify-content: space-between;
                      align-items: center;
                    `)}

                    .payment-info {
                      width: 100%;
                      ${fontSize5};
                    }

                    .payment-button {
                      width: 100%;

                      ${desktop(css`
                        text-align: right;
                      `)}
                      .paypal-button {
                        display: flex;
                        justify-content: center;
                      }
                      .mercadopago-button {
                        height: 50px;
                        background-color: #ffe700;
                        border-radius: ${space(1)};

                        img {
                          height: 100%;
                          object-fit: contain;
                        }
                      }
                    }
                  }
                }
              }
            }

            .phrase-text {
              ${fontSize4};
              font-family: var(--font-nunito-sans);
              padding: ${space(2)} ${space(2)} ${space(2)} ${space(6)};
              background-color: var(--light-color);
              position: relative;

              &:before {
                ${fontSize1};
                position: absolute;
                content: "“";
                display: block;
                top: 13px;
                left: 13px;
              }

              .phrase-quote {
                display: block;
              }

              .phrase-author {
                ${fontSize5};
                font-weight: 400;
              }
            }
          }

          .content-footer {
            display: flex;
            flex-direction: column;
            padding: 0 ${space(3)} ${space(3)};

            .back-button {
              width: max-content;
              display: inline-block;
            }
          }
        }
      }
    }
  }
`;

const planificationCards = [
  {
    main: true,
    plan: PlansTypes.OnlinePlanification,
    type: "plani",
    typeVideo: "plani",
    imagen: "/images/planificaciones_online.jpg",
  },
  {
    main: false,
    plan: PlansTypes.OnlinePlanification,
    type: "plan",
    typeVideo: "plani",
    imagen: "/images/plan_plani_online.jpg",
  },
];

const virtualGymCards = [
  {
    main: true,
    plan: PlansTypes.VirtualGym,
    type: "gym",
    typeVideo: "gym",
    imagen: "/images/gym_virtual.jpg",
  },
  {
    main: false,
    plan: PlansTypes.VirtualGym,
    type: "plan",
    typeVideo: "gym",
    imagen: "/images/plan_gym_test.jpg",
  },
];

// type PlanCode = keyof typeof PLANS_CODES;

const Programs = () => {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [camposVisibles, setCamposVisibles] = useState(false);
  const [stepForm, setStepForm] = useState(1);
  const [modalPage, setModalPage] = useState(MODAL_PROGRAMS);
  const [planInfo, setPlanInfo] = useState({} as PlanType);
  const cardContainerGymRef = useRef(null);
  const cardContainerPlanificationRef = useRef(null);
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataType>({
    plan: "",
    nombre: "",
    pais: "",
    ciudad: "",
    emailLocalPart: "",
    celular: "",
    objetivos: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const onlyAlphabeticalRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s]+$/;
  const localPartRegex = /^(?!\.)(?!.*\.\.)[A-Za-z0-9._%+-]{1,64}(?<!\.)$/;
  const noAtDomainRegex = /^[^@]+$/;

  const formSchema = Joi.object({
    plan: Joi.string().required().messages({
      "string.empty": "El plan es obligatorio.",
    }),
    nombre: Joi.string()
      .min(3)
      .pattern(onlyAlphabeticalRegex)
      .required()
      .messages({
        "string.empty": "El nombre es obligatorio.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.pattern.base":
          "El nombre solo puede contener letras y espacios, sin números ni caracteres especiales.",
      }),
    pais: Joi.string().min(3).required().messages({
      "string.empty": "El país es obligatorio.",
      "string.min": "El país debe tener al menos 3 caracteres.",
    }),
    ciudad: Joi.string()
      .min(3)
      .pattern(onlyAlphabeticalRegex)
      .required()
      .messages({
        "string.empty": "La ciudad es obligatoria.",
        "string.min": "La ciudad debe tener al menos 3 caracteres.",
        "string.pattern.base":
          "La ciudad solo puede contener letras y espacios, sin números ni caracteres especiales.",
      }),
    emailLocalPart: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!noAtDomainRegex.test(value)) {
          return helpers.error("noAtDomainRegex.invalid");
        }
        if (!localPartRegex.test(value)) {
          return helpers.error("localPart.invalid");
        }
        return value;
      })
      .messages({
        "string.empty": "El campo de email es obligatorio.",
        "localPart.invalid":
          "El campo sólo debe contener letras, números y caracteres permitidos.",
        "noAtDomainRegex.invalid":
          "Sólo emails de gmail están permitidos. No incluyas ni el arroba ni lo que sigue despues del arroba.",
      }),
    celular: Joi.string().pattern(/^\d+$/).min(6).required().messages({
      "string.empty": "El celular es obligatorio.",
      "string.pattern.base": "El celular solo debe contener números.",
      "string.min": "El celular debe tener al menos 6 dígitos.",
    }),
    objetivos: Joi.string().min(10).required().messages({
      "string.empty": "Los objetivos son obligatorios.",
      "string.min": "Los objetivos deben tener al menos 10 caracteres.",
    }),
  });

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop(); // Detiene el scroll global
    } else {
      lenis.start(); // Reactiva el scroll
    }
  }, [isOpen, lenis]);

  const handleVirtualGymCTA = () => {
    setFormData({ ...formData, plan: virtualGymCards[0].plan });
    openModal();
    lenis?.stop();
  };

  const handleOnlinePlanificationCTA = () => {
    setFormData({ ...formData, plan: planificationCards[0].plan });
    openModal();
    lenis?.stop();
  };

  const handleClose = () => {
    setCamposVisibles(false);
    setFormData({
      plan: "",
      nombre: "",
      pais: "",
      ciudad: "",
      emailLocalPart: "",
      celular: "",
      objetivos: "",
    });
    closeModal();
    setModalPage(MODAL_PROGRAMS);
    setStepForm(1);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFormValidation = () => {
    const { error, value } = formSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      console.log(error);
      const errores: Record<string, string> = {};
      error.details.forEach((err) => {
        if (err.context?.key) {
          errores[err.context.key] = err.message;
        }
      });
      setFormErrors(errores); // Guardamos los errores
    } else {
      setFormErrors({}); // Limpiamos errores si pasa la validación
      console.log("Datos validados:", value);
      setStepForm(2);
    }
  };

  useEffect(() => {
    if (formData.nombre?.trim() && formData.pais?.trim()) {
      setCamposVisibles(true);
    } else {
      setCamposVisibles(false);
    }
  }, [formData.nombre, formData.pais]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const modalName = [MODAL_PURCHASE_SUCCESS, MODAL_PURCHASE_FAILED].find(
      (name) => name === searchParams.get("modal")
    );
    if (!modalName) return;
    setModalPage(modalName);
    openModal();
  }, []);

  useEffect(() => {
    const modal = document.querySelector(".modal-content");
    const body = document.querySelector("body");
    if (!modal) return;
    const stopScrollPropagation = (e: Event) => e.stopPropagation();
    if (isOpen) {
      body?.classList.add("modal-open");
      modal.addEventListener("wheel", stopScrollPropagation, {
        passive: false,
      });
      modal.addEventListener("touchmove", stopScrollPropagation, {
        passive: false,
      });
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      if (!searchParams.get("modal")) setModalPage(MODAL_PROGRAMS);
      searchParams.delete("modal");
      router.push(`/?${searchParams.toString()}`);
      body?.classList.remove("modal-open");
      modal.removeEventListener("wheel", stopScrollPropagation);
      modal.removeEventListener("touchmove", stopScrollPropagation);
    }
    return () => {
      modal.removeEventListener("wheel", stopScrollPropagation);
      modal.removeEventListener("touchmove", stopScrollPropagation);
    };
  }, [isOpen]);

  useEffect(() => {
    const info = plansData.plans.find(
      (plan: any) => plan.sku === formData.plan
    ) as PlanType;

    setPlanInfo(info);
  }, [formData.plan]);

  const textInputStyles = {
    "& .MuiInputBase-input": {
      fontFamily: "var(--font-jost)",
    },
    "& .MuiInputLabel-root": {
      fontFamily: "var(--font-jost)",
    },
    "& .MuiFormHelperText-root": {
      fontFamily: "var(--font-jost)",
    },
  };

  const selectedProps = {
    displayEmpty: true,
    renderValue: (selected: string) => {
      const empty = selected === "";
      if (empty) return <em>-- Elegí una opción --</em>;
      const country = COUNTRIES.find((opt) => opt.code === selected);
      return (
        <span className="select-option">
          {country?.flag} {country?.name}
        </span>
      );
    },
  };

  const selectInputStyles = { fontFamily: "var(--font-jost)" };

  const nextButtonStyles = {
    backgroundColor: "var(--default-color)",
    color: "#fff",
    fontFamily: "var(--font-jost)",
    "&:hover": {
      backgroundColor: "var(--default-color)",
    },
  };

  const cancelButtonStyles = {
    color: "var(--secondary-color)",
    fontFamily: "var(--font-jost)",
    "&:hover": {
      borderColor: "var(--secondary-color)",
    },
  };

  return (
    <section css={styles} ref={sectionRef} className="programs-section">
      <article className="article-program" id="gym-virtual">
        <header className="header">
          <div className="show-mobile">
            <AnimatedText
              el="h2"
              text={"Gym Virtual"}
              className="title text-4xl font-bold"
            />
            <AnimatedText
              delay={0.7}
              text={"Etapa Uno"}
              className="subtitle text-4xl font-bold"
            />
          </div>
          <div className="show-desktop">
            <AnimatedText
              el="h2"
              text={"Gym Virtual"}
              className="title text-7xl font-bold"
            />
            <AnimatedText
              delay={0.7}
              text={"Etapa Uno"}
              className="subtitle text-4xl font-bold"
            />
          </div>
        </header>
        <div className="container plan-plus-gym-virtual">
          <section className="text-section">
            <h3 className="heading">
              Un gimnasio virtual <i>pensado para vos</i>.
            </h3>
            <p className="text">
              Entrenás con tu propio peso corporal, desde casa, sin equipos.
            </p>
            <p className="text">
              El objetivo es simple: convertirte en esa versión física y mental
              que querés lograr.
            </p>
          </section>

          <section className="text-section">
            <h3 className="heading">
              Vas a tener <i>3 desafíos</i> progresivos:
            </h3>
            <ol className="list">
              <li>
                <strong>Reto Perder Grasa</strong>
              </li>
              <li>
                <strong>Pectorales de Hierro</strong>
              </li>
              <li>
                <strong>Abdomen de Acero</strong>
              </li>
            </ol>
          </section>
          <section className="text-section">
            <p className="text">
              Con solo 45 minutos al día, vas a ir superando niveles, creando el
              hábito, y construyendo un cuerpo funcional, fuerte y atlético.
            </p>
          </section>
          <section className="text-section">
            <p className="text">
              No necesitás estar motivado,{" "}
              <i>
                <strong>solo dar el primer paso</strong>
              </i>
              .
            </p>
          </section>
        </div>

        <div className="cards" ref={cardContainerGymRef}>
          <CardDesktop
            className="card-background gym-virtual"
            parent={cardContainerGymRef}
            position="left"
          >
            <div className="card-content">
              <h3 className="title">Gym Virtual</h3>
              <hr className="separator" />
              <div className="price">
                <div className="price-usd">
                  <div className="amount">
                    <span className="amount-sign">$</span>
                    <span className="amount-number">132</span>
                  </div>
                  <div className="amount-details">
                    <span className="amount-currency">usd</span>
                    <span className="amount-period">3 meses</span>
                  </div>
                </div>
                <div className="price-ars">
                  <p className="info">Precio en ars $132.000 cada 3 meses</p>
                </div>
              </div>
              <button className="plan-cta" onClick={handleVirtualGymCTA}>
                Activar mi plan
              </button>

              <hr className="separator" />

              <h4 className="included">Incluye:</h4>

              <ul className="list">
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Acceso completo a los 3
                  desafíos
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Clase grupal en vivo
                  semanal
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Seguimiento semanal
                  personalizado
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Acceso a un grupo
                  privado
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Guía nutricional básica
                </li>
              </ul>
            </div>
          </CardDesktop>
          <CardDesktop
            className="card-image gym-virtual hide"
            parent={cardContainerGymRef}
            position="right"
          />
        </div>
      </article>
      <article className="article-program" id="calistenia-online">
        <header className="header">
          <div className="show-mobile">
            <AnimatedText
              el="h2"
              text={"Calistenia Online"}
              className="title text-4xl font-bold"
            />
            <AnimatedText
              delay={1}
              text={"Etapa Dos"}
              className="subtitle text-4xl font-bold"
            />
          </div>
          <div className="show-desktop">
            <AnimatedText
              el="h2"
              text={"Calistenia Online"}
              className="title text-7xl font-bold"
            />
            <AnimatedText
              text={"Etapa Dos"}
              delay={1}
              className="subtitle text-4xl font-bold"
            />
          </div>
        </header>
        <div className="container plan-plus-planificacion-online">
          <section className="text-section">
            <h3 className="heading">
              Entrenamientos diseñados según{" "}
              <i>
                <strong>tus objetivos y preferencias</strong>
              </i>
              .
            </h3>
            <p className="text">
              Pensado para niveles intermedios y avanzados, podés entrenar desde
              casa con una barra de dominadas o usar las del parque más cercano.
            </p>
          </section>
          <section className="text-section">
            <p className="text">
              Cada rutina dura entre 45 y 80 minutos, con un enfoque claro:
              desarrollar fuerza y control corporal.
            </p>
          </section>
          <section className="text-section">
            <p className="text">
              Recibís{" "}
              <i>
                <strong>dos planificaciones nuevas cada mes</strong>
              </i>
              , adaptadas y ajustadas para que sigan siendo desafiantes y nos
              permitan optimizar los mejores resultados posibles.
            </p>
          </section>
          <section className="text-section">
            <p className="text">
              Lo que se construye con constancia,{" "}
              <i>
                <strong>transforma</strong>
              </i>
              .
            </p>
          </section>
        </div>
        <div className="cards" ref={cardContainerPlanificationRef}>
          <CardDesktop
            className="card-background calistenia-online"
            parent={cardContainerPlanificationRef}
            position="left"
          >
            <div className="card-content">
              <h3 className="title">Calistenia Online</h3>
              <hr className="separator" />
              <div className="price">
                <div className="price-usd">
                  <div className="amount">
                    <span className="amount-sign">$</span>
                    <span className="amount-number">132</span>
                  </div>
                  <div className="amount-details">
                    <span className="amount-currency">usd</span>
                    <span className="amount-period">3 meses</span>
                  </div>
                </div>
                <div className="price-ars">
                  <p className="info">Precio en ars $132.000 cada 3 meses</p>
                </div>
              </div>
              <button
                className="plan-cta"
                onClick={handleOnlinePlanificationCTA}
              >
                activar mi plan
              </button>

              <hr className="separator" />

              <h4 className="included">Incluye:</h4>

              <ul className="list">
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Una rutina nueva cada 14
                  días
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Clase grupal en vivo
                  semanal
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Seguimiento semanal
                  personalizado
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Acceso a un grupo
                  privado
                </li>
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Guía nutricional básica
                </li>
              </ul>

              <h4 className="requirements">Requerimientos:</h4>

              <ul className="list">
                <li className="item">
                  <TaskAltIcon className="item-disc" /> Necesitas barra de
                  dominadas y paralelas o acceso a un parque con ese
                  equipamiento
                </li>
              </ul>
            </div>
          </CardDesktop>
          <CardDesktop
            className="card-image calistenia-online hide"
            parent={cardContainerPlanificationRef}
            position="right"
          />
        </div>
      </article>

      <div className={classNames(["modal", { open: isOpen }])}>
        <div className="modal-content">
          <CloseIcon className="modal-close-button" onClick={handleClose} />
          <div className="modal-scroll-wrapper">
            {modalPage === MODAL_PROGRAMS && (
              <div className="content">
                <div className="content-header">
                  {isOpen && (
                    <video
                      preload="auto"
                      autoPlay
                      controls={false}
                      disablePictureInPicture
                      controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
                      className="video"
                      onClick={(evt: any) => {
                        evt.target?.paused
                          ? evt.target?.play()
                          : evt.target?.pause();
                      }}
                    >
                      <source
                        src={
                          formData.plan === PlansTypes.VirtualGym
                            ? require("../public/videos/intro_gym.mp4")
                            : require("../public/videos/intro_planificaciones.mp4")
                        }
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>

                <div className="content-body">
                  <form className="form">
                    {stepForm === 1 && (
                      <>
                        <p className="title">
                          Regístrate y planifica tus objetivos
                        </p>
                        <div className="fields">
                          <div className="field">
                            <label className="" htmlFor="nombre">
                              Nombre y Apellido
                            </label>
                            <TextField
                              variant="outlined"
                              id="nombre"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleInputChange}
                              placeholder="Juan Pérez"
                              sx={textInputStyles}
                              required
                            />
                            {formErrors.nombre && (
                              <p style={{ color: "red" }}>
                                {formErrors.nombre}
                              </p>
                            )}
                          </div>
                          <div className="field">
                            <label className="" htmlFor="pais">
                              País
                            </label>
                            <TextField
                              variant="outlined"
                              id="pais"
                              select
                              name="pais"
                              defaultValue=""
                              value={formData.pais}
                              onChange={handleInputChange}
                              required
                              SelectProps={selectedProps as SelectProps}
                            >
                              {COUNTRIES.map((country) => (
                                <MenuItem
                                  key={country.code}
                                  value={country.code}
                                  sx={selectInputStyles}
                                >
                                  <span className="select-option">
                                    {country.flag} {country.name}
                                  </span>
                                </MenuItem>
                              ))}
                            </TextField>
                            {formErrors.pais && (
                              <p style={{ color: "red" }}>{formErrors.pais}</p>
                            )}
                          </div>
                          {camposVisibles && (
                            <>
                              <div className="field">
                                <label className="" htmlFor="ciudad">
                                  Ciudad
                                </label>
                                <TextField
                                  variant="outlined"
                                  id="ciudad"
                                  name="ciudad"
                                  value={formData.ciudad}
                                  onChange={handleInputChange}
                                  placeholder="Ingresá tu ciudad"
                                  sx={textInputStyles}
                                  required
                                />
                                {formErrors.ciudad && (
                                  <p style={{ color: "red" }}>
                                    {formErrors.ciudad}
                                  </p>
                                )}
                              </div>
                              <div className="field">
                                <label className="" htmlFor="emailLocalPart">
                                  Correo Electrónico
                                </label>
                                <TextField
                                  variant="outlined"
                                  id="emailLocalPart"
                                  name="emailLocalPart"
                                  value={formData.emailLocalPart}
                                  onChange={handleInputChange}
                                  placeholder="Solo correos gmail"
                                  sx={textInputStyles}
                                  required
                                  slotProps={{
                                    input: {
                                      endAdornment: (
                                        <span className="field-adornment">
                                          @gmail.com
                                        </span>
                                      ),
                                    },
                                  }}
                                />
                                {formErrors.emailLocalPart && (
                                  <p style={{ color: "red" }}>
                                    {formErrors.emailLocalPart}
                                  </p>
                                )}
                              </div>
                              <div className="field">
                                <label className="" htmlFor="celular">
                                  Celular
                                </label>
                                <TextField
                                  variant="outlined"
                                  id="celular"
                                  name="celular"
                                  value={formData.celular}
                                  onChange={handleInputChange}
                                  placeholder="0123456789"
                                  sx={textInputStyles}
                                  required
                                  slotProps={{
                                    input: {
                                      startAdornment: (
                                        <span className="field-adornment">
                                          {
                                            PHONE_CODES[
                                              formData.pais as keyof typeof PHONE_CODES
                                            ]
                                          }
                                        </span>
                                      ),
                                    },
                                  }}
                                />
                                {formErrors.celular && (
                                  <p style={{ color: "red" }}>
                                    {formErrors.celular}
                                  </p>
                                )}
                              </div>
                              <div className="field">
                                <label className="" htmlFor="objetivos">
                                  Objetivos
                                </label>
                                <TextField
                                  variant="outlined"
                                  id="objetivos"
                                  name="objetivos"
                                  value={formData.objetivos}
                                  onChange={handleInputChange}
                                  placeholder="Contame tus objetivos"
                                  sx={textInputStyles}
                                  multiline
                                  maxRows={4}
                                  required
                                />
                                {formErrors.objetivos && (
                                  <p style={{ color: "red" }}>
                                    {formErrors.objetivos}
                                  </p>
                                )}
                              </div>
                              <div className="submit">
                                <Button
                                  variant="text"
                                  onClick={handleClose}
                                  sx={cancelButtonStyles}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={handleFormValidation}
                                  sx={nextButtonStyles}
                                >
                                  Siguiente
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {stepForm === 2 && (
                      <div className="payment-form">
                        <div className="header">
                          <p className="title">Pago</p>
                          <div className="payment-details">
                            <div className="payment-details-partial">
                              <span>{planInfo.name}</span>
                              {formData.pais === "ARG" && (
                                <span>
                                  {Number(planInfo?.price.ars)}{" "}
                                  <small>00</small> ARS
                                </span>
                              )}
                              {formData.pais !== "ARG" && (
                                <span>
                                  {Number(planInfo?.price.usd)}{" "}
                                  <small>00</small> USD
                                </span>
                              )}
                            </div>
                            <hr />
                            <div className="payment-details-partial">
                              <strong>Total</strong>
                              {formData.pais === "ARG" && (
                                <span>
                                  {Number(planInfo?.price.ars)}{" "}
                                  <small>00</small> ARS
                                </span>
                              )}
                              {formData.pais !== "ARG" && (
                                <span>
                                  {Number(planInfo?.price.usd)}{" "}
                                  <small>00</small> USD
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="payment-action">
                            <div className="payment-info">
                              <span className="">
                                Opciones de pago en tu país:
                              </span>
                            </div>
                            <div className="payment-button">
                              {formData.pais !== "ARG" && (
                                <PayPalComponent
                                  className="paypal-button"
                                  formData={formData}
                                />
                              )}
                              {formData.pais === "ARG" && (
                                <MercadopagoComponent
                                  className="mercadopago-button"
                                  formData={formData}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {stepForm === 2 && (
                  <div className="content-footer">
                    <Button
                      className="back-button"
                      variant="outlined"
                      onClick={() => setStepForm(1)}
                      sx={cancelButtonStyles}
                    >
                      Volver
                    </Button>
                  </div>
                )}
              </div>
            )}
            {modalPage === MODAL_PURCHASE_SUCCESS && (
              <div
                className="content"
                data-id="purchase_success"
                id="purchase_success"
              >
                <div className="content-header">
                  {isOpen && (
                    <video
                      muted
                      preload="auto"
                      autoPlay
                      controls={true}
                      disablePictureInPicture
                      controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
                      className="video"
                      onClick={(evt: any) => {
                        evt.target?.paused
                          ? evt.target?.play()
                          : evt.target?.pause();
                      }}
                      src={require("../public/videos/agradecimiento_pago.mp4")}
                    >
                      <source
                        src={require("../public/videos/agradecimiento_pago.mp4")}
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>

                <div className="content-body">
                  <p className="title">¡Te doy la bienvenida!</p>
                  <p>
                    Gracias por unirte al <strong>Team ECNU</strong>.
                  </p>
                  <p>
                    Dentro de las <strong>proximas 24hs</strong> me pondre en
                    contacto contigo por WhatsApp.
                  </p>
                  <p className="phrase-text">
                    <span className="phrase-quote">
                      No cuentes los días, haz que los días cuenten.
                    </span>{" "}
                    <small className="phrase-author">Muhammad Alí</small>
                  </p>
                  <p>
                    Recuerda que no obtendrás resultados si no das el primer
                    paso.
                  </p>
                </div>

                <div className="content-footer">
                  <p>
                    <strong>¡Comencemos!</strong>
                  </p>
                </div>
              </div>
            )}
            {modalPage === MODAL_PURCHASE_FAILED && (
              <div className="content">
                <div className="content-header"></div>
                <div className="content-body">
                  <p className="title">Ups... hubo un problema</p>
                  <p>
                    No se pudo acreditar tu pago. Volve a intentarlo nuevamente.
                  </p>
                </div>
                <div className="content-footer">
                  <Button
                    className="back-button"
                    variant="outlined"
                    onClick={() => closeModal()}
                    sx={cancelButtonStyles}
                  >
                    Volver
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;

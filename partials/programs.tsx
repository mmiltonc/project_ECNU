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
import { Steps } from "@/components/shared/steps";
import AnimatedText from "@/components/shared/animatedText";
import CampaignIcon from "@mui/icons-material/Campaign";
import CardDesktop from "@/components/shared/card-desktop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import MercadopagoComponent from "@/components/shared/marcadopago-component";
import Modal from "@mui/material/Modal";
import PayPalComponent from "@/components/shared/paypal-component";
import Typography from "@mui/material/Typography";
import plansData from "@/app/data/plans.json";
import {
  desktop,
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
import Joi from 'joi';

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
      min-height: 100vh;
      position: relative;
      left: ${space(-3)};
      padding: 0 ${space(3)};
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
        height: 570px;
        width: 100%;
        border: 2px solid var(--primary-color);
        border-radius: ${space(1)};
        padding: ${space(2)};

        ${tablet(css`
          width: 330px;
        `)}
      }
    }

    .plan-cta {
      ${fontSize4};
      font-family: var(--font-oswald);
      padding: ${space(2)} ${space(3)};
      border-radius: 10px;
      border: 2px solid #fd5f44;
      text-transform: uppercase;
      background-color: #fd5f44;
      display: block;
      transition: 200ms ease all;
      width: 100%;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.28),
        0 2px 4px rgba(0, 0, 0, 0.24), 0 -1px 3px rgba(0, 0, 0, 0.2);

      &:hover {
        transform: scale(1.05);
      }

      ${tablet(css`
        width: max-content;
        margin: 0 auto;
      `)}
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
      max-width: 500px;
      height: 100%;
      width: 100%;
      background-color: var(--white-color);
      display: flex;
      flex-direction: column;
      gap: ${space(3)};
      overflow-y: auto;
      touch-action: auto;
      overscroll-behavior: contain;
      position: relative;

      ${desktop(css`
        border-radius: ${space(1)};
        max-height: 862px;
        height: 100%;
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
    }

    .step-1 {
      display: flex;
      flex-direction: column;
      height: 100%;

      /* ${desktop(css`
        flex-direction: initial;
      `)} */

      .video {
        width: 100%;
        z-index: 1007;
        cursor: pointer;
      }

      .form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        color: var(--background-color);
        padding: ${space(3)} ${space(3)};
        font-family: var(--font-jost);

        .title {
          ${fontSize3};
          font-family: var(--font-jost);
          font-weight: 600;
          margin-bottom: ${space(2)};
        }

        .fields {
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
              margin-bottom: ${space(2)};
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

          .footer {
            .payment-back {
              .back-button {
                display: inline-block;
              }
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
    imagen: "/images/planificaciones_online.jpeg",
  },
  {
    main: false,
    plan: PlansTypes.OnlinePlanification,
    type: "plan",
    typeVideo: "plani",
    imagen: "/images/plan_plani_online.jpeg",
  },
];

const virtualGymCards = [
  {
    main: true,
    plan: PlansTypes.VirtualGym,
    type: "gym",
    typeVideo: "gym",
    imagen: "/images/gym_virtual.jpeg",
  },
  {
    main: false,
    plan: PlansTypes.VirtualGym,
    type: "plan",
    typeVideo: "gym",
    imagen: "/images/plan_gym_test.jpeg",
  },
];

// type PlanCode = keyof typeof PLANS_CODES;

const Programs = () => {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [camposVisibles, setCamposVisibles] = useState(false);
  const [stepForm, setStepForm] = useState(1);
  const [modalPage, setModalPage] = useState(1);
  const [planInfo, setPlanInfo] = useState({} as PlanType);
  const cardContainerGymRef = useRef(null);
  const cardContainerPlanificationRef = useRef(null);
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


  const formSchema = Joi.object({
    plan: Joi.string().required().messages({
      'string.empty': 'El plan es obligatorio.'
    }),
    nombre: Joi.string().min(3).required().messages({
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.'
    }),
    pais: Joi.string().min(3).required().messages({
      'string.empty': 'El país es obligatorio.',
      'string.min': 'El país debe tener al menos 3 caracteres.'
    }),
    ciudad: Joi.string().min(3).required().messages({
      'string.empty': 'La ciudad es obligatoria.',
      'string.min': 'La ciudad debe tener al menos 3 caracteres.'
    }),
    emailLocalPart: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.empty': 'El email es obligatorio.',
        'string.email': 'El email no es válido.'
      }),
    celular: Joi.string()
      .pattern(/^\d+$/)
      .min(6)
      .required()
      .messages({
        'string.empty': 'El celular es obligatorio.',
        'string.pattern.base': 'El celular solo debe contener números.',
        'string.min': 'El celular debe tener al menos 6 dígitos.'
      }),
    objetivos: Joi.string().min(10).required().messages({
      'string.empty': 'Los objetivos son obligatorios.',
      'string.min': 'Los objetivos deben tener al menos 10 caracteres.'
    })
  });

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop(); // Detiene el scroll global
    } else {
      lenis.start(); // Reactiva el scroll
    }
  }, [isOpen, lenis]);

  useEffect(() => {
    if (formData.nombre?.trim() && formData.pais?.trim()) {
      setCamposVisibles(true);
    } else {
      setCamposVisibles(false);
    }
  }, [formData.nombre, formData.pais]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("modal") === "1") {
        setModalPage(2);
        openModal();
      }
      if (searchParams.get("modal") === "3") {
        setModalPage(3);
        openModal();
      }
    }
  }, [openModal]);

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
    setModalPage(1);
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
    const { error, value } = formSchema.validate(formData, { abortEarly: false });

    if (error) {
      const errores: Record<string, string> = {};
      error.details.forEach(err => {
        if (err.context?.key) {
          errores[err.context.key] = err.message;
        }
      });
      setFormErrors(errores); // Guardamos los errores
    } else {
      setFormErrors({}); // Limpiamos errores si pasa la validación
      console.log('Datos validados:', value);
      setStepForm(2);
    }
  }

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
      // backgroundColor: "var(--secondary-color)",
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
            parent={cardContainerGymRef}
            main={virtualGymCards[0].main}
            position="left"
            image={virtualGymCards[0].imagen}
            plan={virtualGymCards[0].plan}
          />
          <CardDesktop
            parent={cardContainerGymRef}
            main={virtualGymCards[1].main}
            position="right"
            image={virtualGymCards[1].imagen}
            plan={virtualGymCards[1].plan}
          />
        </div>
        <button className="plan-cta" onClick={handleVirtualGymCTA}>
          Activar mi plan gym virtual
        </button>
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
            parent={cardContainerPlanificationRef}
            main={planificationCards[0].main}
            position="left"
            image={planificationCards[0].imagen}
            plan={planificationCards[0].plan}
          />
          <CardDesktop
            parent={cardContainerPlanificationRef}
            main={planificationCards[1].main}
            position="right"
            image={planificationCards[1].imagen}
            plan={planificationCards[1].plan}
          />
        </div>
        <button className="plan-cta" onClick={handleOnlinePlanificationCTA}>
          activar mi plan calistenia online
        </button>
      </article>

      <div className={classNames(["modal", { open: isOpen }])}>
        <div className="modal-content">
          <CloseIcon className="modal-close-button" onClick={handleClose} />

          {modalPage === 1 && (
            <div className="step-1">
              {isOpen && (
                <video
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
                  src={
                    formData.plan === PlansTypes.VirtualGym
                      ? require("../public/videos/intro_gym.mp4")
                      : require("../public/videos/intro_planificaciones.mp4")
                  }
                />
              )}
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
                        {formErrors.nombre && <p style={{ color: 'red' }}>{formErrors.nombre}</p>}
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
                        {formErrors.pais && <p style={{ color: 'red' }}>{formErrors.pais}</p>}
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
                            {formErrors.ciudad && <p style={{ color: 'red' }}>{formErrors.ciudad}</p>}
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
                            {formErrors.emailLocalPart && <p style={{ color: 'red' }}>{formErrors.emailLocalPart}</p>}
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
                            {formErrors.celular && <p style={{ color: 'red' }}>{formErrors.celular}</p>}
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
                            {formErrors.objetivos && <p style={{ color: 'red' }}>{formErrors.objetivos}</p>}
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
                              {Number(planInfo?.price.ars)} <small>00</small>{" "}
                              ARS
                            </span>
                          )}
                          {formData.pais !== "ARG" && (
                            <span>
                              {Number(planInfo?.price.usd)} <small>00</small>{" "}
                              USD
                            </span>
                          )}
                        </div>
                        <hr />
                        <div className="payment-details-partial">
                          <strong>Total</strong>
                          {formData.pais === "ARG" && (
                            <span>
                              {Number(planInfo?.price.ars)} <small>00</small>{" "}
                              ARS
                            </span>
                          )}
                          {formData.pais !== "ARG" && (
                            <span>
                              {Number(planInfo?.price.usd)} <small>00</small>{" "}
                              USD
                            </span>
                          )}
                        </div>
                        {/* <span className="">
                        Desarrollar tu mejor físico está a solo unos pasos más
                        de distancia. Un gran hombre dijo una vez: "No cuentes
                        los días, haz que los días cuenten". —Muhammad Alí.
                        Recuerde que los resultados no se obtienen a menos que
                        comiences, ¡Así que comencemos HOY!
                      </span> */}
                      </div>
                      <div className="payment-action">
                        <div className="payment-info">
                          <span className="">Opciones de pago en tu país:</span>
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
                    <div className="footer">
                      <div className="payment-back"></div>
                      <Button
                        className="back-button"
                        variant="outlined"
                        onClick={() => setStepForm(1)}
                        sx={cancelButtonStyles}
                      >
                        Volver
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
          {modalPage === 2 && (
            <>
              <button className="" onClick={handleClose}>
                X
              </button>
              <div className="">
                <div className="">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    ¡Bienvenid@!
                  </Typography>
                  <span className="">
                    Gracias por unirte al team ECNU. Acontinuacion te informo
                    como continuamos!
                  </span>
                </div>
                <div className="">
                  <CheckCircleIcon className="" />
                  <span className="">PAGO APROBADO</span>
                </div>
              </div>
              <div className="">
                <video
                  autoPlay
                  controls
                  disablePictureInPicture
                  controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
                  className="rounded-md"
                  src={require("../public/videos/agradecimiento_pago.mp4")}
                />
              </div>
              <Steps step={stepForm} modal={modalPage} />
              <div className="">
                <InfoIcon className="" />
                <span className="">
                  En las proximas 24hs me pondre en contacto contigo por
                  WhatsApp al numero anunciado en el formulario.
                </span>
              </div>
            </>
          )}
          {modalPage === 3 && (
            <>
              <button className="" onClick={handleClose}>
                X
              </button>
              <div className="">
                <div className="">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Ups!
                  </Typography>
                  <span className="">
                    vemos que no se pudo acreditar tu pago. Volve a intentar mas
                    tarde!
                  </span>
                </div>
                <div className="">
                  <ErrorOutlineIcon className="" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Programs;

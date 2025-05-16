"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { useModal } from "../app/context/modalContext";
import {
  COUNTRIES,
  FormDataType,
  PHONE_CODES,
  PlansTypes,
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
import {
  desktop,
  fontSize1,
  fontSize2,
  fontSize3,
  fontSize4,
  mobile,
  space,
} from "@/styles/global";
import { useLenis } from "lenis/react";
import { Button, MenuItem, SelectProps, TextField } from "@mui/material";
export const dynamic = "force-static";

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
    padding: ${space(6)} ${space(3)};

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

      ${desktop(css`
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

      ${desktop(css`
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

        ${desktop(css`
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

      ${desktop(css`
        width: max-content;
        margin: 0 auto;
      `)}
    }
  }

  .modal {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .modal-content {
      max-width: 1000px;
      height: 100%;
      width: 100%;
      background-color: var(--white-color);
      display: flex;
      flex-direction: column;
      gap: ${space(3)};
      overflow-y: auto;
      touch-action: auto;
      overscroll-behavior: contain;

      ${desktop(css`
        padding: ${space(6)};
        border-radius: ${space(1)};
        height: 700px;
        width: 80%;
      `)}
    }

    .step-1 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${space(3)};

      ${desktop(css`
        flex-direction: initial;
      `)}

      .video {
        position: sticky;
        top: 0;
        border-radius: ${space(0.5)};
        width: 100%;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: ${space(3)};
        width: 100%;
        color: var(--background-color);
        padding: 0 ${space(3)};
        font-family: var(--font-jost);

        .title {
          ${fontSize3};
          font-family: var(--font-jost);
          font-weight: 600;
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
  const cardContainerGymRef = useRef(null);
  const cardContainerPlanificationRef = useRef(null);

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop(); // Detiene el scroll global
    } else {
      lenis.start(); // Reactiva el scroll
    }
  }, [isOpen, lenis]);

  // useEffect(() => {
  //   const lenis = initLenis();

  //   if (isOpen) {
  //     lenis.stop();
  //   } else {
  //     lenis.start();
  //   }

  //   return () => {
  //     lenis.start(); // por si se desmonta el modal inesperadamente
  //   };
  // }, [isOpen]);

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

  const [formData, setFormData] = useState<FormDataType>({
    plan: "",
    nombre: "",
    pais: "",
    ciudad: "",
    emailLocalPart: "",
    celular: "",
    objetivos: "",
  });

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
    console.log(name, value);
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

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
    handleVirtualGymCTA();
    const modal = document.querySelector(".modal-content");
    if (!modal) return;

    const stopScrollPropagation = (e) => e.stopPropagation();

    modal.addEventListener("wheel", stopScrollPropagation, { passive: false });
    modal.addEventListener("touchmove", stopScrollPropagation, {
      passive: false,
    });

    return () => {
      modal.removeEventListener("wheel", stopScrollPropagation);
      modal.removeEventListener("touchmove", stopScrollPropagation);
    };
  }, []);

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
            type={virtualGymCards[0].type}
            image={virtualGymCards[0].imagen}
            plan={virtualGymCards[0].plan}
          />
          <CardDesktop
            parent={cardContainerGymRef}
            main={virtualGymCards[1].main}
            position="right"
            type={virtualGymCards[1].type}
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
            type={planificationCards[0].type}
            image={planificationCards[0].imagen}
            plan={planificationCards[0].plan}
          />
          <CardDesktop
            parent={cardContainerPlanificationRef}
            main={planificationCards[1].main}
            position="right"
            type={planificationCards[1].type}
            image={planificationCards[1].imagen}
            plan={planificationCards[1].plan}
          />
        </div>
        <button className="plan-cta" onClick={handleOnlinePlanificationCTA}>
          activar mi plan calistenia online
        </button>
      </article>

      <div className="modal">
        <div className="modal-content">
          {modalPage === 1 && (
            <div className="step-1">
              <video
                autoPlay
                controls
                disablePictureInPicture
                controlsList="nodownload noremoteplayback noplaybackrate"
                className="video"
                src={
                  formData.plan === PlansTypes.VirtualGym || true
                    ? require("../public/videos/intro_gym.mp4")
                    : require("../public/videos/intro_planificaciones.mp4")
                }
              />
              {/* <Steps step={stepForm} modal={modalPage} /> */}
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
                              onClick={() => setStepForm(2)}
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
                  <>
                    <div className="">
                      <CampaignIcon className="" />
                      <span className="">
                        {`
                                                      Desarrollar tu mejor físico está a solo unos pasos más de distancia.
                                                      Un gran hombre dijo una vez: "No cuentes los días, haz que los días cuenten".
                                                      —Muhammad Alí. Recuerde que los resultados no se obtienen a menos que comiences,
                                                      ¡Así que comencemos HOY!
                                                    `}
                      </span>
                    </div>
                    <div className="">
                      <div className="">
                        <span className="">Metodos de pago</span>
                      </div>
                      <div className="">
                        {formData.pais === "ARG" && (
                          <MercadopagoComponent formData={formData} />
                        )}
                        {formData.pais !== "ARG" && (
                          <PayPalComponent formData={formData} />
                        )}
                        <div className="">
                          <button className="" onClick={() => setStepForm(1)}>
                            Volver
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
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
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  className="rounded-md"
                  src={require("../public/videos/agradecimiento_pago.mp4")}
                ></video>
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

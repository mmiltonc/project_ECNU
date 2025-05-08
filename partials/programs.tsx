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
import Box from "@mui/material/Box";
import CampaignIcon from "@mui/icons-material/Campaign";
import CardDesktop from "@/components/shared/card-desktop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import MercadopagoComponent from "@/components/shared/marcadopago-component";
import Modal from "@mui/material/Modal";
import PayPalComponent from "@/components/shared/paypal-component";
import Typography from "@mui/material/Typography";
export const dynamic = "force-static";

const styles = css`
  padding: 0 80px 0;

  strong {
    font-weight: 600;
  }

  i {
    color: #87a7cb;
    font-style: normal;
  }

  .article-program {
    padding-top: 160px;

    .header {
      margin-bottom: 64px;
      .title {
        font-family: var(--font-jost);
        font-weight: 900;
        font-size: 80px;
        line-height: 1;
        text-transform: uppercase;
      }

      .subtitle {
        font-family: var(--font-jost);
        font-weight: 900;
        color: #fd5f44;
        font-size: 80px;
        line-height: 1;
        margin-bottom: 24px;
        text-transform: uppercase;
      }
    }

    .container {
      padding: 0 80px 10px 200px;
      margin-bottom: 132px;
      position: relative;

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
      }

      .text-section {
        margin-bottom: 32px;

        .heading {
          font-family: var(--font-jost);
          font-size: 26px;
          line-height: 1.2;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .text {
          font-family: var(--font-jost);
          font-size: 24px;
          line-height: 1.2;
        }

        .list {
          font-family: var(--font-jost);
          font-size: 24px;
          line-height: 1.2;
          list-style: inside decimal;
        }
      }
    }

    .cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 32px;
      background-image: radial-gradient(closest-side, #fd5f44, #051422) !important;
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const { isOpen, abrirModal, cerrarModal } = useModal();
  const [camposVisibles, setCamposVisibles] = useState(false);
  const [stepForm, setStepForm] = useState(1);
  const [modalPage, setModalPage] = useState(1);

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
    cerrarModal();
    setModalPage(1);
    setStepForm(1);
    console.log("cerrar modal");
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
        abrirModal();
      }
      if (searchParams.get("modal") === "3") {
        setModalPage(3);
        abrirModal();
      }
    }
  }, [abrirModal]);

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   url.searchParams.delete("modal");
  //   window.history.replaceState({}, "", url.toString());

  //   const cleanHash = "#gym-virtual";
  //   window.location.hash = cleanHash;
  // }, []);

  return (
    <section
      css={styles}
      ref={sectionRef}
      className="programs-section"
    >
      <article className="article-program" id="gym-virtual">
        <header className="header">
          <div className="block lg:hidden">
            <AnimatedText
              el="h2"
              text={"Gym Virtual"}
              className="title text-4xl font-bold"
            />
            <AnimatedText
            delay={.7}
              text={"Etapa Uno"}
              className="subtitle text-4xl font-bold"
            />
          </div>
          <div className="hidden lg:block">
            <AnimatedText
              el="h2"
              text={"Gym Virtual"}
              className="title text-7xl font-bold"
            />
            <AnimatedText
            delay={.7}
              text={"Etapa Uno"}
              className="subtitle text-4xl font-bold"
            />
          </div>
        </header>
        <div className="container">
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
              No necesitás estar motivado, {" "}
              <i>
                <strong>solo dar el primer paso</strong>
              </i>
              .
            </p>
          </section>
        </div>

        <div className="cards">
          {virtualGymCards.map((item, index) => {
            return (
              <CardDesktop
                main={item.main}
                index={index}
                key={index}
                type={item.type}
                image={item.imagen}
                setPlan={() => setFormData({ ...formData, plan: item.plan })}
                setOpen={abrirModal}
                plan={item.plan}
              />
            );
          })}
        </div>
      </article>
      <article className="article-program" id="calistenia-online">
        <header className="header">
          <div className="block lg:hidden">
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
          <div className="hidden lg:block">
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
        <div className="container">
          <section className="text-section">
            <h3 className="heading">
              Entrenamientos diseñados según <i><strong>tus objetivos y preferencias</strong></i>
              .
            </h3>
            <p className="text">
              Pensado para niveles intermedios y avanzados, podés entrenar desde
              casa con una barra de dominadas o usar las del parque más cercano.
            </p>
          </section>
          <section className="text-section">
            <p className="text">
              Recibís <i><strong>dos planificaciones nuevas cada mes</strong></i>, adaptadas y
              ajustadas para que sigan siendo desafiantes y nos permitan
              optimizar los mejores resultados posibles.
            </p>
          </section>
          <section className="text-section">
          <p className="text">
              Lo que se construye con constancia, <i><strong>transforma</strong></i>.
            </p>
          </section>
        </div>
        <div className="cards">
          {planificationCards.map((item, index) => {
            return (
              <CardDesktop
                main={item.main}
                index={index}
                key={index}
                type={item.type}
                image={item.imagen}
                setPlan={() => setFormData({ ...formData, plan: item.plan })}
                setOpen={abrirModal}
                plan={item.plan}
              />
            );
          })}
        </div>
      </article>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="w-[90%] max-h-[80vh] overflow-y-auto overflow-x-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100
            shadow-xl p-4 text-gray-900 rounded-xl
            lg:w-[950px]"
        >
          {modalPage === 1 && (
            <>
              <div className="mt-6 mb-6 w-full lg:w-[80%] relative -z-10 mx-auto">
                {formData.plan === PlansTypes.VirtualGym && (
                  <video
                    autoPlay
                    controls
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    className="rounded-md"
                    src={require("../public/videos/intro_gym.mp4")}
                  ></video>
                )}
                {formData.plan === PlansTypes.OnlinePlanification && (
                  <video
                    autoPlay
                    controls
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    className="rounded-md"
                    src={require("../public/videos/intro_planificaciones.mp4")}
                  ></video>
                )}
              </div>
              <Steps step={stepForm} modal={modalPage} />
              <div className="max-w-4xl mx-auto bg-white  p-6 rounded-lg">
                <form className="space-y-4 text-gray-800">
                  {stepForm === 1 && (
                    <>
                      <div className="w-[95%] mx-auto relative z-40 text-gray-800">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Regístrate y planifica tus objetivos
                        </Typography>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium">
                            Nombre y Apellido
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Juan Pérez"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            País
                          </label>
                          <select
                            name="pais"
                            value={formData.pais}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none"
                            required
                          >
                            <option value={""} selected disabled>
                              Selecciona tu país
                            </option>
                            {COUNTRIES.map((country) => (
                              <option
                                key={country.code}
                                value={country.code}
                                className="text-black"
                              >
                                {country.flag} {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Mostrar campos restantes solo si nombre y país están completos */}
                      </div>
                      {camposVisibles && (
                        <>
                          {/* Fila 2: Ciudad, Correo */}
                          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Ciudad
                              </label>
                              <input
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ingresá tu ciudad"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                              </label>
                              <div className="mt-1 flex items-center">
                                <input
                                  name="emailLocalPart"
                                  value={formData.emailLocalPart}
                                  onChange={handleInputChange}
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Solo correos gmail"
                                  required
                                />
                                <span className="flex items-center px-1.5 py-2 border border-gray-300 rounded-r-md bg-gray-100">
                                  @gmail.com
                                </span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Celular
                              </label>
                              <div className="mt-1 flex items-center">
                                <span className="flex items-center px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100">
                                  {
                                    PHONE_CODES[
                                      formData.pais as keyof typeof PHONE_CODES
                                    ]
                                  }
                                </span>
                                <input
                                  type="text"
                                  name="celular"
                                  value={formData.celular}
                                  onChange={handleInputChange}
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="123456789"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          {/* Fila 3: Celular (código de área y número) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Objetivos
                              </label>
                              <textarea
                                name="objetivos"
                                value={formData.objetivos}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="Escribe tus objetivos aquí..."
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="flex justify-end pt-10">
                            <button
                              className="w-24 h-8 mr-3 rounded-md flex justify-center items-center bg-gray-400 text-white"
                              onClick={handleClose}
                            >
                              Cancelar
                            </button>
                            <button
                              className="w-32 h-8 rounded-md flex justify-center items-center bg-red-800 text-white"
                              onClick={() => setStepForm(2)}
                            >
                              Siguiente
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {stepForm === 2 && (
                    <>
                      <div className="mx-auto flex items-center mb-6">
                        <CampaignIcon className="w-10 h-10 text-red-800" />
                        <span className="ml-4 font-bold">
                          {`
                                                      Desarrollar tu mejor físico está a solo unos pasos más de distancia.
                                                      Un gran hombre dijo una vez: "No cuentes los días, haz que los días cuenten".
                                                      —Muhammad Alí. Recuerde que los resultados no se obtienen a menos que comiences,
                                                      ¡Así que comencemos HOY!
                                                    `}
                        </span>
                      </div>
                      <div className="w-[87%] mx-auto mt-4">
                        <div className="text-gray-800">
                          <span className="font-bold text-xl">
                            Metodos de pago
                          </span>
                        </div>
                        <div className="bg-white py-6 lg:pr-6 rounded-lg mx-auto">
                          {formData.pais === "ARG" && (
                            <MercadopagoComponent formData={formData} />
                          )}
                          {formData.pais !== "ARG" && (
                            <PayPalComponent formData={formData} />
                          )}
                          <div className="w-full flex justify-end items-center mt-4">
                            <button
                              className="w-32 h-8 rounded-md flex justify-center items-center bg-red-800 text-white"
                              onClick={() => setStepForm(1)}
                            >
                              Volver
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </>
          )}
          {modalPage === 2 && (
            <>
              <button
                className="w-full h-5 text-xl mr-3 rounded-md flex justify-end items-center text-gray-900"
                onClick={handleClose}
              >
                X
              </button>
              <div className="w-[80%] mx-auto flex justify-between items-center mt-4 bg-green-100 rounded-md p-4">
                <div className="">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    ¡Bienvenid@!
                  </Typography>
                  <span className="flex justify-start w-full">
                    Gracias por unirte al team ECNU. Acontinuacion te informo
                    como continuamos!
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircleIcon className="w-20 h-20 text-green-400" />
                  <span className="text-green-400">PAGO APROBADO</span>
                </div>
              </div>
              <div className="mt-6 w-[80%] relative -z-10 mx-auto">
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
              <div className="w-[83%] mx-auto mt-3 flex items-center">
                <InfoIcon className="text-blue-800" />
                <span className="flex justify-center w-full">
                  En las proximas 24hs me pondre en contacto contigo por
                  WhatsApp al numero anunciado en el formulario.
                </span>
              </div>
            </>
          )}
          {modalPage === 3 && (
            <>
              <button
                className="w-full h-5 text-xl mr-3 rounded-md flex justify-end items-center text-gray-900"
                onClick={handleClose}
              >
                X
              </button>
              <div className="w-[80%] mx-auto flex justify-between items-center my-4 bg-red-100 rounded-md p-4">
                <div className="">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Ups!
                  </Typography>
                  <span className="flex justify-start w-full">
                    vemos que no se pudo acreditar tu pago. Volve a intentar mas
                    tarde!
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <ErrorOutlineIcon className="w-20 h-20 text-red-400" />
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default Programs;

"use client";

import Image from "next/image";

const About = () => {
  const person = {
    id: 0,
    name: "Lucas",
    quote: "Lucas me enseñó confiar en mi potencial, es un gran guía.",
    before: require("@/public/images/before_after/before_lucas.jpg"),
    after: require("@/public/images/before_after/after_lucas.jpg"),
  };


  return (
    <>
      <section className="section-about" id="quien-soy">
        <div className="flex w-18 justify-end pr-28">
        </div>

        <div className="w-full lg:flex lg:flex-row">
          <div className="flex pb-40 lg:pb-20 pt-32 lg:pt-14">
            <div className="w-full flex justify-center">
              <Image
                src="/images/antes_despues_luqui.jpeg"
                alt="line"
                fill
                className="relative ml-14 mt-10 h-[550px] rounded-lg"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center text-2xl">
              <div className="flex justify-center items-center w-3/4 ml-auto mr-auto">
                <p className="text-left text-black">
                  Hola, soy Lucas Pallotta, atleta e instructor de calistenia de
                  alto rendimiento. A lo largo de los años, he desarrollado
                  herramientas para el control y la armonización de la mente y
                  el cuerpo. Mi principal don es la disciplina , y me apasiona
                  ayudar a quienes están dispuestos a permitirme influenciar en
                  sus vidas. La actividad física va mucho mas allá de
                  simplemente alcanzar un cuerpo saludable o esbelto. Para mi,
                  es un canalizador fundamental de energía, tanto positiva como
                  negativa, que nos permite transformar nuestras emociones y
                  pensamientos en acción. A través del ejercicio, no solo
                  fortalecemos nuestros músculos; también cultivamos nuestro
                  autoestima y desarrollamos la perseverancia necesaria para
                  alcanzar nuestros sueños.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

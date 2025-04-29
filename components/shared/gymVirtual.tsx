"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { useMediaQuery } from "@/hooks/use-media-query"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export const GymVirtual = () => {
  const isMobile = useMediaQuery("(max-width: 800px)")
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true)
  }, [])

  const trainingPrograms = [
    {
      title: "Perder Grasa",
      activeClass: "bg-radial-blue-yellow",
      hoverClass: "group-hover:bg-radial-blue-yellow",
      borderClass: "group-hover:border-green-800",
      rotateClass: "-rotate-[35deg]",
    },
    {
      title: "Pectorales de Hierro",
      activeClass: "bg-radial-black-gray",
      hoverClass: "group-hover:bg-radial-black-gray",
      borderClass: "group-hover:border-gray-700",
      rotateClass: "rotate-90",
    },
    {
      title: "Abdomen de Acero",
      activeClass: "bg-radial-red-gray",
      hoverClass: "group-hover:bg-radial-red-gray",
      borderClass: "group-hover:border-red-800",
      rotateClass: "rotate-[35deg]",
    },
  ]

  const renderTrainingProgram = (program:any, index:number, isActive?: boolean) => (
    <div className="flex flex-col items-center group text-center transition-transform duration-300 hover:scale-110">
      {/* Líneas conectoras (solo en desktop) */}
      <div
        className={`hidden lg:block relative ${
          index === 0 ? "left-[180px]" : index === 1 ? "" : "right-44"
        } w-${index === 1 ? "32" : "80"} h-4 items-center mb-12`}
      >
        <div
          className={`w-${index === 1 ? "1/4" : "2/4"} border-t-2 border-gray-300 rounded-lg transform ${program.rotateClass} transition duration-300 ${program.borderClass}`}
        ></div>
      </div>

      {/* Título del programa */}
      <div
        className={`w-48 bg-gray-300 z-50 p-4 rounded-lg transition duration-300 ${program.hoverClass} group-hover:text-white
                    ${isActive ? `${program.activeClass}` : ""}`}
      >
        <h3 className="font-bold">{program.title}</h3>
      </div>

      {/* Niveles */}
      {[1, 2, 3].map((level) => (
        <p
          key={level}
          className={`w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 ${program.hoverClass} group-hover:text-white
                      ${isActive ? `${program.activeClass}` : ""}`}
        >
          Nivel {level}
        </p>
      ))}
    </div>
  )

  if (!mounted) {
    return null 
  }

  return (
    <div className="flex justify-center items-center h-auto mb-48 overflow-x-hidden
                    lg:overflow-x-visible">
      <div className="flex justify-center items-center flex-col">
        {/* Título central */}
        <div className="w-48 h-48 text-white bg-radial-gray-black via-gray-800 border-[10px] border-red-800 border-solid font-bold flex items-center justify-center rounded-full text-lg shadow-md mx-auto relative z-10">
          GYM VIRTUAL
        </div>

        {/* Versión móvil con Swiper */}
        {isMobile ? (
          <div className="w-full mt-10">
            <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={"auto"}
            centeredSlides={true}
            navigation={true}
            loop={true}
            className="gym-swiper"
            onSlideChange={(swiper) => {
              // Importante: como usás loop, hay que calcular el real index
              const realIndex = swiper.realIndex;
              setActiveIndex(realIndex);
            }}
            >
            {trainingPrograms.map((program, index) => (
                <SwiperSlide key={index} className="py-4 w-64"> {/* 👈 ancho fijo en mobile */}
                {renderTrainingProgram(program, index, index === activeIndex)}
                </SwiperSlide>
            ))}
            </Swiper>
          </div>
        ) : (
          // Versión desktop (original)
          <div className="flex flex-row space-x-6 mt-10 cursor-pointer">
            {trainingPrograms.map((program, index) => (
              <div key={index}>{renderTrainingProgram(program, index)}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

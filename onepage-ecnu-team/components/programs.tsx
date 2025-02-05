"use client"
import { useEffect, useState, useRef } from 'react'
import CardMobile from './shared/card-mobile'
import CardDesktop from './shared/card-desktop'
import DescripcionRetoGrasa from '../public/data/reto-grasa.json'
import AnimatedText from './shared/animatedText'
import { Tulpen_One, Nothing_You_Could_Do, Bebas_Neue, Domine } from 'next/font/google'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { add } from "@/app/api/actions";

export const dynamic = "force-static";

const tulpenOne = Tulpen_One({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})
const nothingYouCouldDo = Nothing_You_Could_Do({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})
const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

const arrayPlanificaciones = [
    {
        main: true,
        type: 'plani',
        typeVideo: 'plani',
        imagen: '/images/planificaciones_online.jpeg'
    },
    {
        main: false,
        type: 'plan',
        typeVideo: 'plani',
        imagen: '/images/plan_plani_online.jpeg'
    }
]

const arrayGymVirtual = [
    {
        main: true,
        type: 'gym',
        typeVideo: 'gym',
        imagen: '/images/gym_virtual.jpeg'
    },
    {
        main: false,
        type: 'plan',
        typeVideo: 'gym',
        imagen: '/images/plan_gym_test.jpeg'
    }
]

const Programs = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [camposVisibles, setCamposVisibles] = useState(false);
    const [typeSelected, setTypeSelected] = useState('');
    console.log('typeSelected: ', typeSelected)
    const [formData, setFormData] = useState({
        nombre: "",
        pais: "",
        codigoArea: "",
        celular: "",
    });
    //MODAL
    const [open, setOpen] = useState(false);
    const [modalPage, setModalPage] = useState(1);
    
    // MERCADO PAGO ---------------------------------------------------


    const paisesHispanos = [
        { nombre: "Argentina", codigo: "+54", bandera: "🇦🇷" },
        { nombre: "España", codigo: "+34", bandera: "🇪🇸" },
        { nombre: "México", codigo: "+52", bandera: "🇲🇽" },
        { nombre: "Chile", codigo: "+56", bandera: "🇨🇱" },
        { nombre: "Colombia", codigo: "+57", bandera: "🇨🇴" },
        { nombre: "Perú", codigo: "+51", bandera: "🇵🇪" },
        { nombre: "Uruguay", codigo: "+598", bandera: "🇺🇾" },
        { nombre: "Ecuador", codigo: "+593", bandera: "🇪🇨" },
        { nombre: "Venezuela", codigo: "+58", bandera: "🇻🇪" },
    ];

    useEffect(() => {
        // Esta lógica solo se ejecutará en el cliente
        const userAgent = navigator.userAgent;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(userAgent));
    }, []);

    useEffect(() => {
        if (formData.nombre.trim() !== "" && formData.pais.trim() !== "") {
          setCamposVisibles(true);
        } else {
          setCamposVisibles(false);
        }
    }, [formData.nombre, formData.pais]);

    const handleClose = () => {
        setOpen(false); // Cierra el modal (o lo que estés manejando con `open`)
        setCamposVisibles(false);
        setModalPage(1)
        setFormData({
            nombre: "",
            pais: "",
            codigoArea: "",
            celular: "",
        }); // Reinicia los valores de `formData`
    };

    const changeModalPage = (page: number) => {
       setModalPage(page)
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        if (name === "pais") {
          const paisSeleccionado = paisesHispanos.find((p) => p.nombre === value);
          if (paisSeleccionado) {
            setFormData((prev) => ({
              ...prev,
              codigoArea: paisSeleccionado.codigo,
            }));
          }
        }
        console.log('formData: ', formData)
        if (formData.nombre && formData.pais) {
          setCamposVisibles(true);
        }
    };

    return (
        <section ref={sectionRef} className='w-auto flex flex-col lg:mt-0' id='clasesyretos'>
                <div className='flex flex-col pt-10 mb-10 ml-4 text-4xl font-bold lg:hidden'>
                    <AnimatedText text={["GYM VIRTUAL", "Y PLANIFICACIONES"]} className='text-white text-4xl font-bold'/>
                </div>
                <div className='lg:block md:hidden sm:hidden 2sm:hidden lg:mt-[100px] lg:ml-8'>
                    {/* <span className='text-white text-8xl font-bold'>CLASES, PLANIFICACIONES Y RETOS.</span> */}
                    <AnimatedText  text={["GYM VIRTUAL", "Y PLANIFICACIONES"]} className='text-white text-7xl font-bold'/>
                </div>
                <div className='w-full h-auto mt-4 
                                lg:flex lg:flex-col lg:justify-center lg:items-center lg:mt-20 lg:mb-52'>
                    <>
                        <div className='flex flex-col justify-center items-center mt-14'>
                            <p className='w-[100%] text-center text-5xl'>GIMNASIO VIRTUAL</p>
                            <p  className='w-[100%] text-center text-3xl'>ROMPIENDO BARRERAS</p>
                        </div>
                        <div className='flex justify-center items-center mt-20 mb-14'>
                            <p className='w-[55%] text-center text-2xl'>
                                Un gimnasio virtual con tu propio peso creado para convertirte en esa persona que queres lograr 
                                física y mentalmente! Sobrepasarás niveles con una dificultad en ascenso, incursionandote en la actividad física, 
                                entrando de una manera y al superar cada desafío te convertirás en ese hombre/mujer que deseas ser.
                            </p>
                        </div>
                        <div className='w-full flex flex-wrap justify-center gap-8 lg:pt-36'>
                                {arrayGymVirtual.map((item, index) => {
                                    return (
                                        <CardDesktop
                                            main={item.main}
                                            index={index}
                                            type={item.type}
                                            typeVideo={item.typeVideo}
                                            image={item.imagen}
                                            setTypeSelected={setTypeSelected}
                                            setOpen={setOpen}
                                        />
                                    )
                                })}
                        </div>
                        <div className='flex flex-col justify-center items-center mt-40'>
                            <p className='w-[100%] text-center text-5xl'>PLANIFICACIONES</p>
                            <p  className='w-[100%] text-center text-3xl'>PERSONALIZA TUS ENTRENAMIENTOS ONLINE</p>
                        </div>
                        <div className='flex justify-center items-center mt-20 mb-32'>
                            <p className='w-[55%] text-center text-2xl'>
                                Mis planificaciones online de calistenia están diseñadas específicamente en base a tus preferencias
                                 y objetivos. Esta pensado para niveles intermedios y avanzados. Con esta modalidad podrás entrenar
                                  desde tu casa con materiales (Barra Dominadas). También se pueden utilizar barras en cualquier parque
                                   cercano a tu domicilio. Obtendrás dos planificaciones online por mes y se irán modificando de manera
                                    mensual para que sean desafiantes y logremos optimizar los mejores resultados posibles.
                            </p>
                        </div>
                        <div className='w-full flex flex-wrap justify-center gap-8 lg:mt-20'>
                            {isMobile ? (
                                <>
                                    <CardMobile 
                                        main={true}
                                        type='reto'
                                        title='Reto Perder Grasa'
                                        arrayDescripcion={DescripcionRetoGrasa}
                                        price={16800}
                                        dPrice={45}
                                    />
                                </>
                            ) : (
                                <>
                                    {arrayPlanificaciones.map((item, index) => {
                                        return (
                                            <CardDesktop 
                                                main={item.main}
                                                index={index}
                                                type={item.type}
                                                typeVideo={item.typeVideo}
                                                image={item.imagen}
                                                setTypeSelected={setTypeSelected}
                                                setOpen={setOpen}
                                            />
                                        )
                                    })}
                                </>
                                
                            )}
                        </div>
                    </>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box 
                        className="w-[900px] max-h-[80vh] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100
                        shadow-xl p-4 text-black rounded-xl"
                    >
                        {modalPage === 1 && (
                            <>  
                                <div className="mt-6 w-[80%] relative -z-10 mx-auto">
                                    {typeSelected === 'gym' ? (
                                        <video
                                        autoPlay
                                        controls
                                        disablePictureInPicture
                                        controlsList="nodownload noremoteplayback noplaybackrate"
                                        className='rounded-md'
                                        src={require("../public/videos/intro_gym.mp4")}
                                        >
                                        </video>
                                    ) : (
                                        <video
                                        autoPlay
                                        controls
                                        disablePictureInPicture
                                        controlsList="nodownload noremoteplayback noplaybackrate"
                                        className='rounded-md'
                                        src={require("../public/videos/intro_planificaciones.mp4")}
                                        >
                                        </video>
                                    )}
                                </div>
                                <div className='w-[95%] mx-auto relative z-40 mt-11 text-gray-800'>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Regístrate y planifica tus objetivos
                                    </Typography>
                                </div>
                                <div className="max-w-4xl mx-auto bg-white  p-6 rounded-lg">
                                    <form className="space-y-4 text-gray-800" action={add}>
                                        {/* Fila 1: Nombre y Apellido, País */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium">Nombre y Apellido</label>
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
                                            <label className="block text-sm font-medium">País</label>
                                            <select
                                            name="pais"
                                            value={formData.pais}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none"
                                            required
                                            >
                                            <option value="" disabled>
                                                Selecciona tu país
                                            </option>
                                            {paisesHispanos.map((pais) => (
                                                <option key={pais.codigo} value={pais.nombre} className='text-gray-600'>
                                                {pais.bandera} {pais.nombre}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                        </div>

                                        {/* Mostrar campos restantes solo si nombre y país están completos */}
                                        {camposVisibles && (
                                        <>
                                            {/* Fila 2: Ciudad, Correo */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                                                    <input
                                                    type="text"
                                                    name="ciudad"
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Ingresá tu ciudad"
                                                    required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                                    <div className="mt-1 flex items-center">
                                                        <input
                                                        type="email"
                                                        name="correo"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Solo correos gmail"
                                                        required
                                                        onKeyPress={(e) => {
                                                            if (e.key === "@") {
                                                                e.preventDefault(); // Bloquear el ingreso del símbolo "@"
                                                            }
                                                        }}
                                                        />
                                                        <span className="flex items-center px-1.5 py-2 border border-gray-300 rounded-r-md bg-gray-100">
                                                            @GMAIL.COM
                                                        </span>

                                                    </div>
                                                </div>
                                            </div>

                                            {/* Fila 3: Celular (código de área y número) */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Celular</label>
                                                    <div className="flex items-center">
                                                        <span className="flex items-center px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100">
                                                            {formData.codigoArea}{" "}
                                                        </span>
                                                        <input
                                                            type="text"
                                                            name="celular"
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="123456789"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Objetivos</label>
                                                    <textarea
                                                    name="objetivos"
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                    placeholder="Escribe tus objetivos aquí..."
                                                    required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className='flex justify-end pt-10'>
                                                <button 
                                                  className='w-24 h-8 mr-3 rounded-md flex justify-center items-center bg-gray-400 text-white'
                                                  onClick={handleClose}
                                                >
                                                    Cancelar
                                                </button>
                                                <button 
                                                  className='w-32 h-8 rounded-md flex justify-center items-center bg-red-800 text-white'
                                                  type="submit"
                                                >
                                                    Siguiente
                                                </button>
                                            </div>
                                        </>
                                        )}
                                    </form>
                                    </div>
                            </>
                        )}
                    </Box>
                </Modal>
        </section>
    )
}

export default Programs;
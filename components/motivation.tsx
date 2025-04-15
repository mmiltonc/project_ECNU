"use client"
import ParallaxText from './shared/parallaxText'
const Motivation = () => {

    return (
        <>
            <section className='flex flex-row w-full h-[950px] bg-red-800 pt-20 px-8
                                lg:flex-col lg:pt-40 lg:text-xl lg:mt-0 lg:px-0' 
                    id='motivaccion'>
                    {/* <div className='flex flex-col ml-2 mr-10 
                                    lg:flex-row lg:w-full lg:justify-center lg:items-center lg:m-0'>
                        <h1 className='w-[38px] text-center text-white text-5xl font-bold break-all tracking-widest my-4
                                      lg:break-normal lg:tracking-normal lg:w-auto lg:text-7xl'>Motiv</h1>
                        <h1 className='w-[38px] text-center text-5xl font-bold break-all text-gray-900 tracking-widest 
                                      lg:break-normal lg:tracking-normal lg:w-auto lg:text-9xl'>A</h1>
                        <h1 className='w-[38px] text-center text-white text-5xl font-bold break-all tracking-widest 
                                      lg:break-normal lg:tracking-normal lg:w-auto lg:text-7xl'>cción</h1>
                    </div> */}
                    {/* <div className='w-full'>
                        <ParallaxText baseVelocity={-2}>motivAccion</ParallaxText>
                        <ParallaxText baseVelocity={2}>motivAccion</ParallaxText>
                    </div> */}
                    <div className='w-[350px]
                                    lg:flex-row lg:w-4/6 lg:mx-auto lg:justify-center lg:items-center lg:my-20 lg:pb-10 lg:text-center mt-0 pt-0'>
                        <p className='mb-8'>Quiero que te lleves este mensaje, la mayoría de las personas esperan estar motivadas para comenzar a realizar actividad física, pero yo te quiero preguntar ...</p>
                        <p className='mb-8'>¿Qué sucede si esa motivación no aparece? </p>
                        <p className='mb-8'>Resulta que la única manera que la motivación regrese a tu vida, es a través de la Acción, cuánto más te muevas mas endorfinas el cuerpo expulsara, comenzaras a ver las cosas con una perspectiva más postiva y al cabo de un corto plazo esa motivación volverá á resurgir. </p>
                        <p className='mb-8'>Pero no puedes pretender guiarte por la motivación, ya que las ganas fluctúan constantemente y es muy cortoplacista la duración. </p>
                        <p className='mb-8'>¡Una mente entrenada logrará entender que la disciplina y la determinación hacia un objetivo es la CLAVE para lograr esos resultados que tantos estás deseando! </p>
                        <p className='mb-8'>¡Y yo tengo esas herramientas para brindarte!</p>
                    </div>
            </section>
        </>
    )
}

export default Motivation;
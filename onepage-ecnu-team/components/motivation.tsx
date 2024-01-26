"use client"
import Container from './shared/container'

const Motivation = () => {

    return (
        <>
            <Container className='flex flex-row mt-10 w-full h-[850px]' id='motivaccion'>
                    <div className='flex flex-col ml-2 mr-10'>
                        <h1 className='w-4 text-center text-white text-4xl font-bold break-all tracking-widest'>Motiv</h1>
                        <h1 className='w-4 text-center text-4xl font-bold break-all text-red-700 tracking-widest'>A</h1>
                        <h1 className='w-4 text-center text-white text-4xl font-bold break-all tracking-widest'>cción</h1>
                    </div>
                    <div className='w-[280px] mt-2'>
                        <p className='mb-4'>Quiero que te lleves este mensaje, la mayoría de las personas esperan estar motivadas para comenzar a realizar actividad física, pero yo te quiero preguntar ...</p>
                        <p className='mb-4'>¿Qué sucede si esa motivación no aparece? </p>
                        <p className='mb-4'>Resulta que la única manera que la motivación regrese a tu vida, es a través de la Acción, cuánto más te muevas mas endorfinas el cuerpo expulsara, comenzaras a ver las cosas con una perspectiva más postiva y al cabo de un corto plazo esa motivación volverá á resurgir. </p>
                        <p className='mb-4'>Pero no puedes pretender guiarte por la motivación, ya que las ganas fluctúan constantemente y es muy cortoplacista la duración. </p>
                        <p className='mb-4'>¡Una mente entrenada logrará entender que la disciplina y la determinación hacia un objetivo es la CLAVE para lograr esos resultados que tantos estás deseando! </p>
                        <p className='mb-4'>¡Y yo tengo esas herramientas para brindarte!</p>
                    </div>
                    <div className="pattern-dots pattern-red-500 pattern-bg-white pattern-size-4 pattern-opacity-100"></div>
            </Container>
        </>
    )
}

export default Motivation;
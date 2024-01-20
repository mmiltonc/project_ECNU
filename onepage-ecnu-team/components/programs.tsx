"use client"
import Container from './shared/container'
import Card from './shared/card'
import Image from 'next/image'
import BgRetoGrasa from '../public/images/bg_reto_grasa.jpg'

const descripciones = ['Descripcion calistenia inicial', 'Descripcion calistenia inicial', 'Descripcion calistenia inicial']
const Programs = () => {
    return (
        <Container className='flex flex-col -mt-64'>
                <div className='flex flex-col pt-10 mb-10 text-3xl font-bold'>
                    <span>CLASES</span>
                    <span className='text-black border-white-2 text-6xl relative -right-36 -top-4'>&</span>
                    <span className='relative left-52'>RETOS</span>
                </div>
                <div className='w-full pt-8 flex flex-col justify-center items-center'>
                    <Card 
                        title='Calistenia Inicial'
                        subtitle='clases personalizadas 100%'
                        description={descripciones}
                        bPrice={7200}
                        aPrice={8500}
                    />
                    <div className='h-20'>
                        <Image
                            src='/images/lines.png'
                            alt='line'
                            fill
                            className='relative w-full h-18 left-16'
                        />
                    </div>
                    <Card 
                        title='Calistenia Intermedio'
                        subtitle='clases personalizadas 100%'
                        description={descripciones}
                        bPrice={7200}
                        aPrice={8500}
                    />
                    <div className='h-20'>
                        <Image
                            src='/images/lines.png'
                            alt='line'
                            fill
                            className='relative w-full h-18 -left-16'
                        />
                    </div>
                    <Card 
                        title='Calistenia Avanzado'
                        subtitle='clases personalizadas 100%'
                        description={descripciones}
                        bPrice={7200}
                        aPrice={8500}
                    />
                    <div className='h-20'>
                        <Image
                            src='/images/lines.png'
                            alt='line'
                            fill
                            className='relative w-full h-18 left-16'
                        />
                    </div>
                    <Card 
                        title='Reto Perder Grasa'
                        subtitle='seguimiento personalizado 100%'
                        description={descripciones}
                        bPrice={7200}
                        aPrice={8500}
                        image={BgRetoGrasa}
                    />
                </div>
                <div className='mt-8 pb-12'>
                    <span className='text-sm'>Te quedaron dudas? Consultanos por WhatsApp</span>
                </div>
        </Container>
    )
}

export default Programs;
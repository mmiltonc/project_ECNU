"use client"
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CardMobile from './shared/card-mobile'
import CardDesktop from './shared/card-desktop'
import Image from 'next/image'
import DescripcionPlanificaciones from '../public/data/planificaciones.json'
import DescripcionRetoGrasa from '../public/data/reto-grasa.json'

interface Coachs {
    [key: string]: string[];
}

const Programs = () => {

    const [itemSelected, setItemSelected] = useState('')
    const [selectedPlace, setSelectedPlace] = useState<string>('')
    const [selectedCoach, setSelectedCoach] = useState<string>('') 
    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    const places = ['Parque Saavedra', 'Rio Vicente Lopez', 'Palermo'];
    const coachs = ['Lucas Pallota', 'Julian Cebuhar']
    const coachsPlaces: Coachs = {
      'Parque Saavedra': ['Lucas Pallota'],
      'Rio Vicente Lopez': ['Julian Cebuhar'],
      'Palermo': ['Julian Cebuhar'],
    };

    const handleSelected = (item: string) => {
        setItemSelected(item)
    }

  // Manejar el cambio en el select de lugares
    const handlePlaceChange = (event: SelectChangeEvent<string>) => {
        const selectedPlace = event.target.value;
        setSelectedPlace(selectedPlace);
        // Reiniciar la selección del profesor si se cambia el lugar
        setSelectedCoach('');
    };

    // Manejar el cambio en el select de profesores
    const handleTeacherChange = (event: SelectChangeEvent<string>) => {
        setSelectedCoach(event.target.value);
    };

    useEffect(() => {

    },[itemSelected])

    return (
        <section className='w-auto flex flex-col
                            lg:mt-0' id='clasesyretos'>
                <div className='flex flex-col pt-10 mb-10 ml-4 text-4xl font-bold lg:hidden'>
                    <span>CLASES</span>
                    <span className='text-white w-20 border-white-2 text-4xl relative'>PLANIFICACIONES</span>
                    <span className='relative w-26'>Y RETOS</span>
                </div>
                <div className='lg:block md:hidden sm:hidden 2sm:hidden lg:mt-[100px] lg:w-14 lg:ml-8'>
                    <span className='text-white text-8xl font-bold'>CLASES, PLANIFICACIONES Y RETOS.</span>
                </div>
                <div className='w-full h-auto mt-4 
                                lg:flex lg:justify-center lg:items-center lg:mt-20'>
                    <button className='w-full h-[190px] lg:h-[500px]' onClick={() => handleSelected('presencial')}>
                        <Image
                            src='/images/clases-presenciales.jpg'
                            alt='line'
                            fill
                            className={`relative w-full object-cover transition duration-300 ease-in-out hover:opacity-100 ${itemSelected === 'presencial' ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span className='relative bottom-28 text-center font-bold text-2xl lg:bottom-64'>Clases Presenciales</span>
                    </button>
                    <button className='relative bottom-8 w-full h-[200px] lg:h-[500px] lg:bottom-0' onClick={() =>handleSelected('planificacion')}>
                        <Image
                            src='/images/clases-online.jpg'
                            alt='line'
                            fill
                            className={`relative w-full object-cover transition duration-300 ease-in-out hover:opacity-100 ${itemSelected === 'planificacion' ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span className='relative bottom-28 text-center font-bold text-2xl lg:bottom-64'>Planificaciones Online</span>
                    </button>
                    <button className='relative bottom-16 w-full h-[200px] lg:h-[500px] lg:bottom-0' onClick={() => handleSelected('reto')}>
                        <Image
                            src='/images/retos.jpg'
                            alt='line'
                            fill
                            className={`relative w-full object-cover transition duration-300 ease-in-out hover:opacity-100 ${itemSelected === 'reto' ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span className='relative bottom-28 text-center font-bold text-2xl lg:bottom-64'>Retos</span>
                    </button>
                </div>
                {itemSelected === 'presencial' && (
                    <>
                        <div className='lg:w-full lg:flex lg:flex-col lg:min-h-[400px] lg:pt-20'>
                            <div className='lg:w-full lg:text-center lg:mb-8 font-bold text-2xl'>Consultar por</div>
                            <div className='lg:w-5/12 lg:flex lg:justify-between lg:mx-auto'>
                                <div className='text-white'>
                                    <Select
                                        id="demo-simple-select-helper"
                                        value={selectedPlace}
                                        onChange={handlePlaceChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='lg:w-52 lg:text-white focus:outline-none focus:ring-0 focus:border-gray-300'
                                    >
                                        <MenuItem value="">
                                            <em>Lugar</em>
                                        </MenuItem>
                                        {places.map((place, index) => (
                                        <MenuItem key={index} value={place}>
                                            <em>{place}</em>
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div> 
                                    <Select
                                        id="demo-simple-select-helper"
                                        value={selectedCoach} 
                                        onChange={handleTeacherChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='lg:w-52 lg:text-white focus:outline-none focus:ring-0 focus:border-gray-300'
                                    >
                                        <MenuItem value="">
                                            <em>Profe</em>
                                        </MenuItem>
                                        {selectedPlace ? (
                                            coachsPlaces[selectedPlace].map((coach, index) => (
                                                <MenuItem key={index} value={coach}>
                                                    <em>{coach}</em>
                                                </MenuItem>
                                            ))
                                        ) : (
                                            coachs.map((coach, index) => (
                                                <MenuItem key={index} value={coach}>
                                                    <em>{coach}</em>
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        {(selectedPlace || selectedCoach) && (
                            <>
                                <div>
                                    {selectedPlace && (
                                        <p>se muestra mapa con ubicacion</p>
                                    )}
                                    {selectedCoach && (
                                        <p>se muestra nombre/foto de profe</p>
                                    )}
                                </div>
                                <div className='w-full flex flex-wrap justify-center gap-20'>
                                    {isMobile ? (
                                        <>
                                            <CardMobile 
                                                main={true}
                                                type='presencial'
                                                title='Inicial - Intermedio - Avanzado (+16)'
                                                subtitle='clases personalizadas 100%'
                                                descripcion='3 VECES POR SEMANA'
                                                price={8500}
                                                lugar={selectedPlace}
                                                profesor={selectedCoach}
                                                cantDias={3}
                                            />
                                            <CardMobile 
                                                main={false}
                                                type='presencial'
                                                title='Inicial - Intermedio - Avanzado (+16)'
                                                subtitle='clases personalizadas 100%'
                                                descripcion='2 VECES POR SEMANA'
                                                price={8500}
                                                lugar={selectedPlace}
                                                profesor={selectedCoach}
                                                cantDias={2}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <CardDesktop 
                                                main={true}
                                                type='presencial'
                                                title='Inicial - Intermedio - Avanzado (+16)'
                                                subtitle='clases personalizadas 100%'
                                                descripcion='3 VECES POR SEMANA'
                                                price={10500}
                                                lugar={selectedPlace}
                                                profesor={selectedCoach}
                                                cantDias={3}
                                            />
                                            <CardDesktop 
                                                main={false}
                                                type='presencial'
                                                title='Inicial - Intermedio - Avanzado (+16)'
                                                subtitle='clases personalizadas 100%'
                                                descripcion='2 VECES POR SEMANA'
                                                price={8700}
                                                lugar={selectedPlace}
                                                profesor={selectedCoach}
                                                cantDias={2}
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
                {itemSelected === 'planificacion' && (
                    <div className='w-full pt-2 flex flex-wrap justify-center gap-20
                                    lg:pt-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={false}
                                    type='planificacion'
                                    title='Planificacion de rutinas'
                                    arrayDescripcion={DescripcionPlanificaciones}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    type='planificacion'
                                    title='Planificacion de rutinas'
                                    arrayDescripcion={DescripcionPlanificaciones}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                {itemSelected === 'reto' && (
                    <div className='w-full pt-2 flex flex-wrap justify-center gap-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={true}
                                    type='reto'
                                    title='Reto Perder Grasa'
                                    arrayDescripcion={DescripcionRetoGrasa}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    title='Reto Perder Grasa'
                                    type='reto'
                                    arrayDescripcion={DescripcionRetoGrasa}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                <div className='w-full mt-2 mb-12 text-center
                                lg:w-full lg:flex lg:justify-center lg:items-center'>
                    {itemSelected === '' ? (
                        <div className='lg:hidden'>
                            <div className="arrow text-red-700">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {(selectedPlace && selectedCoach) && (
                                <div className='mt-10'>
                                    <span className='text-sm'>Te quedaron dudas? Consultanos por WhatsApp</span>
                                </div>

                            )}
                        </>
                    )}
                </div>
        </section>
    )
}

export default Programs;
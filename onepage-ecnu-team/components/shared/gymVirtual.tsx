
export const GymVirtual = () => {

    return (
        <div className="flex justify-center items-center h-auto mb-48">
            <div className="flex justify-center items-center flex-col">
                <div className="">

                </div>
                <div className="w-48 h-48 text-white bg-radial-gray-black via-gray-800 border-[10px] border-red-800 border-solid font-bold flex items-center justify-center rounded-full text-lg shadow-md mx-auto relative z-10">
                    GYM VIRTUAL
                </div>
                <div className="flex space-x-6 mt-10 cursor-pointer">
                    <div className="flex flex-col items-center group text-center transition-transform duration-300 hover:scale-110">
                        <div className="relative left-[240px] w-80 h-4 flex justify-between items-center mb-12">
                            <div className="w-2/4 border-t-2 border-gray-300 rounded-lg transform -rotate-[35deg] transition duration-300 group-hover:border-green-800"></div> {/* Rotación "/" */}
                        </div>
                        <div className="w-48 bg-gray-300 p-4 rounded-lg transition duration-300 group-hover:bg-radial-blue-yellow group-hover:text-white">
                            <h3 className="font-bold">Perder Grasa</h3>
                        </div>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-blue-yellow group-hover:text-white">Nivel 1</p>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-blue-yellow group-hover:text-white">Nivel 2</p>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-blue-yellow group-hover:text-white">Nivel 3</p>
                    </div>
                    <div className="flex flex-col items-center group text-center transition-transform duration-300 hover:scale-110">
                        <div className="relative w-48 h-4 flex justify-center items-center mb-12">
                            <div className="w-1/4 border-t-2 border-gray-300 rounded-lg transform rotate-90 transition duration-300 group-hover:border-gray-700"></div> {/* Rotación "|" */}
                        </div>
                        <div className="w-48 bg-gray-300 p-4 rounded-lg transition duration-300 group-hover:bg-radial-black-gray group-hover:text-white">
                            <h3 className="font-bold">Pectorales de Hierro</h3>
                        </div>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-black-gray group-hover:text-white">Nivel 1</p>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-black-gray group-hover:text-white">Nivel 2</p>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-black-gray group-hover:text-white">Nivel 3</p>
                    </div>
                    <div className="flex flex-col items-center group text-center transition-transform duration-300 hover:scale-110">
                        <div className="relative right-20 w-80 h-4 flex justify-between items-center mb-12">
                            <div className="w-2/4 border-t-2 border-gray-300 rounded-lg transform rotate-[35deg] transition duration-300 group-hover:border-red-800"></div> {/* Rotación "\" */}
                        </div>
                        <div className="w-48 bg-gray-300 p-4 rounded-lg transition duration-300 group-hover:bg-radial-red-gray group-hover:text-white">
                            <h3 className="font-bold">Abdomen de Acero</h3>
                        </div>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-red-gray group-hover:text-white">Nivel 1</p>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-red-gray group-hover:text-white">Nivel 2</p>
                        <p className="w-48 mt-6 font-bold bg-gray-300 p-4 rounded-md transition duration-300 group-hover:bg-radial-red-gray group-hover:text-white">Nivel 3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
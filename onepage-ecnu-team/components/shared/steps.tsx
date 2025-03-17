interface StepsProps {
    step: number;
    modal: number;
  }

export const Steps = ({step , modal}: StepsProps) => {

    return (
        <div className="flex items-center justify-center my-5">
            <div className="flex flex-col justify-center items-center">
                <span className={`flex justify-center items-center w-8 h-8 rounded-full p-5 ${(step === 2 || modal === 2)? 'bg-green-400 text-white' : 'bg-gray-300 text-gray-500'} font-bold `}>1</span>
                <span>Regístrate</span>
            </div>
            <span className={`w-24 h-1 border-2 rounded-md ${(step === 2 || modal === 2)? 'border-green-400' : 'border-gray-300'} border-solid mx-4`}></span>
            <div className="flex flex-col justify-center items-center">
                <span className={`flex justify-center items-center w-8 h-8 rounded-full p-5 ${modal === 2 ? 'bg-green-400 text-white' : 'bg-gray-300 text-gray-500'} font-bold `}>2</span>
                <span>Paga</span>
            </div>
            <span className="w-24 h-1 border-2 rounded-md border-gray-300 border-solid mx-4"></span>
            <div className="flex flex-col justify-center items-center">
                <span className={`flex justify-center items-center w-8 h-8 rounded-full p-5 bg-gray-300 font-bold text-gray-500`}>3</span>
                <span>Empezar</span>
            </div>
        </div>
    )
}
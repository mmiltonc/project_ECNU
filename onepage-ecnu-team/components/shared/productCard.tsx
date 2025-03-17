

export const ProductCard = ({producto}: {producto: any}) => {

    return (
        <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10">
            <div className="flex flex-col h-[376px] w-[241px] rounded-[15px] overflow-visible">
                <div className="bg-[#EF3749] h-[45%] relative rounded-t-[15px]">
                    <img src={producto.imagen} className="absolute top-[-2.5rem] left-16 w-[220px] transform rotate-[-8deg] translate-x-[-50%] z-10" />
                    <span className="text-white text-2xl font-bold italic absolute bottom-1 right-3">{producto.precio}</span>
                </div>
                <div className="bg-white h-[55%] relative rounded-b-[15px] p-4 flex flex-col items-center">
                    <div className="flex flex-col items-center gap-[4px] mt-5 text-center">
                        <h6 className="text-[#8a8a8a]">ECNU</h6>
                        <h4>{producto.nombre}</h4>
                    </div>
                    <div className="text-center text-[#7C7C7C] font-normal text-[9px] mt-4 max-w-[75%] mx-auto">
                        <p>Descripcion producto.</p>
                    </div>
                    <div className="flex items-center justify-between w-[75%]">
                        <button className="text-center font-normal text-[9px] mt-4 max-w-[75%] mx-auto px-2 py-1 rounded-[50%] bg-slate-400 text-white">S</button>
                        <button className="text-center font-normal text-[9px] mt-4 max-w-[75%] mx-auto px-2 py-1 rounded-[50%] bg-slate-400 text-white">M</button>
                        <button className="text-center font-normal text-[9px] mt-4 max-w-[75%] mx-auto px-2 py-1 rounded-[50%] bg-slate-400 text-white">L</button>
                        <button className="text-center font-normal text-[9px] mt-4 max-w-[75%] mx-auto px-1.5 py-1 rounded-[50%] bg-slate-400 text-white">XL</button>
                    </div>
                    <button type="button" className="absolute bottom-3 w-[80%] left-1/2 transform -translate-x-1/2 bg-[#EF3749] text-white rounded-full py-[.45rem] text-[10px] cursor-pointer">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}
"use server";

import api from "@/app/api/api";
import { redirect } from "next/navigation";
interface FormData {
    nombre: string;
    pais: string;
    ciudad: string;
    email: string;
    codigoArea: string;
    celular: string;
    objetivos: string;
    arPrice: number;
    usdPrice: number;
}
export async function add(formData: FormData) {
    console.log("entra en función add: ", formData);
    const info = formData as any;
    const url = await api.message.submit(info);
    redirect(url);
}
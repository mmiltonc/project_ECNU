"use server";

import api from "@/app/api/api";
import { redirect } from "next/navigation";

export async function add(formData: FormData) {
    console.log("entra en función add");
    const message = formData as any;
    const url = await api.message.submit(message);
    redirect(url);
}
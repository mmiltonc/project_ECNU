import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function ContactAPI(req: NextApiRequest, res: NextApiResponse) {

    debugger
    console.log('req: ', req.method)
    
    const {name, email, message} = req.body

    const data = {
        name, email, message
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "miltonmartin.collard@gmail.com",
        port: 465,
        secure: true,
    })

    const mail = ({
        from: `${name} <${email}>`,
        to: "miltonmartin.collard@gmail.com",
        replyTo: email,
        subject: `Consulta de ${name}`,
        html: `
            <p>Nombre: ${name}</p>
            <p>Email: ${email}</p>
            <p>Mensaje: ${message}</p>
        `,
    })

    try {
        const mail = await transporter.sendMail(mail)
        return res.status(200).json({ message: "success"})   

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "No pudimos enviar tu consulta. Volve a intentar mas tarde."})
    }
}
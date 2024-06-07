import { EmailTemplate } from '@/app/emails/email-template'
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_3pja3AHX_EHB4oGUenWgSV7qYj2kmvaWq');

export async function POST(request: Request) {
    // from: `<${name} ${email}>`,
    try {
    const [ name, email, message] = await request.json()
    console.log('name: ', name)
    const data = await resend.emails.send({
      from: `${name} <mcollard92@gmail.com>`,
      to: email,
      subject: 'Consulta Web - Clases Calistenia',
      react: EmailTemplate({ name , message }),
      text: ''
    });
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error });
    }
}
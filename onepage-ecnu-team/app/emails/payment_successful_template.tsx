import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Hr,
  Img,
} from "@react-email/components";

interface PaymentSuccessfulEmailType {
  name: string;
  plan: string;
}

const styles = {
  body: { backgroundColor: "#f6f6f6", padding: "20px" },
  header: {
    backgroundColor: "#111",
  },
  logo: {
    margin: "10px auto",
    width: "180px",
  },
  footerImage: {},
  main: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "5px",
  },
  text: { fontSize: "16px", color: "#333" },
  firm: { fontSize: "14px", color: "#333", marginTop: "20px" },
  footer: { backgroundColor: "#ffffff", width: "100%" },
};
export const PaymentSuccessfulTemplate = ({
  name,
  plan,
}: Readonly<PaymentSuccessfulEmailType>) => {
  return (
    <Html>
      <Head />
      <Preview>
        ¡Bienvenido {name} a tu {plan}!
      </Preview>{" "}
      {/* Vista previa en clientes de correo */}
      <Body style={styles.body}>
        <Container style={styles.header}>
          <Img src="/images/new-logo.png" alt="ECNU Logo" style={styles.logo} />
        </Container>
        <Container style={styles.main}>
          <Text style={styles.text}>¡Bienvenido {name}!</Text>
          <Text style={styles.text}>
            El pago de tu <strong>{plan}</strong> fue aprobado con éxito! El
            acceso es por <strong>90 días</strong> antes de la primera
            renovación.
          </Text>
          <Text style={styles.text}>
            A la brevedad me pondré en contacto contigo para coordinar nuestra
            primera videollamada sobre tus objetivos.
          </Text>
          <Text style={styles.text}>¡Muchas gracias!</Text>
          <Hr />
          <Text style={styles.firm}>Equipo de ECNU</Text>
        </Container>
        <Container style={styles.footer}>
          <Img
            src="/images/emails/payment-successful/footer-image.jpg"
            alt="ECNU Logo"
            style={styles.footerImage}
          />
        </Container>
      </Body>
    </Html>
  );
};

PaymentSuccessfulTemplate.PreviewProps = {
  name: "John Doe",
  plan: "Plan Plus - Gym Virtual",
} as PaymentSuccessfulEmailType;

export default PaymentSuccessfulTemplate;

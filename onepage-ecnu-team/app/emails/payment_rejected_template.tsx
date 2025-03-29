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

interface PaymentRejectedEmailType {
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
export const PaymentRejectedTemplate = ({
  name,
  plan,
}: Readonly<PaymentRejectedEmailType>) => {
  return (
    <Html>
      <Head />
      <Preview>Tu pago {plan} fue rechazado.</Preview>
      {/* Vista previa en clientes de correo */}
      <Body style={styles.body}>
        <Container style={styles.header}>
          <Img src="/images/new-logo.png" alt="ECNU Logo" style={styles.logo} />
        </Container>
        <Container style={styles.main}>
          <Text style={styles.text}>Parece que hubo un problema...</Text>
          <Text style={styles.text}>
            Tu pago <strong>{plan}</strong> fue rechazado.
          </Text>
          <Text style={styles.text}>
            Verifica el motivo por el cual no pudo efectuarse, inténtalo
            nuevamente a la brevedad.
          </Text>
          <Hr />
          <Text style={styles.firm}>Equipo de E.C.N.U.</Text>
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

PaymentRejectedTemplate.PreviewProps = {
  name: "John Doe",
  plan: "Plan Plus - Gym Virtual",
} as PaymentRejectedEmailType;

export default PaymentRejectedTemplate;

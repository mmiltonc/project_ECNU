import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface PaymentSuccessfulEmailType {
  name: string;
}

const styles = {
  body: { backgroundColor: "#f6f6f6", padding: "20px" },
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "5px",
  },
  text: { fontSize: "16px", color: "#333" },
  footer: { fontSize: "14px", color: "#777", marginTop: "20px" },
};
export const PaymentSuccessfulTemplate = ({
  name,
}: Readonly<PaymentSuccessfulEmailType>) => {
  return (
    <Html>
      <Head />
      <Preview>Mensaje para {name}</Preview>{" "}
      {/* Vista previa en clientes de correo */}
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.text}>Hola {name}!</Text>
          <Text style={styles.text}>Tu pago ha sido aprobado!</Text>
          <Text style={styles.footer}>
            —<br />
            Equipo de ECNU
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

PaymentSuccessfulTemplate.PreviewProps = {
  name: "John Doe",
} as PaymentSuccessfulEmailType;

export default PaymentSuccessfulTemplate;

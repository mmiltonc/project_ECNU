import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Img,
} from "@react-email/components";

interface OwnerPaymentSuccessfulEmailType {
  name: string;
  plan: string;
  email: string;
  phone: string;
  goals: string;
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
export const OwnerPaymentSuccessfulTemplate = ({
  name,
  plan,
  email,
  phone,
  goals,
}: Readonly<OwnerPaymentSuccessfulEmailType>) => {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>
        {name} se suscribio a {plan}!
      </Preview>
      {/* Vista previa en clientes de correo */}
      <Body style={styles.body}>
        <Container style={styles.header}>
          <a href="https://ecnuteam.com">
            <Img
              width="180px"
              src="https://ecnuteam.com/images/new-logo.png"
              alt="ECNU Logo"
              style={styles.logo}
            />
          </a>
        </Container>
        <Container style={styles.main}>
          <Text style={styles.text}>Un nuevo alumno se suscribió</Text>
          <Text style={styles.text}>Nombre: {name}</Text>
          <Text style={styles.text}>Plan: {plan}</Text>
          <Text style={styles.text}>Teléfono: {phone}</Text>
          <Text style={styles.text}>Email: {email}</Text>
          <Text style={styles.text}>Objetivos: {goals}</Text>
        </Container>
      </Body>
    </Html>
  );
};

OwnerPaymentSuccessfulTemplate.PreviewProps = {
  name: "John Doe",
  plan: "Plan Plus - Gym Virtual",
  email: "jdoe@example.com",
  phone: "11111111",
  date: new Date().toDateString(),
  goals: "Mis objetivos",
} as OwnerPaymentSuccessfulEmailType;

export default OwnerPaymentSuccessfulTemplate;

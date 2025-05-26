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
import { CountryCode, CountryNames } from "../types/formData";

interface UpdateErrorUserType {
  id: string;
  paymentStatus: string;
  paymentDate: string;
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
export const UpdateUserErrorTemplate = (
  user: Readonly<UpdateErrorUserType>
) => {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>Error guardando en la base de datos a {user.name}</Preview>
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
          <Text style={styles.text}>Estado de pago de un nuevo alumno</Text>
          <Text style={styles.text}>
            Estás recibiendo esto porque no se pudo actualizar la base de datos
          </Text>
          <Hr />
          <Text style={styles.text}>id: {user.id}</Text>
          <Text style={styles.text}>Estado del pago: {user.paymentStatus}</Text>
          <Text style={styles.text}>Fecha de pago: {user.paymentDate}</Text>
        </Container>
        <Container style={styles.footer}>
          <Img
            width="100%"
            src="https://ecnuteam.com/images/emails/payment-successful-footer-image.jpg"
            alt="ECNU Logo"
            style={styles.footerImage}
          />
        </Container>
      </Body>
    </Html>
  );
};

UpdateUserErrorTemplate.PreviewProps = {
  name: "John Doe",
  plan: "Plan Plus - Gym Virtual",
} as UpdateErrorUserType;

export default UpdateUserErrorTemplate;

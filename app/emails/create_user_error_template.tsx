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

interface CreateErrorUserType {
  id: string;
  city: string;
  country: string;
  countryCode: CountryCode;
  email: string;
  gatewayId: string;
  goals: string;
  name: string;
  paymentCurrency: string;
  orderDate: string;
  paymentStatus: string;
  paymentValue: number;
  phone: string;
  plan: string;
  planSKU: string;
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
export const CreateUserErrorTemplate = (
  user: Readonly<CreateErrorUserType>
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
          <Text style={styles.text}>Un nuevo alumno intentó suscribirse</Text>
          <Text style={styles.text}>
            Estás recibiendo esto porque no se pudo actualizar la base de datos
          </Text>
          <Hr />
          <Text style={styles.text}>id: {user.id}</Text>
          <Text style={styles.text}>city: {user.city}</Text>
          <Text style={styles.text}>country: {user.country}</Text>
          <Text style={styles.text}>countryCode: {user.countryCode}</Text>
          <Text style={styles.text}>email: {user.email}</Text>
          <Text style={styles.text}>gatewayId: {user.gatewayId}</Text>
          <Text style={styles.text}>goals: {user.goals}</Text>
          <Text style={styles.text}>name: {user.name}</Text>
          <Text style={styles.text}>
            paymentCurrency: {user.paymentCurrency}
          </Text>
          <Text style={styles.text}>orderDate: {user.orderDate}</Text>
          <Text style={styles.text}>paymentStatus: {user.paymentStatus}</Text>
          <Text style={styles.text}>paymentValue: {user.paymentValue}</Text>
          <Text style={styles.text}>phone: {user.phone}</Text>
          <Text style={styles.text}>plan: {user.plan}</Text>
          <Text style={styles.text}>planSKU: {user.planSKU}</Text>
          <Hr />
          <Text style={styles.text}>
            Si el pago fue exitoso llegará un email con el id {user.id}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

CreateUserErrorTemplate.PreviewProps = {
  id: "ABC1234",
  city: "Buenos Aires",
  country: "Argentina",
  countryCode: "ARG",
  email: "jdoe@example.com",
  gatewayId: "mercadopago",
  goals: "Be the best",
  name: "John Doe",
  paymentCurrency: "ARS",
  orderDate: new Date().toDateString(),
  paymentStatus: "PENDING",
  paymentValue: 1,
  phone: "11111111",
  plan: "Plan A",
  planSKU: "plan-a",
} as CreateErrorUserType;

export default CreateUserErrorTemplate;

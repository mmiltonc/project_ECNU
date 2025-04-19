// import paypal from '@paypal/checkout-server-sdk'
// import { NextResponse } from 'next/server';

// const clientId = "AYtCLER7-I-wo-J8FFj85qLrg-GJPFikumaqzMQpkOG7ZXdzLxtjWLFOymJ4OsyPtMecHZl2ae6Mt7ah"
// const secretId = "EJPnwL-pA33gV1Xb6E3Czx2-EBuVUGeJHWBt3RVIngrsVeULpuXqfEeQqAzPqnlHXQp9s8umaZdd1Q6n"

// const environment = new paypal.core.SandboxEnvironment(clientId, secretId);
// const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
//     try {
//         const request = new paypal.orders.OrdersCreateRequest();
//         request.prefer("return=representation");
//         request.headers["Content-Type"] = "application/json";
//         request.requestBody({
//             intent: "CAPTURE",
//             purchase_units: [
//                 {
//                     amount: {
//                         currency_code: "USD",
//                         value: "100.00",
//                         breakdown: {
//                             item_total: { currency_code: "USD", value: "100.00" },
//                             discount: { currency_code: "USD", value: "0.00" },
//                             handling: { currency_code: "USD", value: "0.00" },
//                             insurance: { currency_code: "USD", value: "0.00" },
//                             shipping: { currency_code: "USD", value: "0.00" },
//                             shipping_discount: { currency_code: "USD", value: "0.00" },
//                             tax_total: { currency_code: "USD", value: "0.00" }
//                         }
//                     },
//                     items: [
//                         {
//                             name: "plan plus",
//                             description: "plan plus description",
//                             quantity: "1",
//                             unit_amount: {
//                                 currency_code: "USD",
//                                 value: "100.00"
//                             },
//                             category: "DIGITAL_GOODS"
//                         }
//                     ]
//                 }
//             ]
//         });

//         const response = await client.execute(request);
//         return NextResponse.json({ id: response.result.id });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
}
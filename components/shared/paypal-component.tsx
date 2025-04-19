import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalButton() {

  return (
    <div className="flex w-40">
      <PayPalScriptProvider options={{ 'clientId': "AYtCLER7-I-wo-J8FFj85qLrg-GJPFikumaqzMQpkOG7ZXdzLxtjWLFOymJ4OsyPtMecHZl2ae6Mt7ah" }}>
        <PayPalButtons
          style={{
            layout: 'horizontal'
          }}
          createOrder={async () => {
            const res = await fetch('/api/paypal', {
              method: "POST"
            })
            const order = await res.json()
            console.log('order: ', order)
            return order.id
          }}
          onApprove={async (data: any, actions: any) => {
            console.log('aprovado: ', data)
            await actions.order.capture()
          }}
          onCancel={(data: any) => {
            console.log('cancelacion id: ', data)
          }}
        />
      </PayPalScriptProvider>
    </div>
  );

  // createOrder={createOrder}
  // onApprove={onApprove}
}
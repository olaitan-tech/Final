"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function PaymentPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const amountParam = searchParams.get("amount");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (amountParam) setAmount(Number(amountParam) * 100); 
  }, [amountParam]);

  if (!session) return <p>Loading user info...</p>;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

  const componentProps = {
    email: session.user.email,
    amount,
    publicKey,
    text: `Pay ₦${amount / 100}`,
    onSuccess: async (response) => {
      try {
        const res = await fetch("/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference, orderId }),
        });

        const result = await res.json();

        if (result.success) {
          alert("Payment verified and stored in Firebase!");
          router.push("/orders");
        } else {
          alert("Payment verification failed: " + result.message);
        }
      } catch (err) {
        console.error(err);
        alert("Server error during verification");
      }
    },
    onClose: () => alert("Payment closed."),
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-full md:w-[380px] flex flex-col gap-3 shadow-lg rounded-md max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
        {amount && session.user.email && <PaystackButton {...componentProps} />}
      </div>
    </main>
  );
}

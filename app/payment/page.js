"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase.config";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

// Dynamically import Paystackbutton
const PaystackButton = dynamic(() => import("react-paystack").then(mod => mod.PaystackButton), { ssr: false });

export default function PaymentPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);

      const fetchLatestOrder = async () => {
        setLoading(true);
        try {
          const ordersRef = collection(db, "restaurantOrders");
          const q = query(
            ordersRef,
            where("user", "==", session.user.email),
            orderBy("timeCreated", "desc"),
            limit(1)
          );
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const latestOrder = snapshot.docs[0].data();
            setAmount(latestOrder.amount || 0);
          } else {
            setAmount(0);
          }
        } catch (err) {
          console.error("Error fetching latest order:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchLatestOrder();
    }
  }, [session]);

  const componentProps = {
    email,
    amount: amount * 100,
    publicKey,
    text: "Pay Now",
    onSuccess: async (response) => {
      try {
        const res = await fetch("/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference }),
        });
        const result = await res.json();
        if (result.success) alert("Payment verified and stored in Firebase!");
        else alert("Payment verification failed: " + result.message);
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

        <input
          type="email"
          value={email}
          readOnly
          className="w-full border p-2 mb-4 rounded bg-gray-100 cursor-not-allowed"
        />

        {loading ? (
          <p className="text-sm text-gray-500">Fetching your latest order...</p>
        ) : amount > 0 ? (
          <PaystackButton {...componentProps} />
        ) : (
          <p className="text-sm text-red-500">No orders found. Please place an order first.</p>
        )}
      </div>
    </main>
  );
}

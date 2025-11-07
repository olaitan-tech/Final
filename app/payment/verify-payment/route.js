import { db } from "../../../config/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "No reference provided" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await paystackRes.json();

    if (data.status && data.data.status === "success") {
      const paymentData = {
        reference: data.data.reference,
        amount: data.data.amount / 100, 
        email: data.data.customer.email,
        status: data.data.status,
        currency: data.data.currency,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "payments"), paymentData);

      return NextResponse.json({
        success: true,
        message: "Payment verified and stored in Firebase!",
        payment: paymentData,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

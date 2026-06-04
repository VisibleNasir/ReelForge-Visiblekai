// app/api/razorpay/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { plan, amount, credits } = await req.json();

    // Basic Validation
    if (!plan || !amount || !credits) {
      return NextResponse.json(
        { success: false, error: "Missing plan, amount or credits" }, 
        { status: 400 }
      );
    }

    if (amount < 100) {
      return NextResponse.json(
        { success: false, error: "Invalid amount" }, 
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount,                   
      currency: "INR",
      receipt: `rf_${Date.now()}`,
      notes: { 
        plan, 
        credits 
      },
    });

    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      amount: order.amount,
      plan,
      credits 
    });

  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to create order" 
    }, { status: 500 });
  }
}
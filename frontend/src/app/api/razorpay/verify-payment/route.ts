import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '~/server/auth';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
  try {
    console.log("Verify Payment API called");

    const bodyData = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      plan, 
      credits 
    } = bodyData;

    console.log("Received data:", { plan, credits, order_id: razorpay_order_id });

    // Signature Check
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature verification failed");
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    console.log("Signature verified");

    const session = await auth();
    if (!session?.user?.email) {
      console.error(" No session found");
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    console.log(`User found: ${user.id}`);

    // Create Payment Record
    const payment = await db.payment.create({
      data: {
        userId: user.id,
        amount: plan === 'starter' ? 499 : 1299,
        credits: Number(credits),
        plan: plan === 'starter' ? 'Starter' : 'Pro',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "SUCCESS"
      }
    });

    console.log(`PAYMENT RECORD CREATED SUCCESSFULLY! ID: ${payment.id}`);

    // Update User Credits
    await db.user.update({
      where: { id: user.id },
      data: { credits: { increment: Number(credits) } }
    });

    console.log(`${credits} Credits added to user`);

    return NextResponse.json({ success: true, message: "Payment successful" });

  } catch (error: any) {
    console.error(" CRITICAL ERROR in verify-payment:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
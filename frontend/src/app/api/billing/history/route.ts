import { NextRequest, NextResponse } from 'next/server';
import { auth } from '~/server/auth';
import { db } from '~/server/db';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, credits: true, email: true }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Get latest payment for Current Plan
    const latestPayment = await db.payment.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: { plan: true }
    });

    const currentPlan = latestPayment?.plan || "Free";

    // Get all payments for history
    const allPayments = await db.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const transactions = allPayments.map((p: any) => ({
      id: p.id,
      date: p.createdAt.toISOString().split('T')[0],
      plan: p.plan || "Starter",
      amount: p.amount,
      credits: p.credits,
      status: p.status || "SUCCESS",
      paymentId: p.razorpayPaymentId ? p.razorpayPaymentId.slice(0, 12) + "..." : undefined,
    }));

    return NextResponse.json({
      success: true,
      transactions,
      totalCredits: user.credits || 0,
      currentPlan: currentPlan,
    });

  } catch (error: any) {
    console.error("Billing History Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
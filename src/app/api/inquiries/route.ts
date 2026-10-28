import { NextResponse } from "next/server";

export interface LeadSubmission {
  id: string;
  parentName: string;
  email: string;
  phone?: string | null;
  grade: string;
  interest: string;
  programType: string;
  notes?: string | null;
  submittedAt: string;
  source: string;
}

// In-memory inquiry store for active server session
const inquiryStore: LeadSubmission[] = [];

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Request payload must be JSON." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { parentName, email, phone, grade, interest, programType, notes } = body || {};

    // 1. Validation: Parent Name
    if (!parentName || typeof parentName !== "string" || parentName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your name (at least 2 characters).",
        },
        { status: 400 }
      );
    }

    // 2. Validation: Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address (e.g. parent@example.com).",
        },
        { status: 400 }
      );
    }

    // 3. Normalization & Sanitization
    const cleanName = parentName.trim().slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 120);
    const cleanPhone = phone && typeof phone === "string" ? phone.trim().slice(0, 30) : null;
    const cleanGrade = typeof grade === "string" && grade.trim() ? grade.trim() : "All Grades";
    const cleanInterest = typeof interest === "string" && interest.trim() ? interest.trim() : "All Categories";
    const cleanProgramType =
      typeof programType === "string" && programType.trim() ? programType.trim() : "All Programs";
    const cleanNotes = notes && typeof notes === "string" ? notes.trim().slice(0, 1000) : null;

    const leadId = `KL-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const leadRecord: LeadSubmission = {
      id: leadId,
      parentName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      grade: cleanGrade,
      interest: cleanInterest,
      programType: cleanProgramType,
      notes: cleanNotes,
      submittedAt: new Date().toISOString(),
      source: "homepage_final_cta_matching",
    };

    inquiryStore.push(leadRecord);

    console.info(`[Kreators Lab Backend] New verified lead inquiry: ${leadId} (${cleanName} <${cleanEmail}>)`);

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Inquiry received successfully. Our admissions team will email you within 24 hours.",
        receivedAt: leadRecord.submittedAt,
        details: {
          parentName: cleanName,
          email: cleanEmail,
          grade: cleanGrade,
          interest: cleanInterest,
          programType: cleanProgramType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Kreators Lab Backend] Lead submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again or email hello@kreatorslab.ai directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: "active",
      endpoint: "/api/inquiries",
      method: "POST",
      inquiryCount: inquiryStore.length,
    },
    { status: 200 }
  );
}

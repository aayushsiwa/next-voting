// pages/api/example.ts

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Hello, World!" });
}
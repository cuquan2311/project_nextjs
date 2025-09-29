// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.cookies.get("lang")?.value;

  if (!lang) {
    const response = NextResponse.next();
    response.cookies.set("lang", "en");
    return response;
  }

  return NextResponse.next();
}

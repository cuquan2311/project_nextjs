import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

console.log("🚀 [MIDDLEWARE] Loaded successfully!");

// 🔑 Khóa bí mật để verify JWT
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY ?? "ACCESS_KEY"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("🚀 [MIDDLEWARE] Đang chạy cho:", pathname);

  // 1. Xử lý cookie ngôn ngữ
  const lang = req.cookies.get("lang")?.value;
  if (!lang) {
    console.log("🌍 Chưa có cookie 'lang' → set mặc định = en");
    const response = NextResponse.next();
    response.cookies.set("lang", "en");
    return response;
  }

  // 2. Kiểm tra token cho route admin
  const token = req.cookies.get("accessToken")?.value;

  if (pathname.startsWith("/admin")) {
    // Nếu không có token → về login
    if (!token) {
      console.log("❌ Không có token → chuyển về trang login");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const { payload } = await jose.jwtVerify(token, SECRET_KEY);
      console.log("✅ JWT verified:", payload);

      const role = payload.role;
      if (role === "user") {
        console.log("🚫 User cố truy cập admin → chặn");
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      console.error("❗ JWT verify error:", err);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Cho phép request đi tiếp
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả route /admin/*
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

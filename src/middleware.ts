import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

//! ===========CẤU HÌNH BẢO MẬT=============
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY ?? "ACCESS_SECRET"
);

//! ===========HÀM HỖ TRỢ KIỂM TRA JWT=========
async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

//! ===========MIDDLEWARE CHÍNH=============

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const res = NextResponse.next();

  //! === LOG HEADER ===
  console.log(`\n==============================`);
  console.log(`🚦 [MIDDLEWARE] Đang chạy cho: ${pathname}`);
  console.log(`==============================`);

  //! 1. XỬ LÝ COOKIE NGÔN NGỮ (LANG)
  const lang = req.cookies.get("lang")?.value;
  if (!lang) {
    res.cookies.set("lang", "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 100,
    });
    console.log("🌐 [LANG] Thiết lập mặc định: 'en'");
  }

  //! ============2. BẢO VỆ ROUTE ADMIN=================
  if (pathname.startsWith("/admin")) {
    console.log("🧱 [PROTECTED] Khu vực admin — kiểm tra quyền truy cập...");

    const token = req.cookies.get("accessToken")?.value;

    //! ========2.1 Không có token => chuyển hướng login=======
    if (!token) {
      console.log("❌ [AUTH] Không tìm thấy token — cần đăng nhập lại");
      const redirectUrl = new URL(`/auth/login?next=${pathname}`, origin);
      console.log(`➡️  [REDIRECT] Chuyển hướng đến: ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    }

    //! ===== 2.2 Xác thực token =====
    const payload = await verifyToken(token);
    if (!payload) {
      console.log("⚠️  [AUTH] Token không hợp lệ hoặc đã hết hạn");
      const redirectUrl = new URL(`/auth/login?next=${pathname}`, origin);
      return NextResponse.redirect(redirectUrl);
    }

    //! ==== 2.3 Kiểm tra role =====
    const role = payload.role;
    console.log(`👤 [USER] Role hiện tại: ${role}`);

    if (role !== "admin" && role !== "superAdmin") {
      console.log("🚫 [PERMISSION] Người dùng không có quyền truy cập admin");
      return NextResponse.redirect(new URL("/status/403", origin));
    }

    console.log("✅ [ACCESS GRANTED] Admin hợp lệ, cho phép tiếp tục.");
  }

  //! ============3. CÁC ROUTE KHÁC=================
  else if (pathname.startsWith("/auth")) {
    console.log("🔓 [PUBLIC] Trang login / register — bỏ qua xác thực.");
  } else {
    console.log("🪶 [GENERAL] Route công khai — cho phép truy cập.");
  }

  //! ========= KẾT THÚC ========
  console.log(" [MIDDLEWARE DONE] Cho phép tiếp tục.\n");
  return res;
}

//! ==========CẤU HÌNH MIDDLEWARE MATCHER===============
export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/api/:path*", // nếu muốn bảo vệ API route
  ],
};

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles: ("user" | "admin" | "superAdmin")[];
}

export default function PrivateRoute({children , roles} : PrivateRouteProps) {
  const {user} = useAuthStore()
  const route = useRouter()

    if(!user) {
      route.push('/auth/login')
      toast.error("Vui lòng đăng nhập")
      return;
    }

    if(roles && !roles.includes(user.role)) {
      route.push("/")
      toast.error("Bạn không có quyền truy cập trang này")
      return
    }

  if(!user || (roles && !roles.includes(user.role))) return null

  return <>{children}</>;
}
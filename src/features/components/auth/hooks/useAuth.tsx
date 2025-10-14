import { AuthApi } from '@/api/authAPI';
import { useAuthStore } from '@/store/useAuthStore';
import { LoginInput } from '@/types/authType';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function useAuth() {
  const route = useRouter()
  const {setAuth} = useAuthStore()
  const [loading,setLoading] = useState(false);
  const [otpValues,setOtpValues] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])




  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true)
      const res = await AuthApi.login(data)

      if(!res.user) {
        throw new Error ("Không nhận được  dữ liệu user từ sever")
      }

      setAuth(res.user, res.access_token);
      toast.success("Đăng nhập thành công")

      // điểu hướng theo quyền
      if(res.user.role === "superAdmin" || res.user.role === "admin") {
        route.push("/admin")
      }else {
        route.push("/")
      }
    }catch(err){
      const error = err as AxiosError<{message?: string}>
      const message = error?.response?.data?.message || error.message || "Đăng nhập thất bại"
      toast.error(message)
    }finally {
      setLoading(false)
    }
  }


     const handleVerify = async (email : string , onClose : () => void) => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ 6 số trong OTP");
      return;
    }

    try {
      setLoading(true);
      await AuthApi.verifyOtp({ email, otp });
      toast.success("Xác thực thành công");
      onClose();
      route.push("/auth/login")
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "OTP không hợp lệ";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return {
    route,
    loading,
    onSubmit,
    inputRefs,
    otpValues,
    setOtpValues,
    handleVerify,
  }
}

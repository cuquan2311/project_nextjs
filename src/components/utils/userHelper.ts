// import { UserInput } from "@/types/userType";

// const allowedFields: (keyof UserInput)[] = [
//   "firstName",
//   "lastName",
//   "age",
//   "gender",
//   "email",
//   "phone",
//   "image",
//   "role",
//   "country",
// ];

// export function filterUserPayload(
//   user: Partial<UserInput>
// ): Partial<UserInput> {
//   const filtered: Partial<UserInput> = {}; // ✅ đúng kiểu

//   allowedFields.forEach((key) => {
//     if (user[key] !== undefined) {
//       filtered[key] = user[key]; // ✅ TS hiểu kiểu hợp lệ
//     }
//   });

//   return filtered;
// }

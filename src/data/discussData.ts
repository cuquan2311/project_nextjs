import { Comment } from "@/types/commentType";

export type TopicType = {
  id: number;
  title: string;
  user: string;
  time: string;
  titlePost: string;
  content: string;
  images: string[];
  replies?: Comment[];
};

export const DiscussTopics: TopicType[] = [
  {
    id: 1,
    title: "Báo cáo thi công gói XL9",
    user: "Trần Thảo Quyên",
    time: "03/06/2025",
    titlePost: "Thảo luận ngày 15 tháng 7 [Tiêu đề 1]",
    content:
      "Tính đến ngày 04/06/2025, đơn vị thi công đã hoàn thành 80% khối lượng công việc phần san nền, hệ thống thoát nước chính và lắp đặt cống hộp. Công tác thi công đường nội bộ đang triển khai giai đoạn trải đá cấp phối lớp thứ hai. Tính đến ngày 04/06/2025, đơn vị thi công đã hoàn thành 80% khối lượng công việc phần san nền, hệ thống thoát nước chính và lắp đặt cống hộp. Công tác thi công đường nội bộ đang triển khai Đã gọi điện xác nhận, bên cung cấp hứa giao sắt D16 vào 10h sáng. Nếu không đúng tiến độ, sẽ thay bằng D18 và hiệu chỉnh bản vẽ, nhưng cần giám sát xác nhận lại.",
    images: ["/images/1.png", "/images/2.png", "/images/3.png"],
    replies: [
      {
        id: "c1",
        author: "Giang NTH",
        avatar: "https://i.pravatar.cc/40?img=1",
        content:
          " Tính đến ngày 04/06/2025, đơn vị thi công đã hoàn thành 80% khối lượng công việc phần san nền, hệ thống thoát nước chính và lắp đặt cống hộp. Công tác thi công đường nội bộ đang triển khai giai đoạn trải đá cấp phối lớp thứ hai. ",
        createdAt: {
          date: "14/09/2023 ",
          time: "9 : 25",
        },
        replies: [],
      },
      {
        id: "c2",
        author: "Đạt Văn Tây",
        avatar: "https://i.pravatar.cc/40?img=3",
        content:
          " Tính đến ngày 04/06/2025, đơn vị thi công đã hoàn thành 80% khối lượng công việc phần san nền, hệ thống thoát nước chính và lắp đặt cống hộp. Công tác thi công đường nội bộ đang triển khai giai đoạn trải đá cấp phối lớp thứ hai. ",
        createdAt: {
          date: "14/09/2023 ",
          time: "9 : 25",
        },
        replies: [],
      },
    ],
  },
  {
    id: 2,
    title: "Test sự kiện onClick cho thẻ img",
    user: "Trần Thảo Quyên",
    time: "04/06/2025",
    titlePost: "Thảo luận ngày 16 tháng 7 [Tiêu đề 2]",
    content: "Đây là nội dung bài viết...",
    images: ["/images/4.png"],
    replies: [
      {
        id: "c3",
        author: "Trần Văn C",
        avatar: "https://i.pravatar.cc/40?img=5",
        content: "Ảnh này click được là hay rồi.",
        createdAt: {
          date: "14/09/2023 ",
          time: "9 : 25",
        },
        replies: [],
      },
    ],
  },
];

import { ProfileRes } from "@/features/users/dto/response/profile-res";

export const fakeProfileRes: ProfileRes = {
  data: {
    id: 1,
    name: "test",
    email: "test@test.com",
    bio: "자기 소개",
    avatar: null,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  message: "success",
  status: true,
  statusCode: 200,
};

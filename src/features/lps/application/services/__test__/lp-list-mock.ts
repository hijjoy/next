import { LpListRes } from "@/features/lps/dto/response/lp-list-res";

export const fakeLpListRes: LpListRes = {
  data: {
    data: [
      {
        id: 1,
        title: "테스트 LP",
        content: "내용",
        thumbnail: "https://loremflickr.com/100/100",
        published: true,
        authorId: 1,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
        tags: [
          {
            id: 1,
            name: "테스트 태그",
          },
        ],
        likes: [
          {
            id: 1,
            userId: 1,
            lpId: 1,
          },
        ],
      },
      {
        id: 2,
        title: "테스트 LP2",
        content: "내용2",
        thumbnail: "https://loremflickr.com/100/100",
        published: true,
        authorId: 1,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
        tags: [
          {
            id: 1,
            name: "테스트 태그",
          },
        ],
        likes: [
          {
            id: 1,
            userId: 1,
            lpId: 1,
          },
        ],
      },
    ],
    nextCursor: 10,
    hasNext: true,
  },
  message: "성공",
  status: true,
  statusCode: 200,
};

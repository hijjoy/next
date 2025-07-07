"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetInfiniteLpList } from "../../hooks/get-infinie-lp-list";

export default function LpSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteLpList();
  const { ref, inView } = useInView({ threshold: 0.5, delay: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const lpList = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div>
      {lpList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      {hasNextPage && <div ref={ref}>Loading more...</div>}
    </div>
  );
}

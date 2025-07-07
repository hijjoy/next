"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useGetMyProfile } from "../../hooks/use-get-my-profile";

export default function ProfileSection() {
  const { data: profile } = useSuspenseQuery(useGetMyProfile());

  return (
    <div>
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-sm text-gray-500">{profile.email}</p>
    </div>
  );
}

import { getSSRUserContext } from "@/features/users/presentation/context/ssr-user-context";

export default async function ProfileSection() {
  const { userService } = await getSSRUserContext();

  console.log(userService);

  const profile = await userService.getProfile();

  return (
    <div>
      <p>{profile?.name}</p>
      <p>{profile?.email}</p>
    </div>
  );
}

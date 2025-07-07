import { getSSRContext } from "../../context/ssr-user-context";

export default async function ProfileSection() {
  const { userService } = await getSSRContext();
  const profile = await userService.getProfile();

  return (
    <div>
      <h1 className="text-2xl font-bold">{profile?.name}</h1>
      <p className="text-sm text-gray-500">{profile?.email}</p>
    </div>
  );
}

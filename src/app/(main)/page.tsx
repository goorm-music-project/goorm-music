import { cookies } from "next/headers";
import NewReleaseAlbums from "../../domains/main/components/NewReleaseAlbums";
import RandomRecoList from "../../domains/main/components/RandomRecoList";
import TopChartList from "../../domains/main/components/TopChartList";
import JenreRecoList from "@/domains/main/components/JenreRecoList";
import LikedList from "@/domains/main/components/LikedList";

export default async function page() {
  //임시
  const cookieStore = await cookies();
  const userId = cookieStore.get("access_token")?.value;
  const isLoggedIn = !!userId;

  return (
    <div className="">
      <NewReleaseAlbums />
      {isLoggedIn ? <JenreRecoList /> : <TopChartList />}
      {isLoggedIn ? <LikedList /> : <RandomRecoList />}
    </div>
  );
}

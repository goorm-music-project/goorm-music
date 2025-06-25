import NewReleaseAlbums from "../../domains/main/components/NewReleaseAlbums";
import RandomRecoList from "../../domains/main/components/RandomRecoList";
import TopChartList from "../../domains/main/components/TopChartList";

export default function page() {
  return (
    <div className="">
      <NewReleaseAlbums />
      <TopChartList />
      <RandomRecoList />
    </div>
  );
}

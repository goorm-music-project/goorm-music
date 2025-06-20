import NewReleaseAlbums from "../components/NewReleaseAlbums";
import RandomRecoList from "../components/RandomRecoList";
import TopChartList from "../components/TopChartList";

export default function page() {
  return (
    <div className="">
      <NewReleaseAlbums />
      <TopChartList />
      <RandomRecoList />
    </div>
  );
}

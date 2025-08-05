import { usePlaylistProps } from "../stores/usePlaylistProps";

interface Props {
  isEdit: boolean;
  handleEditPlaylist: () => void;
}

export default function PlayListEditBox({ isEdit, handleEditPlaylist }: Props) {
  const { name, description, isPublic, setName, setDescription } =
    usePlaylistProps();
  return (
    <div className="flex flex-col gap-4 items-center mt-2">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEdit}
          className="text-center"
          style={{ border: isEdit ? "" : "none" }}
        />
        <input
          type="text"
          className=" text-center my-2"
          name="description"
          value={description}
          disabled={!isEdit}
          onChange={(e) => setDescription(e.target.value)}
          style={{ border: isEdit ? "" : "none" }}
        />
        <input
          type="text"
          className="text-center"
          name="public"
          value={isPublic ? "공개" : "비공개"}
          disabled={true}
          style={{ border: "none" }}
        />
      </div>
      {isEdit ? (
        <button
          className="primaryBtn py-1.5 px-2 mr-2"
          onClick={handleEditPlaylist}
        >
          저장
        </button>
      ) : null}
    </div>
  );
}

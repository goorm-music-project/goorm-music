/* eslint-disable react-hooks/exhaustive-deps */
import authAxios from "@/domains/common/lib/axios/authAxios";
import { useEffect } from "react";
import { usePlaylistProps } from "../stores/usePlaylistProps";

export default function usePlaylistDetail(
  id: string | string[] | undefined,
  userId: string | null
) {
  const {
    setListData,
    setTracks,
    setSnapshotId,
    setCanEdit,
    setName,
    setDescription,
    setIsPublic,
  } = usePlaylistProps();

  const decodeHtmlEntities = (str: string) => {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#x27;/g, "`");
  };

  const fetchData = async () => {
    const res = await authAxios.get(`/api/playlist/getPlaylistDetail?id=${id}`);
    const data = res.data;
    if (data.owner.id === userId) {
      setCanEdit(true);
      const text = decodeHtmlEntities(data.description);
      setDescription(text);
    } else {
      setDescription(data.owner.display_name);
      setCanEdit(false);
    }
    setIsPublic(data.isPublic);
    setListData(data);
    setSnapshotId(data.snapshot_id);
    setName(data.name);
    setTracks([...data.tracks.items]);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return {
    fetchData,
  };
}

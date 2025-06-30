import { db } from "@/domains/common/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserGenres(userId: string): Promise<string[]> {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("장르가 존재하지 않습니다.");
  }

  const data = userSnap.data();
  return data.preferredGenres || [];
}

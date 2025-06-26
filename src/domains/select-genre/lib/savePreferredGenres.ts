import { doc, setDoc } from "firebase/firestore";
import { db } from "../../common/lib/firebase";

export async function savePreferredGenres(userId: string, genres: string[]) {
  if (!userId) {
    return;
  }

  const userRef = doc(db, "users", userId);
  await setDoc(
    userRef,
    {
      preferredGenres: genres,
      updateAt: Date.now(),
    },
    { merge: true }
  );
}

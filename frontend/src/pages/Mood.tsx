import { MoodCheck } from "../components/MoodCheck/MoodCheck";
import { useTitle } from "../hooks/useTitle";

export const Mood = () => {
  useTitle("Mood");

  return (
    <>
      <main>
        <MoodCheck />
      </main>
    </>
  );
};

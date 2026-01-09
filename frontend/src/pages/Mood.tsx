import { Navigate } from "react-router";
import { MoodCheck } from "../components/MoodCheck/MoodCheck";
import { useTitle } from "../hooks/useTitle";
import { getHasClickedStartTheDayFromLocalStorage } from "../utils/localStorage";

export const Mood = () => {
  useTitle("Mood");

  if (getHasClickedStartTheDayFromLocalStorage()) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <main>
        <MoodCheck />
      </main>
    </>
  );
};

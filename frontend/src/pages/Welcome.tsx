import { WelcomeModal } from "../components/WelcomeModal/WelcomeModal";
import { useTitle } from "../hooks/useTitle";
import { getHasSeenWelcomePageFromLocalStorage } from "../utils/localStorage";
import { Navigate } from "react-router";

export const Welcome = () => {
  useTitle("Welcome");
  
  if (getHasSeenWelcomePageFromLocalStorage()) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <main>
        <WelcomeModal />
      </main>
    </>
  );
};

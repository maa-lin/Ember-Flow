import { HelpModal } from "../components/HelpModal/HelpModal";
import { useTitle } from "../hooks/useTitle";

export const Help = () => {
  useTitle("Help");
  
  return (
    <>
      <main>
        <HelpModal />
      </main>
    </>
  );
};

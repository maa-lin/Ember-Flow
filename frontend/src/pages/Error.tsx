import { Error404 } from "../components/Error404/Error404";
import { useTitle } from "../hooks/useTitle";

export const Error = () => {
  useTitle("Error");

  return (
    <>
      <main>
        <Error404 />
      </main>
    </>
  );
};

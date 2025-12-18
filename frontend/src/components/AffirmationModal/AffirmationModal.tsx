import { useNavigate } from "react-router";
import styles from "./AffirmationModal.module.scss";
import { MdAutoAwesome } from "react-icons/md";

type AffirmationModalProps = {
  onClose: () => void;
  affirmation: string;
};

export const AffirmationModal = (props: AffirmationModalProps) => {
  const navigate = useNavigate();

  // e.stopPropagation to stop toggle on <li>
  return (
    <div
      className={styles["affirmation-modal"]}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MdAutoAwesome className={styles.icon} />
      <p className={styles.affirmation}>{props.affirmation}</p>
      <p className={styles.prompt}>
        Do you want to pause for a moment to breathe before continuing with your
        day?
      </p>
      <button className="btn" onClick={() => navigate("/breathe")}>
        Breathe
      </button>
      <button
        className="btn btn--secondary"
        onClick={() => {
          props.onClose();
          navigate("/");
        }}
      >
        Skip for now
      </button>
    </div>
  );
};

import styles from "./Checkbox.module.scss";

type CheckboxProps = {
    isDone: boolean
};

export const Checkbox = (props: CheckboxProps) => {

    return <span className={styles.checkbox}>
        <span className={props.isDone ? styles.checked : ""}></span>
    </span>
}
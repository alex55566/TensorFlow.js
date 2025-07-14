import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}

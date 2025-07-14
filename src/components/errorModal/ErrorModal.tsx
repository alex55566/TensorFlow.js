import styles from "./ErrorModal.module.scss";

export default function ErrorModal() {
  return (
    <div className={styles.container}>
      <h3> Что-то пошло не так....Повторите попытку позже</h3>
      <button onClick={() => window.location.reload()} className="btn-green">
        Перезагрузить
      </button>
    </div>
  );
}

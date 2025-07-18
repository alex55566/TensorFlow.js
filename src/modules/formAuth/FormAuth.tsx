import { Link } from "react-router-dom";
import styles from "./FormAuth.module.scss";

export default function FormAuth() {
  return (
    <form className={styles["form-wrapper"]} action="/submit" method="POST">
      <div className={styles["form-group"]}>
        <label htmlFor="email" className="required">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="example@mail.com"
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="password" className="required">
          Пароль
        </label>
        <input type="password" id="password" name="password" required />
      </div>
      <div className={styles["form-group"]}>
        <Link className="btn-green" to="/detection">
          Войти
        </Link>
      </div>
      <div>
        Если вы еще не зарегистрированы, то{" "}
        <b>
          {" "}
          <Link className={styles.btn} to="/registration">
            зарегистрируйтесь
          </Link>
        </b>
      </div>
    </form>
  );
}

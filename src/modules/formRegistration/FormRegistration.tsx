import { Link } from "react-router-dom";
import styles from "./FormRegistration.module.scss";

export default function FormRegistration() {
  return (
    <form className={styles["form-wrapper"]} action="/submit" method="POST">
      <div className={styles["form-group"]}>
        <label htmlFor="name" className="required">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Введите ваше имя"
        />
      </div>

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
        <label htmlFor="purpose">Страна</label>
        <select id="purpose" name="purpose">
          <option value="">Выберите цель тренировки</option>
          <option value="ru">Похудение</option>
          <option value="kz">Набор мышечной массы</option>
        </select>
      </div>

      <div className={styles["form-group"]}>
        <label>Пол</label>
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Мужской</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Женский</label>
          </div>
        </div>
      </div>
      <div className={styles["form-group"]}>
        <button className="btn-green" type="submit">
          Регистрация
        </button>
      </div>
      <div>
        Если вы уже зарегистрированы, то{" "}
        <b>
          {" "}
          <Link className={styles.btn} to="/registration">
            войдите
          </Link>
        </b>
      </div>
    </form>
  );
}

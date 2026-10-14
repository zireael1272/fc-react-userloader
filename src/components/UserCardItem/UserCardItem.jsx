import classNames from "classnames";
import styles from "./UserCardItem.module.scss";

function UserCardItem({ name, email, imgSrc, city, age, gender, nation, flag }) {
  const isFemale = gender === "female";

  const cardClasses = classNames(styles.Card, {
    [styles.FemaleCard]: isFemale,
    [styles.MaleCard]: !isFemale,
  });

  return (
    <li className={cardClasses}>
      <img src={imgSrc} alt={name}></img>

      <div className={styles.InfoContainer}>
        <div className={styles.NameWithFlagContainer}>
          <p className={styles.UserName}>{`${name}`}</p>
          <img src={flag} alt={`${nation} flag`} className={styles.CountryFlag} />
        </div>

        <p className={styles.Location}>{city}</p>

        <p className={styles.Age}>
          {age} {age > 4 ? "years" : "year"}
        </p>
        <p className={styles.Gender}>{gender}</p>
      </div>
    </li>
  );
}

export default UserCardItem;

import styles from "./UserCardItem.module.scss";

function UserCardItem({ name, email, imgSrc, city, age, gender, nation }) {
  const genderColor = {
    border: `2px solid ${gender === "female" ? "rgb(236, 0, 137)" : "blue"}`,
  };

  return (
    <li className={styles.Card} style={genderColor}>
      <img src={imgSrc} alt={name} className={styles.Img}></img>

      <div className={styles.InfoContainer}>
        <p className={styles.UserName}>{`${name} ${nation}`}</p>
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

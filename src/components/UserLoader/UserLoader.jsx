import { Component } from "react";
import getUsers from "../../api";
import UserCardItem from "../UserCardItem/UserCardItem";
import styles from "./UserLoader.module.scss";

class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
    };
  }

  loadUsers = () => {
    const { currentPage } = this.state;

    this.setState({ isFetching: true });
    getUsers({ page: currentPage, results: 6 })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;

    if (currentPage !== prevState.currentPage) {
      this.loadUsers();
    }
  }

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  nextPage = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  mapUser = (user) => {
    return (
      <UserCardItem
        key={user.login.uuid}
        name={`${user.name.first} ${user.name.last}`}
        email={user.email}
        imgSrc={user.picture.large}
        city={user.location.city}
        age={user.dob.age}
        gender={user.gender}
        nation={user.nat}
      />
    );
  };

  render() {
    const { users, isFetching, error } = this.state;

    return (
      <>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <div className={styles.CardsContainer}>
            <ul className={styles.UsersList}>{users.map(this.mapUser)}</ul>
          </div>
        )}
      </>
    );
  }
}

export default UsersLoader;

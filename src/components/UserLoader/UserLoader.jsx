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
      results: 8,
      gender: "All",
    };
  }

  loadUsers = () => {
    const { currentPage } = this.state;

    this.setState({ isFetching: true });
    getUsers({ page: currentPage, results: this.state.results })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, results } = this.state;

    if (currentPage !== prevState.currentPage || results !== prevState.results) {
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
        flag={`https://flagcdn.com/w40/${user.nat.toLowerCase()}.png`}
      />
    );
  };

  handleResultsChange = (event) => {
    this.setState({
      results: Number(event.target.value),
      currentPage: 1,
    });
  };

  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  render() {
    const { users, isFetching, error, results, gender } = this.state;

    const filteredUsers =
      gender === "All"
        ? users
        : users.filter((user) => user.gender.toLowerCase() === gender.toLowerCase());

    return (
      <>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <div className={styles.CardsContainer}>
            <div className={styles.CountCardsContainer}>
              Count cards:
              <label>
                <input
                  type="radio"
                  name="countCards"
                  value="4"
                  checked={results === 4}
                  onChange={this.handleResultsChange}
                />
                4
              </label>
              <label>
                <input
                  type="radio"
                  name="countCards"
                  value="8"
                  checked={results === 8}
                  onChange={this.handleResultsChange}
                />
                8
              </label>
              <label>
                <input
                  type="radio"
                  name="countCards"
                  value="10"
                  checked={results === 10}
                  onChange={this.handleResultsChange}
                />
                10
              </label>
            </div>
            <div className={styles.ChoiceGenderContainer}>
              Choice which gender show:
              <select value={this.state.gender} onChange={this.handleGenderChange}>
                <option value="All">All</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <ul className={styles.UsersList}>{filteredUsers.map(this.mapUser)}</ul>
          </div>
        )}
      </>
    );
  }
}

export default UsersLoader;

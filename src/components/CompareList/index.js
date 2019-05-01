import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, deleteHandler, updateHandler }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt="{repository.owner.login}" />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            {repository.stargazers_count}
            <small>starts</small>
          </li>
          <li>
            {repository.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
        <footer>
          <button type="button" onClick={() => deleteHandler(repository.id)}>
            <i className="fa fa-trash" />
          </button>
          <button type="button" onClick={() => updateHandler(repository.id)}>
            <i className="fa fa-retweet" />
          </button>
        </footer>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  deleteHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
};

export default CompareList;

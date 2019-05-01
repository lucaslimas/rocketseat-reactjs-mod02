import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    // localStorage.clear();
    const repositories = JSON.parse(localStorage.getItem('repositories'));

    this.setState({
      repositories,
    });
  }

  handleDeleteRepository = async (id) => {
    const { repositories } = this.state;

    const repos = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: repos });

    await localStorage.setItem('repositories', JSON.stringify(repos));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const repos = [...this.state.repositories, repository];

      this.setState({
        repositoryInput: '',
        repositories: repos,
        repositoryError: false,
      });

      localStorage.setItem('repositories', JSON.stringify(repos));
    } catch (err) {
      this.setState({
        repositoryError: true,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { repositories, repositoryInput } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="Usuário/Repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'ok'}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          deleteHandler={this.handleDeleteRepository}
          updateHandler={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}

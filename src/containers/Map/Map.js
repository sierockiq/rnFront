import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/Map/Map';

class MapContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false, error: null, users: [] };
  }

  componentDidMount = () => this.fetchUsers();

  /**
   * Fetch Data
   */
  fetchUsers = async () => {
    const { fetchUsers, id } = this.props;

    this.setState({ loading: true, error: null });

    try {
      const users = await fetchUsers(id);
      this.setState({ loading: false, error: null, users : users });
    } catch (err) {
      this.setState({ loading: false, error: err.message, users: [] });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, users } = this.state;
    return <Map loading={loading} error={error} users={users} reFetch={this.fetchUsers} />;
  };
}

MapContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MapContainer.defaultProps = {
  id: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: dispatch.users.fetchUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

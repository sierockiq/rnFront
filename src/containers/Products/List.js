import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsList from '../../components/Products/List';

class ProductsListContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false, error: null, user : {},
                    errorForm: null, successForm: null, loadingForm: false };
  }

  componentDidMount = () => this.fetchUser();


  onFormSubmit = async (data) => {
    const { onFormSubmit,id ,user} = this.props;
    this.setState({ errorForm: null, successForm: null, loadingForm: true });
    try {
      data.myId = id;
      const success = await onFormSubmit(data);
      this.setState({ errorForm: null, successForm: success, loadingForm: false});
    } catch (error) {
      this.setState({ errorForm: error.message, successForm: null, loadingForm: false  });
    }
  }

  /**
   * Fetch Data
   */
  fetchUser = async () => {
    const { fetchUser, id } = this.props;

    this.setState({ loading: true, error: null,user: {} });

    try {
      const user = await fetchUser(id);
      this.setState({ loading: false, error: null, user : user });
    } catch (err) {
      this.setState({ loading: false, error: err.message, user: {}});
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, user ,errorForm, loadingForm,successForm} = this.state;
    return <ProductsList
              loading={loading}
              error={error}
              user={user}
              reFetch={this.fetchUser}
              onFormSubmit={this.onFormSubmit}
              errorForm={errorForm}
              loadingForm={loadingForm}
              successForm={successForm}
            />;
  };
}

ProductsListContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFormSubmit: PropTypes.func.isRequired,
};

ProductsListContainer.defaultProps = {
  id: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: dispatch.users.fetchUser,
  onFormSubmit: dispatch.commands.saveAll,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);

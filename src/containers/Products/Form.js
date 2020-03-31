import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Products/Form';
import { Actions } from 'react-native-router-flux';
class ProductsFormContainer extends Component {
  constructor() {
    super();
    this.state = { error: null, success: null, loading: false };
  }

  /**
   * On Form Submission
   */
  onFormSubmit = async (data) => {
    this.setState({ success: null, error: null, loading: true });
    const { onFormSubmit } = this.props;
    try {
      const success = await onFormSubmit(data);
      this.setState({ success, error: null, loading: false });
      setTimeout(() => {Actions.myProductsList()}, 2000);
    } catch (error) {
      this.setState({ loading: false, success: null, error: error.message });
    }
  }

  /**
   * Render
   */
  render = () => {
    const { userInput } = this.props;
    const { error, loading, success } = this.state;

    return (
      <Layout
        error={error}
        loading={loading}
        success={success}
        defaultValues={userInput}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

ProductsFormContainer.propTypes = {
  userInput: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userInput: state.articles.userInput || {},
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit: dispatch.products.save,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFormContainer);

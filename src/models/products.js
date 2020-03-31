import moment from 'moment';
import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/products';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { ucfirst, stripHtml } from '../lib/string';
import { errorMessages, successMessages } from '../constants/messages';
import pagination from '../lib/pagination';


export default {
  namespace: 'products',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({

    /**
     * Get a single item from the API
     * @returns {Promise[obj]}
     */
    async fetchProduct() {
      try {
        /*const response = await Api.get(`/v1/users`);
        const { data } = response;

        if (!data) {
          throw new Error({ message: errorMessages.usersEmpty });
        }

        return data;*/
        return initialState.myProducts;
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a single item from the API
     * @returns {Promise[obj]}
     */
    async deleteProduct(id) {
      try {
        //API delete productTypeName
        dispatch.products.deleteReduxProduct(id)
        return initialState.myProducts.filter((product,ind) => ind != 1);
        //return initialState[0];
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Save date to redux store
     * @param {obj} data
     * @returns {Promise[obj]}
     */
    async save(data) {
      try {
        console.log(data)
        //call to API to save new product
        return successMessages.defaultForm; // Message for the UI
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

  }),

  /**
   * Reducers
   */
  reducers: {

    deleteReduxProduct(state, id) {
      console.log(state)
      let myProducts = state.myProducts.filter(product => product.id != id)
      return {
        ...state,
        myProducts : myProducts
      };
    },



  },
};

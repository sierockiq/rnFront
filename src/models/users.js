import moment from 'moment';
import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/users';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { ucfirst, stripHtml } from '../lib/string';
import { errorMessages, successMessages } from '../constants/messages';
import pagination from '../lib/pagination';


export default {
  namespace: 'users',

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
    async fetchUsers() {
      try {
        /*const response = await Api.get(`/v1/users`);
        const { data } = response;

        if (!data) {
          throw new Error({ message: errorMessages.usersEmpty });
        }

        return data;*/
        return initialState;
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },
    /**
     * Get a single item from the API
     * @returns {Promise[obj]}
     */
    async fetchUser() {
      try {
        /*const response = await Api.get(`/v1/users`);
        const { data } = response;

        if (!data) {
          throw new Error({ message: errorMessages.usersEmpty });
        }

        return data;*/
        return initialState[0];
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },
  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      let newList = null;
      const { data, headers, page } = payload;

      return data
        ? {
          ...state
        }
        : initialState;
    },


  },
};

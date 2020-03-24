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
  namespace: 'commands',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Save date to redux store
     * @param {obj} data
     * @returns {Promise[obj]}
     */
    async saveAll(user) {
      console.log(user)
      try {
        let commands = [];
        user.products.forEach((product)=>{
          if(product.quantiteVoulue){
            if(product.quantity<parseInt(product.quantiteVoulue)){
              throw new Error(errorMessages.dataIncorrect)
            }
            commands.push({
              productId : product.id,
              farmerId : user.id,
              quantite : product.quantiteVoulue,
              userId : user.myId
            })
          }
        });
        user.products.forEach((product)=>{
          product.quantiteVoulue=0;
        });
        console.log(commands)
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

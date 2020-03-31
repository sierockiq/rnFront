import moment from 'moment';
import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/commands';
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
      try {
        let commands = {listCommands:[]};
        let price =0,quantity=0;
        user.products.forEach((product)=>{
          if(product.boughtQuantity){
            if(product.quantity<parseInt(product.boughtQuantity)){
              throw new Error(errorMessages.dataIncorrect)
            }
            commands.listCommands.push({
              productId : product.id,
              farmerId : user.id,
              quantite : product.boughtQuantity,
              userId : user.myId,
              priceByKg : product.price,
              price : product.price * product.boughtQuantity,
              name : product.productTypeName
            })
            price += product.boughtQuantity * product.price;
            quantity += parseInt(product.boughtQuantity);
          }
        });
        commands.price=price;
        commands.quantity=quantity;
        dispatch.commands.replaceLastBoughtCommand(commands);
        return successMessages.commandSaved; // Message for the UI
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
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceLastBoughtCommand(state, payload) {
      return {
        ...state,
        userLastCommand: payload,
      };
    },


  },
};

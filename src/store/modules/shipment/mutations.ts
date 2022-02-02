import { MutationTree } from 'vuex'
import ShipmentState from './ShipmentState'
import * as types from './mutation-types'

const mutations: MutationTree <ShipmentState> = {
  [types.SHIPMENT_LIST_UPDATED] (state, payload) {
      state.shipments.list = payload.shipments;
  },
  [types.SHIPMENT_CURRENT_UPDATED] (state, payload) {
    state.current = payload.current;
  },
  [types.UPDATE_SHIPMENT_PRODUCT_COUNT] (state, Id) {
    state.current.items.forEach((item: any) => {
      if(item.productId === Id.payload){
        item.quantityAccepted = parseInt(item.quantityAccepted)+1;
      }
    });
  } 
}
export default mutations;
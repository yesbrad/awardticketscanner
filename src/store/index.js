import {action, thunk, debug} from 'easy-peasy';
import UUID from 'uuid/v4';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'easy-peasy';
import axios from 'axios';
import { Alert } from 'react-native';
import { NETO_KEY } from 'react-native-dotenv'

const API_URL = 'https://www.awardrv.com.au/do/WS/NetoAPI';

const InitalStore = {
	currentBarcode: '',
	currentProduct: {},
};

const Actions = {
	setCurrentBarcode: action((state, payload) => {
		state.currentBarcode = payload;
	}),
	pullProduct: thunk(async (actions, payload) => {
			const postData = {
				Filter: {
					SKU: payload,
					OutputSelector: ["ID", "Name", "RRP", "PriceGroups", "Images", "PromotionPrice", "PromotionStartDateUTC", "PromotionExpiryDateUTC"]
				}
			}

			const postHeaders = {
				headers: {
					"NETOAPI_KEY": NETO_KEY,
					"NETOAPI_ACTION": 'GetItem',
					"Content-Type": 'application/json',
					"Accept": 'application/json'
				},
			}

			const response = await axios.post(API_URL, postData, postHeaders);

			console.log('product pulled', response.data.Item[0]);

			if(response.data.Item[0] !== undefined) {
				actions.setProduct(response.data.Item[0]);
			} else {
				throw new Error("Failed to Find Product");
			}

	}),
	setProduct: action((state, payload) => {
		// Alert.alert(payload.Name);
		state.currentProduct = payload;
	}),
	clearProduct: action(state => {
		state.currentBarcode = '';
		state.currentProduct = {};
	}),
};

export default createStore({
	...InitalStore,
	...Actions,
});

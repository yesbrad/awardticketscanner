/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { Container, Camera, PreviewImage, ButtonWrapper, Button, ButtonText, TitleText, PromotionText } from './styles';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import { Alert, Platform } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNPrint from 'react-native-print';
import A4_TICKET from '../../html/A4_TICKET.html';
import moment from 'moment';
import Share from 'react-native-share';
// const bwipjs = require('bwip-js');
// var { createCanvas } = require("canvas");
var JsBarcode = require('jsbarcode');


const Ticket = ({ navigation }) => {
	const setCurrentBarcode = useStoreActions(actions => actions.setCurrentBarcode);
	const clearProduct = useStoreActions(actions => actions.clearProduct);
	const currentProduct = useStoreState(state => state.currentProduct);

	const [fetching, SetFetching] = useState(false);
	
	useEffect(() => {
		return function cleanup () {
			clearProduct();
		}
	}, []);

	const isPromotion = moment().isAfter(moment(currentProduct.PromotionStartDateUTC, 'YYYY-MM-DD HH:mm:ss')) && moment().isBefore(moment(currentProduct.PromotionExpiryDateUTC, 'YYYY-MM-DD HH:mm:ss'));

	const getPriceGroup = (isShow) => {
		const newArr = currentProduct.PriceGroups[0].PriceGroup.filter((group) => {
			return group.Group === (isShow ? 'Show' : 'Shop AW');
		});	
		return newArr[0];
	}

	const createPDF = async (isShow) => {
		if(Platform.OS === 'android') { 
			try {
				const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

				switch (result) {
					case RESULTS.UNAVAILABLE:
						console.log(
							'This feature is not available (on this device / in this context)',
						);
						Alert.alert("Perrmission Failed Contact Brad");
						return;
					break;
					case RESULTS.DENIED:
						console.log(
							'The permission has not been requested / is denied but requestable',
						);
						await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
					break;
					case RESULTS.GRANTED:
						console.log('The permission is granted');
					break;
					case RESULTS.BLOCKED:
						console.log('The permission is denied and not requestable anymore');
						Alert.alert("Perrmission Denied. Please enable in settings");
						return;
					break;
				}
			} catch (err) {
				console.log(err);
				Alert.alert("Perrmission Error Contact Brad");
				return;
			}
		}

		const baseHTMLA4 = '<!DOCTYPE html><html><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>A4_TICKET</title><style id="applicationStylesheet" type="text/css">.mediaViewInfo {--web-view-name: custom – 1;--web-view-id: custom___1;--web-enable-deep-linking: true;}:root {--web-view-ids: custom___1;}* {margin: 0;padding: 0;box-sizing: border-box;border: none;}#custom___1 {position: absolute;width: 2480px;height: 3508px;background-color: rgba(255,255,255,1);overflow: hidden;--web-view-name: custom – 1;--web-view-id: custom___1;--web-enable-deep-linking: true;}#nameaward {position: absolute;left: 0px;top: 701px;overflow: visible;width: 2481px;height: 634px;text-align: center;font-family: sans-serif;font-style: normal;font-weight: bold;font-size: 164px;color: rgba(0,0,0,1);}#Group_1 {position: absolute;width: 1303px;height: 908px;left: 1113px;top: 1686px;overflow: visible;}#rrp {position: absolute;left: 0px;top: 0px;overflow: visible;width: 1304px;white-space: nowrap;text-align: left;font-family: sans-serif;font-style: normal;font-weight: bold;font-size: 240px;color: rgba(123,123,123,1);letter-spacing: -0.8px;}#mainPrice {position: absolute;left: 0px;top: 456px;overflow: visible;width: 1304px;height: 452px;text-align: left;font-family: sans-serif;font-style: normal;font-weight: 900;font-size: PRICE_SIZE;color: rgba(0,0,0,1);letter-spacing: -0.8px;}#A {position: absolute;left: 2384px;top: 38px;overflow: visible;width: 38px;white-space: nowrap;text-align: right;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 53px;color: rgba(219,219,219,1);letter-spacing: -0.8px;}#BarGroup {position: absolute;width: 774px;height: 193px;left: 150px;top: 2833px;overflow: visible;}#Icon {display: flex;position: static;width: auto;height: 111px;left: 0px;top: 0px;overflow: visible;margin: auto;}#barcode {position: absolute;left: 0px;top: 127px;overflow: visible;width: 775px;height: 66px;text-align: center;font-family: Arial;font-style: normal;font-weight: normal;font-size: 43px;color: rgba(0,0,0,1);letter-spacing: -0.8px;}</style></head><body><div id="custom___1"><div id="nameaward"><span>AWARD_NAME</span></div><div id="Group_1"><div id="rrp"><span>AWARD_RRP</span></div><div id="mainPrice"><span>AWARD_PRICE</span></div></div><div id="A"><span>A</span></div><div id="BarGroup"><img id="Icon" src="Icon.png"><div id="barcode"><span>AWARD_BARCODE</span></div></div></div></body></html>';  
		// const baseHTMLA4 = '<!DOCTYPE html><html><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>A4_TICKET</title><style id="applicationStylesheet" type="text/css">.mediaViewInfo {--web-view-name: custom – 1;--web-view-id: custom___1;--web-enable-deep-linking: true;}:root {--web-view-ids: custom___1;}* {margin: 0;padding: 0;box-sizing: border-box;border: none;}#custom___1 {position: absolute;width: 2480px;height: 3508px;background-color: rgba(255,255,255,1);overflow: hidden;--web-view-name: custom – 1;--web-view-id: custom___1;--web-enable-deep-linking: true;}#nameaward {position: absolute;left: 0px;top: 701px;overflow: visible;width: 2481px;height: 634px;text-align: center;font-family: sans-serif;font-style: normal;font-weight: bold;font-size: 164px;color: rgba(0,0,0,1);}#Group_1 {position: absolute;width: 2070px;height: 908px;left: 346px;top: 1600px;overflow: visible;}#rrp {position: absolute;left: 767px;top: 0px;overflow: visible;width: 1304px;white-space: nowrap;text-align: left;font-family: sans-serif;font-style: normal;font-weight: bold;font-size: 240px;color: rgba(123,123,123,1);letter-spacing: -0.8px;}#mainPrice {position: absolute;left: 767px;top: 456px;overflow: visible;width: 1304px;height: 452px;text-align: left;font-family: sans-serif;font-style: normal;font-weight: 900;font-size: PRICE_SIZE;color: rgba(0,0,0,1);letter-spacing: -0.8px;}#A {position: absolute;left: 2430px;top: 0px;overflow: visible;width: 38px;white-space: nowrap;text-align: right;font-family: Segoe UI;font-style: normal;font-weight: bold;font-size: 53px;color: rgba(219,219,219,1);letter-spacing: -0.8px;}</style></head><body><div id="custom___1"><div id="nameaward"><span>AWARD_NAME</span></div><div id="Group_1"><div id="rrp"><span>AWARD_RRP</span></div><div id="mainPrice"><span>AWARD_PRICE</span></div></div><div id="A"><span>A</span></div></div></body></html>';  

		let newHtml = baseHTMLA4.replace('AWARD_NAME', currentProduct.Name);
		newHtml = newHtml.replace('AWARD_RRP', '$' + currentProduct.RRP);
		newHtml = newHtml.replace('AWARD_BARCODE', currentProduct.SKU);

		newHtml = newHtml.replace('src="Icon.png"', `src="http://bwipjs-api.metafloor.com/?bcid=code128&text=${currentProduct.SKU}&scaleX=2&scaleY=1"`);

		console.log(newHtml);

		// var canvas = new Canvas();
		// var canvas = createCanvas();
		// JsBarcode(canvas, "Hello");
		// const pngImage = canvas.toDataURL();

		// try{
			//  bwipjs.toBuffer({
			// 	bcid: 'code128',
			// 	text: 'Hello',
			// 	scale: 3,
			// 	height: 10,
			// 	includetext: true,
			// 	textxalign: 'center'
			// });

			// const gifBase64 = `data:image/gif;base64,${buffer.toString('base64')}`
			// console.log("BARCODE", gifBase64);
		// } catch (err) {
		// 	console.log("Barcode Failed", err.message);
		// }

		// bwipjs.toBuffer({
		// 	bcid:        'code128',       // Barcode type
		// 	text:        '0123456789',    // Text to encode
		// 	scale:       3,               // 3x scaling factor
		// 	height:      10,              // Bar height, in millimeters
		// 	includetext: true,            // Show human-readable text
		// 	textxalign:  'center',        // Always good to set this
		// }, function (err, png) {
		// 	if (err) {
		// 		// `err` may be a string or Error object
		// 	} else {
		// 		// `png` is a Buffer
		// 		// png.length           : PNG file length
		// 		// png.readUInt32BE(16) : PNG image width
		// 		// png.readUInt32BE(20) : PNG image height
		// 	}
		// });


		let newPrice = isPromotion ? getPriceGroup(isShow).PromotionPrice : getPriceGroup(isShow).Price;

		console.log(getPriceGroup(isShow));

		const isTrimed = newPrice.charAt(newPrice.length - 1) === '0' && newPrice.charAt(newPrice.length - 1) === '0';

		if(isTrimed) {
			newPrice = newPrice.substr(0, newPrice.length - 3);
		}

		if(newPrice.length < 4){
			newHtml = newHtml.replace('PRICE_SIZE;', '400px;');
		} else {
			newHtml = newHtml.replace('PRICE_SIZE;', '340px;');
		}

		newHtml = newHtml.replace('AWARD_PRICE',  '$' + newPrice);
		
		const options = {
		  html: newHtml,
		  fileName: 'test',
		  directory: 'Downloads',
		  width: 1860,
		  height: 2631,
		};
	
		let file = await RNHTMLtoPDF.convert(options)
		// console.log(file.filePath);

		if(Platform.OS === 'android'){
			try {
				await RNPrint.print({filePath: file.filePath})
			} catch (err) {
				Alert.alert("PRINTING FAILED");
			}
		}else {
			Share.open({url: file.filePath});
		}
	};

	const onNavigateBack = () => {
		// clearProduct();
		navigation.goBack();
	}

	return (
		<>
			<Header leftButton={() => <HeaderButton onPress={() => onNavigateBack()} icon="ios-arrow-back" />}></Header>
			<Container>
				<TitleText numberOfLines={3}>{currentProduct.Name}</TitleText>
				{(currentProduct.Images && currentProduct.Images.length > 0) && <PreviewImage source={{ uri: currentProduct.Images[0].URL}} />}
				{/* <PriceText>Shop: ${currentProduct.PriceGroups[0].PriceGroup[2].Price}</PriceText> */}
				{isPromotion && <PromotionText>Promotion Product</PromotionText>}
			</Container>
			{getPriceGroup(false) && <ButtonWrapper>
				<Button onPress={() => createPDF(false)}>
					<ButtonText>Print Store</ButtonText>
				</Button>
			</ButtonWrapper>}
			{getPriceGroup(true) && <ButtonWrapper show>
				<Button onPress={() => createPDF(true)} show>
					<ButtonText>Print Show</ButtonText>
				</Button>
			</ButtonWrapper>}
		</>
	);
};

export default Ticket;

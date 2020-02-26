/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { Container, Camera, HeadingContainer, HeadingText, ScanText, ProductCode, ModelContainer, ModelCodeContainer, SearchInput, CameraBottomContainer, SearchButton } from './styles';
import Header from '../../components/Header';
import HeaderButton from '../../components/HeaderButton';
import { Modal, Alert, Text } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import JIcon from '../../components/JIcon';


const List = ({ navigation }) => {
	const setCurrentBarcode = useStoreActions(actions => actions.setCurrentBarcode);
	const pullProduct = useStoreActions(actions => actions.pullProduct);
	const currentBarcode = useStoreState(state => state.currentBarcode);
	const currentProduct = useStoreState(state => state.currentProduct);
	const clearProduct = useStoreActions(actions => actions.clearProduct);

	const [fetching, SetFetching] = useState(false);
	const [manualCode, setManualCode] = useState('');

	useEffect(() => {
		const debugScan = async () => {
			SetFetching(true);
			await pullProduct('000739B');
			SetFetching(false);
			navigation.navigate('Ticket');
		};

		// debugScan();
	}, [])

	const onReadBarCode = async (code) => {
		if(fetching){
			return;
		}

		if(currentBarcode !== '') {
			return;
		}

		setCurrentBarcode(code.data)
		SetFetching(true);
		try{
			await pullProduct(code.data);
		} catch (err) {
			let secondRoundSuccess = false;
			console.log(code.type);
			console.log(err);

			if(err.message === "Failed to Find Product" && (code.type === 'EAN_13' || code.type === 'org.gs1.EAN-13')) {
				console.log("Entered the fail", code.data.substr(1));
				try{
					await pullProduct(code.data.substr(1));
					console.log("Made it past second pull product!");
					// Alert.alert("Moddded Code Sucesss");
					secondRoundSuccess = true;
				} catch {
					secondRoundSuccess = false;
				}
			}

			if(secondRoundSuccess === false){
				SetFetching(false);
				// console.log(err);
				clearProduct();
				Alert.alert("Invalid Code");
				return;
			}
		}

		SetFetching(false);
		navigation.navigate('Ticket');
	}
	
	return (
		<>
			<HeadingContainer>
				<HeadingText>Award RV Ticket Printer</HeadingText>
			</HeadingContainer>
			<Container>
				<Camera
					onBarCodeRead={onReadBarCode}
				>
					<ScanText>Please scan code</ScanText>
					<CameraBottomContainer>
						<SearchInput placeholder="Enter Manual Code Here" onChangeText={e => setManualCode(e)} value={manualCode}>

						</SearchInput>
						<SearchButton onPress={() => onReadBarCode({ data: manualCode})}>
							<JIcon icon="ios-search" size={30} color="white"/>
						</SearchButton>
					</CameraBottomContainer>
				</Camera>
			</Container>
			<Modal
				animationType="slide"
				transparent={true}
				visible={currentBarcode != '' && fetching}
				onRequestClose={() => {
					// SetFetching(false);
				}}
			>
				<ModelContainer>
					<ModelCodeContainer>
						<ProductCode>Searching For Code:</ProductCode>
						<ProductCode>{currentBarcode}</ProductCode>
					</ModelCodeContainer>
				</ModelContainer>
		  	</Modal>
		</>
	);
};

export default List;

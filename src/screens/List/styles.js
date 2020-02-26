import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

export const Container = styled.View`
	flex: 1;
	flex-direction: column;
	padding: 20px;
`;

export const Camera = styled(RNCamera)`
 border-radius: 40px;
 overflow: hidden;
 flex: 1;
`;

export const HeadingContainer = styled.View`
	width: 100%;
	height: 60px;
	justify-content: center;
	align-items: center;
	padding-top: 20px;
`;

export const HeadingText = styled.Text`
	font-size: 30px;
	font-family: "PublicSans-Black";
	color: ${props => props.theme.brandColor};
`;

export const ScanText = styled.Text`
	margin: 80px 0 0 40px;
	font-size: 30px;
	font-family: "PublicSans-Black";
	color: white;
`;

export const ModelContainer = styled.View`
	width: 100%;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const ModelCodeContainer = styled.View`
	width: 200px;
	height: 200px;
	background-color: rgba(0,0,0,0.4);
	border-radius: 10px;
	align-items: center;
	justify-content: center;
`;

export const ProductCode = styled.Text`
	margin: 5px 0;
	font-size: 18px;
	width: 100%;
	text-align: center;
	color: white;
`;

export const CameraBottomContainer = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	align-items: flex-end;
	/* border: 1px; */
	flex-direction: row;
	padding: 0 10px;
	padding-bottom: 20px;
`;

export const SearchInput = styled.TextInput`
	width: 70%;
	/* border: 1px; */
	height: 60px;
	background: white;
	border-radius: 30px;
	padding: 0 20px;
	margin-right: 10px;
`;

export const SearchButton = styled.TouchableOpacity`
	width: 60px;
	height: 60px;
	/* border: 1px; */
	background: ${props => props.theme.brandColor};
	border-radius: 30px;
	align-items: center;
	justify-content: center;
`;
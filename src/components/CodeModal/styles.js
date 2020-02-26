import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
	width: 100%;
	height: 60px;
	/* margin-top: ${getStatusBarHeight()}; */
	flex-direction: row;
	/* background-color: ${props => props.theme.brandColor}; */
`;

export const HeaderWrapper = styled.View`

`;

export const HeaderTitleWrapper = styled.View`
	width: 100%;
	height:100%;
	flex:1;
	align-items: center;
	justify-content: center;
`;

export const HeaderText = styled.Text`
	color: ${props => props.theme.darkGray};;
	font-size: 30px;
	font-family: 'PublicSans-Bold';
	text-align: right;
	width: 100%;
	flex: 1;
	padding-right: 20px;
	/* border: 1px; */
	top: 5;
`;

export const HeaderButtonContainer = styled.View`
	height: 100%;
	max-width: 80px;
	flex:1;
	/* border: 1px; */
	align-items: center;
	justify-content: center;
`;

export const MainContainer = styled.View`
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: white;
	overflow: hidden;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
`;
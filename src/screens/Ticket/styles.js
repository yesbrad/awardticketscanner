import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	width: 100%;
	height: 100%;
	padding: 20px;
	align-items: center;
`;

export const TitleText = styled.Text`
	font-size: 30px;
	font-family: 'PublicSans-Bold';
	overflow: hidden;
	width: 100%;
`;

export const PriceText = styled.Text`
	font-size: 35px;
	font-family: 'PublicSans-Black';
	width: 100%;
	text-align: right;

	${props => props.small && `
		font-size: 20px;
	`};
`;

export const PromotionText = styled.Text`
	font-size: 24px;
	font-family: 'PublicSans-Bold';
	width: 100%;
	text-align: center;
	color: ${props => props.theme.brandColor};
`;

export const PreviewImage = styled.Image`
	margin: 20px 0;
	flex: 1;
	width: 100%;
	/* border: 1px; */
	border-radius: 40px;
`;

export const ButtonWrapper = styled.View`
	width: 100%;
	padding: 0 20px;
	height: 50px;
	margin-bottom: 20px;
	
	${props => props.show && `
		height: 70px;
	`};
`;

export const Button = styled.TouchableOpacity`
	flex: 1;
	border-radius: 40px;
	background-color: ${props => props.theme.brandColor};
	justify-content: center;
	align-items: center;

	${props => props.show && `
		background-color: #e01086;
	`};
`;

export const ButtonText = styled.Text`
	color: white;
	font-size: 24px;
	font-family: 'PublicSans-Black';
`;
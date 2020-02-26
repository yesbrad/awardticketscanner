import React from 'react';
import {Container, MainContainer, CardContainer, HeaderWrapper, HeaderText, HeaderButtonContainer, HeaderTitleWrapper} from './styles';

const Header = ({children, leftButton, rightButton}) => {
	return (
		<Container>
			<HeaderButtonContainer>
				{leftButton && leftButton()}
			</HeaderButtonContainer>
			<HeaderTitleWrapper>
				<HeaderText>Print Ticket</HeaderText>
			</HeaderTitleWrapper>
			{/* <HeaderButtonContainer>
				{rightButton && rightButton()}
			</HeaderButtonContainer> */}
		</Container>
	);
};

export default Header;

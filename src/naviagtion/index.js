import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Screen Components
import List from '../screens/List';
import Ticket from '../screens/Ticket';

const appNavigator = createStackNavigator({
	List: {
		screen: List,
		navigationOptions: {
			headerShown: false
		}
	},
	Ticket: {
		screen: Ticket,
		navigationOptions: {
			headerShown: false
		}
	},
});

export default createAppContainer(appNavigator);

import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { sliders } from "./modules/sliders";
import { map } from "./modules/map";
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	modals.init();
	sliders.init();
	map.init();

	config.log('app init')
	
};

export { App };
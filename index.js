import ScrollMagic from 'scrollmagic';
import _ from 'lodash';
import {loadData} from './utils/data-loader';
import loadPreview from './components/preview';
import loadRelation from './components/relation-exploration';
import loadTypicalDay from './components/typical-day-exploration';
import loadMobileView from './components/phone';

const isMobile = require('ismobilejs');
const scrollCtrl = new ScrollMagic.Controller();

if (!isMobile.phone) {
	loadData().then(data => {
		loadPreview(data, scrollCtrl);
		loadRelation(data, scrollCtrl);
		loadTypicalDay(data, scrollCtrl);
	});

} else {
	loadMobileView();

}

// reload the window on resize event for properly rendering of all the plots
window.onresize = _.debounce(() => {
	location.reload();
}, 500);
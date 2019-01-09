import LinePlot from "../../plot/line-plot";
import {createFixedScene, createTriggerScene} from "../../utils/scene-maker";
import {eventDataSet, hourlyDataSet} from "../../utils/data-loader";
import $ from "jquery";

const html = require("./index.html");

export default function load(data, scrollCtrl) {
	$("#one-day-exploration").append(html);

	let linePlot = LinePlot.of("#typical-day-temp-chart");

	createTriggerScene(scrollCtrl, {
		triggerElement: "#typical-day-exploration-trigger-4"
	}, {
		startCB: e => {
			if (e.scrollDirection === "FORWARD") {
				linePlot
					.data(hourlyDataSet["hot-day-1"], "#fdb02d", "hot-day-1")
					.data(hourlyDataSet["hot-day-2"], "#fdb02d", "hot-day-2")
					.data(hourlyDataSet["cold-day-1"], "#a6e7fd", "cold-day-1")
					.data(hourlyDataSet["cold-day-2"], "#a6e7fd", "cold-day-2").draw();
				linePlot.highlightPeak();
			} else {
				linePlot.removeAll();
			}
		}
	});

	createFixedScene(scrollCtrl, "#typical-day-temp-chart", {
		triggerElement: "#typical-day-exploration-trigger-5",
		duration: document.getElementById("typical-scene").offsetHeight - 400
	});

	createTriggerScene(scrollCtrl, {
		triggerElement: "#typical-day-exploration-trigger-6"
	}, {
		startCB: e => {
			if (e.scrollDirection === "FORWARD") {
				linePlot.removeAll();
				linePlot.data(hourlyDataSet["weekend-1"], "#a1e7a6", "weekend-1")
					.data(hourlyDataSet["weekend-2"], "#a1e7a6", "weekend-2")
					.data(hourlyDataSet["normal-1"], "#909290", "normal-1")
					.data(hourlyDataSet["normal-2"], "#909290", "normal-2").draw();
				linePlot.highlightPeak();
			} else {
				linePlot.resetPeak();
				linePlot.removeAll();
				linePlot.data(hourlyDataSet["hot-day-1"], "#fdb02d", "hot-day-1")
					.data(hourlyDataSet["hot-day-2"], "#fdb02d", "hot-day-2")
					.data(hourlyDataSet["cold-day-1"], "#a6e7fd", "cold-day-1")
					.data(hourlyDataSet["cold-day-2"], "#a6e7fd", "cold-day-2").draw();
				linePlot.highlightPeak();
			}
		}
	});

	createTriggerScene(scrollCtrl, {
		triggerElement: "#typical-day-exploration-trigger-7"
	}, {
		startCB: e => {
			if (e.scrollDirection === "FORWARD") {
				linePlot.removeAll();
				linePlot.switchXAxis();
				linePlot.highlightAxis();
				linePlot.data(eventDataSet["trump"], "#e2ea64", "trump")
					.data(eventDataSet["trump-now"], "#909290", "trump-now")
					.draw(true);
			} else {
				linePlot.removeAll();
				linePlot.resetXAxis();
				linePlot.removeHighlightAxis();
				linePlot.data(hourlyDataSet["weekend-1"], "#a1e7a6", "weekend-1")
					.data(hourlyDataSet["weekend-2"], "#a1e7a6", "weekend-2")
					.data(hourlyDataSet["normal-1"], "#909290", "normal-1")
					.data(hourlyDataSet["normal-2"], "#909290", "normal-2").draw();
				linePlot.highlightPeak();
			}
		}
	});

	createTriggerScene(scrollCtrl, {
		triggerElement: "#typical-day-exploration-trigger-8"
	}, {
		startCB: e => {
			if (e.scrollDirection === "FORWARD") {
				linePlot.removeAll();
				linePlot.data(eventDataSet["financial"], "#e2ea64", "financial")
					.data(eventDataSet["financial-now"], "#909290", "financial-now")
					.draw(true);
			} else {
				linePlot.removeAll();
				linePlot.data(eventDataSet["trump"], "#e2ea64", "trump")
					.data(eventDataSet["trump-now"], "#909290", "trump-now")
					.draw(true);
			}
		}
	});

	createTriggerScene(scrollCtrl, {
		triggerElement: "#typical-day-exploration-trigger-9"
	}, {
		startCB: e => {
			if (e.scrollDirection === "FORWARD") {
				linePlot.removeAll();
				linePlot.data(eventDataSet["storm"], "#e2ea64", "storm")
					.data(eventDataSet["storm-now"], "#909290", "storm-now")
					.draw(true);
			} else {
				linePlot.removeAll();
				linePlot.data(eventDataSet["financial"], "#e2ea64", "financial")
					.data(eventDataSet["financial-now"], "#909290", "financial-now")
					.draw(true);
			}
		}
	});
}
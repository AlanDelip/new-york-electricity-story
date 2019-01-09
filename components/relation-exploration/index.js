import CategoricalScatterPlot from "../../plot/c-scatter-plot";
import QuantitativeScatter from "../../plot/q-scatter-plot";
import {createScatterHLScene, createTriggerScene} from "../../utils/scene-maker";
import $ from "jquery";

const html = require("./index.html");

export default function load(data, scrollCtrl) {
	$("#relation-exploration").append(html);

	let cScatterPlot = CategoricalScatterPlot.of("#special-load", data).draw();
	let qScatterPlot = QuantitativeScatter.of("#temp-load", data);

	createTriggerScene(scrollCtrl, "#relation-exploration-trigger-1",
		{
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					qScatterPlot.draw();
					cScatterPlot.hide();
				} else {
					cScatterPlot.reset();
					qScatterPlot.hide();
				}
			}
		});

	let addHighlightEvent = (qScatterPlot, ...eles) => {
		for (let ele of eles) {
			let eleDOM = document.getElementById(ele.id);
			eleDOM.addEventListener("mouseover", e => {
				qScatterPlot.highlight([ele.type]);
			});
			eleDOM.addEventListener("mouseleave", e => {
				qScatterPlot.reset();
			});
		}
	};

	addHighlightEvent(qScatterPlot,
		{id: "high-temp-label", type: "high temp"},
		{id: "low-temp-label", type: "low temp"},
		{id: "holiday-label", type: "holiday"},
		{id: "event-label", type: "event"},
		{id: "weekend-label", type: "weekend"},
		{id: "normal-day-label", type: "normal days"});

	createScatterHLScene(scrollCtrl, qScatterPlot, "#temp-load-container", {
		triggerElement: "#relation-exploration-trigger-2",
		duration: document.getElementById("relation-exploration-desc").offsetHeight
	});
}
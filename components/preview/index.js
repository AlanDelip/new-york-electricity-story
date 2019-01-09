import $ from 'jquery';
import CalendarPlot from "../../plot/calendar-plot";
import {createCalendarHLScene} from "../../utils/scene-maker";

const html = require("./index.html");
const d3 = require('d3');

export default function load(data, scrollCtrl) {
	$("#preview").append(html);

	let calendarPlot = CalendarPlot.of("#calendar-plot")
		.data(data)
		.draw();

	const highTempHLData = [
		{month: 7, week: 1, day_of_week: 1},
		{month: 7, week: 1, day_of_week: 2},
		{month: 7, week: 1, day_of_week: 3},
		{month: 7, week: 1, day_of_week: 4},
		{month: 7, week: 1, day_of_week: 5}
	];
	let highTempScene = createCalendarHLScene(
		scrollCtrl, calendarPlot, highTempHLData,
		{
			triggerElement: "#preview-trigger-1",
			duration: window.innerHeight,
			textElement: d3.select("#preview-1 .content")
		});

	const lowTempHLData = [
		{month: 1, week: 1, day_of_week: 2},
		{month: 1, week: 1, day_of_week: 3},
		{month: 1, week: 1, day_of_week: 4},
		{month: 1, week: 1, day_of_week: 5},
		{month: 1, week: 1, day_of_week: 6},
		{month: 1, week: 1, day_of_week: 7}
	];
	let lowTempScene = createCalendarHLScene(
		scrollCtrl, calendarPlot, lowTempHLData,
		{
			triggerElement: "#preview-trigger-2",
			duration: window.innerHeight,
			textElement: d3.select("#preview-2 .content")
		});

	const holidayHLData = [{month: 12, week: 5, day_of_week: 1}, {month: 12, week: 5, day_of_week: 2}];
	let holidayScene = createCalendarHLScene(
		scrollCtrl, calendarPlot, holidayHLData,
		{
			triggerElement: "#preview-trigger-3",
			duration: window.innerHeight,
			textElement: d3.select("#preview-3 .content")
		});

	const eventHLData = [{month: 2, week: 2, day_of_week: 1}];
	let eventScene = createCalendarHLScene(
		scrollCtrl, calendarPlot, eventHLData,
		{
			triggerElement: "#preview-trigger-4",
			duration: window.innerHeight,
			textElement: d3.select("#preview-4 .content")
		});

	const weekendHLData = [
		{month: 7, week: 1, day_of_week: 7}, {month: 7, week: 2, day_of_week: 7},
		{month: 7, week: 3, day_of_week: 7}, {month: 7, week: 4, day_of_week: 7},
		{month: 7, week: 1, day_of_week: 1}, {month: 7, week: 2, day_of_week: 1},
		{month: 7, week: 3, day_of_week: 1}, {month: 7, week: 4, day_of_week: 1},
		{month: 7, week: 5, day_of_week: 1}];
	let weekendScene = createCalendarHLScene(
		scrollCtrl, calendarPlot, weekendHLData,
		{
			triggerElement: "#preview-trigger-5",
			duration: window.innerHeight,
			textElement: d3.select("#preview-5 .content")
		});
}
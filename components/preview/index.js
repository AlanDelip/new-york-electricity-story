import $ from 'jquery';
import {createCalendarHLScene} from "../../utils/scene-maker";
import CalendarPlot from "../../plot/calendar-plot";

const html = require("./index.html");
const d3 = require('d3');

export default function load(data, scrollCtrl) {
	$("#preview").append(html);

	let calendarPlot = CalendarPlot.of(
		{
			container: "#calendar-plot",
			margin: {left: 10, right: 10, top: 10, bottom: 10}
		})
		.data(data)
		.draw();

	let highTempScene = createCalendarHLScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[
			{month: 7, week: 1, day_of_week: 1},
			{month: 7, week: 1, day_of_week: 2},
			{month: 7, week: 1, day_of_week: 3},
			{month: 7, week: 1, day_of_week: 4},
			{month: 7, week: 1, day_of_week: 5}
		],
		{
			triggerElement: "#preview-trigger-1",
			duration: window.innerHeight,
			textElement: d3.select("#preview-1 .content")
		});

	let lowTempScene = createCalendarHLScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[
			{month: 1, week: 1, day_of_week: 2},
			{month: 1, week: 1, day_of_week: 3},
			{month: 1, week: 1, day_of_week: 4},
			{month: 1, week: 1, day_of_week: 5},
			{month: 1, week: 1, day_of_week: 6},
			{month: 1, week: 1, day_of_week: 7}
		],
		{
			triggerElement: "#preview-trigger-2",
			duration: window.innerHeight,
			textElement: d3.select("#preview-2 .content")
		});

	let holidayScene = createCalendarHLScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 12, week: 5, day_of_week: 1}, {month: 12, week: 5, day_of_week: 2}],
		{
			triggerElement: "#preview-trigger-3",
			duration: window.innerHeight,
			textElement: d3.select("#preview-3 .content")
		});

	let eventScene = createCalendarHLScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 2, week: 2, day_of_week: 1}],
		{
			triggerElement: "#preview-trigger-4",
			duration: window.innerHeight,
			textElement: d3.select("#preview-4 .content")
		});

	let weekendScene = createCalendarHLScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 7, week: 1, day_of_week: 7}, {month: 7, week: 2, day_of_week: 7},
			{month: 7, week: 3, day_of_week: 7}, {month: 7, week: 4, day_of_week: 7},
			{month: 7, week: 1, day_of_week: 1}, {month: 7, week: 2, day_of_week: 1},
			{month: 7, week: 3, day_of_week: 1}, {month: 7, week: 4, day_of_week: 1},
			{month: 7, week: 5, day_of_week: 1}],
		{
			triggerElement: "#preview-trigger-5",
			duration: window.innerHeight,
			textElement: d3.select("#preview-5 .content")
		});
}
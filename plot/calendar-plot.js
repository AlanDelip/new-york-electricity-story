const d3 = require('d3');
const DEFAULT_CONFIG = {
	margin: {left: 10, right: 10, top: 10, bottom: 10},
	minLoad: 300000,
	maxLoad: 600000,
	minRadius: 1,
	maxRadius: 15,
	columns: 37,
	rows: 16
};

export default class CalendarPlot {
	/**
	 * @param container container of the calendar
	 * @param config {DEFAULT_CONFIG} see DEFAULT_CONFIG
	 */
	constructor(container, config) {
		// merge config with default
		config = Object.assign({}, DEFAULT_CONFIG, config);

		this.container = container;
		this.margin = config.margin;
		this.svg = null;

		// calculate size of the plot
		let containerDOM = document.getElementById(this.container.substr(1));
		this.size = {width: containerDOM.offsetWidth, height: containerDOM.offsetHeight};

		// scale
		this.x = d3.scaleLinear()
			.domain([0, config.columns])
			.range([this.margin.left, this.size.width - this.margin.right]);

		this.y = d3.scaleLinear()
			.domain([0, config.rows])
			.range([this.margin.top, this.size.height - this.margin.bottom]);

		this.r = d3.scaleLinear()
			.domain([config.minLoad, config.maxLoad])
			.range([config.minRadius, config.maxRadius]);
	}

	/**
	 * init with static constructor, enabling a chain-style call
	 * @param container
	 * @param config
	 * @returns {CalendarPlot}
	 */
	static of(container, config) {
		return new CalendarPlot(container, config);
	}

	data(data) {
		// filter null data
		this.data = data.filter(d => d.load !== null);
		return this;
	}

	draw() {
		this.svg = d3.select(this.container)
			.append("svg")
			.attr("width", this.size.width)
			.attr("height", this.size.height);

		// month & day of week marks
		const months =
			["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const day_of_weeks =
			["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		this.month_marks = this.svg.append("g")
			.attr("fill", "white")
			.selectAll("text")
			.data(months).enter()
			.append("text")
			.attr("x", (d, i) => this.x((i % 6) * 6 + 2) - 10)
			.attr("y", (d, i) => i / 6 >= 1 ? this.y(8) + 20 : this.y(0) + 20)
			.text(d => d);

		this.week_marks = this.svg.append("g")
			.attr("fill", "white")
			.selectAll("text")
			.data(day_of_weeks).enter()
			.append("text")
			.attr("x", this.x(0))
			.attr("y", (d, i) => i >= 7 ? this.y(i + 2) : this.y(i + 1))
			.text(d => d);

		this.g = this.svg.append("g");
		this.update(this.data, true);

		return this;
	}

	update(data, animated) {
		// simplified data, try to locate data with month
		if (data.length !== 0 && !data[0].load) {
			data = this.data.filter(od => {
				for (let nd of data) {
					if (od.month === nd.month) {
						return true;
					}
				}
				return false;
			});
		}

		this.calendar = this.g
			.selectAll("circle")
			.attr("opacity", 1)
			.data(data, d => d.id);

		let enteredModel = this.calendar.enter()
			.append("circle")
			.attr("cx", d => this.x(6 * ((d.month - 1) % 6) + d.week + 1))
			.attr("cy", d => this.y(Math.floor(((d.month - 1) / 6)) * 8 + d.day_of_week))
			.attr("r", 0)
			.attr("fill", d => {
				if (d.type.indexOf('temp') !== -1) {
					if (d.desc[d.type.indexOf('temp')] === 'high temp') {
						return "#fdb02d";
					} else {
						return "#a6e7fd";
					}
				} else if (d.type.indexOf('holiday') !== -1) {
					return "#f5a9b6"
				} else if (d.type.indexOf('event') !== -1) {
					return "#fdfc7f";
				} else if (d.type.indexOf('weekend') !== -1) {
					return "#a1e7a6";
				} else {
					return "#909290";
				}
			});

		let exitModel = this.calendar.exit();

		if (animated) {
			exitModel.transition()
				.delay((d, i) => Math.random() * i / 2)
				.attr("r", 0)
				.remove();

			enteredModel.transition()
				.delay((d, i) => Math.random() * i * 5)
				.attr("r", d => this.r(d.load));
		} else {
			enteredModel.attr("r", d => this.r(d.load));
			exitModel.remove();
		}
	}

	hideMarks() {
		this.month_marks.attr("opacity", 0);
		this.week_marks.attr("opacity", 0);
	}

	showMarks() {
		this.month_marks.attr("opacity", 1);
		this.week_marks.attr("opacity", 1);
	}

	highlight(data) {
		this.calendar.attr("opacity", original_data => {
			for (let highlight_data of data) {
				if (original_data.month === highlight_data.month &&
					original_data.week === highlight_data.week &&
					original_data.day_of_week === highlight_data.day_of_week) {
					return 1;
				}
			}
			return .1;
		});
	}

	reset() {
		this.update(this.data);
	}

	getSvg() {
		return this.svg;
	}

	getCalendar() {
		return this.calendar;
	}

	getXScale() {
		return this.x;
	}

	getYScale() {
		return this.y;
	}
}
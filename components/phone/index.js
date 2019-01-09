import $ from 'jquery';

const html = require("./index.html");

export default function load() {
	$(".mobile-display").append(html);
}
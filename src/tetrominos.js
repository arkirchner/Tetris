import sample from 'lodash/sample';
import { cyan, blue, orange, yellow, green, purple, red } from './tiles';

function Ian() {
  return [[cyan(), cyan({ center: true }), cyan(), cyan()]];
}

function Justin() {
  return [[blue(), null, null], [blue(), blue({ center: true }), blue()]];
}

function Lucy() {
  return [[null, null, orange()], [orange(), orange({ center: true }), orange()]];
}

export function Smasgboy() {
  return [[yellow(), yellow()], [yellow({ center: true }), yellow()]];
}

function RhodeIslandZ() {
  return [[null, green(), green()], [green({ center: true }), green(), null]];
}

function Tina() {
  return [[null, purple(), null], [purple(), purple({ center: true }), purple()]];
}

function Zander() {
  return [[red(), red(), null], [null, red({ center: true }), red()]];
}

export default () => sample([Ian, Justin, Lucy, Smasgboy, RhodeIslandZ, Tina, Zander])();

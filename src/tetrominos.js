import sample from 'lodash/sample';
import { cyan, blue, orange, yellow, green, purple, red } from './tiles';

function Ian() {
  return [[cyan(), cyan(), cyan(), cyan()]];
}

function Justin() {
  return [[blue(), null, null], [blue(), blue(), blue()]];
}

function Lucy() {
  return [[null, null, orange()], [orange(), orange(), orange()]];
}

function Smasgboy() {
  return [[yellow(), yellow()], [yellow(), yellow()]];
}

function RhodeIslandZ() {
  return [[null, green(), green()], [green(), green(), null]];
}

function Tina() {
  return [[null, purple(), null], [purple(), purple(), purple()]];
}

function Zander() {
  return [[red(), red(), null], [null, red(), red()]];
}

export default () => sample([Ian, Justin, Lucy, Smasgboy, RhodeIslandZ, Tina, Zander])();

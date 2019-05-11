const CYAN = 'cyan';
const BLUE = 'blue';
const ORANGE = 'orange';
const YELLOW = 'yellow';
const GREEN = 'green';
const PURPLE = 'purple';
const RED = 'red';

const BASE_TILE = { dropped: false };

export function cyan() {
  return { ...BASE_TILE, color: CYAN };
}

export function blue() {
  return { ...BASE_TILE, color: BLUE };
}

export function orange() {
  return { ...BASE_TILE, color: ORANGE };
}

export function yellow() {
  return { ...BASE_TILE, color: YELLOW };
}

export function green() {
  return { ...BASE_TILE, color: GREEN };
}

export function purple() {
  return { ...BASE_TILE, color: PURPLE };
}

export function red() {
  return { ...BASE_TILE, color: RED };
}

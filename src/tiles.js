const CYAN = 'cyan';
const BLUE = 'blue';
const ORANGE = 'orange';
const YELLOW = 'yellow';
const GREEN = 'green';
const PURPLE = 'purple';
const RED = 'red';

const BASE_TILE = { dropped: false };

export function cyan({ center } = { center: false }) {
  return { ...BASE_TILE, color: CYAN, center };
}

export function blue({ center } = { center: false }) {
  return { ...BASE_TILE, color: BLUE, center };
}

export function orange({ center } = { center: false }) {
  return { ...BASE_TILE, color: ORANGE, center };
}

export function yellow({ center } = { center: false }) {
  return { ...BASE_TILE, color: YELLOW, center };
}

export function green({ center } = { center: false }) {
  return { ...BASE_TILE, color: GREEN, center };
}

export function purple({ center } = { center: false }) {
  return { ...BASE_TILE, color: PURPLE, center };
}

export function red({ center } = { center: false }) {
  return { ...BASE_TILE, color: RED, center };
}

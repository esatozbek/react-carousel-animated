import { BEFORE, CENTER, AFTER } from "../constants/animationConstants";

export function isBeforeSelected(index, selectedIndex) {
    return index < selectedIndex;
}

export function isAfterSelected(index, selectedIndex) {
    return index > selectedIndex;
}

export function getPositionName(index, selectedIndex) {
    if (isBeforeSelected(index, selectedIndex)) {
        return BEFORE;
    } else if (isAfterSelected(index, selectedIndex)) {
        return AFTER;
    }
    return CENTER;
}

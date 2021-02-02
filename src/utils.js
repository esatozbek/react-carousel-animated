export function isBeforeSelected(index, selectedIndex) {
    return index < selectedIndex;
}

export function isAfterSelected(index, selectedIndex) {
    return index > selectedIndex;
}

export function getPosition(index, selectedIndex) {
    if (isBeforeSelected(index, selectedIndex)) {
        return "before";
    } else if (isAfterSelected(index, selectedIndex)) {
        return "after";
    }
    return "neutral";
}

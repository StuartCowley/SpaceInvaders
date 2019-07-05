// Key listener for player movement
export function movePlayer(keyArray, playerOffset, drawPlayer) {
    if (37 in keyArray) {
        playerOffset.deltaX -= 10;
    } else if (39 in keyArray) {
        playerOffset.deltaX += 10;
    }
    drawPlayer();
}
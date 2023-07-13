export function SmoothScrolling(e, time, amout, start) {
  var eAmt = amout / 100;
  var curTime = 0;
  var scrollCouter = 0;
  const y = window.scrollY;
  while (curTime <= time) {
    window.setTimeout(SHS_B, curTime, e, scrollCouter, eAmt, start, y);
    curTime += time / 100;
    scrollCouter++;
  }
  window.scrollTo(0, y);
}
function SHS_B(e, sc, eAmt, start, y) {
  e.scrollLeft = eAmt * sc + start;
}

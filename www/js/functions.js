function log(num) {
  return Math.log(num)
}

function sin(ang) {
  if (rad == true) {
    return Math.sin(ang);
  } else {
    return Math.sin(ang * Math.PI / 180);
  }
}

function cos(ang) {
  if (rad == true) {
    return Math.cos(ang);
  } else {
    return Math.cos(ang * Math.PI / 180);
  }
}

function tan(ang) {
  if (rad == true) {
    return Math.tan(ang);
  } else {
    return Math.tan(ang * Math.PI / 180);
  }
}

function sinin(num) {
  if (rad == true) {
    return Math.asin(num);
  } else {
    return Math.asin(num) * 180 / Math.PI;
  }
}

function cosin(num) {
  if (rad == true) {
    return Math.acos(num);
  } else {
    return Math.acos(num) * 180 / Math.PI;
  }
}

function tanin(num) {
  if (rad == true) {
    return Math.atan(num);
  } else {
    return Math.atan(num) * 180 / Math.PI;
  }
}

function fact(num) {
  num = parseInt(num);
  constant = parseInt(num);
  for (i = 1; i < constant; i++) {
    num *= i;
  }
  if (num < 1) {
    return 1;
  } else {
    return num;
  }
}

function ripple(elem) {
  elem.classList.add('ripple');
  elem.ontouchend = function() {
    setTimeout(function() {
      elem.classList.remove('ripple');
    }, 1000);
  }
}

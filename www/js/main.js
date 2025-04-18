var root = $('#root').html();
var division = $('#division').html();
var pi = document.getElementsByClassName('const')[1].innerHTML;
var rad = false;
var last = [""];
var v = "";
var font = 8;
var clicked = false;
var changed = false;
var b = 0;

$('.screen').on('click keydown', function(e) {
  e.preventDefault();
})

$('button').on('touchstart', function(e) {
  if (this.className.indexOf('eval') == -1) {
    ripple(this);
  }
  if (e.cancelable == true) {
    e.preventDefault();
  }
  if (this.className.indexOf('eval') == -1 && this.id != "change" && this.id != "angle" && this.id != "delete" && this.innerHTML != "") {
    exp = $('.screen').html();
    if (this.className.indexOf('func') != -1 && this.innerHTML != 'P' && this.innerHTML != 'C') {
      if (last != [] && (last[0].className == 'number' || last[0].className == 'const' || last[0].innerHTML == '!')) {
        v = ' x ' + this.innerHTML + "(";
      } else {
        v = this.innerHTML + "(";
      }
      b++;
    } else if (this.innerHTML == '(' && last[0].className != 'operator' || last[0].innerHTML == '!') {
      v = ' x ' + this.innerHTML;
    } else if (this.innerHTML == root) {
      if (last[0].className == 'number' || last[0].className == 'const' || last[0].innerHTML == '!' || last[0].className == 'func') {
        v = ' x ' + this.innerHTML;
      } else {
        v = this.innerHTML;
      }
    } else if (this.className.indexOf('const') != -1) {
      if (last[0] == "" || last[0].className == 'func' || last[0].innerHTML == 'P' || last[0].innerHTML == 'C' || (last[0].className.indexOf('operator') != -1 || last[0].innerHTML == '!')) {
        v = this.innerHTML;
      } else {
        v = ' x ' + this.innerHTML;
      }
    } else {
      v = this.innerHTML;
    }
    if (last[0].className == 'const' && this.id != 'braces') {
      $('.screen').html($('.screen').html() + " x " + v);
    } else {
      $('.screen').html($('.screen').html() + v);
    }
    last.unshift(this);
    v = "";
  }
})

$('#delete').on('touchstart', function() {
  clicked = true;
}).on('touchend', function() {
  if (this.innerHTML == 'C') {
    $('.screen').addClass('ripple3');
    setTimeout(function() {
      $('.screen').removeClass('ripple3');
    }, 800);
    $('.screen').html("");
    this.innerHTML = '&#8592';
    last = [""]
  } else {
    if (last[0].className == 'func') {
      $('.screen').html($('.screen').html().substring(0, $('.screen').html().toString().length - 4));
    } else {
      $('.screen').html($('.screen').html().substring(0, $('.screen').html().toString().length - 1));
    }
    last.shift();
    if (last.length == 0) {
      last = [""];
    }
  }
  clicked = false;
})

setInterval(function() {
  if (clicked == true) {
    $('.screen').addClass('ripple3');
    setTimeout(function() {
      $('.screen').removeClass('ripple3');
    }, 800);
    $('.screen').html("");
    clicked = false;
    last = [""];
  }
}, 2000);

$('#angle').on('touchstart', function() {
  if (this.innerHTML == "DEG") {
    this.innerHTML = "RAD";
    rad = true;
  } else {
    this.innerHTML = "DEG";
    rad = false;
  }
})

$('#change').on('touchstart', function() {
  if (changed == false) {
    document.getElementsByClassName('operator')[0].innerHTML = 'P';
    document.getElementsByClassName('func')[0].innerHTML = 'C';
    document.getElementsByClassName('func')[1].innerHTML = 'sin' + '<sup>-1</sup>';
    document.getElementsByClassName('func')[2].innerHTML = 'cos' + '<sup>-1</sup>';
    document.getElementsByClassName('func')[3].innerHTML = 'tan' + '<sup>-1</sup>';
    changed = true;
  } else {
    document.getElementsByClassName('operator')[0].innerHTML = '!';
    document.getElementsByClassName('func')[0].innerHTML = 'log';
    document.getElementsByClassName('func')[1].innerHTML = 'sin';
    document.getElementsByClassName('func')[2].innerHTML = 'cos';
    document.getElementsByClassName('func')[3].innerHTML = 'tan';
    changed = false;
  }
})

$('.eval').on('touchstart', function() {
  $(this).addClass('ripple2');
  evaluate($('.screen').html())
  $('#delete').html('C');
  setTimeout(function() {
    $('.eval').removeClass('ripple2');
  }, 600);
});

var dark = false;

$('.dark').on('touchstart', function() {
  if (dark == false) {
    this.className = 'dark fa fa-sun-o'
    StatusBar.backgroundColorByHexString('#000000');
    StatusBar.styleLightContent();
    NavigationBar.backgroundColorByHexString('#1A1A1A');
    document.getElementsByTagName('body')[0].style.background = '#000000';
    document.getElementsByClassName('cont')[0].style.background = '#1A1A1A';
    $('button').css('color', 'white');
    dark = true;
  } else {
    this.className = 'dark fa fa-moon-o'
    StatusBar.backgroundColorByHexString('#FFFFFF');
    NavigationBar.backgroundColorByHexString('#F9F9F9', true);
    StatusBar.styleDefault();
    document.getElementsByTagName('body')[0].style.background = 'white';
    document.getElementsByClassName('cont')[0].style.background = '#F9F9F9';
    $('button').css('color', 'black');
    dark = false;
  }
  $('.operator, .func, #braces, .const,#angle,#change,.dark').css('color', '#40deb3');
  $('#delete').css('color', '#ed5565');
  $('.eval').css('color', 'black');
})

function evaluate(exp) {
  if (exp != "") {
    try {
      answer = [];
      signs = [];
      do {
        exp = exp.replace('x', '*').replace(division, '/').replace('%', '/100').replace('e', Math.exp(1)).replace(pi, Math.PI);
        exp = exp.replace('<sup>-1</sup>', 'in');
      } while (exp.indexOf('x') != -1 || exp.indexOf(division) != -1 || exp.indexOf('%') != -1 || exp.indexOf('e') != -1 || exp.indexOf(pi) != -1 || exp.indexOf('<sup>-1</sup>') != -1)
      b1 = (exp.match(/[(]/g) || []);
      b2 = (exp.match(/[)]/g) || []);
      if (b1.length !== b2.length) {
        for (var i = 0; i < (b1.length - b2.length); i++) {
          exp += ")";
        }
      }
      numbers = exp.split(/[+*\/-]/g);
      operators = exp.match(/[+*\/-]/g);
      if (operators == null) {
        operators = [];
      }
      for (var i = 0; i < numbers.length; i++) {
        signs = numbers[i].match(/[!PC\^\u221A]/);
        if (signs != null) {
          numbers[i] = sign_eval(numbers[i]);
        }
      }
      for (var i = 0; i < numbers.length; i++) {
        answer.push(numbers[i]);
        if (operators.length != 0) {
          answer.push(operators[i]);
        }
      }
      answer = answer.join('');
      $('.screen').html(eval(answer));
      if ($('.screen').html().indexOf("999999") != -1 || $('.screen').html().indexOf("000000") != -1) {
        $('.screen').html(Math.round($('.screen').html().replace("=", '') * 10000) / 10000);
      }
      if (eval($('.screen').html()) == undefined) {
        $('.screen').html("");
        alert('Please Enter Proper Expression')
        last = [""];
      }
    } catch (e) {
      alert('Please Enter Proper Expression')
    }
  }
  $('#delete').innerHTML = 'C';
}

function sign_eval(num) {
  if (signs[0] == "!") {
    num = fact(num.replace("!", ""))
  }
  if (signs[0] == "^") {
    num = Math.pow(num.split("^")[0], num.split("^")[1]);
  }
  if (signs[0] == root) {
    num = Math.pow(num.split(root)[1], 1 / 2);

  }
  if (signs[0] == "P") {
    num = fact(num.split('P')[0]) / fact((num.split('P')[0] - num.split('P')[1]));
  }
  if (signs[0] == "C") {
    num = fact(num.split('C')[0]) / (fact((num.split('C')[0] - num.split('C')[1])) * fact(num.split('C')[1]));
  }
  return num;
}

var c = "";

function ripple(elem) {
  if (dark == true) {
    c = 'ripple'
  } else {
    c = 'ripple_dark'
  }
  elem.addClass(c);
  setTimeout(function() {
    elem.removeClass(c);
  }, 600);
}

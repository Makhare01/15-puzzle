"use strict";

// გლობალური ცვლადები
var gamePiece;
var notify;
var timer;
var spaceY;
var spaceX;

window.onload = function () {
  var puzzleArea = document.getElementById("puzzlearea");
  gamePiece = puzzleArea.getElementsByTagName("div"); // სათამაშო დაბიდან ელემენტების ამოღება

  for (var i = 0; i < gamePiece.length; i++) {
    gamePiece[i].className = "puzzlepiece"; // პაზლის ნაწილების კლასის მინიჭება
    gamePiece[i].style.left = (i % 4) * 100 + "px"; // ითვლის პაზლის ელემენტის პოზიციას ეკრანის მარცხენა კუთხიდან
    gamePiece[i].style.top = parseInt(i / 4) * 100 + "px"; // ითვლის პაზლის ელემენტის პოზიციას ეკრანის ზედა კუთხიდან
    gamePiece[i].style.cursor = "pointer";
    gamePiece[i].style.borderRadius = "5px";

    // მაუსის დაჭერის მოვლენის დამატება
    gamePiece[i].onclick = function () {
      if (checkMove(parseInt(this.innerHTML))) {
        // ამოწმებს ელემენტს სეუძლია თუ არა მოზრაობა ანუ აქვს თუ არა რომელიმე ცარიელი კუთხე

        swap(this.innerHTML - 1); // გადაადგილდება ცარიელ სივრცეში

        if (finish()) {
          // ამოწმებს არის თუ არა ყველა ნაწილი თავის ადგილზე

          win(); // თუ ყველა ნაწილი ადგილზეა სრულდება თამაში
        }

        return;
      }
    };
  }

  var shuffle = document.getElementById("shufflebutton"); // ნაწილების არევის ღილაკი

  spaceX = "300px";
  spaceY = "300px";

  // ეს ფუნქცია გამოიძაცება როდესაც არევის ღილაკს დავაჭერთ
  shuffle.onclick = function () {
    for (var i = 0; i < 300; i++) {
      var rand = parseInt(Math.random() * 100) % 4; // აგენერირებს თითოეული ნაწილისათვის შემთხვევიტ რიცხვს

      if (rand == 0) {
        var temp = up(spaceX, spaceY);

        if (temp != -1) {
          swap(temp);
        }
      }

      if (rand == 1) {
        var temp = down(spaceX, spaceY);

        if (temp != -1) {
          swap(temp);
        }
      }

      if (rand == 2) {
        var temp = left(spaceX, spaceY);

        if (temp != -1) {
          swap(temp);
        }
      }

      if (rand == 3) {
        var temp = right(spaceX, spaceY);

        if (temp != -1) {
          swap(temp);
        }
      }
    }
  };
};

// ამოწმებს შეუძლია თუ არა ელემენტს ცარიელ სივრცეში გადასვლა
function checkMove(position) {
  if (left(spaceX, spaceY) == position - 1) {
    return true;
  }

  if (down(spaceX, spaceY) == position - 1) {
    return true;
  }

  if (up(spaceX, spaceY) == position - 1) {
    return true;
  }

  if (right(spaceX, spaceY) == position - 1) {
    return true;
  }
}

function Notify() {
  // გამარჯვების შემთხვევაში მოთამაშეს ატყბინებს ამის შესახებ და იწყებს თამაშს ახლიდან

  notify--;

  if (notify == 0) {
    var body = document.getElementsByTagName("body");

    alert("გაიმარჯვეთ! ... ითამაშეთ ხელალა");

    var para = document.getElementsByClassName("explanation");
    para[0].style.visibility = "visible";

    return;
  }

  timer = setTimeout(Notify, 200);
}

function win() {
  // ატყობინებს მოტამაშეს რომ მან გაიმარჯვა

  var body = document.getElementsByTagName("body");

  notify = 10;

  timer = setTimeout(Notify, 200);

  var para = document.getElementsByClassName("explanation");
  para[0].style.visibility = "hidden";
}

function finish() {
  // ამოწმებს ტამაშმა მიაღწია თუ არა დასასრულს

  var flag = true;

  for (var i = 0; i < gamePiece.length; i++) {
    var top = parseInt(gamePiece[i].style.top);

    var left = parseInt(gamePiece[i].style.left);

    if (left != (i % 4) * 100 || top != parseInt(i / 4) * 100) {
      // ამოწმებს ნაწილები არის თუ არა საკუთად პოზიციებზე

      flag = false;

      break;
    }
  }

  return flag;
}

// ამოწმებს რამდენად მარცხნივ უნდა განთავსდეს ელემენტი (პაზლის ნაწილი)
function left(x, y) {
  var cordX = parseInt(x);

  var cordY = parseInt(y);

  if (cordX > 0) {
    for (var i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.left) + 100 == cordX &&
        parseInt(gamePiece[i].style.top) == cordY
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

// ამოწმებს რამდენად მარჯვნივ უნდა განთავსდეს ელემენტი (პაზლის ნაწილი)
function right(x, y) {
  var cordX = parseInt(x);

  var cordY = parseInt(y);

  if (cordX < 300) {
    for (var i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.left) - 100 == cordX &&
        parseInt(gamePiece[i].style.top) == cordY
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

// ამოწმებს რამდენად ზემოთ უნდა განთავსდეს ელემენტი (პაზლის ნაწილი)
function up(x, y) {
  var cordX = parseInt(x);

  var cordY = parseInt(y);

  if (cordY > 0) {
    for (var i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.top) + 100 == cordY &&
        parseInt(gamePiece[i].style.left) == cordX
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

// ამოწმებს რამდენად ქვემოთ უნდა განთავსდეს ელემენტი (პაზლის ნაწილი)
function down(x, y) {
  var cordX = parseInt(x);

  var cordY = parseInt(y);

  if (cordY < 300) {
    for (var i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.top) - 100 == cordY &&
        parseInt(gamePiece[i].style.left) == cordX
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

function swap(position) {
  // უნაცვლებს ელეენტსა და მასთან მდებარე ცარიელ სივრცეს ადგილებს

  var temp = gamePiece[position].style.top;

  gamePiece[position].style.top = spaceY;

  spaceY = temp;

  temp = gamePiece[position].style.left;

  gamePiece[position].style.left = spaceX;

  spaceX = temp;
}

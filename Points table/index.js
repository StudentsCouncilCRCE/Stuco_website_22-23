var cult_table = document.getElementById("mytable1");
var sports_table_b = document.getElementById("mytable2");
var sports_table_g = document.getElementById("mytable4");
var tech_table = document.getElementById("mytable3");
var input = document.getElementById("myinput");
var cultPoints = [
  { class_name: "SE COMPS A", points: 0 },
  { class_name: "SE COMPS B", points: 0 },
  { class_name: "SE ECS", points: 0 },
  { class_name: "SE AI&DS", points: 0 },
  { class_name: "SE MECH", points: 0 },
  { class_name: "TE COMPS A", points: 0 },
  { class_name: "TE COMPS B", points: 0 },
  { class_name: "TE ECS", points: 0 },
  { class_name: "TE AI&DS", points: 0 },
  { class_name: "TE MECH", points: 0 },
  { class_name: "BE COMPS A", points: 0 },
  { class_name: "BE COMPS B", points: 0 },
  { class_name: "BE ECS", points: 0 },
  { class_name: "BE PROD", points: 0 },
  { class_name: "BE MECH", points: 0 },
];
var sportsPointsB = [
  { class_name: "SE COMPS A", points: 65 },
  { class_name: "SE COMPS B", points: 290 },
  { class_name: "SE ECS", points: 65 },
  { class_name: "SE AI&DS", points: 85 },
  { class_name: "SE MECH", points: 65 },
  { class_name: "TE COMPS A", points: 245 },
  { class_name: "TE COMPS B", points: 65 },
  { class_name: "TE ECS", points: 125 },
  { class_name: "TE AI&DS", points: 155 },
  { class_name: "TE MECH", points: 105 },
  { class_name: "BE COMPS A", points: 65 },
  { class_name: "BE COMPS B", points: 235 },
  { class_name: "BE ECS", points: 135 },
  { class_name: "BE PROD", points: 315 },
  { class_name: "BE MECH", points: 315 },
];
var sportsPointsG = [
  { class_name: "SE COMPS A", points: 55 },
  { class_name: "SE COMPS B", points: 95 },
  { class_name: "SE ECS", points: 5 },
  { class_name: "SE AI&DS", points: 220 },
  { class_name: "SE MECH", points: 35 },
  { class_name: "TE COMPS A", points: 95 },
  { class_name: "TE COMPS B", points: 45 },
  { class_name: "TE ECS", points: 195 },
  { class_name: "TE AI&DS", points: 30 },
  { class_name: "TE MECH", points: 45 },
  { class_name: "BE COMPS A", points: 350 },
  { class_name: "BE COMPS B", points: 135 },
  { class_name: "BE ECS", points: 35 },
  { class_name: "BE PROD", points: 5 },
  { class_name: "BE MECH", points: 45 },
];
var techPoints = [
  { class_name: "SE COMPS A", points: 43 },
  { class_name: "SE COMPS B", points: 31 },
  { class_name: "SE ECS", points: 205 },
  { class_name: "SE AI&DS", points: 23 },
  { class_name: "SE MECH", points: 108 },
  { class_name: "TE COMPS A", points: 89 },
  { class_name: "TE COMPS B", points: 42 },
  { class_name: "TE ECS", points: 183 },
  { class_name: "TE AI&DS", points: 111 },
  { class_name: "TE MECH", points: 104 },
  { class_name: "BE COMPS A", points: 336 },
  { class_name: "BE COMPS B", points: 253 },
  { class_name: "BE ECS", points: 320 },
  { class_name: "BE PROD", points: 17 },
  { class_name: "BE MECH", points: 320 },
];

var caretUpClassName = "fa fa-caret-up";
var caretDownClassName = "fa fa-caret-down";

const sort_by = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

function clearArrow() {
  let carets = document.getElementsByClassName("caret");
  for (let caret of carets) {
    caret.className = "caret";
  }
}

// Arranging classes in descending order according to the points
cultPoints.sort((c1, c2) =>
  c1.points < c2.points ? 1 : c1.points > c2.points ? -1 : 0
);
sportsPointsB.sort((c1, c2) =>
  c1.points < c2.points ? 1 : c1.points > c2.points ? -1 : 0
);
sportsPointsG.sort((c1, c2) =>
  c1.points < c2.points ? 1 : c1.points > c2.points ? -1 : 0
);
techPoints.sort((c1, c2) =>
  c1.points < c2.points ? 1 : c1.points > c2.points ? -1 : 0
);

function toggleArrow(event) {
  let element = event.target;
  let caret, field, reverse;
  if (element.tagName === "SPAN") {
    caret = element.getElementsByClassName("caret")[0];
    field = element.id;
  } else {
    caret = element;
    field = element.parentElement.id;
  }

  let iconClassName = caret.className;
  clearArrow();
  if (iconClassName.includes(caretUpClassName)) {
    caret.className = `caret ${caretDownClassName}`;
    reverse = false;
  } else {
    reverse = true;
    caret.className = `caret ${caretUpClassName}`;
  }

  cultPoints.sort(sort_by(field, reverse));
  sportsPointsB.sort(sort_by(field, reverse));
  sportsPointsG.sort(sort_by(field, reverse));
  techPoints.sort(sort_by(field, reverse));
  populateTableC();
  populateTableSB();
  populateTableSG();
  populateTableT();
}

// Cultural Points
function populateTableC() {
  cult_table.innerHTML = "";

  var i = 1;
  //   for (let data of position) {
  //     let row = table.insertRow(-1);

  //     let no = row.insertCell(0);
  //     no.innerHTML = data.no;
  //   }

  for (let data of cultPoints) {
    let row = cult_table.insertRow(-1);

    let no = row.insertCell(0);
    no.innerHTML = i;
    i += 1;

    let class_name = row.insertCell(1);
    class_name.innerHTML = data.class_name;

    let points = row.insertCell(2);
    points.innerHTML = data.points;
  }

  filterTableC();
}

// Sports Points
function populateTableSB() {
  sports_table_b.innerHTML = "";

  var i = 1;

  for (let data of sportsPointsB) {
    let row = sports_table_b.insertRow(-1);

    let no = row.insertCell(0);
    no.innerHTML = i;
    i += 1;

    let class_name = row.insertCell(1);
    class_name.innerHTML = data.class_name;

    let points = row.insertCell(2);
    points.innerHTML = data.points;
  }

  filterTableSB();
}

function populateTableSG() {
  sports_table_g.innerHTML = "";

  var i = 1;

  for (let data of sportsPointsG) {
    let row = sports_table_g.insertRow(-1);

    let no = row.insertCell(0);
    no.innerHTML = i;
    i += 1;

    let class_name = row.insertCell(1);
    class_name.innerHTML = data.class_name;

    let points = row.insertCell(2);
    points.innerHTML = data.points;
  }

  filterTableSG();
}

// Technical Points
function populateTableT() {
  tech_table.innerHTML = "";

  var i = 1;

  for (let data of techPoints) {
    let row = tech_table.insertRow(-1);

    let no = row.insertCell(0);
    no.innerHTML = i;
    i += 1;

    let class_name = row.insertCell(1);
    class_name.innerHTML = data.class_name;

    let points = row.insertCell(2);
    points.innerHTML = data.points;
  }

  filterTableT();
}

function filterTableC() {
  let filter = input.value.toUpperCase();
  rows = cult_table.getElementsByTagName("TR");

  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = "yellow";
        } else {
          cell.style.backgroundColor = "";
        }

        flag = true;
      } else {
        cell.style.backgroundColor = "";
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}

function filterTableSB() {
  let filter = input.value.toUpperCase();
  rows = sports_table_b.getElementsByTagName("TR");

  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = "yellow";
        } else {
          cell.style.backgroundColor = "";
        }

        flag = true;
      } else {
        cell.style.backgroundColor = "";
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}

function filterTableSG() {
  let filter = input.value.toUpperCase();
  rows = sports_table_g.getElementsByTagName("TR");

  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = "yellow";
        } else {
          cell.style.backgroundColor = "";
        }

        flag = true;
      } else {
        cell.style.backgroundColor = "";
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}

function filterTableT() {
  let filter = input.value.toUpperCase();
  rows = tech_table.getElementsByTagName("TR");

  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = "yellow";
        } else {
          cell.style.backgroundColor = "";
        }

        flag = true;
      } else {
        cell.style.backgroundColor = "";
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}

populateTableC();
populateTableSB();
populateTableSG();
populateTableT();

let tableColumns = document.getElementsByClassName("table-column");

for (let column of tableColumns) {
  column.addEventListener("click", function (event) {
    toggleArrow(event);
  });
}

input.addEventListener("keyup", function (event) {
  filterTableC();
  filterTableSB();
  filterTableSG();
  filterTableT();
});

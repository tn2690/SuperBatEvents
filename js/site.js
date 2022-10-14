// initial dataset for super bat
// array of objects
// const events = [
//   {
//     // event
//     // city
//     // state
//     // attendance
//     // date
//     event: "ComicCon",
//     city: "New York",
//     state: "NY",
//     attendance: 10000,
//     date: "06-01-2017",
//   },
//   {
//     event: "SDCC",
//     city: "San Diego",
//     state: "CA",
//     attendance: 5000,
//     date: "07-24-2018",
//   },
//   {
//     event: "ComicCon",
//     city: "New York",
//     state: "NY",
//     attendance: 9950,
//     date: "08-19-2019",
//   },
//   {
//     event: "SDCC",
//     city: "San Diego",
//     state: "CA",
//     attendance: 4500,
//     date: "01-20-2020",
//   },
//   {
//     event: "HeroesCon",
//     city: "Charlotte",
//     state: "NC",
//     attendance: 40000,
//     date: "06/01/2017",
//   },
//   {
//     event: "HeroesCon",
//     city: "Charlotte",
//     state: "NC",
//     attendance: 45000,
//     date: "06/01/2018",
//   },
// ];

const events = [
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

// builds list of specific cities
function buildDropDown() {
  let eventDD = document.getElementById("eventDropDown");
  eventDD.innerHTML = "";

  // grab template from template tag
  const template = document.getElementById("cityDD-template");

  let currentEvents = events;

  // filter array by distinct cities
  // ["new york", "san diego", "charlotte"];
  // map - map to one property
  let citiesOnly = currentEvents.map((event) => event.city);

  // distinct set
  let distinctEvents = [...new Set(citiesOnly)];

  // <ul class="dropdown-menu"></ul>
  let dropdownul = document.createElement("ul");
  dropdownul.classList.add("dropdown-menu");

  // add all item
  let ddlItemNodeAll = document.importNode(template.content, true);
  let cityName = "All";

  // returns <li><a class="dropdown-item" onclick="getEvents(this)" data-string="New York">New York</a></li>
  let ddItemAll = ddlItemNodeAll.querySelector("a");
  ddItemAll.textContent = cityName;
  ddItemAll.setAttribute("data-string", cityName);

  // add the item to the ul
  dropdownul.appendChild(ddlItemNodeAll);

  // loop the length of number of distinct events (cities)
  for (let i = 0; i < distinctEvents.length; i++) {
    // gets <li><a class="dropdown-item" onclick="getEvents()"></a></li> from the template
    let ddlItemNode = document.importNode(template.content, true);
    let cityName = distinctEvents[i];

    // returns <li><a class="dropdown-item" onclick="getEvents(this)" data-string="New York">New York</a></li>
    let ddItem = ddlItemNode.querySelector("a");
    ddItem.textContent = cityName;
    ddItem.setAttribute("data-string", cityName);

    // add the item to the ul
    dropdownul.appendChild(ddlItemNode);

    // <ul>
    // <li><a></a></li>
    // </ul>
    // 3x
  }

  eventDD.appendChild(dropdownul);
  displayStats(currentEvents);
}

function getEvents(element) {
  let city = element.getAttribute("data-string");

  let currentEvents = events;

  let statsHeader = document.getElementById("statsHeader");

  statsHeader.innerHTML = `Stats For ${city} Events`;

  // display stats for all or the selected city
  let filteredEvents = currentEvents;

  if (city != "All") {
    // filter the array by cityname
    filteredEvents = currentEvents.filter(function (item) {
      if (item.city == city) {
        return item;
      }
    });
  }

  // call function w/ list of events
  displayStats(filteredEvents);
}

function displayStats(events) {
  let total = 0;
  let average = 0;
  let most = 0;
  let least = -1;

  total = totalAttendance(events);
  document.getElementById("total").innerHTML = total.toLocaleString();

  average = averageAttendance(events, total);
  document.getElementById("average").innerHTML = average.toLocaleString(
    "en-us",
    { minimumFractionDigits: 0, maximumFractionDigits: 0 }
  );

  most = mostAttendance(events);
  document.getElementById("most").innerHTML = most.toLocaleString();

  least = leastAttendance(events);
  document.getElementById("least").innerHTML = least.toLocaleString();
}

function totalAttendance(events) {
  let totalAttendance = 0;

  for (let i = 0; i < events.length; i++) {
    totalAttendance += events[i].attendance;
  }
  return totalAttendance;
}

function averageAttendance(events, total) {
  let avgAttendance = 0;

  // divide by number of total events
  avgAttendance = total / events.length;

  return avgAttendance;
}

function mostAttendance(events) {
  let maxAttendance = 0;

  // find max attendance
  for (let i = 0; i < events.length; i++) {
    let curAttendance = events[i].attendance;

    if (maxAttendance < curAttendance) {
      maxAttendance = curAttendance;
    }
  }
  return maxAttendance;
}

function leastAttendance(events) {
  let minAttendance = -1;

  // find min attendance
  for (let i = 0; i < events.length; i++) {
    let curAttendance = events[i].attendance;

    if (minAttendance > curAttendance || minAttendance < 0) {
      minAttendance = curAttendance;
    }
  }
  return minAttendance;
}

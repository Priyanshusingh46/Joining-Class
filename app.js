const _date = document.querySelector(".date");
const _time = document.querySelector(".time");
const _btn = document.querySelector(".btn");
const classCode = document.querySelector(".class-code");
const className = document.querySelector(".class-name");
const facultyName = document.querySelector(".faculty-name");
const classLink = document.querySelector(".class-link");

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const Months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const meetLinks = [
	"",
	"ovx-tpwn-nwo",
	"aua-yqww-jvz",
	"xyt-vxvq-njb",
	"bzy-nesy-gje",
	"zuw-gedr-njq",
	"pqe-agsq-fkx",
	"mwf-mjae-qxz",
];
const timeTable = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[4, 2, 3, 5, 0, 1, 1, 0],
	[2, 3, 5, 1, 0, 4, 3, 0],
	[3, 5, 4, 1, 0, 2, 6, 0],
	[5, 1, 4, 2, 0, 3, 7, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];
const classNames = [
	"No Class Right Now",
	"DBMS",
	"DAA",
	"OS",
	"CN",
	"OOP",
	"CN Lab",
	"OOP Lab",
];
const facultyNames = [
	"",
	"Himani Joshi",
	"Dr. ShivDutt Sharma",
	"Sahil",
	"Ambigavathi Munusamy",
	"Minakshi Shastri",
	"Ambigavathi Munusamy",
	"Minakshi Shastri",
];

const showNotificaiton = (b) => {
	const notification = new Notification(`Join ${b.clsName} class`, {
		body: `Click to join ${b.clsName} by ${b.facName}`,
		icon: "https://akshatmittal61.github.io/join-class/favicon.png",
	});
	notification.onclick = (e) => {
		window.location.href = b.link;
	};
};

const setTime = () => {
	const currDate = new Date();
	_date.innerHTML = `${days[currDate.getDay()]}, ${currDate.getDate()} ${
		Months[currDate.getMonth()]
	}`;
	_time.innerHTML = Date().slice(16, 24);
	let i = +currDate.getDay(),
		j = 0;
	if (currDate.getHours() >= 9 && currDate.getHours() <= 16)
		j = currDate.getHours() - 9;
	else j = 7;

	className.innerHTML = classNames[timeTable[i][j]];
	facultyName.innerHTML = facultyNames[timeTable[i][j]];
	
	if (timeTable[i][j] != 0) {
		setInterval(() => {
			window.location.href = `https://meet.google.com/${
				meetLinks[timeTable[i][j]]
			}`;
		}, 3000);
		classCode.innerHTML = `CSC40${timeTable[i][j]}`;
		_btn.innerHTML = "Join Class";
		classLink.setAttribute(
			"href",
			`https://meet.google.com/${meetLinks[timeTable[i][j]]}`
		);

		if (Notification.permission === "granted") {
			showNotificaiton({
				subCode: `CSC40${timeTable[i][j]}`,
				link: `https://meet.google.com/${meetLinks[timeTable[i][j]]}`,
				clsName: classNames[timeTable[i][j]],
				facName: facultyNames[timeTable[i][j]],
			});
		} else if (Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (Notification.permission === "granted") {
					showNotificaiton({
						subCode: `CSC40${timeTable[i][j]}`,
						link: `https://meet.google.com/${
							meetLinks[timeTable[i][j]]
						}`,
						clsName: classNames[timeTable[i][j]],
						facName: facultyNames[timeTable[i][j]],
					});
				}
			});
		}
	} else {
		if (currDate.getHours() == 16 && i >= 0 && i <= 3) {
			className.innerHTML = "Join Practicum Class";
			_btn.innerHTML = "Join Practicum Class";
			classLink.setAttribute("href", "https://classroom.google.com/");

			if (Notification.permission === "granted") {
				showNotificaiton({
					subCode: "CSL406",
					link: "https://classroom.google.com/",
					clsName: "Practicum",
					facName: "your practicum faculty",
				});
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission().then((permission) => {
					if (Notification.permission === "granted") {
						showNotificaiton({
							subCode: "CSL406",
							link: "https://classroom.google.com/",
							clsName: "Practicum",
							facName: "your practicum faculty",
						});
					}
				});
			}
		} else {
			_btn.innerHTML = "No Class Right Now";
			classLink.setAttribute("href", "./timetable.png");
		}
	}
};

setTime();
setInterval(setTime, 1000);

// TO DO
// Close the circle timer

// JavaScript helper functions

var numCaptions = 0;

function get(thing_to_get) {
	return document.getElementById(thing_to_get);
}

function create(thing_to_create) {
	return document.createElement(thing_to_create);
}

// Graphics-related functions
function fadeIn(thing_to_fade_in) {
	thing_to_fade_in.style.opacity = "1";
}

function fadeOut(thing_to_fade_out) {
	get(thing_to_fade_out).style.opacity = "1";
	window.setInterval(function(){fadeOutSteps(thing_to_fade_out);}, 1);
	alert();
}

function fadeOutSteps(thing_to_fade_out) {
	var start_opacity = parseFloat(get(thing_to_fade_out).style.opacity);
	alert(start_opacity);
	var end_opacity = start_opacity - 0.01;
	get(thing_to_fade_out).style.opacity = end_opacity;

}

// Initial setup
window.onload = function(){
	loadPhysicalScreen();
	loadScreen();
	loadHomeScreen();
	loadTopBar("light");
	showCaptions();
	loadHomeButton();
}

function loadPhysicalScreen() {
	var physicalScreen = create("div");
	physicalScreen.id = "physical_screen";
	get("phone").appendChild(physicalScreen);
}

function loadScreen() {
	var screen = create("div");
	screen.id = "screen";
	get("physical_screen").appendChild(screen);
}

// THIS SHOULD BE BUILT INTO HTML. NOT CSS.
function loadHomeButton(){
	homeButton = create("div");
	homeButton.id = "home_button";
	homeButton.onclick = goHome;
	get("phone").appendChild(homeButton);
}

function goHome() {
	closeYouTube();
	loadHomeScreen();
}

function loadHomeScreen() {
	
	// Do not open up the home screen if the home screen is already open
	if (!document.contains(get("home_screen"))) {
		// Screen size constants
		var WIDTH = 640;
		var HEIGHT = 1136;
	
		// Add the home screen to the screen
		var homeScreen = create("div");
		homeScreen.id = "home_screen";
		get("screen").appendChild(homeScreen);
		
		for (var c = 0; c < 25; c++) {
			// Create background circle
			var circle = create("div");
			circle.className = "circle";
			
			// Set the sizes of the circles (between 100 and 150)
			var circle_size = Math.floor(100 + Math.random() * 50) + "px";
			circle.style.width = circle_size;
			circle.style.height = circle_size;
			
			// Prepare the color of the circle
			var circle_color = Math.floor(128 + Math.random() * 128);
			circle.style.backgroundColor = "rgb("+circle_color+", "+circle_color+", "+circle_color+")";
			
			// Prepare the position of the circle
			circle.style.top = Math.floor(Math.random() * HEIGHT - 50) + "px";
			circle.style.left = Math.floor(Math.random() * WIDTH - 50) + "px";
			
			// Place the circle
			circle.id = "circle" + "_" + c;
			homeScreen.appendChild(circle);
		}
		circleTimer = window.setInterval(function(){moveBackgroundCircles();}, 50);
		
		var dock = create("div");
		dock.id = "dock";
		homeScreen.appendChild(dock);
		
		for (var i = 0; i < 6; i++) {
			
				// Columns of application icons on the home screen
				for (var j = 0; j < 4; j++) {
					
					// Skip the fifth row and the last two icons of the fourth row
					if (i != 4 && !(i == 3 && j > 1)) {
						var application_icon = create("div");
						application_icon.className = "application_icon";
						application_icon.id = i + "_" + j;
						
						// Generate and set the color for the application icon on the home screen
						var r = Math.floor(80 + Math.random() * 160); 
						var g = Math.floor(80 + Math.random() * 160);
						var b = Math.floor(80 + Math.random() * 160);
						application_icon.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
						if (application_icon.id == "2_2") {
							application_icon.classList.add('youtube_icon');
							application_icon.onclick = loadYouTube;
						}
						
						// Position the application icon in the appropriate place in the grid
						application_icon.style.top = (50 + i * 185) + "px";
						application_icon.style.left = (30 + j * 150) + "px";
						homeScreen.appendChild(application_icon);
						
						// Generate random names for the applications
						var application_name = String.fromCharCode(65 + Math.floor(Math.random() * 26));
						var application_name_length = Math.floor(3 + Math.random() * 4)
						for (var x = 0; x < application_name_length; x++) {
							application_name += String.fromCharCode(97 + Math.floor(Math.random() * 26));
						}
						
						// Add labels for each application icon
						var application_label = create("div");
						application_label.className = "application_label";
						application_label.innerHTML = application_name;
						application_label.id = i + "_" + j + "l";
						if (application_label.id == "2_2l") {
							application_label.innerHTML = "YouTube";
						}
						application_label.style.top = (180 + i * 185) + "px";
						application_label.style.left = (30 + j * 150) + "px";
						homeScreen.appendChild(application_label);
					}
				}
			
		}
	}
};

// Move the new circles down the screen
function moveBackgroundCircles() {
	for (var i = 0; i < 25; i++) {
		var current_circle = get("circle_" + i);
		
		// Only move the circle if the circle exists
		if (document.contains(current_circle)) {
			// Move the circle down the screen
			current_circle.style.top = parseInt(get("circle_" + i).style.top) + 1 + "px";
	
			// Once the circle falls off the screen, add it back to the top of the screen (it will start of the screen then scroll down into the screen)
			if (parseInt(current_circle.style.top) >= 1136) {
				current_circle.style.top = "-" + parseInt(current_circle.style.width) + "px";
			}
		}
	}
}

function closeHomeScreen() {
	var homeScreen = get("home_screen");
	get("screen").removeChild(homeScreen);
}

function loadTopBar(color) {
	var screen = get("screen");

	var top_bar = create("div");
	top_bar.id = "top_bar_" + color;
	
	var top_carrier = create("div");
	top_carrier.id = "top_carrier";
	top_carrier.innerHTML = "Verizon";
	top_bar.appendChild(top_carrier);
	
	var top_time = create("div");
	top_time.id = "top_time";
	top_bar.appendChild(top_time);
	updateTopTimeTimer();
	
	var current_battery = 100;
	var top_battery = create("div");
	top_battery.id = "top_battery";
	top_battery.innerHTML = current_battery + "%";
	top_bar.appendChild(top_battery);
	batteryDrain();
	
	screen.appendChild(top_bar);
}

function updateTopTimeTimer() {
	window.setInterval(function(){updateTopTimeStep();}, 1);
}

function updateTopTimeStep() {
	var current_datetime = new Date();
	var current_24_hours = current_datetime.getHours();
	var current_12_hours = current_24_hours;
	if (current_24_hours > 12) {
		current_12_hours -= 12;
	}
	var current_minutes = current_datetime.getMinutes();
	if (current_minutes < 10) {
		current_minutes = "0" + current_minutes;
	}
	var current_time = current_12_hours + ":" + current_minutes + " ";
	if (current_24_hours < 12) {
		current_time += "AM";
	} else {
		current_time += "PM";
	}
	var top_time = get("top_time");
	top_time.innerHTML = current_time;
}

// Switch to the other color of the top bar. If top bar is white, make it black. If top bar is black, make it white.
function toggleTopBar() {
	if (document.contains(get("top_bar_light"))) {
		get("top_bar_light").id = "top_bar_dark";
	} else {
		get("top_bar_dark").id = "top_bar_light";
	}
}

function loadYouTube() {
	closeHomeScreen();
	toggleTopBar();
	var youtube_app = create("div");
	youtube_app.id = "youtube_app";
	
	var youtube_search_section = create("div");
	youtube_search_section.id = "youtube_search_section";
	youtube_search_section.innerHTML = "Search";
	youtube_app.appendChild(youtube_search_section);
	
	var youtube_video = create("div");
	youtube_video.id = "youtube_video";
	youtube_app.appendChild(youtube_video);
	
	var youtube_video_description = create("div");
	youtube_video_description.id = "youtube_video_description";
	youtube_app.appendChild(youtube_video_description);
	
	var youtube_video_title = create("div");
	youtube_video_title.id = "youtube_video_title";
	youtube_video_title.innerHTML = "Final Fantasy XV Gameplay Video";
	youtube_video_description.appendChild(youtube_video_title);
	
	var youtube_video_channel = create("div");
	youtube_video_channel.id = "youtube_video_channel";
	youtube_app.appendChild(youtube_video_channel);
	
	var youtube_video_channel_name = create("div");
	youtube_video_channel_name.id = "youtube_video_channel_name";
	youtube_video_channel_name.innerHTML = "squareenix<br />163,234 subscribers";
	youtube_video_channel.appendChild(youtube_video_channel_name);
	
	get("screen").appendChild(youtube_app);
}

function batteryDrain() {
	window.setInterval(function(){batteryDrainStep();}, 60000);
}

function batteryDrainStep() {
	var current_battery = parseInt(get("top_battery").innerHTML);
	current_battery --;
	get("top_battery").innerHTML = current_battery + "%";
	if (current_battery <= 0) {
		shutDownPhone();
	}
}

function shutDownPhone() {
	get("phone").removeChild(get("screen"));
	var blank = create("div");
	blank.id = "blank";
	get("phone").appendChild(blank);
}

function closeYouTube() {
	if(document.contains(get("youtube_app"))) {
		get("screen").removeChild(get("youtube_app"));
	}
}

function showCaptions() {
	var screen = get("screen");
	for (var caption_line_counter = 0; caption_line_counter < 1; caption_line_counter++) {
		var caption_line = create("div");
		caption_line.className = "caption_line";
		caption_line.style.top = 800 + (60 * caption_line_counter) + "px";
		screen.appendChild(caption_line);
		window.setInterval(function(){popCaptionWords(caption_line);}, 500);
	}
}

function popCaptionWords(caption_line) {
	if (numCaptions >= 8) {
		caption_line.innerHTML = "";
		numCaptions = 0;
	}
	var caption_word = create("div");
	caption_word.className = "caption_word";
	var possible_caption_words = new Array("innovative", "run", "think", "play", "controller", "Vanille", "Cloud", "Vaan", "Ashe", "the", "a", "is", "will", "provides", "rather", "some", "gameplay", "action", "movement");
	caption_word.innerHTML = possible_caption_words[Math.floor(Math.random() * possible_caption_words.length)];
	caption_line.appendChild(caption_word);
	numCaptions++;
}
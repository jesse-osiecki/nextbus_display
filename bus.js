function get_(url, func){
    var http;
    try {
        http = new XMLHttpRequest(); 
    } catch (e) {
        try {
            http = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (e) {
            try {
                http = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser broke!"); return false; 
            } 
        } 
    }

    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if(http.readyState == 4) {
            func(http); 
        }
        else{
            console.log("Not Ready");
        }
    }
    http.send(null);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML ="<h2>"+ h + ":" + m + ":" + s + "</h2>";
    t = setTimeout(function () {
        startTime()
    }, 500);
}

function showResponse(h) { 
    var jsonObj = JSON.parse(h.responseText);

    //clear it
    document.getElementById('bus_stuff').innerHTML = "";
    //
    var header1 = document.createElement('h1');
    var header2 = document.createElement('h2');
    var header1_text = document.createTextNode(jsonObj[0].route.title);
    var header2_text = document.createTextNode(jsonObj[0].stop.title);
    header1.appendChild(header1_text);
    header2.appendChild(header2_text);
    document.getElementById('bus_stuff').appendChild(header1);
    document.getElementById('bus_stuff').appendChild(header2);

    for(var i = 0; i < jsonObj[0].values.length; i++){
        var direction = document.createElement("div");
        direction.setAttribute('class', 'col-md-3');
        var direction_text = document.createTextNode("Direction: " + jsonObj[0].values[i].direction.title );
        direction.appendChild(direction_text);
        document.getElementById('bus_stuff').appendChild(direction);

        var minutes = document.createElement("div");
        minutes.setAttribute('class', 'col-md-3');
        var minutes_text = document.createTextNode("Minutes: " + jsonObj[0].values[i].minutes);
        minutes.appendChild(minutes_text);
        document.getElementById('bus_stuff').appendChild(minutes);


        var seconds = document.createElement("div");
        seconds.setAttribute('class', 'col-md-3');
        var seconds_text = document.createTextNode("Seconds: " + jsonObj[0].values[i].seconds);
        seconds.appendChild(seconds_text);
        document.getElementById('bus_stuff').appendChild(seconds);

        var busid = document.createElement("div");
        busid.setAttribute('class', 'col-md-3');
        var busid_text = document.createTextNode("BusID: " + jsonObj[0].values[i].vehicle.id );
        busid.appendChild(busid_text);
        document.getElementById('bus_stuff').appendChild(busid);

        console.log(jsonObj[0].values[i]);
        console.log("Sent Request");

    }
}

bust = setInterval(function () {
    get_("http://restbus.info/api/agencies/chapel-hill/routes/J/stops/jonebarn/predictions", showResponse);
}, 1000);
startTime();

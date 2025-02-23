// Program grabbs info from the webpage found at .get to grab info of the currently listenign music
username="dew_ey"; // store the username for my account
//https://cors-anywhere.herokuapp.com add to .get when running locally
//updated to https should still work
$.get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=b351dcf032e939ce77409e20f9ed86c5&format=json", function( data ){
        artist=data.recenttracks.track[0].artist["#text"]; // gets the artist in spot 0 
        //alert(artist);
        
        track=data.recenttracks.track[0].name; // gets the info in spot 0 which is most recent grabs name
        //alert(track);
        
        album=data.recenttracks.track[0].album["#text"];  // gets track album text
        //alert(album)
        
        cover=data.recenttracks.track[0].image[1]["#text"]; // gets track image
        // if grabbing above so below 
        document.getElementById("acover").setAttribute("src",cover); //sets the "src feild to have the cover link inside of it, tie to id acover"
        document.getElementById("trkInfo").innerHTML = "<strong>" + track + "</strong><br>" + artist + "<br>" + album;  // assembles what will be placed via using innerhtml
});
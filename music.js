// Put your Last.fm API key here
var api_key = "8a3c137e6e93b37a04fcf3678b649b3c";

function sendRequest() {
	var xhr = new XMLHttpRequest();
	var method = "artist.getinfo";
	var artist = encodeURI(document.getElementById("form-input").value);
	xhr.open("GET", "proxy.php?method=" + method + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var artistInfoJsonData = JSON.parse(this.responseText);
			document.getElementById("output").style.display = "block";
			document.getElementById("intro").style.display = "none";
			artistName = '<a href="' + artistInfoJsonData.artist.url + '">Biography</a>'
			document.getElementById("artistLink").innerHTML = artistName;
			document.getElementById("artistName").innerHTML = artistInfoJsonData.artist.name;
			document.getElementById("artistPicture").src = artistInfoJsonData.artist.image[artistInfoJsonData.artist.image.length - 2]["#text"];
			document.getElementById("longBio").innerHTML = artistInfoJsonData.artist.bio.content;
		}
	};
	xhr.send(null);

	var xhr2 = new XMLHttpRequest();
	var method2 = "artist.gettopalbums";
	xhr2.open("GET", "proxy.php?method=" + method2 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
	xhr2.setRequestHeader("Accept", "application/json");
	xhr2.onreadystatechange = function () {
		if (this.readyState == 4) {
			var albumJsonData = JSON.parse(this.responseText);
			var topAlbumList = ""
			for (albumList = 0; albumList < albumJsonData.topalbums.album.length; albumList++) {
				topAlbumList += '<a href="' + albumJsonData.topalbums.album[albumList].url + '"<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 album-list-item"><img class="album-photo-item rounded" src="' +
					albumJsonData.topalbums.album[albumList].image[albumJsonData.topalbums.album[albumList].image.length - 2]["#text"] +
					'" alt=""><p class="album-title-item text-center">' + albumJsonData.topalbums.album[albumList].name +
					'</p></div></a>'
				document.getElementById("albumListItems").innerHTML = topAlbumList;
			}
		}
	};
	xhr2.send(null);

	var xhr3 = new XMLHttpRequest();
	var method3 = "artist.getsimilar";
	xhr3.open("GET", "proxy.php?method=" + method3 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
	xhr3.setRequestHeader("Accept", "application/json");
	xhr3.onreadystatechange = function () {
		if (this.readyState == 4) {
			var similarArtistJsonData = JSON.parse(this.responseText);
			var similarArtistList = "";
			for (i = 0; i < similarArtistJsonData.similarartists.artist.length; i++) {
				similarArtistList += "<a href='" + similarArtistJsonData.similarartists.artist[i].url + "'<li class='col-md-3 col-sm-4 col-xs-2'>" + similarArtistJsonData.similarartists.artist[i].name + "</li></a>";
			}
			document.getElementsByClassName("similar-artist-list")[0].innerHTML = similarArtistList
		}
	};
	xhr3.send(null);
}

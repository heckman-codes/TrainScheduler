var firebaseConfig = {
    apiKey: "AIzaSyAXkWEBNi7u3qPROqVWv3qU92-EB7eXTB4",
    authDomain: "train-scheduler-e5a44.firebaseapp.com",
    databaseURL: "https://train-scheduler-e5a44.firebaseio.com",
    projectId: "train-scheduler-e5a44",
    storageBucket: "train-scheduler-e5a44.appspot.com",
    messagingSenderId: "190245121029",
    appId: "1:190245121029:web:eccd5509c330e2b375406c"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var name = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var frequency = $("#train-frequency").val().trim();
    var nextArrival = $("#train-time").val().trim();
    var timeFormat = "hh:mm A";


    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        arrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().orderByChild("dateAdded").on("child_added", function (response) {

    $("#train-name").val('')
    $("#train-destination").val('')
    $("#train-frequency").val('')
    $("#train-time").val('')

    var tr = $("<tr>")

    $("tbody").append(tr)

    $(tr).append("<td>" + response.val().name + "</td>");
    $(tr).append("<td>" + response.val().destination + "</td>");
    $(tr).append("<td>" + response.val().frequency + "</td>");
    $(tr).append("<td>" + response.val().arrival + "</td>");
    //Need to actually convert frequency to next arrival time.
    $(tr).append("<td>" + moment([response.val().arrival], "hh:mm A").toNow() + "</td>");

    // console.log(moment(response.val().arrival).format("HH:mm a" || "HH:mm A"));

});

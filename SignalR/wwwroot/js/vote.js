"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/votehube").build();

$("#vote").disabled = true;

connection.start().then(function () {
    document.getElementById("vote").disabled = false;
    $(".panel-footer > button").attr("disabled", true);

    $($("input[type='radio']")).click(function () {
        $(".panel-footer > button").attr("disabled", false);
        $(".btn").click(function () {
            $(".progress").removeClass("d-none");
            $(".radio > label > input").attr("disabled", true);
            $(".panel-footer > button").attr("disabled", true);
        });
    });
}).catch(function (err) {
    return console.error(err.toString());
});
document.getElementById("vote").addEventListener("click", function (event) {
    var message = $("input[type='radio']:checked").val();
    connection.invoke("SendVote", message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.on("ReciveVote", function (votes) {
    let allVotes = 0;
    let currentPerc = 0;
    $(votes).each(function (index, element) {
        allVotes += element.value;
    });
    $(votes).each(function (index, element) {
        currentPerc = Math.round(((element.value / allVotes) * 100), 2)
    $(`#${element.key}`).attr("aria-valuenow", currentPerc).css("width", `${currentPerc}%`).text(`${currentPerc}%`)});
});



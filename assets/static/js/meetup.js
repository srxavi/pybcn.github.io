//XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    var http = location.protocol;
    var slashes = http.concat("//");
    var host = slashes.concat(window.location.hostname);
    xmlHttp.open("GET", theUrl, true); // false for synchronous request
    xmlHttp.send(null);
    if (xmlHttp.status == 301 || xmlHttp.status == 302) {
        newUrl = xmlHttp.getResponseHeader("Location");
        return httpGet(newUrl, callback);
    }
    return xmlHttp.responseText;
}

function timeTag(timestamp) {
    date = new Date(timestamp);
    time = "<time datetime=\"" + date.toISOString() + "\">";
    time += date.getFullYear() + "-" + (date.getMonth() + 1) + "-";
    time += date.getDate() + "</time>";
    return time;
}

function eventLink(event) {
    return "<a href=\"" + event.link + "\">" + event.name + "</a>";
}

function buildUrl() {
    return baseUrl + status;
}

function processEvents(events, node, status) {
    content = "";
    if ( events.length > 0 ) {
        content = "";
        events.slice(-5).reverse().forEach(function (event) {
            content += "<li>" + timeTag(event.time) + " ";
            content += eventLink(event) + "</li>\n";
        });
    } else {
        content = "<li>There are no " + status + " events scheduled... Stay tuned!</li>";
    }
    node.innerHTML = content;
}

function updateUpcoming() {
    baseUrl = "https://api.meetup.com/python-barcelona/events?status=upcoming";
    jsonp(baseUrl, function (events) {
        var status = "upcoming";
        var node = document.getElementById(status);
        processEvents(events.data, node, status);
    });
}

function updatePast() {
    baseUrl = "https://api.meetup.com/python-barcelona/events?status=past";
    jsonp(baseUrl,function (events) {
        var status = "past";
        var node = document.getElementById(status);
        processEvents(events.data, node, status);
    });
}


(function($){
    $(document).ready(function(){
            
        // Fixed header
        //-----------------------------------------------
        $(window).scroll(function() {
            if (($(".header.fixed").length > 0)) { 
                if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            };
        });

        $(window).load(function() {
            if (($(".header.fixed").length > 0)) { 
                if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            };
        });

    }); // End document ready
})(this.jQuery);

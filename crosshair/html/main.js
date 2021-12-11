var currentSize = 25

function SetCrosshairURL(url) {
    var element = document.getElementById("crosshair"); 
    var input = document.getElementById("crosshair-ui-url");
    input.value = url;
    element.setAttribute("src", url)
    if (input.value != "") {
        SetCrosshairStatus(true)
    }
    else {
        SetCrosshairStatus(false)
    }
    SetCrosshairSize(currentSize)
}

function SetCrosshairSize(size) {
    var element = document.getElementById("crosshair");
    var input = document.getElementById("crosshair-ui-size");
    input.value = size;
    currentSize = size;
    element.setAttribute("width", size)
    element.setAttribute("height", size)
}

function SetCrosshairStatus(bool) {
    var element = document.getElementById("crosshair");
    element.style.display = bool ? "block" : "none";
}

function SetConfigDisplay(bool) {
    var element = document.getElementById("crosshair-ui");
    element.style.display = bool ? "block" : "none";
    if (bool == false) {
        fetch(`https://${GetParentResourceName()}/CloseCrosshairConfig`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(["a"])
        }).then(resp => resp.json()).then(resp => console.log(resp));
    }
}

function UpdateCrosshairData() {
    var url = document.getElementById("crosshair-ui-url").value
    var size = document.getElementById("crosshair-ui-size").value
    SetCrosshairURL(url)
    SetCrosshairSize(size)
    fetch(`https://${GetParentResourceName()}/UpdateCrosshairData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            url: url, 
            size: size,
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
    SetConfigDisplay(false)
}

document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('message', function(event) {
        if (event.data != null) {
            var data = event.data.data;
            var toggleUI = event.data.toggleUI;
            if (data != null) {
                var url = data.url;
                var size = data.size;
                SetCrosshairURL(url);
                SetCrosshairSize(size);
            }
            else if (toggleUI != null) {
                SetConfigDisplay(toggleUI);
            }
        }
    });
});
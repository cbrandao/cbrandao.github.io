//more than one image

// reference canvas
var canvas = document.getElementById('canvas');

// reference canvas context
var context = canvas.getContext('2d');

// reference loading screen
var loadingScreen = document.getElementById("loading");

// start loading variables
var loaded = false;
var loadCounter = 0;


// initialize image objects
var background = new Image();
var green = new Image();
var birds = new Image();
var clouds = new Image();
var leaves = new Image();
var border = new Image();
var flowers = new Image();

// create a list of layer objects
var layerList = [
    {
        "image": background,
        "src": "./images/Mountains-1.png",
        "z_index": -2.25,
        "position": {x: 0, y: 0}
    },

    {
        "image": green,
        "src": "./images/Mountains-2.png",
        "z_index": -2.2,
        "position": {x: 0, y: 0}
    },

    {
        "image": birds,
        "src": "./images/Mountains-3.png",
        "z_index": -1.7,
        "position": {x: 0, y: 0}
    },

    {
        "image": clouds,
        "src": "./images/Mountains-4.png",
        "z_index": -1,
        "position": {x: 0, y: 0}
    },

    {
        "image": leaves,
        "src": "./images/Mountains-5.png",
        "z_index": -0.3,
        "position": {x: 0, y: 0}
    },


    {
        "image": border,
        "src": "./images/Mountains-6.png",
        "z_index": 0,
        "position": {x: 0, y: 0}
    },

    {
        "image": flowers,
        "src": "./images/Mountains-7.png",
        "z_index": 0.7,
        "position": {x: 0, y: 0}
    }
];


layerList.forEach(function(layer, index){


    layer.image.onload = function(){
        loadCounter += 1;

        if (loadCounter >= layerList.length) {
            // hide loading screen
            hideLoading();
            requestAnimationFrame(drawCanvas);
        };

    };
    layer.image.src = layer.src;
});

function hideLoading(){
    loadingScreen.classList.add("hidden");
};


function drawCanvas(){
    
    // clear what is in the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    /**  */

    // calculate how much the canvas should rotate
    var rotate_x = (pointer.y * -0.15) + (motion.y *-1.2);
    var rotate_y = (pointer.x * 0.15) + (motion.x * 1.2);


    var transform_string = "rotateX(" + rotate_x + "deg) rotateY(" + rotate_y + "deg)";
    canvas.style.transform = transform_string; 

    //loop through each layer and draw it to the canvas
    layerList.forEach(function(layer, index){
        
        layer.position = getOffset(layer);
      

        context.drawImage(layer.image, layer.position.x, layer.position.y);
    });

    // always a repeating animation
    requestAnimationFrame(drawCanvas);
};

function getOffset(layer){
    var touchMultiplyer = 0.3;
    var touchOffsetX = pointer.x * layer.z_index * touchMultiplyer;
    var touchOffsetY = pointer.y * layer.z_index * touchMultiplyer;

    var offset = {
        x: touchOffsetX,
        y: touchOffsetY
    };

    return offset;
};


// Touch and mouse controls

var moving = false;

// start touch and mouse  position
var pointerInitial = {
    x: 0,
    y: 0
};

var pointer = {
    x: 0,
    y: 0
};


canvas.addEventListener("mousedown", pointerStart);

function pointerStart(event) {
    moving = true;

    pointerInitial.x = event.clientX;
    pointerInitial.y = event.clientY;
    
};

window.addEventListener("mousemove", pointerMove);

// Functions for listening to user interaction
function pointerMove(event){

    event.preventDefault();
    if (moving === true){

        var currentX = 0;
        var currentY = 0;

        
        currentX = event.clientX;
        currentY = event.clientY;
        

        pointer.x = currentX - pointerInitial.x;
        pointer.y = currentY - pointerInitial.y;

    };
};

canvas.addEventListener("mousemove", function(event){
    event.preventDefault();
});

window.addEventListener("mouseup", function(event) {
    endGesture();
});

function endGesture(){
    moving = false;

    pointer.x = 0;
    pointer.y = 0;
};


// intialize motion variables
var motionInitial = {
    x: null,
    y: null,
};

var motion = {
    x:0,
    y:0,
};

//listen to gyroscope
window.addEventListener("deviceorientation", function(event) {
    // what angle is the device already at
    // first  time
    if (!motionInitial.x && !motionInitial.y){
        motionInitial.x = event.beta;
        motionInitial.y = event.gamma;
    }
});

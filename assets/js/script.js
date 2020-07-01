//variable to get character length
var charLength;
//variables options for user
var lowerCase = "abcdefghijklmnopqrstuvwxyz";
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var num = "0123456789";
var specialChar = "!@#$%^&*=-_";

//variable for textarea for password to be generated to and copy button
var textarea = document.querySelector(".form-control");
var copyBtn = document.querySelector("#copyBtn");

//variables for slider and function to display slider value
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
};

//variable to hold user confirmed Password options
var pwdCombined;

//variable for buttons
var bBtn = document.querySelector("#bBtn");
var pBtn = document.querySelector("#pBtn");
var rBtn = document.querySelector("#rBtn");

//When blue or red button is clicked
bBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startGen();
});

rBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startGen();
});

//When purple button is clicked
pBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startGen();
    setInterval(draw, 35);
});

//function for generating Password
function startGen(){

    //clear text area
    textarea.innerHTML = "";

    //Character limit defined by the slider
    charLength = slider.value;

    // //Questions to define the input for the password 
    if (confirm("Do you want lowerCase letters?") === true ){
        var pwdCombined = lowerCase;
    } else
        pwdCombined = "";

    if (confirm("Do you want upperCase letters?") === true ){
        pwdCombined = pwdCombined + upperCase;
    } else
        pwdCombined = pwdCombined;

    if (confirm("Do you want numbers?") === true ){
        pwdCombined = pwdCombined + num;
    } else
        pwdCombined = pwdCombined;

    if (confirm("Do you want special characters?") === true ){
        pwdCombined = pwdCombined + specialChar;
    } else
        pwdCombined = pwdCombined;

    //variable for generated password
    var password = "";

    for(var i = 0; i <= charLength; i++) {
        password = password + pwdCombined.charAt(Math.floor(Math.random() * Math.floor(pwdCombined.length - 1)));
    }

    //Display generated password in the text area
    textarea.innerHTML = password;

};

//function to copy password
function copyPwd () {
    textarea.select();
    document.execCommand("copy");
    alert("Password " + textarea.value + " is copied!");
};

//When copy button is clicked
copyBtn.addEventListener("click",function(event) {
    event.preventDefault;
    copyPwd();
   
});

// geting canvas by Boujjou Achraf
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#f4427d";//green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}
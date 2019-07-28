var cookies = 0;
var cursors = 0;
var nextCost = 10;
var progressWidth = 0;
var globalRate = 10;
var cursorMulti = 0.01;
var cursorValue = 0;
var color1 = 255;
var color2 = 255;
var color3 = 255;

function saveGame()
{
var save = 	{
				cookies: roundify(cookies),
				cursors: roundify(cursors),
				cursorCost: document.getElementById('cursorCost').innerHTML
			}	
localStorage.setItem("save",JSON.stringify(save));
};

function loadGame()
{
	var save = JSON.parse(localStorage.getItem("save"));
	
	if (typeof save.cookies !== "undefined")
		{
		cookies = save.cookies;
		document.getElementById('cookies').innerHTML = cookies;  
		};
    if (typeof save.cursors !== "undefined")
		{
		cursors = save.cursors;
		document.getElementById('cursors').innerHTML = cursors;  
		};
	if (typeof save.cursorCost !== "undefined") 
		{
		cursorCost = save.cursorCost;
		document.getElementById('cursorCost').innerHTML = cursorCost;  
		};
};

function roundify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
};

function roundify2(input)
{
    var output = parseFloat(Math.round(input * 100) / 100).toFixed(2);
	return output;
};

function cookieClick(number)
{
    cookies = cookies + number;
    document.getElementById('cookies').innerHTML = roundify(cookies);
};

function updateCursorMulti(number)
{
	cursorMulti = cursorMulti * number;
}

function updateCursorValue()
{
	cursorValue = (cursors * cursorMulti);
}

function buyCursor()
{
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost)
	{                                   
        cursors = cursors + 1;                                   
    	cookies = cookies - cursorCost;                         
        document.getElementById('cursors').innerHTML = roundify(cursors);  
        document.getElementById('cookies').innerHTML = roundify(cookies);  
		nextCost = Math.floor(10 * Math.pow(1.1,cursors));
		document.getElementById('cursorCost').innerHTML = roundify(nextCost);
    };
};

function moveProgressBar() 
{
	var elemPB = document.getElementById("ProgressBar");
	var elemPBCentered = document.getElementById("ProgressBarMiddle");
	var ProgressBarInterval = setInterval(Progress, globalRate);
	color1 = 255;
	color2 = 255;
	color3 = 255;
	progressWidth = cookies / nextCost; 
	function Progress() 
	{
		if (progressWidth >= 100 || cookies > nextCost)
		{
		  progressWidth = 100;
		  elemPB.style.width = 100 + '%'; 
		  elemPBCentered.innerHTML = 100 + '%'; 
		  clearInterval(ProgressBarInterval);
		  updateColorOnProgressBar (progressWidth);
		} 
		else 
		{
		  progressWidth = cookies / nextCost; 
		  updateColorOnProgressBar (progressWidth);
		  progressWidth = roundify2(progressWidth*100);
		  elemPB.style.width = progressWidth + '%'; 
		  elemPBCentered.innerHTML = progressWidth + '%';
		}
	};
};

function moveCookiesPS() 
{
  var elemCPS = document.getElementById("cookiesPS"); 
  var CookiesPSInterval = setInterval(frameCookiesPS, 1000);
  function frameCookiesPS() 
  {
	  var CookiesPS = cursors * cursorMulti * globalRate * 10;
      elemCPS.innerHTML = parseFloat(Math.round(CookiesPS)).toFixed(2);
  };
};

function updateColorOnProgressBar (progressW)
{
		color1 = 245 - ((progressW) * 175);
		color3 = 245 - ((progressW) * 175);
		document.getElementById("ProgressBar").style.backgroundColor = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')';
};

window.setInterval(function()
{
	cookieClick(cursorValue);
}, globalRate);


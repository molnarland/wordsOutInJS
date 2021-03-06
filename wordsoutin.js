/*
*
* Created by Molnár Roland
* From Hungary
* Inspireted: npmjs's webpage :)
*
* Github: https://github.com/molnarland
* Twitter: @molnarland
*
*/



function WordsOutIn(where, words, delay, inWait, color, retype, stop)
{

    //options start
    this.where=where; //where will write
    this.words=words || ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']; //words what will write
    this.delay=delay=this.createDelayOrWaitArray(delay, this.words.length, 'number') || this.createDelayOrWaitArray(200, this.words.length, 'number'); //how many milliseconds waiting two words write or delete between
    this.inWait=inWait=this.createDelayOrWaitArray(inWait, this.words.length, 'number') || this.createDelayOrWaitArray(0, this.words.length, 'number'); //if writed then how many milliseconds waiting
    this.colors=color=this.createDelayOrWaitArray(color, this.words.length, 'string') || this.createDelayOrWaitArray(false, this.words.length, 'string');
    this.fullRetype=retype || false; //if false then current word not delete full if next word a part equals with current but if true then delete full word everytime
    this.stop=stop || false; //if true then timer will stop after write last word but if false then timer won't stop
    //options stop

    this.changeFontColor(this.where, this.colors[0][0]);

    

    var thisObject = this,
        timerId = this.timerId = 1; //setintervals' id 

    this.timerId = timerId = setInterval(function()
    {
        where.innerHTML=thisObject.doing(timerId);
    }, this.delay[0][0]);

    this.wordCounter=this.db=this.wait=0;
    this.is=this.fastStop=false;

    this.doing=function(timer){
        var wordCounter=this.wordCounter,
            db=this.db,
            wait=this.wait,
            is=this.is,
            element=this.where.innerHTML,
            words=this.words,
            inWait=this.inWait,
            delay=this.delay,
            colors=this.colors,
            fastStop=this.fastStop,
            nextWord='';

        if (!this.fullRetype && is) {

             if(words[db+1] != undefined){
                for (var cv = 0; cv < element.length; cv++){
                    if (words[db+1][cv] == undefined) break;
                    nextWord += words[db+1][cv];
                }

                if (element == nextWord) {
                    if(element.length != words[db+1].length){
                        is = null;
                        wait = 0;
                        db++;
                        fastStop = true;
                    }
                }
             }
            else{
                for (var cv = 0; cv < element.length; cv++){
                    if (words[0][cv] == undefined) break;
                    nextWord += words[0][cv];
                }

                if (element == nextWord) {
                    if(element.length != words[0].length){
                        is = null;
                        wait = db = 0;
                        fastStop = true;
                    }
                }
            }
        }

        if(db == words.length && !is && wait == 0)
            db=0;
        else if ((fastStop || element.length == 0) && is==null && wait == 0) {
            timer=this.stopAndStartTimer(where, inWait[db][0], this);
            wait++;
        }
        else if ((fastStop || element.length == 0) && is==null && wait > 0) {
            this.changeFontColor(this.where, colors[db][0]);
            if(wait >= 2){
                wait=0;
                is=fastStop=false;
                timer=this.stopAndStartTimer(where, delay[db][0], this);
            }
            else wait++;
        }
        else if(element.length < words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
        }
        else if(element.length == words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
            is = true;

            if(inWait[db][1]!=0){ 
                timer=this.stopAndStartTimer(where, inWait[db][1], this);
                wait++;
            }
            if(this.stop){
                if(wordCounter < words.length-1) wordCounter++;
                else this.stopping();
            }

        }
        else if(wait > 0){
            this.changeFontColor(this.where, colors[db][1]);
            if(wait >= 1){
                wait=0;
                timer=this.stopAndStartTimer(where, delay[db][1], this);
            }
            else wait++;
        }
        else if(element.length == words[db].length && is && wait == 0){
            element = element.substr(0, element.length - 1);
        }
        else if(element.length < words[db].length && is && wait == 0){
            element = element.substr(0, element.length - 1);
            if(element.length == 0){
                is = null;
                db++;
            }
        }

        this.wordCounter=wordCounter;
        this.db=db;
        this.wait=wait;
        this.is=is;
        this.element=element;
        this.words=words;
        this.inWait=inWait;
        this.delay=delay;
        this.fastStop=fastStop;

        return element;
    };
}


WordsOutIn.prototype.stopping=function()
{
    clearInterval(this.timerId);
    this.timerId = 0;
    return;
};

WordsOutIn.prototype.stopAndStartTimer = function (where, time, object)
{
    this.stopping();
    var timerId = this.timerId = 0;

    this.timerId = timerId = setInterval(function()
    {
        where.innerHTML=object.doing(timerId);
    }, time);

};

WordsOutIn.prototype.addElementToArray = function (array, element1, element2, start, stop)
{
    for (var cv = start; cv < stop; cv++) {
        array[cv] = [element1, element2];
    }

    return array;
};

WordsOutIn.prototype.whichThrow = function (number, array)
{
    switch(number){
        case 1: console.error("Delay Type Error: 1st element, in: "+array); break;
        case 2: console.error("Delay Type Error: 2nd element, in: "+array); break;
        case 3: console.error("Delay Type Error: 3rd element, in: "+array); break;
        default: console.error("Delay Type Error: "+number+"th element, in: "+array); break;
    }
};

WordsOutIn.prototype.changeElementInArray = function (array, arrayCount, type)
{
    for (var cv = 0; cv < arrayCount; cv++) {
        if (typeof array[cv] === type) {
            array[cv] = [array[cv], array[cv]];
        }
        else if (Array.isArray(array[cv])) {
            var length=array[cv].length;
            if (length === 1 && typeof array[cv][0] === type) {
                array[cv] = [array[cv][0], array[cv][0]];
            }
            else if(length === 2 && typeof array[cv][0] === type && typeof array[cv][1] === type){
                //code...
            }
            else {
                array = 200;
                inTimer.whichThrow(cv, array);
            }
        }
    }

    return array;
};

WordsOutIn.prototype.createDelayOrWaitArray = function (array, wordsLength, type)
{
    if (typeof array === type) {
        var helper = array;
        array = [];
        array = this.addElementToArray(array, helper, helper, 0, wordsLength);
    }
    else if (Array.isArray(array)) {
        var arrayCount = array.length;

        this.changeElementInArray(array, arrayCount, type);

        var helper = [array[array.length-1][0], array[array.length-1][1]];
        array = this.addElementToArray(array, helper[0], helper[1], arrayCount, wordsLength);
    }
    else console.error("Error");

    return array;
};

WordsOutIn.prototype.changeFontColor = function (where, color) {
    if (color !== false) where.style.color=color;
};
// @pjs preload must be used to preload the image

/* @pjs preload="bank.png"; */

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(800, 800);
        frameRate(60);
        smooth();

        // END BOILER PLATE

var mult = 2;
var win = 0;
var Ball = function (config) {
    this.x = config.x * mult;
    this.y = config.y * mult;
    this.vx = 0;
    this.vy = 0;
    this.drag = 0.06 * mult;
    this.acceleration = 0.15 * mult;
    this.ax = 0;
    this.ay = 0;
    this.gravity = 0.2 * mult;
    this.radius = 5 * mult;
    this.onLadder = false;
    this.isBlue = config.isBlue || false;
    this.isRed = config.isRed || false;
    this.isYellow = config.isYellow || false;
    this.isGreen = config.isGreen || false;
};

var keys = [];
var Level = function (config) {
    this.platforms = config.platforms;
    this.ladders = config.ladders;
    this.moneys = config.moneys;
    this.enemies = config.enemies;
    this.levers = config.levers;
    this.blueX = config.blueX * mult || 1000;
    this.blueY = config.blueY * mult || 1000;
    this.redX = config.redX * mult || 1000;
    this.redY = config.redY * mult || 1000;
    this.yellowX = config.yellowX * mult || 1000;
    this.yellowY = config.yellowY * mult || 1000;
    this.greenX = config.greenX * mult || 1000;
    this.greenY = config.greenY * mult || 1000;
    this.endX = config.endX * mult || 10000;
    this.endY = config.endY * mult || 10000;
    this.endWidth = config.endWidth * mult || 50;
    this.endHeight = config.endHeight * mult || 50;
};
var lever = function(config) {
    this.leverX = config.leverX * mult;
    this.leverY = config.leverY * mult;
    this.gateX = config.gateX * mult;
    this.gateY = config.gateY * mult;
    this.gateWidth = config.gateWidth * mult;
    this.gateHeight = config.gateHeight * mult;
    this.isPressed = false;
}
var Button = function (config) {
    this.buttonX = config.buttonX * mult;
    this.buttonY = config.buttonY * mult;
    this.buttonWidth = config.buttonWidth * mult;
    this.buttonHeight = config.buttonHeight * mult;
    this.color1 = config.color1;
    this.color2 = config.color2;
    this.color3 = config.color3;
    this.isPlayButton = config.isPlayButton;
    this.isControlButton = config.isControlButton || false;
    this.isLevelButton = config.isLevelButton || false;
    this.isBackButton = config.isBackButton || false;
    this.isConfirmationButton = config.isConfirmationButton || false;
    this.isFirstLevelButton = config.isFirstLevelButton || false;
    this.isSecondLevelButton = config.isSecondLevelButton || false;
    this.isThirdLevelButton = config.isThirdLevelButton || false;
};
var playButton = new Button({ buttonX: 127, buttonY: 93, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isPlayButton: true });

var restartButton = new Button({ buttonX: 142, buttonY: 335, buttonWidth: 120, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isRestartButton: true});

var controlButton = new Button({ buttonX: 127, buttonY: 147, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isControlButton: true });

var levelButton = new Button({ buttonX: 127, buttonY: 199, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isLevelButton: true });

var backButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isBackButton: true });

var firstLevelButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isFirstLevelButton: true });

var secondLevelButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isSecondLevelButton: true });

var thirdLevelButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isThirdLevelButton: true });

var buttons = [playButton, controlButton, levelButton, backButton, restartButton, firstLevelButton, secondLevelButton, thirdLevelButton];

//Platforms
var Platform = function (config) {
    this.x = config.x * mult;
    this.y = config.y * mult;
    this.width = config.width * mult;
    this.height = config.height * mult;
    this.moveLeft = false;
    this.moveUp = false;
    this.canKill = config.canKill || false;
    this.canMove = config.canMove || false;
    this.canBreak = config.canBreak || false;
    this.isBroken = false;
    };
    
Platform.prototype.draw = function () {
    if (this.canBreak === false) {
        if (this.canKill === false) {
            fill(4, 255, 0);
            rect(this.x, this.y, this.width, this.height);
        }
        else {
            fill(255, 36, 36);
            rect(this.x, this.y, this.width, this.height);
        }
    } else if (this.canBreak === true) {
        if (this.isBroken === false) {
            fill(100, 100, 100);
            rect(this.x, this.y, this.width, this.height);
        }
    }
};

var Ladder = function(config) {
    this.x = config.x;
    this.y = config.y;
};

var Money = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.radius = 10;
    this.drawn = true;
};

var Enemy = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.canMove = config.canMove;
    this.moveLeft = false;
};

var Platform1 = new Platform({x: -1, y: 340, width: 401, height: 60});
var killPlatform1 = new Platform({x: 180, y: 320, width: 60, height: 20, canKill: true });
var breakPlatform1 = new Platform({x: 60, y: 330, width: 10, height: 10, canBreak: true});
var breakPlatform2 = new Platform({x: 60, y: 320, width: 10, height: 10, canBreak: true});

var Platform21 = new Platform({ x: 0, y: 340, width: 46, height: 60, canKill: false });
var Platform22 = new Platform({ x: 280, y: 290, width: 60, height: 20, canMove: true });
var Platform23 = new Platform({ x: 0, y: 240, width: 60, height: 20, canMove: true });
var Platform24 = new Platform({ x: 175, y: 190, width: 60, height: 20, canMove: true });
var Platform25 = new Platform({ x: 293, y: 140, width: 60, height: 20, canMove: true });
var Platform26 = new Platform({ x: 78, y: 90, width: 60, height: 20, canMove: true });
var killPlatform21 = new Platform({ x: 218, y: 40, width: 60, height: 20, canKill: true, canMove: true });

var Platform31 = new Platform({ x: 0, y: 380, width: 20, height: 20});
var Platform32 = new Platform({ x: 163, y: 360, width: 60, height: 20, canKill: false, canMove: true });
var Platform33 = new Platform({ x: 380, y: 320, width: 20, height: 20, canKill: false });
var Platform34 = new Platform({ x: 0, y: 260, width: 353, height: 20, canKill: false });
var Platform35 = new Platform({ x: 0, y: 220, width: 20, height: 20, canKill: false });
var Platform36 = new Platform({ x: 52, y: 160, width: 30, height: 20, canKill: false });
var Platform37 = new Platform({ x: 155, y: 140, width: 30, height: 20, canKill: false });
var Platform38 = new Platform({ x: 280, y: 140, width: 30, height: 20, canKill: false });
var Platform39 = new Platform({ x: 380, y: 90, width: 20, height: 20, canKill: false });
var Platform310 = new Platform({ x: 212, y: 26, width: 60, height: 10, canKill: false, canMove: true });
var Platform311 = new Platform({ x: 0, y: 26, width: 30, height: 10, canKill: false });
var killPlatform31 = new Platform({ x: 299, y: 340, width: 20, height: 20, canKill: true, canMove: true });
var killPlatform32 = new Platform({ x: 116, y: 340, width: 20, height: 20, canKill: true, canMove: true });
var killPlatform33 = new Platform({ x: 299, y: 240, width: 20, height: 20, canKill: true, canMove: true });
var killPlatform34 = new Platform({ x: 116, y: 240, width: 20, height: 20, canKill: true, canMove: true });
var killPlatform35 = new Platform({ x: 82, y: 160, width: 353, height: 20, canKill: true });
var killPlatform36 = new Platform({ x: 0, y: 36, width: 353, height: 20, canKill: true });

var platforms0 = [];
var platforms1 = [Platform1, killPlatform1, breakPlatform1, breakPlatform2];

var platforms2 = [Platform21, Platform22, Platform23, Platform24, Platform25, Platform26, killPlatform21];

var platforms3 = [Platform31, Platform32, Platform33, Platform34, Platform35, Platform36, Platform37, Platform38, Platform39, Platform310, Platform311, killPlatform31, killPlatform32, killPlatform33, killPlatform34, killPlatform35, killPlatform36];

var ladder1 = new Ladder({x: 268, y: 276});
var ladders0 = [];
var ladders1 = [ladder1];

var Money1 = new Money({x: 120, y: 298});
var Money2 = new Money({x: 55, y: 239});
var Money3 = new Money({x: 328, y: 101});

var moneys0 = [];
var moneys1 = [Money1, Money2, Money3];

var enemies0 = [];

var lever1 = new lever({leverX: 120, leverY: 338, gateX: 305, gateY: 290, gateWidth: 10, gateHeight: 50});

var levers0 = [];
var levers1 = [lever1];

var homeScreen = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, enemies: enemies0, levers: levers0});
var level1 = new Level({platforms: platforms1, ladders: ladders1, moneys: moneys1, enemies: enemies0, levers: levers1, blueX: 10, blueY: 340, redX: 50, redY: 340, yellowX: 100, yellowY: 340, greenX: 150, greenY: 340, endX: 323, endY: 303, endWidth: 37, endHeight: 37});
var level2 = new Level({platforms: platforms2, ladders: ladders0, moneys: moneys0, enemies: enemies0, levers: levers0});
var level3 = new Level({platforms: platforms3, ladders: ladders0, moneys: moneys0, enemies: enemies0, levers: levers0});
var endScreen = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, enemies: enemies0, levers: levers0});
var controls = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, enemies: enemies0, levers: levers0});
var stages = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, enemies: enemies0, levers: levers0});
var levels = [homeScreen, level1, level2, level3, endScreen, controls, stages];
var currentLevel = 0;

var blueBall = new Ball({x: levels[currentLevel].blueX, y: levels[currentLevel].blueY, isBlue: true});
var redBall = new Ball({x: levels[currentLevel].redX, y: levels[currentLevel].redY, isRed: true});
var yellowBall = new Ball({x: levels[currentLevel].yellowX, y: levels[currentLevel].yellowY, isYellow: true});
var greenBall = new Ball({x: levels[currentLevel].greenX, y: levels[currentLevel].greenY, isGreen: true});

var players = [blueBall, redBall, yellowBall, greenBall];

Ladder.prototype.checkBall = function(ball) {
    if (ball.x > this.x*mult && ball.x < (this.x + 30)*mult && ball.y > (this.y - 16)*mult && ball.y < (this.y + 60)*mult) {
        return true;
    }
    else {
        return false;
    }
};

lever.prototype.checkBall = function(ball) {
    if (ball.x + ball.radius > this.leverX && ball.x - ball.radius < this.leverX + 26 && ball.y > this.leverY - 18 && ball.y < this.leverY) {
        return true;
    }
    else {
        return false;
    }
};

Level.applyChangeInLevels = function () {
    if (blueBall.x > levels[currentLevel].endX && blueBall.x < levels[currentLevel].endX + levels[currentLevel].endWidth && blueBall.y > levels[currentLevel].endY && blueBall.y < levels[currentLevel].endY + levels[currentLevel].endHeight) {
        currentLevel++;
        blueBall.x = levels[currentLevel].blueX;
        blueBall.y = levels[currentLevel].blueY;
        redBall.x = levels[currentLevel].redX;
        redBall.y = levels[currentLevel].redY;
        yellowBall.x = levels[currentLevel].yellowX;
        yellowBall.y = levels[currentLevel].yellowY;
        greenBall.x = levels[currentLevel].greenX;
        greenBall.y = levels[currentLevel].greenY;

        blueBall.vx = 0;
        blueBall.vy = 0;
        redBall.vx = 0;
        redBall.vy = 0;
        yellowBall.vx = 0;
        yellowBall.vy = 0;
        greenBall.vx = 0;
        greenBall.vy = 0;
    }
};

Level.drawTextAndEnd = function () {
    fill(128, 96, 74);
    rect(levels[currentLevel].endX, levels[currentLevel].endY, levels[currentLevel].endWidth, levels[currentLevel].endHeight);

    if (currentLevel === 0) {
        fill(0, 0, 0);
        textSize(32 * mult);
        text("The Heist", 122 * mult, 34 * mult, 400 * mult, 100 * mult);
        fill(0, 0, 0);
        text("Play", 162 * mult, 101 * mult, 100 * mult, 100 * mult);
        text("Controls", 133 * mult, 156 * mult, 111 * mult, 100 * mult);
        text("Levels", 149 * mult, 207 * mult, 111 * mult, 100 * mult);
        textSize(12 * mult);
        text("Made by 1145-902", 131 * mult, 345 * mult, 339 * mult, 100 * mult);
    }
    if (currentLevel === 1) {
        fill(0, 0, 0);
        textSize(12 * mult * 1.1)
        text("Level 1: Teamwork", 8 * mult, 259 * mult, 114 * mult, 100 * mult);
        text("This Kills You!", 130 * mult, 292 * mult, 100 * mult, 100 * mult);
        text("Touch the Brown to Finish the Level", 170 * mult, 240 * mult, 211 * mult, 100 * mult);
    }
    if (currentLevel === 2) {
        fill(0, 0, 0);
        text("Level 2: Moving Platforms", 2 * mult, 288 * mult, 100 * mult, 100 * mult);
    }
    if (currentLevel === 3) {
        fill(0, 0, 0);
        text("Level 3: The Tower", 4 * mult, 298 * mult, 87 * mult, 100 * mult);
    }
    if (currentLevel === 4) {
        fill(0, 0, 0);
        textSize(40*mult);
        text("The End...For Now", 29 * mult, 125 * mult, 438 * mult, 100 * mult);
        textSize(32*mult);
        text("Restart",149*mult,344*mult,271*mult,100*mult);
        textSize(20*mult);
        text("More Levels Coming Soon!",76*mult,293*mult,271*mult,100*mult);
        textSize(12*mult);
    }
    if (currentLevel === 5) {
        fill(0, 0, 0);
        textSize(40*mult);
        text("Controls", 255, 40, 300, 100);
        textSize(10 * mult);
        line(0, 400, 800, 400);
        line(400, 0, 400, 800);
        text("Player 1: Use Arrow Keys to move around, and the down arrow to attack enemies.", 8, 100, 400, 100);
        text("Player 2: Use WASD Keys to move around, and the S key to destroy breakable walls.", 400, 100, 400, 100);
        text("Player 3: Use TFGH Keys to move around, and the G key to change sizes.", 8, 400, 400, 100);
        text("Player 4: Use IJKL Keys to move around, and you can pick up other players.", 400, 400, 400, 100);
        
        if(currentLevel === 6) {
            text("Levels", 100, 100, 100, 100);
        }
    }
};

Button.prototype.draw = function () {
    if (this.isPlayButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.isRestartButton === true) {
        if (currentLevel === 5) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.isControlButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.isLevelButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.firstLevelButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
};

Button.prototype.applyMouse = function () {
    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
        if (this.isPlayButton === true) {
            if (currentLevel === 0) {
                currentLevel = 1;
                blueBall.x = levels[currentLevel].blueX;
                blueBall.y = levels[currentLevel].blueY;
                redBall.x = levels[currentLevel].redX;
                redBall.y = levels[currentLevel].redY;
                yellowBall.x = levels[currentLevel].yellowX;
                yellowBall.y = levels[currentLevel].yellowY;
                greenBall.x = levels[currentLevel].greenX;
                greenBall.y = levels[currentLevel].greenY;
            }
        }

        if (this.isRestartButton === true) {
            currentLevel = 0;
        }
        
        if (this.isControlButton === true) {
            if (currentLevel === 0) {
                currentLevel = 5;
            }
        }
        
        if (this.isLevelButton === true) {
            if (currentLevel === 0) {
                currentLevel = 6;
            }
        }
    }

};

Platform.prototype.applyMovement = function () {
    if (this.canMove === true) {
        if (this.moveLeft === true) {
            this.x--;
            if (blueBall.y > this.y - blueBall.radius && blueBall.y < this.y + 1 && blueBall.x > this.x && blueBall.x < this.x + this.width) {
                blueBall.x--;
            }
        }
        else {
            this.x++;
            if (blueBall.y > this.y - blueBall.radius && blueBall.y < this.y + 1 && blueBall.x > this.x && blueBall.x < this.x + this.width) {
                blueBall.x++;
            }
        }
        if (this.x + this.width > 400 * mult) {
            this.moveLeft = true;
        }
        if (this.x < 0) {
            this.moveLeft = false;
        }
    }

};
Ball.prototype.applyIntersect = function (platform) {
    if (platform.isBroken === false) {
        if (platform.canKill === false && this.y > platform.y - this.radius && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
            this.y = platform.y - this.radius;
            this.vy = 0;
        }

        if (platform.canKill === true && this.y > platform.y - this.radius && this.y < platform.y + 1 && this.x > platform.x && this.x < platform.x + platform.width) {
            if (this.isBlue === true) {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
            }
            else if (this.isRed === true) {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
            }
            else if (this.isYellow === true) {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
            }
            else if (this.isGreen === true) {
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
            }
            this.vx = 0;
            this.vy = 0;
            

        }
        if (platform.canKill === false && this.y > platform.y && this.y < platform.y + platform.height && this.x > platform.x - this.radius && this.x < platform.x + 1) {
            this.x = platform.x - this.radius;
            this.vx = 0;
        }

        if (platform.canKill === true && this.y > platform.y && this.y < platform.y + platform.height && this.x > platform.x - this.radius && this.x < platform.x + 1) {
            if (this.isBlue === true) {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
            }
            else if (this.isRed === true) {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
            }
            else if (this.isYellow === true) {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
            }
            else if (this.isGreen === true) {
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
            }
            this.vx = 0;
            this.vy = 0;
        }

        if (platform.canKill === false && this.y > platform.y && this.y < platform.y + platform.height && this.x < platform.x + platform.width + this.radius && this.x > platform.x + platform.width - 1) {
            this.x = platform.x + platform.width + this.radius;
            this.vx = 0;
        }

        if (platform.canKill === true && this.y > platform.y && this.y < platform.y + platform.height && this.x < platform.x + platform.width + this.radius && this.x > platform.x + platform.width - 1) {
            if (this.isBlue === true) {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
            }
            else if (this.isRed === true) {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
            }
            else if (this.isYellow === true) {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
            }
            else if (this.isGreen === true) {
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
            }
            this.vx = 0;
            this.vy = 0;
        }

        if (platform.canKill === false && this.x > platform.x && this.x < platform.x + platform.width && this.y < platform.y + platform.height + this.radius && this.y > platform.y + platform.height - 1) {
            this.y = platform.y + platform.height + this.radius;
            this.vy = 0;
        }

        if (platform.canKill === true && this.x > platform.x && this.x < platform.x + platform.width && this.y < platform.y + platform.height + this.radius && this.y > platform.y + platform.height - 1) {
            if (this.isBlue === true) {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
            }
            else if (this.isRed === true) {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
            }
            else if (this.isYellow === true) {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
            }
            else if (this.isGreen === true) {
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
            }
            this.vx = 0;
            this.vy = 0;
        }
    }
};
Ball.prototype.applyIntersect2 = function(money) {
    if (money.drawn === true && this.y + 5 > (money.y - 5)*mult && this.y - 5 < (money.y + 5)*mult && this.x + 5 > (money.x - money.radius)*mult && this.x - 5 < (money.x + money.radius)*mult) {
        win ++;
        money.drawn = false;
    }
};
Ball.prototype.applyIntersect3 = function(lever) {
    if (this.y > lever.gateY - this.radius && this.y < lever.gateY + 1 && this.x > lever.gateX && this.x < lever.gateX + lever.gateWidth) {
        this.y = lever.gateY - this.radius;
        this.vy = 0;
    }
        
    if (this.y > lever.gateY && this.y < lever.gateY + lever.gateHeight && this.x > lever.gateX - this.radius && this.x < lever.gateX + 1) {
        this.x = lever.gateX - this.radius;
        this.vx = 0;
    }

    if (this.y > lever.gateY && this.y < lever.gateY + lever.gateHeight && this.x < lever.gateX + lever.gateWidth + this.radius && this.x > lever.gateX + lever.gateWidth - 1) {
        this.x = lever.gateX + lever.gateWidth + this.radius;
        this.vx = 0;
    }

    if (this.x > lever.gateX && this.x < lever.gateX + lever.gateWidth && this.y < lever.gateY + lever.gateHeight + this.radius && this.y > lever.gateY + lever.gateHeight - 1) {
        this.y = lever.gateY + lever.gateHeight + this.radius;
        this.vy = 0;
    }
};
//Movement
Ball.prototype.applyUserInput = function (platforms) {
    if (this.isBlue === true) {
        if (keys.includes(68)) {
            this.ax = this.acceleration;
        }
        else if (keys.includes(65)) {
            this.ax = -this.acceleration;
        }
        else {
            this.ax = 0;
        }
        var onPlatform = false;
        for (var i = 0; i < platforms.length; i++) {
            if (keys.includes(87) && this.y === platforms[i].y - this.radius && this.x > platforms[i].x && this.x < platforms[i].x + platforms[i].width) {
                onPlatform = true;
    
            }
            if (onPlatform === true) {
                this.ay = -6 * mult;
            }
            else {
                this.ay = 0;
            }

            if (keys.includes(83) && platforms[i].canBreak === true && this.x > platforms[i].x - 20 && this.x < platforms[i].x && this.y > platforms[i].y && this.y < platforms[i].y + platforms[i].height) {
                platforms[i].isBroken = true;
            } else if (keys.includes(83) && platforms[i].canBreak === true && this.x > platforms[i].x + platforms[i].width && this.x < platforms[i].x + platforms[i].width + 20 && this.y > platforms[i].y && this.y < platforms[i].y + platforms[i].height) {
                platforms[i].isBroken = true;
            }
        }
        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(87)) {
                this.vy = -2;
            }
            if (keys.includes(83)) {
                this.vy = 2;
            }
        }
   }
    
    if (this.isRed === true) {
        if (keys.includes(72)) {
            this.ax = this.acceleration;
        }
        else if (keys.includes(70)) {
            this.ax = -this.acceleration;
        }
        else {
            this.ax = 0;
        }
        var onPlatform = false;
        for (var i = 0; i < platforms.length; i++) {
            if (keys.includes(84) && this.y === platforms[i].y - this.radius && this.x > platforms[i].x && this.x < platforms[i].x + platforms[i].width) {
                onPlatform = true;
    
            }
            if (onPlatform === true) {
                this.ay = -6 * mult;
            }
            else {
                this.ay = 0;
            }
        }
        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(84)) {
                this.vy = -2;
            }
            if (keys.includes(71)) {
                this.vy = 2;
            }
        }
    }
    
    if (this.isYellow === true) {
        if (keys.includes(76)) {
            this.ax = this.acceleration;
        }
        else if (keys.includes(74)) {
            this.ax = -this.acceleration;
        }
        else {
            this.ax = 0;
        }
        var onPlatform = false;
        for (var i = 0; i < platforms.length; i++) {
            if (keys.includes(73) && this.y === platforms[i].y - this.radius && this.x > platforms[i].x && this.x < platforms[i].x + platforms[i].width) {
                onPlatform = true;
    
            }
            if (onPlatform === true) {
                this.ay = -6 * mult;
            }
            else {
                this.ay = 0;
            }
        }
        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(73)) {
                this.vy = -2;
            }
            if (keys.includes(75)) {
                this.vy = 2;
            }
        }
    }
    
    if (this.isGreen === true) {
        if (keys.includes(RIGHT)) {
            this.ax = this.acceleration;
        }
        else if (keys.includes(LEFT)) {
            this.ax = -this.acceleration;
        }
        else {
            this.ax = 0;
        }
        var onPlatform = false;
        for (var i = 0; i < platforms.length; i++) {
            if (keys.includes(UP) && this.y === platforms[i].y - this.radius && this.x >                platforms[i].x && this.x < platforms[i].x + platforms[i].width) {
                onPlatform = true;
            }
            if (onPlatform === true) {
                this.ay = -6 * mult;
            }
            else {
                this.ay = 0;
            }
        }
        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(UP)) {
                this.vy = -2;
            }
            if (keys.includes(DOWN)) {
                this.vy = 2;
            }
        }
    }
};

Ball.prototype.applyBorders = function () {
    if (this.x < this.radius) {
        this.x = this.radius;
        this.vx = 0;
    }
    if (this.x > 400 * mult - this.radius) {
        this.x = 400 * mult - this.radius;
        this.vx = 0;
    }
    if (this.y > 400 * mult) {
        if (this.isBlue === true) {
            this.x = levels[currentLevel].blueX;
            this.y = levels[currentLevel].blueY;
        }
        else if (this.isRed === true) {
            this.x = levels[currentLevel].redX;
            this.y = levels[currentLevel].redY;
        }
        else if (this.isYellow === true) {
            this.x = levels[currentLevel].yellowX;
            this.y = levels[currentLevel].yellowY;
        }
        else if (this.isGreen === true) {
            this.x = levels[currentLevel].greenX;
            this.y = levels[currentLevel].greenY;
        }
        this.vx = 0;
        this.vy = 0;
    }
};
//Applying Velocity and Drag
Ball.prototype.applyGravity = function () {
    if (this.onLadder === false) {
    this.vy += this.gravity;
    }
};
Ball.prototype.applyVelocity = function () {
    if (this.vx > 6) {
        this.vx = 6;
        this.x += this.vx;
    }
    else if (this.vx < 6) {
        this.x += this.vx;
    }

    if (this.vy > 6) {
        this.vy = 6;
        this.y += this.vy;
    }
    else if (this.vy < 6) {
        this.y += this.vy;
    }
};
Ball.prototype.applyAcceleration = function () {
    this.vx += this.ax;
    this.vy += this.ay;
};
Ball.prototype.applyDrag = function () {
    if (this.vx > 0) {
        if (this.vx < this.drag) {
            this.vx = 0;
        } else {
            this.vx -= this.drag;
        }
    }
    if (this.vx < 0) {
        if (this.vx > this.drag) {
            this.vx = 0;
        } else {
            this.vx += this.drag;
        }
    }
    if (this.vy > 0) {
        if (this.vy < this.drag) {
            this.vy = 0;
        } else {
            this.vy -= this.drag;
        }
    }
    if (this.vy < 0) {
        if (this.vy > this.drag) {
            this.vy = 0;
        } else {
            this.vy += this.drag;
        }
    }
};
Ladder.prototype.draw = function() {
    stroke(128, 96, 74);
    strokeWeight(5);
    line(this.x*mult, (this.y - 11)*mult, this.x*mult, (this.y + 65)*mult);
    line((this.x + 30)*mult, (this.y - 11)*mult, (this.x + 30)*mult, (this.y + 65)*mult);
    line(this.x*mult, (this.y + 60)*mult, (this.x + 30)*mult, (this.y + 60)*mult);
    line(this.x*mult, (this.y + 50)*mult, (this.x + 30)*mult, (this.y + 50)*mult);
    line(this.x*mult, (this.y + 40)*mult, (this.x + 30)*mult, (this.y + 40)*mult);
    line(this.x*mult, (this.y + 30)*mult, (this.x + 30)*mult, (this.y + 30)*mult);
    line(this.x*mult, (this.y + 20)*mult, (this.x + 30)*mult, (this.y + 20)*mult);
    line(this.x*mult, (this.y + 10)*mult, (this.x + 30)*mult, (this.y + 10)*mult);
    line(this.x*mult, this.y*mult, (this.x + 30)*mult, this.y*mult);
    line(this.x*mult, (this.y - 10)*mult, (this.x + 30)*mult, (this.y - 10)*mult);
    strokeWeight(1);
    stroke(0, 0, 0);
};
Money.prototype.draw = function() {
    if (this.drawn === true) {
        fill(234, 255, 0);
        ellipse(this.x * mult, this.y * mult, 20 * mult, 20 * mult);
        fill(0, 0, 0);
        text("$", (this.x - 4) * mult, (this.y - 4) * mult, 100 * mult, 100 * mult);
    }
};
lever.prototype.draw = function() {
    if (this.isPressed === false) {
        fill(255, 255, 255);
        rect(this.leverX + 3, this.leverY - 7, 20, 10, 30);
        fill(100, 100, 100);
        rect(this.leverX, this.leverY, 26, 5, 20);

        fill(255, 255, 255);
        rect(this.gateX, this.gateY, this.gateWidth, this.gateHeight);
    } else {
        fill(150, 150, 150);
        rect(this.leverX + 3, this.leverY - 2, 20, 10, 30);
        fill(100, 100, 100);
        rect(this.leverX, this.leverY, 26, 5, 20);
    }
}
Ball.prototype.draw = function () {
    if (currentLevel > 0) {
        if (this.isBlue === true) {
            fill(0, 102, 255);
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        }
        if (this.isRed === true) {
            fill(255, 0, 0);
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        }
        if (this.isYellow === true) {
            fill(255, 251, 0);
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        }
        if (this.isGreen === true) {
            fill(0, 143, 2);
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        }
    }
};

draw = function () {
    
    var level = levels[currentLevel];
    var platforms = level.platforms;
    var moneys = level.moneys;
    var levers = level.levers;
    var ladders = level.ladders;
    var onLadder = false;
    
    for (var i = 0; i < ladders.length; i++) {
        for (var b = 0; b < players.length; b++) {
            if (ladders[i].checkBall(players[b])) {
                players[b].onLadder = true;
            }
            else {
                players[b].onLadder = false;
            }
        }
    }
    
    for (var i = 0; i < levers.length; i++) {
        levers[i].isPressed = false;
        for (var b = 0; b < players.length; b++) {
            if (levers[i].checkBall(players[b])) {
                levers[i].isPressed = true;
            }
        }
    }
    
    for (var i = 0; i < platforms.length; i++) {
        for (var b = 0; b < players.length; b++) {
            players[b].applyIntersect(platforms[i]);
        }
    }
    
    for (var i = 0; i < moneys.length; i++) {
        for (var b = 0; b < players.length; b++) {
            players[b].applyIntersect2(moneys[i]);
        }
    }

    for (var i = 0; i < levers.length; i++) {
        for (var b = 0; b < players.length; b++) {
            if (levers[i].isPressed === false) {
                players[b].applyIntersect3(levers[i]);
            }
        }
    }
    
    for (var b = 0; b < players.length; b++) {
        players[b].applyUserInput(platforms);
        players[b].applyBorders();
        players[b].applyGravity();
        players[b].applyAcceleration();
        players[b].applyDrag();
        players[b].applyVelocity();
    }
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].applyMovement();
    }

    background(189, 253, 255);
    playButton.draw();
    restartButton.draw();
    controlButton.draw();
    levelButton.draw();

    Level.drawTextAndEnd();
    Level.applyChangeInLevels();
    for (var i = 0; i < levers.length; i++) {
        levers[i].draw();
    }
    for (var b = 0; b < players.length; b++) {
        players[b].draw();
    }
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
    for (var i = 0; i < ladders.length; i++) {
        ladders[i].draw();
    }
    for (var i = 0; i < moneys.length; i++) {
        moneys[i].draw();
    }
};

mousePressed = function () {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].applyMouse();
    }
};

keyPressed = function () {
    if (!keys.includes(keyCode)) {
        keys.push(keyCode);
    }
};

keyReleased = function () {
    keys.splice(keys.indexOf(keyCode), 1);

};


        // START BOILER PLATE

    }
}

var canvas = document.getElementById("canvas");
var processingInstance = new Processing(canvas, sketchProc);

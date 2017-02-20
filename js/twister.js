var onlyTwisterX = -100;
var onlyTwisterY = -100;
var twisterRnadomMoveTimer = 0;
var maxTwisterRandomMoveTimer = 4;

var twisterSpawnTimer = 0;
const twisterMaxSpawnTimer = 4;

var twisterVanishTimer = 0;
const twisterVanishMaxTimer = 11.0;

const twisterAnimationFrames = 4;
const twisterStepsPerAnimFrame = 4;
var twisterFrame = 0;
var twisterFrameTimer = twisterStepsPerAnimFrame;

var landmarkTile;
var playerStartTile;

function clearTwister() {
    theTwister.isAlive = false;
    twisterSpawnTimer = 0;
}

function drawTwister() {
    if (theTwister.isAlive) {
        theTwister.twisterVanish();
        theTwister.moveTwister();
        theTwister.drawEachTwister();
        onlyTwisterX = theTwister.x;
        onlyTwisterY = theTwister.y;
    } else {
        onlyTwisterX = -1000;
        onlyTwisterY = -1000;
    }
}

function createEveryTwister() {
    if (twisterSpawnTimer >= twisterMaxSpawnTimer) {
        if (theTwister.isAlive == false) {
            theTwister.isAlive = true;
            theTwister.twisterRandomStartLocation();
            theTwister.particles = ParticleSystem.add(theTwister.x, theTwister.y, {}, "twister");
        } //end if
    } //end if
    else {
        twisterSpawnTimer += 0.03;
    }
}

//twister bounce off bordering tiles of the Goal/Lab
function areTilesTooNear(tileColA, tileRowA, tileColB, tileRowB, range) {
    return (Math.abs(tileColA - tileColB) <= range && Math.abs(tileRowA - tileRowB) <= range);
}

function twisterClass() {
    this.isAlive = true;
    this.speedX = 0.75;
    this.speedY = 0.75;
    this.particles = null;

    this.randomSpot = function() {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
    }

    this.twisterRandomStartLocation = function() {
        var tileKindHere;
        landmarkTile = findTileCoordsForTileType(TRACK_GOAL_LANDMARK);
        playerStartTile = findTileCoordsForTileType(TRACK_PLAYER);

        var playerAtTileNow = p1.MyTileCR();

        var safetyBreak = 100;
        do {
            this.randomSpot();
            tileKindHere = getTrackAtPixelCoord(this.x, this.y);
            this.col = Math.floor(this.x / TRACK_W);
            this.row = Math.floor(this.y / TRACK_H);
            if (safetyBreak-- < 0) {
                break; // protection against infinite loop, better to let tornado spawn in bad area
            }
        } while (isTileTypeSolid(tileKindHere) ||
            areTilesTooNear(this.col, this.row, landmarkTile.col, landmarkTile.row, 3) ||
            areTilesTooNear(this.col, this.row, playerStartTile.col, playerStartTile.row, 3) ||
            areTilesTooNear(this.col, this.row, playerAtTileNow.col, playerAtTileNow.row, 6));
    }

    this.drawEachTwister = function() {
        if (twisterFrameTimer-- < 0) {
            twisterFrameTimer = twisterStepsPerAnimFrame;
            twisterFrame++;
            if (twisterFrame >= twisterAnimationFrames) {
                twisterFrame = 0;
            }
        }

        var twisterDot = worldCoordToParCoord(this.x, this.y);
        drawAtBaseScaledSheet(twisterPic, twisterFrame,
            twisterDot.x, twisterDot.y, twisterDot.scaleHere);
    }

    this.twisterVanish = function() {
        if (twisterVanishTimer >= twisterVanishMaxTimer) {
            this.x = -1000;
            this.y = -1000;
            this.isAlive = false;
            twisterSpawnTimer = 0;
            twisterVanishTimer = 0;
            if (this.particles != null) {
                ParticleSystem.remove(this.particles);
                this.particles = null;
            }
        } else {
            twisterVanishTimer += 0.03;
        }
    }

    this.moveTwister = function() {
        var hitC = getTrackAtPixelCoord(this.x, this.y);
        switch (hitC) {
            case ARROW_U:
                if (this.speedY > 0) {
                    this.speedY *= -1;
                }
                break;
            case ARROW_D:
                if (this.speedY < 0) {
                    this.speedY *= -1;
                }
                break;
            case ARROW_L:
                if (this.speedX > 0) {
                    this.speedX *= -1;
                }
                break;
            case ARROW_R:
                if (this.speedX < 0) {
                    this.speedX *= -1;
                }
                break;
        }

        var prevX = Math.floor(this.x - this.speedX);
        var prevY = Math.floor(this.y - this.speedY);
        var AdjacentXTile = getTrackAtPixelCoord(prevX, this.y);
        var AdjacentYTile = getTrackAtPixelCoord(this.x, prevY);

        this.col = Math.floor(this.x / TRACK_W);
        this.row = Math.floor(this.y / TRACK_H);

        var tileType = getTrackAtPixelCoord(this.x, this.y);

        var worldTileUnderTwister = trackTileToIndex(this.col, this.row);

        switch (tileType) {

            case TRACK_MOUNTAINS:
                trackGrid[worldTileUnderTwister] = TRACK_MOUNTAINS_DOWN;
                break;

            case TRACK_CITY:
                trackGrid[worldTileUnderTwister] = TRACK_CITY_DOWN;
                break;

            case TRACK_CITY_LONDON:
                trackGrid[worldTileUnderTwister] = TRACK_CITY_LONDON_DOWN;
                break;

            case TRACK_TREE:
                trackGrid[worldTileUnderTwister] = TRACK_TREE_DOWN;
                trackNeedsRedraw = true;
                break;

            case TRACK_CITY_PARIS:
                trackGrid[worldTileUnderTwister] = TRACK_CITY_PARIS_DOWN;
                break;
        } //end switch

        var testChangeColRow = true;

        if (isTileTypeSolidForTwister(tileType) ||
            areTilesTooNear(this.col, this.row, landmarkTile.col, landmarkTile.row, 3) ||
            areTilesTooNear(this.col, this.row, playerStartTile.col, playerStartTile.row, 3)) {

            if (this.x != prevX) { //came from the side
                if (isTileTypeSolidForTwister(AdjacentXTile) == false) {
                    this.speedX *= -1;
                    testChangeColRow = false
                }
            }
            if (this.y != prevY) { //came from the top or bottom
                if (isTileTypeSolidForTwister(AdjacentYTile) == false) {
                    this.speedY *= -1;
                    testChangeColRow = false
                }
            }
            if (testChangeColRow) { //came from top or bottom and from the side
                this.speedX *= -1;
                this.speedY *= -1;
            }
        } //end if


        //randomize twister movement  
        if (twisterRnadomMoveTimer > maxTwisterRandomMoveTimer) {
            twisterRnadomMoveTimer = 0.0;
            if (Math.random() > 0.5) {
                var i = 1;
            } else {
                i = -1;
            }
            if (Math.random() > 0.5) {
                var t = 1;
            } else {
                t = -1;
            }
            if (isTileTypeSolidForTwister(tileType) == false ||
                areTilesTooNear(this.col, this.row, landmarkTile.col, landmarkTile.row, 3) == false ||
                areTilesTooNear(this.col, this.row, playerStartTile.col, playerStartTile.row, 3) == false) {
                this.speedX *= i;
                this.speedY *= t;
                twisterTimer = 2;
            }
        } else {
            twisterRnadomMoveTimer += 0.03;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.particles != null) {
            this.particles.xOffset += this.speedX;
            this.particles.yOffset += this.speedY;
        }

    } //end this.move

} //end twisterClass
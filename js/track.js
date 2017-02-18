// track constants and variables
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var worldMap0 =  [
0, 0, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
6, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, -3, -3, -3, -3, -3, -3, -3, -3, -3,
6, 0, 0, 0, 0, 4, 4, 4, 4, 4, 1, -2, 4, -4, 4, 0, -2, 0, 4, -4,
6, 6, 6, 0, 0, 0, 4, 4, 4, 1, 1, -2, 4, -4, 0, 4, -2, 4, 4, -4,
-1, -1, -1, -1, -1, -1, 0, 4, 4, 4, 4, -2, 4, -4, 4, 4, -2, 0, 4, -4,
6, 6, 6, 6, 0, 0, 0, 4, 4, 4, 4, -2, 0, -4, 4, 0, -2, 4, 0, -4,
6, 6, 6, 6, 6, 0, 4, 4, 4, 4, 4, -2, 4, -4, 1, 1, 1, 1, 0, -4,
6, 6, 6, 6, 6, 0, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
6, 6, 6, 6, 6, -2, 0, 4, 4, 4, 1, 1, 1, -2, -2, 0, -4, -1, -1, -1,
6, 6, 6, 6, 6, -2, 0, 4, 4, 1, 1, 1, 1, -2, -2, 4, -4, 0, 0, 0,
-1, -1, -1, 6, 6, -2, 0, 0, 4, 1, 1, 1, 1, -2, -2, 4, 1, 1, 1, 1,
0, 0, 0, 6, 6, -2, 0, 0, 4, 4, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
0, 8, 0, 6, 6, 6, 6, 0, 0, 0, 1, 1, -3, -3, -3, 1, 1, 0, 0, 0,
0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 1, 1, -3, -3, -3, -2, -2, 0, 2, 0,
6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 1, 1, -3, -3, -3, -2, -2, 0, 0, 0, 0];
var worldMap1 = [
-2, -3, 3, 3, 3, 3, 3, 4, 4, 6, 6, 6, 6, 6, 6, 3, 4, 4, 4, 4,
-3, -2, 3, 3, 3, 3, 3, 4, 6, 6, 6, 6, 6, 6, 3, 3, 0, 2, 0, 3,
-1, -1, -1, 4, 4, -2, -2, -2, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 3,
-1, -1, -1, 4, 4, 4, 4, 6, 6, 6, 6, 3, 3, -2, -2, -2, 3, -1, -1, -4,
6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 3, 3, 6, 6, 6, 6, 6,
4, 4, 4, 6, 4, 4, 4, 4, 6, 6, -2, -1, -1, -4, 6, 6, 6, 6, 6, 6,
4, 4, 4, 4, 4, -3, -3, -3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, -3,
4, 4, 4, -3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, -4,
4, 4, 4, -3, 6, 6, -3, 6, 6, 6, 6, 5, -1, 6, 6, 6, 6, 3, 4, -4,
4, 7, 4, -2, 6, -2, 8, 6, 6, 6, 3, 5, -4, 3, 6, 6, 4, 4, 3, 3,
4, 4, 4, 4, 6, 6, 6, 6, 6, -1, 3, 5, -3, 6, 6, -3, 4, 4, 3, 3,
4, -4, -4, -4, 6, 6, 6, 6, 6, 5, 5, 6, 6, 6, -3, 4, 4, 3, 4, 7,
4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, -3, 4, 4, 3, 3, 4, 4,
6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, -4, -4, -4, 3, 3, -1, -4,
6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 6, 3, 3, -4, -4, -4, 3, 3, -4, -1, 1];

var worldMap2 = [
0, 0, -2, -3, -3, -4, 1, 1, 1, 0, 0, 0, 0, -3, -3, -3, -3, 0, 0, -4,
4, 0, -2, 5, 5, 1, 1, 1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 4, 4, -4,
4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, -4, -4, 0, 0, 4, 2, 4, 4,
6, 4, 1, 0, 0, -3, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 4, 4, 4, 0,
6, 6, 0, 0, 0, 0, 0, -2, 0, 0, 0, -3, 0, 1, 1, 1, 0, 0, 0, 0,
6, 6, 6, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1,
6, 6, 6, 6, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 5, 5, 1, 1,
6, 6, 6, 1, 1, 1, -1, 0, 0, 0, -4, 0, 0, 0, 0, 0, 0, 0, 4, -4,
6, 6, 6, -3, -2, 1, 1, -1, 0, 0, 0, 0, 0, 0, -4, 0, 4, 4, 4, -4,
6, 6, 6, -2, -3, -2, 1, 1, -2, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, -1,
6, 6, 6, 0, 0, 5, 5, 1, -2, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0,
6, 6, 0, 0, 3, 0, 5, 5, 1, 0, 0, 4, 4, 4, 4, 4, -3, -3, -3, 0,
4, 4, 0, 3, 3, 3, 0, 5, 1, 0, 4, 4, 4, 4, 0, 0, -2, 7, -4, 0,
1, 1, 4, 3, 3, 3, 3, -1, -4, 4, 4, 4, -4, 0, 0, 0, -1, -1, -1, 0, 4];
var worldMap3 = [
9, 9, 9, -4, 4, 4, -3, 4, 4, 4, -1, -1, 6, 6, 6, 6, -3, 6, 6, 6,
9, 9, 9, -4, 4, 4, -3, 4, 4, 0, 0, 6, 6, 6, 6, 0, -3, 0, 2, 6,
9, 9, 9, 0, 4, 4, 0, 0, 0, 6, 6, 6, 6, -2, -2, 0, 0, 0, -1, -1,
-4, -4, 0, 0, 0, 0, 0, -2, 6, 6, 6, 0, 0, 9, 0, 9, 0, 9, 9, 9,
9, 9, 9, 0, 9, 0, -3, 6, 6, 6, 0, 0, 9, 9, 0, 9, 0, 9, 9, 9,
9, 9, 9, 0, 0, -2, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, -2, 0, -4, -4,
9, 9, 0, 0, 0, 6, 6, 6, 0, 0, -2, -2, 4, -3, -3, 9, 0, 9, 9, 9,
-2, -2, 0, 0, 6, 6, 6, 0, 0, 9, -2, -2, 4, -3, -3, 9, 0, 9, 9, 9,
9, 9, 0, 6, 6, 6, 0, 0, 9, 9, 4, 4, 4, 4, 4, 9, 0, 9, 9, 9,
9, 9, 0, 6, 6, 0, 0, 9, 9, 9, 4, 4, 8, 4, 4, 9, 0, 9, 9, 9,
-4, -4, 0, -2, -2, 0, 0, 0, 0, 0, 4, 4, 6, 4, 4, 0, -1, 0, -2, -2,
9, 9, 0, 6, 6, 0, 0, 9, 9, 9, -1, -1, 4, -4, -4, 9, 0, 9, 9, 9,
9, 9, 0, 6, 6, 0, 0, 9, 9, 9, -1, -1, 4, -4, -4, 9, 0, 9, 9, 9,
9, 9, -1, 6, 6, -4, -3, 9, 9, 9, 9, 9, 9, 9, 9, 9, -1, 9, -1, -4,
9, 9, -1, 6, 6, -4, -3, 9, 9, 9, 9, 9, 9, 9, 9, 9, -1, 9, -4, -1, 8];

var worldMap_london =  [
9, 9, 9, 9, 9, 9, 9, 9, -1, 4, 4, 4, 4, 4, 4, -2, 10, 10, 10, 10,
9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 4, 4, 4, 5, 9, 9, 9, 9,
4, 4, 0, 4, 4, 4, 4, 4, 0, 9, 0, 9, 9 ,9, 0, 0, -2, -2, 9, 9,
4, 4, -4, 4, 4, 4, 4, 4, -1, 10, 0, 10, 10, 0, 0, 0, 0, 6, 6, 6,
7, 4, -4, 4, 4, 4, 4, 4, -1, 0, 0, 0, 0, -2, 0, 0, 0, 6, 0, 0,
4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 0, 0, -1, 6, 0, 10,
10, 9, 9, 9, 9, 9, 4, 4, 4, 4, 4, 4, 4, 0, -1, -1, 6, -4, 10, 9,
10, 9, 9, 9, 9, 9, 0, 4, 4, 4, 4, 4, 0, 0, -1, 6, 6, -4, 10, 9,
0, 10, 10, 10, 10, 10, 0, 0, -4, 0, -1, 0, 0, 0, 6, 6, 10, 10, 10, 10,
-2, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4, 6, 6, 6, 10, 10, 10, 10,
0, 9, 9, 9, 9, 9, 9, 0, -3, 0, -1, 0, 6, 6, 0, 0, 0, 4, 4, 0,
-4, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 6, 6, 0, 0, -3, -3, -3, -3, 0,
0, 6, 5, 6, 4, 4, 4, 6, 0, 0, 6, 6, 0, 0, 0, -2, 0, 0, 0, -2,
0, 6, 0, 4, 4, 4, 4, 0, 6, 6, 6, 8, 0, 4, 10, 10, 10, 10, 2, 10,
-4, 6, 0, 4, 4, 4, 4, -2, 5, 0, -2, 5, -4, 4, 4, 4, 4, 4, -2, 10, 1];

var worldMap_pinball_machine = [
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
1, -3, -3, 0, 0, 0, 0, -2, -1, -4, 0, 0, 0, 0, 0, 0, 0, -2, -2, 1, 
1, -3, -3, 0, 0, -2, 0, 0, 0, 0, 0, -4, 0, 0, 0, 0, 0, -2, -2, 1, 
1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, -3, 1, 
1, 0, -1, 0, 0, 1, 1, 0, -3, 0, 1, 1, 0, 0, -1, 0, 0, 1, -3, 1, 
1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -3, 1, 
1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1, 
1, -1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 
1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 
1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, -1, 1, 
1, 0, 0, 1, -2, -2, 0, 0, 0, 0, 0, -4, -4, 1, 0, 0, 0, 1, -1, 1, 
1, 0, 0, 0, 1, -2, -2, 0, 0, 0, -4, -4, 1, 0, 0, 0, 0, 1, -1, 1, 
1, 0, 0, 0, 0, 1, -2, -1, 0, -1, -4, 1, 0, 0, 0, 0, 0, 1, 2, 1, 
1, 1, 1, 1, 1, 1, 1, -1, 8, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3];

var worldMap_spiral = [
7, 6, 4, -1, -2, 0, 0, 0, 0, 0, 0, 0, 0, -2, -2, -2, -3, 6, 6, 7, 
6, -1, 0, -2, 0, 0, 0, -4, 1, 0, 0, 1, 0, 1, 0, 0, 0, 4, 6, 6, 
4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 4, 4, 4, 
-3, 0, 0, 0, 1, 1, -3, -4, -4, -4, -4, -4, -4, 1, -3, -2, 0, 0, -2, -3, 
-3, 0, -1, -1, 1, 1, -3, 0, 0, 0, 0, 0, -1, 1, 1, 1, 0, 0, -3, 4, 
0, 0, 0, 1, 6, 1, -3, 0, -2, -2, -3, 0, -1, 1, 5, 0, 0, 0, 4, 4, 
0, 0, 0, 1, 1, 1, -3, 0, -1, 2, -3, 0, -1, 1, -4, -1, 0, 0, -2, 4, 
-2, 0, -2, 6, 1, 1, -3, 0, -1, -4, -4, 0, -1, 1, 1, 1, 1, 0, 0, 4, 
-1, 0, -3, 6, 5, 1, 5, 0, 0, 0, 0, 0, -1, 1, 4, 4, -4, 0, -3, -3, 
0, 0, 4, 1, 5, 1, 5, 5, -2, -2, -2, -2, -1, 1, 1, 0, 0, 0, -3, -3, 
0, 0, 6, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 6, 
4, 0, 6, 1, 6, 1, 1, 1, -1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 6, 6, 
-1, -3, -1, 6, 1, 1, 1, 5, -1, 0, 0, 0, -4, 0, 0, 0, -3, 6, 6, 6, 
6, 6, 6, 6, 6, 6, 1, 5, -2, 0, 0, 0, 0, 1, 1, 0, 0, 6, 6, 6, 
5, -4, 6, 8, 6, 6, -4, 1, 1, 1, 1, 1, 1, 1, 1, 1, -4, 6, 6, 7, 1];

var worldMap_maze = [
0, 0, -4, 0, 0, 0, 0, -1, -1, 0, 0, 1, 0, -4, 0, 0, 0, 0, -2, 0, 
-3, 0, -4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 
-3, 0, -4, 0, 0, 1, 1, 1, -2, 0, -4, 1, 0, 0, 0, 0, 0, 0, -3, 0, 
-3, 0, 0, 0, -4, -3, -4, 1, 0, 0, 0, 1, -3, -3, 1, 1, 1, 0, 0, 0, 
0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, -4, 0, 0, 1, -1, -2, -2, -2, -2, 
1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, -4, 0, 0, 1, -1, 0, 0, 0, 0, 
1, 2, 0, 0, -2, -1, -2, 1, 1, 1, 1, 1, 1, 1, 1, -1, 0, 1, 1, 1, 
1, 1, 1, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, -4, -4, -4, -2, 1, 7, 
-3, -3, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, -4, -4, -4, -2, 0, -1, 
-3, -3, 0, 0, 0, -2, -2, 1, 1, 5, 5, 5, 5, 5, 1, -1, -1, 0, 0, -3, 
-3, -3, 0, 0, 0, -2, -2, -2, 1, 5, 5, 5, 5, 5, 1, -1, -1, 0, 0, -3, 
1, 1, 0, 0, 0, -2, -2, -2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 
0, 0, 0, 0, 0, 1, -3, -3, -4, 0, -2, 0, -3, 0, 0, 0, -4, 0, 0, 0, 
0, 8, 0, 0, 0, 1, -3, -3, -4, 0, -2, 0, 0, 0, 0, 0, -4, 0, 0, -4, 
0, 0, 0, 0, 0, 1, -3, -3, -4, 0, -2, 0, 0, 0, -1, 0, -4, 0, 0, 1, 4];

var worldMap_openworld = [
-4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, -2, 
0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, -2, -2, 0, 0, 0, -3, 1, -1, 0, 0, 0, -4, -4, 0, 0, 0, 0, 
-1, 0, 0, -2, -2, 0, 0, 0, -3, 1, -1, 0, 0, 0, -4, -4, 0, 0, 0, -3, 
-1, 0, 0, 0, 0, 0, 0, 0, -3, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, -3, 
-1, 0, 0, -3, -3, 0, 0, 0, -3, 1, -1, 0, 0, 0, -3, -3, 0, 0, 0, -3, 
-1, 0, 0, 1, 1, 0, 0, 0, -4, 1, -2, 0, 0, 0, 1, 1, 0, 0, 0, -3, 
-3, 0, 0, 1, 1, 0, 0, 0, 8, 1, 2, 0, 0, 0, 1, 1, 0, 0, 0, -1, 
-3, 0, 0, -1, -1, 0, 0, 0, -4, 1, -2, 0, 0, 0, -1, -1, 0, 0, 0, -1, 
-3, 0, 0, 0, 0, 0, 0, 0, -1, 1, -3, 0, 0, 0, 0, 0, 0, 0, 0, -1, 
-3, 0, 0, -4, -4, 0, 0, 0, -1, 1, -3, 0, 0, 0, -2, -2, 0, 0, 0, -1, 
0, 0, 0, -4, -4, 0, 0, 0, -1, 1, -3, 0, 0, 0, -2, -2, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, -1, 1, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
-2, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, -4, 0];

var levelOrder = [worldMap0,worldMap1,worldMap2,worldMap3,worldMap_london,worldMap_pinball_machine,worldMap_spiral,worldMap_maze,worldMap_openworld];

var levelName = ["Easter Island","New York","Piza","Paris","London","Pinball Machine","Spiral Death","Maze Daze","Open World"];

var trackNeedsRedraw = true;

var currentLevelIdx = 0;
var trackGrid = []; // live play/edit scratch copy
var particleGrid = [];

const TRACK_ROAD = 0;
const TRACK_MOUNTAINS = 1;
const TRACK_PLAYER = 2;
const TRACK_CITY = 3;
const TRACK_TREE = 4;
const TRACK_HEAT = 5;
const TRACK_ICE = 6;
const TRACK_COOLDOWN = 7;
const TRACK_GOAL_LANDMARK = 8;
const TRACK_CITY_PARIS=9;
const TRACK_CITY_LONDON=10;
const TRACK_HIGHEST_VALID_NUMBER = TRACK_GOAL_LANDMARK;
const TRACK_OUT_OF_BOUNDS = 999; // no tile or track, just a return value
const TRACK_MOUNTAINS_DOWN=11;
const TRACK_CITY_DOWN = 31;
const TRACK_CITY_PARIS_DOWN=91;
const TRACK_CITY_LONDON_DOWN=101;
const TRACK_TREE_DOWN = 41;
const ARROW_U = -1;
const ARROW_R = -2;
const ARROW_D = -3;
const ARROW_L = -4;

function displayTrackAsHTMLString() {
  var levStr = "";
  levStr += "var worldMap"+(currentLevelIdx+1)+" = [";
  for(i=0;i<trackGrid.length;i++) {
    if(i%TRACK_COLS==0) {
      levStr += "<br/>";
    }
    levStr += trackGrid[i] + (i<trackGrid.length-1 ? ", " : "];");
  }
  document.getElementById("levelOutput").innerHTML = levStr;
}

function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS*tileRow);
}

function getTrackAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TRACK_W;
  var tileRow = pixelY / TRACK_H;

  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the ball is within any part of the track wall
  if(tileCol < 0 || tileCol >= TRACK_COLS ||
     tileRow < 0 || tileRow >= TRACK_ROWS) {
     return TRACK_OUT_OF_BOUNDS; // avoid invalid array access, treat out of bounds as wall
  }
   
  var trackIndex = trackTileToIndex(tileCol, tileRow);
  return trackGrid[trackIndex];

}//end getTrackAtPixelCoord

function isTileTypeSolid(tileType){
  return(tileType != TRACK_ROAD && tileType!=TRACK_TREE);
}
function isTileTypeSolidForTwister(tileType){
  return(tileType == TRACK_GOAL_LANDMARK || tileType==TRACK_PLAYER || tileType==TRACK_OUT_OF_BOUNDS);
}

function findTileCoordsForTileType(tileType){
  var trackIndex = 0;
  for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) { // deal with one row at a time
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) { // left to right in each row
      if(trackGrid[ trackIndex ] == tileType) {
        return {col:eachCol,row:eachRow};
      }
    trackIndex++
    }
  }
}

function drawTrackSpriteCards() {
  var trackIndex = 0;
  var trackLeftEdgeX = 0;
  var trackTopEdgeY = 0;
  var parPt;
  for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) { // deal with one row at a time

    trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge

    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) { // left to right in each row

      var trackTypeHere = trackGrid[ trackIndex ]; // getting the track code for this tile
          
      if(trackTypeHere == TRACK_GOAL_LANDMARK) {
        parPt = worldCoordToParCoord(trackLeftEdgeX+TRACK_W/2,trackTopEdgeY+TRACK_H);
        drawAtBaseScaledSheet(landmarksPic,currentLevelIdx,
          parPt.x,parPt.y,parPt.scaleHere)
      } else if(track3dPics[trackTypeHere] != undefined) {
        parPt = worldCoordToParCoord(trackLeftEdgeX+TRACK_W/2,trackTopEdgeY+TRACK_H);
        drawAtBaseScaled(track3dPics[trackTypeHere],
          parPt.x,parPt.y,parPt.scaleHere)
      }

      trackIndex++; // increment which index we're going to next check for in the track
      trackLeftEdgeX += TRACK_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol

    trackTopEdgeY += TRACK_H; // jump horizontal draw position down by one full tile height

  } // end of for eachRow
} // end of drawTracks()

function drawTracks() {
  var trackIndex = 0;
  var trackLeftEdgeX = 0;
  var trackTopEdgeY = 0;

  for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) { // deal with one row at a time

    trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge

    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) { // left to right in each row

      var trackTypeHere = trackGrid[ trackIndex ]; // getting the track code for this tile

      if(trackTypeHere < 0) {
        var arrowType = -trackTypeHere;
        // first draw default ground under the arrow
        canvasContext.drawImage(trackSheet,
          trackGrid[trackGrid.length-1] * TRACK_W, 0,
          TRACK_W, TRACK_H,
          trackLeftEdgeX, trackTopEdgeY,
          TRACK_W, TRACK_H);
          // draw arrow
          canvasContext.drawImage(trackSheet,
              (ARROW_ANIM_FRAMES+1) * TRACK_W, arrowType* TRACK_H,
              TRACK_W, TRACK_H,
              trackLeftEdgeX, trackTopEdgeY,
              TRACK_W, TRACK_H);

        /*if(!showParticles) {
          // draw conveyor belt (animated)
          canvasContext.drawImage(trackSheet,
              arrowAnimFrame * TRACK_W, arrowType* TRACK_H,
              TRACK_W, TRACK_H,
              trackLeftEdgeX, trackTopEdgeY,
              TRACK_W, TRACK_H);

        }*/
      } else {
        var tileFlatIdx;
        if(trackTypeHere == 0) {
          tileFlatIdx = trackGrid[trackGrid.length-1];
        } else if(trackTypeHere != TRACK_GOAL_LANDMARK) {
          tileFlatIdx = trackTypeHere;
        } else {
          tileFlatIdx = TRACK_CITY;
        }
        
        canvasContext.drawImage(trackSheet,
            tileFlatIdx * TRACK_W, 0,
            TRACK_W, TRACK_H,
            trackLeftEdgeX, trackTopEdgeY,
            TRACK_W, TRACK_H);
      }

      if(isInEditor && trackIndex == editIdx) {
        colorRectOutline(trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H, 'yellow');
      }
      trackIndex++; // increment which index we're going to next check for in the track
      trackLeftEdgeX += TRACK_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol

    trackTopEdgeY += TRACK_H; // jump horizontal draw position down by one full tile height

  } // end of for eachRow
} // end of drawTracks()

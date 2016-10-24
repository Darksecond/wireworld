'use strict';

var Wireworld = function(board){
  this.board = board;
};
Wireworld.prototype = {
  constructor: Wireworld,

  step: function() {
    var newBoard = [];
    for(var y=0;y<this.board.length;y++) {
      newBoard[y] = [];
      for(var x=0;x<this.board[y].length;x++) {
        var cell = this.board[y][x];
        switch(cell) {
          case 0:
            newBoard[y][x] = 0;
            break;
          case 1:
            newBoard[y][x] = 2;
            break;
          case 2:
            newBoard[y][x] = 3;
            break;
          case 3:
            var count = this._neighbourCount(x,y,1);
            if(count == 1 || count == 2) {
              newBoard[y][x] = 1;
            } else {
              newBoard[y][x] = 3;
            }
            break;
        };
      }
    }
    this.board = newBoard;
  },
  
  log: function() {
    console.group();
    for(var y = 0; y < this.board.length; y++) {
      console.log(this.board[y]);
    }
    console.groupEnd();
  },

  get: function(x, y) {
    while(y < 0) y = this.board.length + y;
    while(y >= this.board.length) y = y - this.board.length;

    while(x < 0) x = this.board[y].length + x;
    while(x >= this.board[y].length) x = x - this.board.length;

    //console.log(x,y);
    return this.board[y][x];
  },

  _neighbourCount: function(x,y,state) {
    var count = 0;
    if(this.get(x-1, y-1) == state) count++;
    if(this.get(x-1, y  ) == state) count++;
    if(this.get(x-1, y+1) == state) count++;
    if(this.get(x  , y-1) == state) count++;
    if(this.get(x  , y+1) == state) count++;
    if(this.get(x+1, y-1) == state) count++;
    if(this.get(x+1, y  ) == state) count++;
    if(this.get(x+1, y+1) == state) count++;
    return count;
  },

  draw: function(ctx) {
    for(var y=0; y < this.board.length; y++) {
      for(var x=0; x < this.board[y].length; x++) {
        var cell = this.get(x,y);
        switch(cell) {
          case 0:
            ctx.fillStyle = 'black';
            break;
          case 1:
            ctx.fillStyle = 'blue';
            break;
          case 2:
            ctx.fillStyle = 'red';
            break;
          case 3:
            ctx.fillStyle = 'orange';
            break;
        }
        var scale = 10;
        ctx.fillRect(x*scale,y*scale,scale,scale);
      }
    }
  }
};

var board = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,1,2,3,0,0,0],
  [3,0,3,0,0,0,3,3,3],
  [3,0,0,3,3,3,0,0,0],
  [3,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
];
var screen = document.querySelector('#screen');
var context = screen.getContext('2d');
var world = new Wireworld(board);

var callback = function() {
  world.draw(context);
  world.step();
};
setInterval(callback,75);

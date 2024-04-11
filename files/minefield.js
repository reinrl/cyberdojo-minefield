'use strict';

function getHints(mineGrid) {
  const hintGrid = [];
  mineGrid.forEach((row, index) => {
    let hintRow = "";
    for(let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      if(row[columnIndex] === "*") {
        hintRow += "*";
      } else if (row[columnIndex] === ".") {
        let adjacentMineCount = 0;
        if(mineGrid[index - 1]) {
          if(mineGrid[index - 1][columnIndex - 1] === "*") {
            adjacentMineCount++;
          }
          if(mineGrid[index - 1][columnIndex] === "*") {
            adjacentMineCount++;
          }
          if(mineGrid[index - 1][columnIndex + 1] === "*") {
            adjacentMineCount++;
          }
        }

        if(mineGrid[index][columnIndex - 1] === "*") {
          adjacentMineCount++;
        }
        if(mineGrid[index][columnIndex + 1] === "*") {
          adjacentMineCount++;
        }

        if(mineGrid[index + 1]) {
          if(mineGrid[index + 1][columnIndex - 1] === "*") {
            adjacentMineCount++;
          }
          if(mineGrid[index + 1][columnIndex] === "*") {
            adjacentMineCount++;
          }
          if(mineGrid[index + 1][columnIndex + 1] === "*") {
            adjacentMineCount++;
          }
        }
        hintRow += adjacentMineCount;
      } else {
        throw "Invalid character";
      }
    }
    hintGrid.push(hintRow);
  });

  return hintGrid;
}

const getHintsFromLocation = (location, bombGrid) => {
  if(bombGrid[location[0]][location[1]] === "*") {
    throw "kapowee!";
  } else {
    let myReturn = ["____","____","____","____"];
    const hintGrid = getHints(bombGrid);
    myReturn[location[0]][location[1]] = hintGrid[location[0]][location[1]];
    if(hintGrid[location[0]][location[1]] === "0") {
      myReturn = getHintsFromLocationRecursive(location, hintGrid, myReturn);
    }
  }
  return myReturn;
}

const getHintsFromLocationRecursive = (location, hintGrid, currentReturnGrid) => {
  const neighbors = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
  neighbors.forEach((neighbor) => {
    const x = location[0] + neighbor[0];
    const y = location[1] + neighbor[1];
    if(isOnTheMap({xMax: 3, yMax:3}, {x: x, y: y})) {
      if(hintGrid[x][y] !== "*") {
        currentReturnGrid[x][y] = hintGrid[x][y];
      }
    }
  });
 return currentReturnGrid;
}

function isOnTheMap(gridSize, roverPosition) {
  // CHAINING WHAT??!?!?!?!
  //return 0 <= roverPosition.x <= gridSize.xMax && 0 <= roverPosition.y <= gridSize.yMax;
 
  if (roverPosition.x < 0 || roverPosition.x > gridSize.xMax) {
    return false;
  } else if (roverPosition.y < 0 || roverPosition.y > gridSize.yMax) {
    return false;
  } else {
    return true;
  }
}

module.exports = { getHints, getHintsFromLocation };

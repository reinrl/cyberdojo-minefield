'use strict';

const testCase1 = {
  input: ["*...","..*.","...."],
  output: ["*211","12*1","0111"]
}

const testCase2 = {
  input: [
    "...*",
    "....",
    "....", 
    "*..."],
  output: [
    "001_",
    "0011",
    "1100",
    "_100"]
}

const { getHints, getHintsFromLocation } = require('./minefield');

describe('the mine field', () => {
  it('correctly provides a hint map for a given mine grid', () => {
    expect(getHints(testCase1.input)).toEqual(testCase1.output);
  });

  it('correctly provides a hint map for a given mine grid location', () => {
    expect(getHintsFromLocation([0,0], testCase2.input)).toEqual(testCase2.output);
  });
});

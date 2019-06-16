'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CONGRAT_GAP_X = 20;
var CONGRAT_GAP_Y = 25;
var FONT_GAP = 16;
var GRAPH_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var GRAPH_TEXT_GAP = 5;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var graphTop = FONT_GAP + CONGRAT_GAP_Y * 3;

var createCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMax = function (data) {
  var max = data[0];

  for (var i = 1; i < data.length; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
};

var getRandomSaturationColor = function () {
  var saturation = Math.round(Math.random() * 100);

  return 'hsl(240, ' + saturation + '%, 50%)';
};

var getColor = function (name) {
  return name === 'Вы' ? PLAYER_COLOR : getRandomSaturationColor();
};

window.renderStatistics = function (ctx, names, times) {
  createCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + CONGRAT_GAP_X, FONT_GAP + CONGRAT_GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + CONGRAT_GAP_X, FONT_GAP + CONGRAT_GAP_Y * 2);

  var maxTime = getMax(times);

  for (var i = 0; i < names.length; i++) {
    var graphHeight = times[i] * GRAPH_MAX_HEIGHT / maxTime;
    var playerColor = getColor(names[i]);
    var playerTime = Math.round(times[i]);

    ctx.fillStyle = playerColor;
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, graphTop + (GRAPH_MAX_HEIGHT - graphHeight), COLUMN_WIDTH, graphHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(playerTime, CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, graphTop + (GRAPH_MAX_HEIGHT - graphHeight) - GRAPH_TEXT_GAP);
    ctx.fillText(names[i], CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, graphTop + GRAPH_MAX_HEIGHT + FONT_GAP + GRAPH_TEXT_GAP);
  }
};

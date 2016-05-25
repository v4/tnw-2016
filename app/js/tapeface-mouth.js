

var mouth = (function () { // eslint-disable-line
  
  var module = {}; // eslint-disable-line
  
  module.create = function (container) {
  }

  module.get = function () {
  }

  module.start = function () {
  }

  return module;
}());


$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  audioElement.audioCtx = true;
  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(20);

  var svgHeight = '50';
  var svgWidth = '50';
  var barPadding = '2';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('.face-oscilloscope', svgHeight, svgWidth)
    // svg.attr('transform', 'translate(200,20)');

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     // .attr('y', function(d, i) {
     //  return 0;
     // })
     // .attr('height', function(d,i) {
     //    return d; 
     // })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return d / 10
        })
        .attr('height', function(d) {
           return (d / 10) ;
        })
        .attr('fill', function(d) {
           // return 'rgb(0, 0, ' + d + ')';
           return '#3541db';
        });
  }

  // Run the loop
  renderChart();

});
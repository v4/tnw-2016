

var mouth = (function () {
  
  var module = {};
  var audioSrc = null;

  module.create = function (audioElement, target, options) {

    //TODO for options: width, barPadding

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // var audioElement = document.getElementById(audioElement);
    audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    audioElement.audioCtx = true;
    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var frequencyData = new Uint8Array(options.frequencyBins);

    var svgHeight = options.height;
    var svgWidth = options.width;
    var barPadding = options.barPadding;

    function createSvg(parent, height, width) {
      return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    var svg = createSvg(target, svgHeight, svgWidth)
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
             return options.fillColor;
          });
    }

    // Run the loop
    renderChart();
  }

  module.get = function () {
  }

  module.start = function () {
    
  }
  
  module.update = function () {
    audioElement.load();
  }
  
  // module.stop = function (params) {
  //   if (audioSrc) audioSrc.disconnect();
  // }
  
  return module;

}());
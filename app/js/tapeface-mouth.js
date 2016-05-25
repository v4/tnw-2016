

var mouth = (function () {
  
  var module = {};
  var audioSrc = null;

  module.create = function (audioElement, target, options) {

    module.svg = null;
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

    // local ref of options
    var svgHeight = options.height;
    var svgWidth = options.width;
    var barPadding = options.barPadding;

    // set fillColor to module for later changes
    module.fillColor = options.fillColor;

    function createSvg(parent, height, width) {
      return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    module.svg = createSvg(target, svgHeight, svgWidth)
      // svg.attr('transform', 'translate(200,20)');
    
    module.scale = d3.scale.linear()
    .range([svgHeight, 0]);
    module.scale.domain([255,0]);
    // Create our initial D3 chart.
    module.svg.selectAll('rect')
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
    module.renderChart = function () {
       requestAnimationFrame(module.renderChart);

       // Copy frequency data to frequencyData array.
       analyser.getByteFrequencyData(frequencyData);

       // Update d3 chart with new data.
       module.svg.selectAll('rect')
          .data(frequencyData)
          .attr('y', function(d) {
            let y = ((svgHeight / 2) - module.scale(d)) + (module.scale(d) / 2);
            return y;
          })
          .attr('height', function(d) {
             return module.scale(d);
          })
          .attr('fill', function(d) {
             // return 'rgb(0, 0, ' + d + ')';
             return module.fillColor;
          });
    }
  }

  module.start = function () {
    module.renderChart();    
  }
  
  module.update = function () {
    audioElement.load();
  }

  module.setFillColor = function (newFillColor) {
    module.fillColor = newFillColor;
  } 

  return module;

}());
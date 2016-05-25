

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
      d3.selectAll('svg').remove();
      return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    module.svg = createSvg(target, svgHeight, svgWidth)
      // svg.attr('transform', 'translate(200,20)');

    let f0 = new Uint8Array(options.frequencyBins);
    let f1 = new Uint8Array(options.frequencyBins);
    analyser.getByteFrequencyData(f0);
    analyser.getByteFrequencyData(f1);
    
    let arr = new Uint8Array(concatBuffers(f0, f1.reverse()));
    module.scale = d3.scale.linear()
    .range([svgHeight, 0]);
    module.scale.domain([255,0]);
    // Create our initial D3 chart.
    module.svg.selectAll('rect')
       .data(arr)
       .enter()
       .append('rect')
       .attr('x', function (d, i) {
          return i * (svgWidth / (frequencyData.length * 2));
       })
       // .attr('y', function(d, i) {
       //  return 0;
       // })
       // .attr('height', function(d,i) {
       //    return d; 
       // })
       .attr('width', svgWidth / (frequencyData.length * 2) - barPadding);

    // Continuously loop and update chart with frequency data.
    module.renderChart = function () {
       requestAnimationFrame(module.renderChart);

       // Copy frequency data to frequencyData array.
       let f0 = new Uint8Array(options.frequencyBins);
       let f1 = new Uint8Array(options.frequencyBins);
       analyser.getByteFrequencyData(f0);
       analyser.getByteFrequencyData(f1);
       
       let arr = new Uint8Array(concatBuffers(f0, f1.reverse()));
       // Update d3 chart with new data.
       module.svg.selectAll('rect')
          .data(arr)
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

var concatBuffers = function(buffer1, buffer2) {
  // console.log(buffer1, buffer2);
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};
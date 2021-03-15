function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var selector1 = d3.select("#dropOptions");
  // Use the list of sample names to populate the select options
  d3.json("static/js/samples.json").then((data) => {
    var sampleNames = data.names;
    console.log(data)
    
// old for each to append samples to selector tag for old dropdown
    // sampleNames.forEach((sample) => {
    //   selector
    //     .append("option")
    //     .text(sample)
    //     .property("value", sample);
    // });
        
    sampleNames.forEach((sample) => {
  // jquery selector append a tag with the data value = to the sample id and a divider line
      $('.dropdown-menu').append(`<a data-value="${sample}" class="dropdown-item">${sample}</a> <div class="dropdown-divider"></div>`)

    });
// jquery selector function, on click of a number in dropdown bar, run the option changed function with the value selected.
    $('.dropdown-menu a').click(function(){
    let sampleValue = $(this).attr('data-value')
    $("#navbarDropdown").text("Subject Number: " + $(this).attr('data-value'));
    optionChanged(sampleValue)
    });
// for the search form, prevent reloading the page and set the search value = to the input and call option changed function
    $(`#searchForm`).submit(function(e){
      e.preventDefault();
      let searchValue = $(`#searchInput`).val()
      optionChanged(searchValue)
      console.log(searchValue)
    })

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    $("#navbarDropdown").text("Subject Number: " + firstSample);
  });
}

// Initialize the dashboard
init();




// hide buttons
$("#option1").click(function(){
  let barChart = $("#bar")
  toggleStyle(barChart)
  // $("#bar").toggle();
});
$("#option2").click(function(){
  let gaugeChart = $("#gauge")
  toggleStyle(gaugeChart)
  // $("#gauge").toggle();
});
$("#option3").click(function(){
  let bubbleChart = $("#bubble")
  toggleStyle(bubbleChart)
  // $("#bubble").toggle();
});
function removeStyle(chart){
  chart.removeAttr("style")
};

function toggleStyle(chart) {
  
  if (chart.css("visibility") === "hidden") {
    chart.css("visibility","visible");
  } else {
    chart.css("visibility", "hidden");
  }
}





function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}





// Demographics Panel 
function buildMetadata(sample) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      // PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      PANEL.append("li.list-group-item").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("static/js/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    var metaData = data.metadata;
    console.log(samples)
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var metaDataArray = metaData.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // console.log(result)
    metaDataSample= metaDataArray[0];
    // console.log(metaDataSample)
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let wfreq = metaDataSample.wfreq;
    let ids = result.otu_ids;
    let labels = result.otu_labels;
    let values = result.sample_values;
    // console.log(wfreq)
    // console.log(ids.slice(0,10))
    console.log(values.slice(0,10))
    // console.log(labels)
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // var yticks = ids.sort((a,b) => values[a] - values[b]).reverse().slice(0,10)

    // var yticks = ids.map(sampleObj => {
    //   otu = "OTU "
    //   return otu + sampleObj
    // }).slice(0,10).reverse()

    var yticks = ids.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse()
   
    // var yticks = ids.slice(0,10)
    // console.log(yticks)
    

    
    // 8. Create the trace for the bar chart.
   
    var barData = [{
    x: values.slice(0,10).reverse(),
    y: yticks,
    text: labels.slice(0,10).reverse(),
    type:"bar",
    orientation: "h"
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
    title: {
      text: "Top 10 Bacteria Cultures Found",
      font: {
        color: "white"
      }
    },
    plot_bgcolor: "333333",
    paper_bgcolor: "333333",
    font:{
      color: "white"
    }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)

    // 1. Create the trace for the bubble chart.
    
    var bubbleData = [{
    x: ids,
    y: values,
    text: labels,
    mode: "markers",
    marker: {
      color: ids,
      size: values,
      colorscale: "Portland"},
    
    
   
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
    title: {
      text: "Bacteria Culters per Sample",
      font: {
        color: "white"
      }
    },
    plot_bgcolor: "333333",
    paper_bgcolor: "333333",
    yaxis: {
      tickcolor: "grey",
      tickwidth: 1,
      
      gridcolor: "grey",
      gridwidth: .25,
      
      zerolinecolor: "grey",
      zerolinewidth: 1,
    },
    xaxis: {
      tickcolor: "grey",
      tickwidth: .25,
      title: "OTU ID",
      gridcolor: "grey",
      gridwidth: 1,      
    },
    font: {
      color: "white"
    }

    };

    // 3. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
  

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {
                  color: "white"
                }
    },
      value: wfreq,
      type: "indicator",
      mode: "gauge+number",
      gauge: {axis: {range: [null, 10], tickmode: "auto", nticks: 6}, 
              bar: {color: "black"},
              steps: [
                {range: [0,2], color: "red"},
                {range: [2,4], color: "orange"},
                {range: [4,6], color: "yellow"},
                {range: [6,8], color: "lightgreen"},
                {range: [8,10], color: "green"}
              ]},
    
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      plot_bgcolor: "333333",
      paper_bgcolor: "333333",
      font: {
        color: "white"
      }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)



  });
}



Introduction
=========

This is a packaging-up and development of the plot window used in 6302View. The ultimate goal of this project is to package the plotting window object more properly into a modular js library for easier deployment.  In addition the following features to the 


## Methods ##

```
LWChart(div_id,width,height,x_range,y_range,num_traces,colors)
```

There are a number of inputs to this function, all of which must be specified (no defaults):

* `div_id`: The html DOM id of where you want to build the plot (valid string)
* `width`:  Width of plotter in pixels (integer)
* `height`: Height of plotter in pixels (integer)
* `x_range`: Number of data points to be displayed in intial rendering (integer)
* `y_range`: Initial y-axis range (two-long array: `[min_y, max_y]`)
* `num_traces`: Number of traces to plot (integer)
* `colors`: Colors for plots (array of strings...either hex values (e.g. `#00FF00` for bright green, for example or `green` and other standard D3-colors

There are three methods associated with the chart:

* `setup()`: Primarily an internal method that should not need to be called by a user
* `update()`: Rebuilds the plot if ranges or other aspects of it have changed (while saving data rendered so far). Also generally not meant to be used by user
* `step(values)`: Takes an array `values` that contains the next/newest set of data for the different traces to be plotted. Values must be in proper order, and the quantity of entries in the array must match the expected values for the plot.

An example set of supporting code would be:

```
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
<script src="./js/dualplot.js" ></script>
<link rel="stylesheet" href="./css/gui.css">
```

with a body of:
```
<body>
  <div id="plotbox"></div>
</body>
```

And then the following script in the document:

```
var plot = new LWChart("plotbox",300, 200,60,[0,1000],2,["red","blue"]);
```

Followed by some sort of call to `step` with appropriate data such as:

```
plot.step([2,3]);
```




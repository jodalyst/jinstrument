# Introduction
=========

This is a packaging-up and development of the plot window used in 6302View. The ultimate goal of this project is to package the plotting window object more properly into a modular js library for easier deployment.  In addition the following features to the 


**CAUTION: MULTIPLE VERSIONS OF THE PRIMARY FILES EXIST WITHIN THE SAME BRANCH AT THIS POINT! USE CAUTION WHEN BUILDING ON THE VERSIONS FOUND IN THE `js` FOLDER WHILE THIS NOTE IS PRESENT! **


## Methods/Objects

### `Time_Series` (note description below seriously defunct now)

*Visit the `time_series` folder for most recent version of code*

```
Time_Series(div_id,width,height,x_range,y_range,num_traces,colors, unique, socket=null){
```

There are a number of inputs to this function, all of which must be specified (no defaults):

* `div_id`: The html DOM id of where you want to build the plot (valid string)
* `width`:  Width of plotter in pixels (integer)
* `height`: Height of plotter in pixels (integer)
* `x_range`: Number of data points to be displayed in intial rendering (integer)
* `y_range`: Initial y-axis range (two-long array: `[min_y, max_y]`)
* `num_traces`: Number of traces to plot (integer)
* `colors`: Colors for plots (array of strings...either hex values (e.g. `#00FF00` for bright green, for example or `green` and other standard D3-colors
* `unique`: A unique (for the page) identifier for the jinstrument object that is to be generated (can be numbers or letters, but ideally no special characters)
* `socket`: a socket for connection, updating

There are three methods associated with the chart:

* `setup()`: Primarily an internal method that should not need to be called by a user
* `update()`: Rebuilds the plot if ranges or other aspects of it have changed (while saving data rendered so far). Also generally not meant to be used by user
* `step(values)`: Takes an array `values` that contains the next/newest set of data for the different traces to be plotted. Values must be in proper order, and the quantity of entries in the array must match the expected values for the plot.

An example set of supporting code would be:

```
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
<script src="./js/time_series.js" ></script>
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
var plot = new Time_Series("plotbox",300, 200,60,[0,1000],2,["red","blue"]);
```

Followed by some sort of call to `step` with appropriate data such as:

```
plot.step([2,3]);
```

### `Time_Parallel`

### `Numerical_Display`

Bring in:

```
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
<script src="./js/numerical_display.js" ></script>
<link rel="stylesheet" href="./css/gui.css">
```

and with a body of :

```
<body>
  <div id="pos_1"></div>
</body>
```

and then the following script in teh document:

```
var reporter_x = new Numerical_Reporter("pos_1","X Position",[-100,500],"red","black");
var reporter_y = new Numerical_Reporter("pos_1","Y Position",[50,250],"yellow","blue");
```

You can then simply update numbers in it like so:

```
reporter_x.step(Math.random());
reporter_y.step(Math.random());  
```

#### Arguments:

```
function Numerical_Reporter(div_id,title,range,color,bg_color, unique, socket=null){
```


* `div_id`: The DOM div where you want the thing to live
* `title`: The title you'd like to show up for your plot
* `range`: If you'd like to limit the displayed numerical range use this. It needs an array of `[low_limit,high_limit]`.  If you'd like to avoid using this, specify a `range` of `[,]`
* `color`: Color of the displayed font
* `bg_color`: Background color of the displayed font.
* `unique`: Unique identifier (used for id-ing divs, etc...)...up to user to make sure this is unique
* `socket`: a Websocket object (a la `socket.io.js`)


### `Toggle`

### `Slider`

The basic idea is an object that will link command sliders to an Alternator thing (Gonzo's job)

### `Joystick`

Things it needs:
    
    * X-Y Sensitivity (must have some sort of event it triggers)...need to think about how to generalize triggering of async events in general
    * Center-Return/Not-Center-Return Option




##Important!!

A copy of `socket.io.js` from <a href="https://github.com/socketio/socket.io-client" target="_blank">here</a> is being used for local development.

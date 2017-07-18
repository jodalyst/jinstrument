

## 7/12/2017:

div_render element (basically an unspecified blank div that you can shove crap into)...no assumptions...intended for real-time rendering of custom elements which we have no fixed module for.

## 7/14/2017:

This demo (Flask-based) is shows how you can pipe up a full HTML structure (here modifying the color of a div) into the div_render object...it is in a lot of ways the most minimal of the front-end graphics modules, where the user literally specifies the html they'd like to be rendered in the containing div...this could be used to generate custom interfaces that are not specified by the architecture such as TimeParallel or TimeSeries plots, etc...

## 7/18/2017:

Really make sure you are using the most up-to-date version of bokeh for the graphics_test.py render...in this one we're randomly generating a new bokeh plot and every second on the server, it creates a new bokeh plot which we then send up to the DivRender moulde 



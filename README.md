# Belly_button_diversity

![science](static/images/vectorstock_25808029.png)
*****
*****

* By: Tyler Sojka
* December 2020
* JavaScript: Using JavaScript to create a web dashboard with plotly, jQuery, HTML, D3.js
  
*****
*****

## Tools

* JavaScript
  * Often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.
* D3.js
  * A JavaScript library for producing dynamic, interactive data visualizations in web browsers.
* jQuery
  * A JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.
* HTML
  * Hypertext Markup Language is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.
* plotly.js
  * Built on top of d3.js and stack.gl, Plotly.js is a high-level, declarative charting library. plotly.js ships with over 40 chart types, including 3D charts, statistical graphs, and SVG maps.
* Heroku
  * A cloud platform as a service supporting several programming languages. One of the first cloud platforms, Heroku has been in development since June 2007, when it supported only the Ruby programming language, but now supports Java, Node.js, Scala, Clojure, Python, PHP, and Go.
* Boostrap
  * Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.
  
*****
*****

## Overview

*****

The purpose of this project was to create a web based dashboard to showcase various plot types describing our dataset of bellybutton bacteria. We obtained a dataset containing a large number of subjects bellybutton profiles, and with that data, we put together an interactive dashboard web app.
![site](static/images/Screen%20Shot%202020-12-08%20at%2011.23.41%20AM.png)

The website makes use of boostrap components including a navbar, search box, and buttons to display the chosen subjects bellybutton profile.

Upon first loading the page, the profile for the first subject, 940, is loaded. The plots are hidden until you select a plot type from the navbar. To change subjects, you can simply select a new one from the dropdown menu, or manually enter a subject number in the search box. When a new subject is selected, the plots are recreated with the subjects bellybutton profile.

All plots are created on the backend using JavaScript and plotly.js in the charts.js file. jQuery was used for most of the event handling. d3.js was used for the data fetching. 

## Results

*****

While the overall dashboard functions well for this project, there are many improvements that could be made.

1. Instead of initially creating and just hiding the plots at first and changing the visibility when the navbar button is clicked, a better way would be to create them dynamically and have them rendered in sequence when the button is clicked. This would include an overhaul of the whole layout of the HTML, and is outside of the scope of this project.

2. Jazz up the styling. The original requirements were quite boring and ugly, the dark theme is marginally more appealing, but a whole overhaul on the color-scheme and introducing more dynamic colors would be a nice touch.

3. More plots. Adding more options for displaying the data would be beneficial.

4. ADVANCED? Create a dynamic table building dashboard to build the plots interactively on the web app. This would allow the user to select the data they wish to see from the dataset and plot it however they wished. 
// PART 2 of the Assingment, make sure you've done PART 1 first!

// Step 1: Select the body of the HTML document and append an h2 element
// with the text "Starting Part 2! We're Learning D3"


var body1 = d3.select("body")
    body1.append("h2")
    .text("Starting Part 2! We're Learning D3");


// Step 2: Select the body again and append a div with the id dynamic-content

var body2 = d3.select("body")
    .append("div")
    .attr("id", "dynamic-content")
    .text("pt2")



// Step 3: Select the div you just created (using its id!) and append a
// paragraph with some text of your choice (you can also style this if you want!)

d3.select("#dynamic-content")
    .append("p")
    .text("Down below is our visualization for schools with their sizes,regions, and names. Midwest is green, West is red, and Northeast is blue")


// PART II: Binding data

var schools = [
    { name: "Harvard", signups: 4695, region: "Northeast" },
    { name: "UW Madison", signups: 4232, region: "Midwest" },
    { name: "WashU", signups: 3880, region: "Midwest" },
    { name: "Brown", signups: 2603, region: "Northeast" },
    { name: "UChicago", signups: 2088, region: "Midwest" },
    { name: "UW", signups: 2042, region: "West" }
];

// Step 1: Append a new SVG element to HTML document with D3
// (width = 500px, height = 500px)

var svg = d3.select("body").append("svg")
	.attr("width", 500)
	.attr("height", 500);


// Step 2: Append a new SVG circle for every object in the schools array

svg.selectAll("circle")
	.data(schools)
	.enter()
	.append("circle")
	.attr("fill", "red")

	
// Step 3: Define the following dynamic properties for each circle:
//   - Position: set the x/y coordinates and make sure that the circles don’t overlap each other
//   - Radius: schools with over 3500 signups should be twice as big as schools with less than 2500 signups
//   - Colors: use a different color for each region
//   - Border: add a border to every circle (SVG property: stroke)
svg.selectAll("circle")
  .attr("r", function(d) {
    // Radius: schools with over 3500 signups should be twice as big
    return d.signups > 3500 ? 10 : 5;
  })
  .attr("cy", function(d, index) {
    return 100; 
  })
  .attr("cx", function(d, index) {
    return index * 65 + 100;
  })
  .attr("fill", function(d) {
    if (d.region === "Northeast") {
      return "blue";
    } else if (d.region === "Midwest") {
      return "green";
    } else {
      return "red";
    }
  })
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// adding names to the schools
svg.selectAll("text")
  .data(schools)
  .enter()
  .append("text")
  .text(function(d) {
    return d.name; 
  })
  .attr("x", function(d, index) {
    return (index * 65 + 100); 
  })
  .attr("y", 120)
  .attr("text-anchor", "middle") 
  .attr("font-size", "12px"); 


// PART III: Loading data

// Step 1: Use D3 to load the CSV file "schools.csv". then, print the data
// to the console and inspect it in your browser

data=d3.csv("data/schools.csv", function(data) {
    // console.log(data);
});

// Step 2: Filter the dataset: Filter the dataset to only include schools that are
// part of the Datamatch Schools (using the datamatchSchool variable).

var datamatchSchools = [
    "Harvard",
    "UW Madison",
    "WashU",
    "Brown",
    "UChicago",
    "UW"
];

var filteredData;

d3.csv("data/schools.csv").then(function(data) {
    //console.log(data)
    filteredData = data.filter(function(row) {
        return datamatchSchools.includes(row.school);
    });
});
// Step 3: Append a new paragraph to your HTML document that shows the
// number of Datamatch schools

d3.csv("data/schools.csv").then(function(data) {
    d3.select("body")
        .append("p")
        .text("Number of Datamatch Schools: " + filteredData.length);
});

// Step 4: Prepare the data - each value of the CSV file is stored as a string,
// but we want numerical values to be numbers.

d3.csv("data/schools.csv", function(d) {
    // Step 4: Convert string values to numbers
    return {
        school: d.school,     
        signups: +d.signups,   
        x: +d.x,              
        y: +d.y,               
        eu: d.eu === "TRUE" 
    };
});

// Step 5: Draw an SVG circle for each school in the filtered dataset
//   - All the elements (drawing area + circles) should be added dynamically with D3
//   - SVG container: width = 700px, height = 550px
//   - Use the randomly generated x/y coordinates for each school from the dataset to position the circles

// for fun coloring
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// Step 6: Change the radius of the circle to be data-dependent
//   - The radius should be 5px for schools with signups less than 500
//   - The radius for all other schools should be 10px

// Step 7: Add labels with the names of the schools
//   - Use the SVG text element
//   - All the elements should be the class of school-label
//   - The labels should only be visible for schools with signups greater than 500

var svg = d3.select("body")
  .append("svg")
  .attr("width", 700)
  .attr("height", 550);

d3.csv("data/schools.csv", function(d) {
    return {
        school: d.school,     
        signups: +d.signups,   
        x: +d.x,              
        y: +d.y,               
        eu: d.eu === "TRUE" 
    };
}).then(function(data) {
    svg.selectAll("circle")
        .data(data) 
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", function(d) {
            return d.signups < 500 ? 5 : 10;
          })
        .attr("fill", function() {
            return getRandomColor(); 
        })
    svg.selectAll("text")
        .data(data.filter(function(d) {
        return d.signups > 500;
        }))
        .enter()
        .append("text")
        .attr("x", function(d) {
        return d.x;
        })
        .attr("y", function(d) {
        return d.y;
        })
        .text(function(d) {
        return d.school;
        })
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("dy", -10);
});


// Step 8: Styling - in the external stylesheet, do some styling
//   - Make sure to at least style school-label with font size = 11 px and
//   text anchor = middle


// Optional bonus step: add tooltips displaying the country for each school
// https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
async function getData() {
    const request = await fetch('/api/dining');
    const request2 = await fetch('/api/macros');
    const meals = await request.json();
    const macros = await request2.json();
    const arrayDining = meals.data;
    const diningTable = document.querySelector('.table');
    console.table(diningTable);

    arrayDining.forEach((index) => {
        const appendItem = document.createElement('tr');
        appendItem.innerHTML = `
            <td>${index.dining_id}</td>
            <td>${index.meal_name}</td>
            <td>${index.meal_category}</td>
        `;
        diningTable.append(appendItem);
    });
}

async function windowActions() {
    //const data = await getData();
    const chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "My First Chart in CanvasJS"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		}
		]
	});
	chart.render();
}


window.onload = windowActions;

window.onload = function() {
	var dataPoints = [];
	var chart;
	$.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function(data) {  
		$.each(data, function(key, value){
			dataPoints.push({x: value[0], y: parseInt(value[1])});
		});
		chart = new CanvasJS.Chart("chartContainer",{
			title:{
				text:"Live Chart with dataPoints from External JSON"
			},
			data: [{
				type: "line",
				dataPoints : dataPoints,
			}]
		});
		chart.render();
		updateChart();
	});
	function updateChart() {
	$.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function(data) {
		$.each(data, function(key, value) {
			dataPoints.push({
			x: parseInt(value[0]),
			y: parseInt(value[1])
			});
		});
		chart.render();
		setTimeout(function(){updateChart()}, 1000);
	});
	}
}



//graf za DISTRIBUCIJSKA PODRUČJA
var barOptions_stacked = {
    hover :{
        animationDuration:3
    },
    scales: {
        xAxes: [{
            label:"Duration",
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:15
            },
            scaleLabel:{
                display:true
            },
            gridLines:{
                display:true,
                color: "red",
                zeroLineColor: "red",
                zeroLineWidth: 0
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:true,
                color: "red",
                zeroLineColor: "red",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:15
            },
            stacked: true
        }]
    },
    legend:{
        display:true
		
    },
};

// JAVASCRIPT I AJAKS ZA izlist DISTRIBUCIJSKih PODRUČJA
$(document).ready(
  function() {



 var dp =[]
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
										
					$.each(data, function (i, item) {
						
						
						dp.push(item["sifra"]);
						});
					
								
				
					//dp.splice(dp.length-1)
					dp.map(String) //=> ['1','2','3','4','5']
				    //alert(dp)
					console.log(dp)
					

		
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
	var gradientStroke = ctx.createLinearGradient(1500, 0, 100, 0);
	gradientStroke.addColorStop(0, '#f49080');
	gradientStroke.addColorStop(1, '#80b6f4');
    var myNewChart = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: dp,
        
        datasets: [{
			label: 'Broj stanica u Distribucijskom području',
			data: [100, 80, 70, 15, 100,20, 80, 70, 15, 100,20, 80, 70, 15, 100,20, 80, 70, 15, 100,11],
			borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
			
			
        }
		
		
		]
    },
    options: barOptions_stacked,
	
});

    canvas.onclick = function(evt) {
      var activePoints = myNewChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];


        var labelDP = chartData.labels[idx];
		
        var value = chartData.datasets[0].data[idx];

        var url = "Neki_branin_JSON/ime_mjerenj=" + labelDP + "/nekavrijednost=" + value;
        console.log(url);
        //alert(url);
		
		
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
					opcijeZaDp ='<option value="-1" >Odaberite DP:</option>';
					
					//dataJSON = $.parseJSON(data);
					
					$.each(data, function (i, item) {
						
						
						opcijeZaDp += '<option value="' + item["sifra"] + '">' + item["naziv"] + '</option>';
						
					});
					


					//$("#kuca").html(opcijeZaDp);
					
				//alert(labelDP);
				console.log(labelDP)
				window.open("http://10.138.5.17:5555/stanice/" + labelDP,"_self")
				}
			});
			
			
      }
    };
			
			
			
				}
				
			});
	
		

  }
);

	

	
//------------------------------------------------------------------------------------------------------------



//graf za trafostanice (2. graff)


var barOptions_stacked2 = {
    hover :{
        animationDuration:3
    },
    scales: {
        xAxes: [{
            label:"Duration",
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:15
            },
            scaleLabel:{
                display:true
            },
            gridLines:{
                display:true,
                color: "red",
                zeroLineColor: "red",
                zeroLineWidth: 0
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:true,
                color: "red",
                zeroLineColor: "red",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:15
            },
            stacked: true
        }]
    },
    legend:{
        display:true
		
    },
};


// JAVASCRIPT I AJAKS ZA izlist imena stanica PODRUČJA
$(document).ready(
  function() {


var ulaz_stanica=window.location.href;
var parts = ulaz_stanica.split('/');
var brojDPA = parts.pop() || parts.pop();  // handle potential trailing slash

//alert (brojDPA)
var action = parts[4];
//alert (action)
var dodatak= '/';
 var stanice =[]
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/stanice/'+brojDPA,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
										
					$.each(data, function (i, item) {
						
						
						stanice.push(item["kratkiNaziv"]);
						});
					
								
				
					//stanice.splice(stanice.length-1)
					stanice.map(String) //=> ['1','2','3','4','5']
				    //alert(stanice)
					console.log(stanice)
					
			
			
			    var canvas = document.getElementById("myChart_stanice");
    var ctx = canvas.getContext("2d");
	var gradientStroke = ctx.createLinearGradient(1500, 0, 100, 0);
	gradientStroke.addColorStop(0, '#f49080');
	gradientStroke.addColorStop(1, '#80b6f4');
    var myNewChart = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: stanice,
        
        datasets: [{
			label: 'Broj mjerenja u trafostanici',
            data: [100, 80, 70, 15, 100,20, 80, 70, 15, 100,20, 80, 70, 15, 100,20, 80, 70, 15, 100,11],
			borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
        }
		
		
		]
    },
    options: barOptions_stacked2,
});


    canvas.onclick = function(evt) {
      var activePoints = myNewChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var label_MJ = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];

        var url = "Neki_branin_JSON/ime_mjerenj=" + label_MJ + "/nekavrijednost=" + value;
        console.log(url);
        //alert(url);
		
		
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
					opcijeZaDp ='<option value="-1" >Odaberite DP:</option>';
					
					//dataJSON = $.parseJSON(data);
					
					$.each(data, function (i, item) {
						
						
						opcijeZaDp += '<option value="' + item["sifra"] + '">' + item["naziv"] + '</option>';
						
					});
					


					//$("#kuca").html(opcijeZaDp);
					
				//alert(value);
				window.open("http://10.138.5.17:5555/mjerenja/"+brojDPA+dodatak+label_MJ,"_self")
				}
			});
			
			
      }
    };
			
			
				}
			});
	
		
	

  }
);

	

//------------------------------------------------------------------------------------------------------------


//graf za mjerenja (G. graff-- GANTOV DIJAGRAM)

var barOptions_stacked3 = {
    hover :{
        animationDuration:3
    },
    scales: {
        xAxes: [{
            label:"Duration",
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:15
            },
            scaleLabel:{
                display:true
            },
            gridLines:{
                display:true,
                color: "red",
                zeroLineColor: "red",
                zeroLineWidth: 0
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:true,
                color: "red",
                zeroLineColor: "red",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:15
            },
            stacked: true
        }]
    },
    legend:{
        display:false
		
    },
};





$(document).ready(
  function() {


var ulaz_stanica=window.location.href;
var parts = ulaz_stanica.split('/');
var imestanice = parts.pop() || parts.pop();  // handle potential trailing slash

//alert ("ovo je ime stanice"+imestanice)
var broj_dp = parts[4];
//alert ("ovo je zadnje"+broj_dp)

 var stanice =[]


 var mjerena =[]
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/mjerenja/'+broj_dp+'?stanicaKratki='+imestanice,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
										
					$.each(data, function (i, item) {
						
						
						mjerena.push(item["kratkiNaziv"]);
						});
					
								
				
					//mjerena.splice(dp.length-1)
					mjerena.map(String) //=> ['1','2','3','4','5']
					//alert(mjerena)
					console.log(mjerena)
					
			
			
			
			
			
			
			
			
	var canvas = document.getElementById("myChart_mjerenja");
    var ctx = canvas.getContext("2d");
	var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
	gradientStroke.addColorStop(0, '#80b6f4');
	gradientStroke.addColorStop(1, '#f49080');

	var gradientFill = ctx.createLinearGradient(1500, 0, 100, 0);
	gradientFill.addColorStop(1, "rgba(128, 182, 244, 0.6)");
	gradientFill.addColorStop(0, "rgba(244, 144, 128, 0.6)");

    var myNewChart = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: mjerena,
        
        datasets: [{
			label: 'Minimum ',
            data: [0,150, 300, 120, 50,150, 300, 120, 50,150, 300, 120, 50,150, 300, 120, 11],
            backgroundColor: "rgba(63,103,126,0)",
            hoverBackgroundColor: "rgba(50,90,100,0)",
			
			
        },
		{
			label: 'Raspon ',
            data: [300, 80, 70, 15, 20, 80, 70, 15, 20, 80, 70, 15, 20, 80, 70, 15, 11],
			borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
           pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 4,
        }
		
		
		]
    },
    options: barOptions_stacked3,
	
});

    canvas.onclick = function(evt) {
      var activePoints = myNewChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var label = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];

        var url = "Neki_branin_JSON/ime_mjerenj=" + label + "/nekavrijednost=" + value;
        console.log(url);
        alert(url);
		
		
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
					opcijeZaDp ='<option value="-1" >Odaberite DP:</option>';
					
					//dataJSON = $.parseJSON(data);
					
					$.each(data, function (i, item) {
						
						
						opcijeZaDp += '<option value="' + item["sifra"] + '">' + item["naziv"] + '</option>';
						
					});
					


					//$("#kuca").html(opcijeZaDp);
					
				alert(label);
				alert(value);
				
				}
			});
			
			
      }
    };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
											}							
					});
	
		
	

  }
);



			

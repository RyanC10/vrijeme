




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
                color: "gray",
                zeroLineColor: "gray",
                zeroLineWidth: 0
            },
            stacked: true
        }],
        yAxes: [{
			barPercentage: 0.8,
            gridLines: {
                display:true,
                color: "gray",
                zeroLineColor: "gray",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:13
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
 var dpnaziv =[]
 var brstanica =[]
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifradpbrojstanica',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
										
					$.each(data, function (i, item) {
						
						
						dp.push(item["sifra"]);
						dpnaziv.push(item["naziv"]);
						brstanica.push(item["brojStanica"]);
						
						});
					
								
				
					//dp.splice(dp.length-1)
					dp.map(String) //=> ['1','2','3','4','5']
				   	console.log(dp)
					//alert(dp)
					dpnaziv.map(String) //=> ['1','2','3','4','5']
				   	console.log(dpnaziv)
					//alert(dpnaziv)
					brstanica.map(String) //=> ['1','2','3','4','5']
				   	console.log(brstanica)
					
					
					
		
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
	var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
					gradientStroke.addColorStop(0, '#ADD8E6');
					gradientStroke.addColorStop(1, '#87CEFA');

					var gradientFill = ctx.createLinearGradient(1500, 0, 100, 0);
					gradientFill.addColorStop(1, "rgba(30,144,255, 0.6)");
					gradientFill.addColorStop(0, "rgba(176,224,230, 0.6)");
					
					
    var myNewChart = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
		labels: ["4001 Zagreb", "4002 Zabok","4003 Varaždin","4004 Čakovec",
		"4005 Koprivnica","4006 Bjelovar","4007 Križ","4008 Osijek",
		"4009 Vinkovci","4010 Brod","4011 Pula","4012 Rijeka",
		"4013 Split","4014 Zadar","4015 Šibenik","4016 Dubrovnik","4017 Karlovac",
		"4018 Sisak","4019 Gospić","4020 Virovitica","4021 Požega"],
        
        
        datasets: [{
			label: 'Broj daljinskih stanica u SCADA sustavu DP',
			data: brstanica,
			backgroundColor: "rgba(83,132,153,1)",
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
    options: barOptions_stacked,
	
	
});

    canvas.onclick = function(evt) {
      var activePoints = myNewChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];


        var labelDP = chartData.labels[idx];
        var skraceno_DP = labelDP.slice(0,4);
		//alert(skraceno_DP)
        var value = chartData.datasets[0].data[idx];

        var url = "Neki_branin_JSON/ime_mjerenj=" + skraceno_DP + "/nekavrijednost=" + value;
        console.log(url);
        //alert(url);
		
		
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
					opcijeZaDp ='<option value="4000" >Ukupno HEP ODS</option>';
					
					//dataJSON = $.parseJSON(data);
					
					$.each(data, function (i, item) {
						
						
						opcijeZaDp += '<option value="' + item["sifra"] + '">' + item["naziv"] + '</option>';
						
					});
					


					//$("#kuca").html(opcijeZaDp);
					
				//alert(labelDP);
				console.log(labelDP)
				window.open("http://10.138.5.17:5555/stanice/" + skraceno_DP,"_self")
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
                color: "gray",
                zeroLineColor: "gray",
                zeroLineWidth: 0
            },
            stacked: true
        }],
        yAxes: [{
			
            gridLines: {
                display:true,
                color: "gray",
                zeroLineColor: "gray",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
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
var brojMjerenja =[]
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/stanice/'+brojDPA,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
										
					$.each(data, function (i, item) {
						
						
						stanice.push(item["kratkiNaziv"]);
						brojMjerenja.push(item["brojMjerenja"]);
						});
					
								
				
					//stanice.splice(stanice.length-1)
					stanice.map(String) //=> ['1','2','3','4','5']
				    //alert(stanice)
					console.log(stanice)
					
			
			
	var canvas = document.getElementById("myChart_stanice");
    var ctx = canvas.getContext("2d");
	var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
					gradientStroke.addColorStop(0, '#ADD8E6');
					gradientStroke.addColorStop(1, '#87CEFA');

					var gradientFill = ctx.createLinearGradient(1500, 0, 100, 0);
					gradientFill.addColorStop(1, "rgba(30,144,255, 0.6)");
					gradientFill.addColorStop(0, "rgba(176,224,230, 0.6)");
	
    var myNewChart = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: stanice,
        
        datasets: [{
			label: 'Broj mjerenja u trafostanici',
            data: brojMjerenja,
			backgroundColor: "rgba(83,132,153,1)",
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
    options: barOptions_stacked2
});


    canvas.onclick = function(evt) {
      var activePoints = myNewChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var label_ST = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];

        var url = "Neki_branin_JSON/ime_mjerenj=" + label_ST + "/nekavrijednost=" + value;
        console.log(url);
        //alert(url);
		
		
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
				//alert('Odabrali ste stanicu imena: '+label_ST)
				window.open("http://10.138.5.17:5555/mjerenja/"+brojDPA+dodatak+label_ST,"_self")
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
                color: "gray",
                zeroLineColor: "gray",
                zeroLineWidth: 0
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:true,
                color: "gray",
                zeroLineColor: "gray",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:12
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



var dt_from = "01/01/2019 ";
var dt_to = new Date();


$('.slider-time').html(dt_from);
$('.slider-time2').html(dt_to);
var min_val = Date.parse(dt_from)/1000;
var max_val = Date.parse(dt_to)/1000;

function zeroPad(num, places) {
  var zero = places - num.toString().length ;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
function formatDT(__dt) {
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth()+2, 2);
    var date = zeroPad(__dt.getDate()-1, 2);
    var hours = zeroPad(__dt.getHours(), 2);
    var minutes = zeroPad(__dt.getMinutes(), 2);
    var seconds = zeroPad(__dt.getSeconds(), 2);
    return date + '/' + month + '/' + year   ;
};

function formatDT1(__dt) {
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth()+1, 3);
    var date = zeroPad(__dt.getDate(), 3);
    var hours = zeroPad(__dt.getHours(), 2);
    var minutes = zeroPad(__dt.getMinutes(), 2);
    var seconds = zeroPad(__dt.getSeconds(), 2);
    return date + '/' + month + '/' + year   ;
};


$("#slider-range").slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    slide: function (e, ui) {
        var dt_cur_from = new Date(ui.values[0]*1000); //.format("yyyy-mm-dd hh:ii:ss");
        $('.slider-time').html(formatDT1(dt_cur_from));
		
        var dt_cur_to = new Date(ui.values[1]*1000); //.format("yyyy-mm-dd hh:ii:ss");                
        $('.slider-time2').html(formatDT1(dt_cur_to));
    }
	
});


//------------------------------------------------------------------------------------------------------------

var vrime =$('#time-range span').text(); // odabrano vrijeme na slajderu
var ulaz_stanica=window.location.href;
var parts = ulaz_stanica.split('/');
var imestanice = parts.pop() || parts.pop();  // handle potential trailing slash



//alert ("ovo je ime stanice"+imestanice)
var broj_dp = parts[4];
//alert ("ovo je zadnje"+broj_dp)
var dodatak2= '/';
var stanice =[]


 var mjerena =[]
				$.ajax({
				
				url: 'http://10.10.131.54:8082/api/mjerinfo/mjerenja/'+broj_dp+'?stanicaKratki='+imestanice,
				
				//url: 'http://10.10.131.54:8082/api/mjerinfo/scada/statmjer/'+broj_dp+'/20200111T100000Z/20200110T110000Z?kratkiNaziv='+imestanice,
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
					gradientStroke.addColorStop(0, '#ADD8E6');
					gradientStroke.addColorStop(1, '#87CEFA');

					var gradientFill = ctx.createLinearGradient(1500, 0, 100, 0);
					gradientFill.addColorStop(1, "rgba(30,144,255, 0.6)");
					gradientFill.addColorStop(0, "rgba(176,224,230, 0.6)");

    var myNewChart = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: mjerena,
        
        datasets: [{
			label: 'Minimum ',
            data: [15,200, 300, 120, 50,150, 0, 0, 
			50,150, 240, 120, 50,150, 300, 120, 10,
			91, 65, 60, 66, 24,10, 65, 51, 15, 97,20
			, 24, 17, 15, 11,20, 12, 76, 15, 100,11,15,200, 300, 120, 50,150, 0, 0, 
			50,150, 240, 120, 50,150, 300, 120, 10,
			91, 65, 60, 66, 24,10, 65, 51, 15, 97,20
			, 24, 17, 15, 11,20, 12, 76, 15, 100,11],
            backgroundColor: "rgba(63,103,126,0)",
            hoverBackgroundColor: "rgba(50,90,100,0)",
			
			
        },
		{
			label: 'Raspon ',
            data: [300, 80, 170, 250, 200, 80, 70, 150,
			20, 80, 55, 105, 20, 80, 70, 15, 110,300, 80,
			170, 250, 200, 80, 70, 150, 20, 80, 55, 105, 
			20, 80, 70, 15, 11,300, 80, 170, 250, 200, 80, 70, 150,
			20, 80, 55, 105, 20, 80, 70, 15, 110,300, 80,
			170, 250, 200, 80, 70, 150, 20, 80, 55, 105, 
			20, 80, 70, 15, 11],
			backgroundColor: "rgba(83,132,153,1)",
			
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

        var labelMJ = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx];
		console.log(labelMJ);
        var url = "Neki_branin_JSON/ime_mjerenj=" + labelMJ + "/nekavrijednost=" + value + "Odabrano vrijeme je"+vrime;
        console.log(url);
        //alert(url);
		
		$(document).ready(function(){
			var start = $('#od').val();
			var end= $('#do').val();
			//alert(start)
			//start = start.split('/').join('')
			var start = start.split("/");
			//alert(start[0])
			//alert(start[1])
			//alert(start[2])
			var start=start[2].concat(start[1],start[0])
			start = start.replace(/\s+/g, '');
			//alert(start)
			
			
			//alert(end)
			var end = end.split("/");
			//alert(end[0])
			//alert(end[1])
			//alert(end[2])
			var end=end[2].concat(end[1],end[0])
			end = end.replace(/\s+/g, '');
			//alert(end)
			
			console.log(start);
			console.log(end);
		
		
		
			$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/sifraDp',
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					
					
				
				//alert('Odabrali ste mjerenje imena: '+labelMJ);
				//alert(value);
				
				window.open("http://10.138.5.17:5555/rezultat/"+broj_dp+dodatak2+labelMJ+dodatak2+start+dodatak2+end,"_self")
				
				}
			});
			});
			
      }
    };
			
			}							
					});
	
  }
);






// punjenje podataka  za odabrano mjerenje

$(document).ready(
  function() {

var podaci=window.location.href;
var url_zadnji = podaci.split('/');
//var imemjerenja = url_zadnji.pop() || url_zadnji.pop();  // handle potential trailing slash


var imemjerenja=url_zadnji[5];
//alert(imemjerenja)
var broj_dp2 = url_zadnji[4];
//alert(broj_dp2)
var start2=url_zadnji[6];
//alert(start2)
var end2=url_zadnji[7];
//alert(end2)

var dodatak3= '/';


var vrijednost =[]
var kratki_naziv =[]
var vrijeme =[]
 
				$.ajax({
					//url: 'http://10.10.131.54:8082/api/mjerinfo/scada/raspon/'+broj_dp2+'/20191206T110000Z/20191207T120000Z?kratkiNaziv='+imemjerenja,
				url: 'http://10.10.131.54:8082/api/mjerinfo/scada/raspon/'+broj_dp2+'/'+start2+'T110000Z/'+end2+'T120000Z?kratkiNaziv='+imemjerenja,
				data: {
					/*'country': countryId*/
				},
				success: function (data) {
					za_tablicu =  '<option value="-1">Rezultat :</option>';
					
										
					$.each(data, function (i, item) {
						
						za_tablicu +=  item["kratkiNaziv"] + "   "+ item["vrijednost"].toFixed(2)+ "   "+item["vrijeme"]+ "\n";
						vrijednost.push(item["vrijednost"].toFixed(2));
						kratki_naziv.push(item["kratkiNaziv"]);
						vrijeme.push(item["vrijeme"]);
						

						});
					
								
				
					//vrijednost.splice(dp.length-1)
					//vrijednost.map(String) //=> ['1','2','3','4','5']
					//alert(vrijednost)
					console.log(vrijednost)
					console.log(kratki_naziv)
					console.log(vrijeme)
				
					
					
					var ctx = document.getElementById('line_chart').getContext("2d");

					/*var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
					gradientStroke.addColorStop(0, '#80b6f4');
					gradientStroke.addColorStop(1, '#f49080');

					var gradientFill = ctx.createLinearGradient(1500, 0, 100, 0);
					gradientFill.addColorStop(1, "rgba(128, 182, 244, 0.6)");
					gradientFill.addColorStop(0, "rgba(244, 144, 128, 0.6)");*/

								var myChart = new Chart(ctx, {
								type: 'line',
								data: {
								labels: vrijeme,
								datasets: [{
								label: kratki_naziv[0],
								borderColor: "#3e95cd",//ovo ce trebat sklonit za gradijent
								fill: false, //ovo ce trebat sklonit za gradijent
								//backgroundColor: "rgba(83,132,153,1)",
								/*
								borderColor: gradientStroke,
								pointBorderColor: gradientStroke,
								pointBackgroundColor: gradientStroke,
								pointHoverBackgroundColor: gradientStroke,
								pointHoverBorderColor: gradientStroke,
								pointBorderWidth: 5,
								pointHoverRadius: 5,
								pointHoverBorderWidth: 1,
								pointRadius: 1,
								fill: true,
								backgroundColor: gradientFill,
								borderWidth: 4,*/
								data: vrijednost
								
								
								
								
								
										}]
									},
									
									options: {
										
										
										legend: {
											position: "top"
										},
														
										}
									});


					
			
			//$("#ispis_za_tablicu").html(za_tablicu);
		

			
			}							
					});
	
  }
);


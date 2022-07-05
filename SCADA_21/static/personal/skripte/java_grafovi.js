


	//----------------------------------------------------------------------------
	Chart.defaults.HorizontalBar = {
    hover: {
        mode: "single"
    },
    scales: {
        yAxes: [{
            position: 'left',
            type: "category",
            categoryPercentage: 0.8,
            barPercentage: 1,
            gridLines: { offsetGridLines: true }
        }],
        xAxes: [{
            ticks: {
                beginAtZero: true
            },
            position: 'bottom',
            type: "linear",
        }],
    },
};

Chart.controllers.HorizontalBar = Chart.controllers.bar.extend({
    updateElement: function updateElement(rectangle, index, reset, numBars) {

        var xScale = this.getScaleForId(this.getDataset().xAxisID);
        var yScale = this.getScaleForId(this.getDataset().yAxisID);

        var xScalePoint;

        if (xScale.min < 0 && xScale.max < 0) {
            xScalePoint = xScale.getPixelForValue(xScale.max);
        } else if (xScale.min > 0 && xScale.max > 0) {
            xScalePoint = xScale.getPixelForValue(xScale.min);
        } else {
            xScalePoint = xScale.getPixelForValue(0);
        }

        Chart.helpers.extend(rectangle, {
            _chart: this.chart.chart,
            _xScale: xScale,
            _yScale: yScale,
            _datasetIndex: this.index,
            _index: index,

            _model: {
                x: reset ? xScalePoint : this.calculateBarX(index, this.index),
                y: this.calculateBarY(index, this.index),
                label: this.chart.data.labels[index],
                datasetLabel: this.getDataset().label,
                base: this.calculateBarBase(this.index, index),
                height: this.calculateBarHeight(numBars),
                backgroundColor: rectangle.custom && rectangle.custom.backgroundColor ? rectangle.custom.backgroundColor : Chart.helpers.getValueAtIndexOrDefault(this.getDataset().backgroundColor, index, this.chart.options.elements.rectangle.backgroundColor),
                borderColor: rectangle.custom && rectangle.custom.borderColor ? rectangle.custom.borderColor : Chart.helpers.getValueAtIndexOrDefault(this.getDataset().borderColor, index, this.chart.options.elements.rectangle.borderColor),
                borderWidth: rectangle.custom && rectangle.custom.borderWidth ? rectangle.custom.borderWidth : Chart.helpers.getValueAtIndexOrDefault(this.getDataset().borderWidth, index, this.chart.options.elements.rectangle.borderWidth),
            },

            draw: function() {
                var ctx = this._chart.ctx; 
                ctx.fillStyle = this._view.backgroundColor;
                ctx.fillRect(this._view.base, this._view.y - this._view.height / 2, this._view.x - this._view.base, this._view.height);

                ctx.strokeStyle = this._view.borderColor;
                ctx.strokeWidth = this._view.borderWidth;
                ctx.strokeRect(this._view.base, this._view.y - this._view.height / 2, this._view.x - this._view.base, this._view.height);
            },

            // override the inRange function because the one in the library needs width (we have only height)
            inRange: function (mouseX, mouseY) {
                var vm = this._view;
                var inRange = false;

                if (vm) {
                    if (vm.x < vm.base) {
                        inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.x && mouseX <= vm.base);
                    } else {
                        inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.base && mouseX <= vm.x);
                    }
                }

                return inRange;
            }
        });

        rectangle.pivot();

        // the animation progresses _view values from their current value to the _model value
        rectangle._view.x = rectangle._model.base;
    },

    calculateBarBase: function (datasetIndex, index) {
        var xScale = this.getScaleForId(this.getDataset().xAxisID);
        var yScale = this.getScaleForId(this.getDataset().yAxisID);

        var base = 0;

        if (xScale.options.stacked) {
            var value = this.chart.data.datasets[datasetIndex].data[index];

            if (value < 0) {
                for (var i = 0; i < datasetIndex; i++) {
                    var negDS = this.chart.data.datasets[i];
                    if (Chart.helpers.isDatasetVisible(negDS) && negDS.xAxisID === xScale.id) {
                        base += negDS.data[index] < 0 ? negDS.data[index] : 0;
                    }
                }
            } else {
                for (var j = 0; j < datasetIndex; j++) {
                    var posDS = this.chart.data.datasets[j];
                    if (Chart.helpers.isDatasetVisible(posDS) && posDS.xAxisID === xScale.id) {
                        base += posDS.data[index] > 0 ? posDS.data[index] : 0;
                    }
                }
            }

            return xScale.getPixelForValue(base);
        }

        base = xScale.getPixelForValue(xScale.min);

        if (xScale.beginAtZero || ((xScale.min <= 0 && xScale.max >= 0) || (xScale.min >= 0 && xScale.max <= 0))) {
            base = xScale.getPixelForValue(0, 0);
        } else if (xScale.min < 0 && xScale.max < 0) {
            base = xScale.getPixelForValue(xScale.max);
        }

        return base;
    },

    getRuler: function () {
        var xScale = this.getScaleForId(this.getDataset().xAxisID);
        var yScale = this.getScaleForId(this.getDataset().yAxisID);
        var datasetCount = this.getBarCount();

        var tickHeight = (function () {
            var min = yScale.getPixelForTick(1) - yScale.getPixelForTick(0);
            for (var i = 2; i < this.getDataset().data.length; i++) {
                min = Math.min(yScale.getPixelForTick(i) - yScale.getPixelForTick(i - 1), min);
            }
            return min;
        }).call(this);
        var categoryHeight = tickHeight * yScale.options.categoryPercentage;
        var categorySpacing = (tickHeight - (tickHeight * yScale.options.categoryPercentage)) / 2;
        var fullBarHeight = categoryHeight / datasetCount;
        var barHeight = fullBarHeight * yScale.options.barPercentage;
        var barSpacing = fullBarHeight - (fullBarHeight * yScale.options.barPercentage);

        return {
            datasetCount: datasetCount,
            tickHeight: tickHeight,
            categoryHeight: categoryHeight,
            categorySpacing: categorySpacing,
            fullBarHeight: fullBarHeight,
            barHeight: barHeight,
            barSpacing: barSpacing,
        };
    },

    calculateBarHeight: function () {
        var yScale = this.getScaleForId(this.getDataset().yAxisID);
        var ruler = this.getRuler();

        if (yScale.options.stacked) {
            return ruler.categoryHeight;
        }

        return ruler.barHeight;
    },

    calculateBarY: function (index, datasetIndex) {
        var yScale = this.getScaleForId(this.getDataset().yAxisID);
        var xScale = this.getScaleForId(this.getDataset().xAxisID);
        var barIndex = this.getBarIndex(datasetIndex);

        var ruler = this.getRuler();
        var leftTick = yScale.getPixelForValue(null, index, datasetIndex, this.chart.isCombo);
        leftTick -= this.chart.isCombo ? (ruler.tickHeight / 2) : 0;

        if (yScale.options.stacked) {
            return leftTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
        }

        return leftTick +
            (ruler.barHeight / 2) +
            ruler.categorySpacing +
            (ruler.barHeight * barIndex) +
            (ruler.barSpacing / 2) +
            (ruler.barSpacing * barIndex);
    },

    calculateBarX: function (index, datasetIndex) {
        var xScale = this.getScaleForId(this.getDataset().xAxisID);
        var yScale = this.getScaleForId(this.getDataset().yAxisID);

        var value = this.getDataset().data[index];

        if (xScale.options.stacked) {
            var sumPos = 0,
                sumNeg = 0;

            for (var i = 0; i < datasetIndex; i++) {
                var ds = this.chart.data.datasets[i];
                if (Chart.helpers.isDatasetVisible(ds)) {
                    if (ds.data[index] < 0) {
                        sumNeg += ds.data[index] || 0;
                    } else {
                        sumPos += ds.data[index] || 0;
                    }
                }
            }

            if (value < 0) {
                return xScale.getPixelForValue(sumNeg + value);
            } else {
                return xScale.getPixelForValue(sumPos + value);
            }

            return xScale.getPixelForValue(value);
        }

        return xScale.getPixelForValue(value);
    }
});

//-------------------------------------------------------------------------------------------

	var stanice =[]
				$.ajax({
				url: 'http://10.10.131.54:8082/api/mjerinfo/stanice/4001',
				data: {
					/*'country': countryId*/
				},
				 async: false,
				success: function (data) {
					
										
					$.each(data, function (i, item) {
						
						
						stanice.push(item["dugiNaziv"]);
						});
					
						
					//dp.splice(dp.length-1)
					stanice.map(String) //=> ['1','2','3','4','5']
					
					console.log(dp)
					
					
				}
				
			});


alert(stanice)
var config = {
    type: 'HorizontalBar',
    data: {
        labels: stanice,
        datasets: [{
            label: "Distribucijsko područje",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            hoverBackgroundColor: "rgba(255,99,132,0.5)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [-110,34,56,77,110,34,-56,-77,-110,34,56,77,110,34,56,77,110,34,56,77,110,34,56,77],
        }, {
            label: "Broj stanica u SCADA sustavu",
            backgroundColor: "rgba(54,162,235,0.2)",
            borderColor: "rgba(54,162,235,1)",
            hoverBackgroundColor: "rgba(54,162,235,0.5)",
            hoverBorderColor: "rgba(54,162,235,1)",
            data: [110,34,56,77,110,34,56,77,110,34,56,77,110,34,56,77,110,34,56,77,110,34,56,77]
        }]
    }
};

var ctx = document.getElementById("myChart").getContext("2d");
new Chart(ctx, config);






   ctx.onclick = function(evt) {
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
					


					$("#kuca").html(opcijeZaDp);
					
				//alert(value);
				window.open("http://10.138.5.17:5555/stanice/","_self")
				}
			});
			
			
      }
    };
	
	
	
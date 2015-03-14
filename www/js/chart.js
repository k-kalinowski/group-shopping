angular.module('starter.services')
    .factory('chartService', function() {
        var values = [{from: 0, to: 10, color: 'rgb(192, 0, 0)', price: 350.0},
            {from: 10, to: 20, color: 'rgb(255, 192, 0)', price: 340.0},
            {from: 20, to: 30, color: 'rgb(155, 187, 89)', price: 330.0}
        ];

        return {
            chart : _chart
        }

        function _chart(counter) {
            $('#container').highcharts({

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 1,
                    plotShadow: false
                },

                title: {
                    text: 'Kup za mniej!'
                },

                pane: {
                    startAngle: -90,
                    endAngle: 90,
                    background: null
                },

                plotOptions: {
                    gauge: {
                        dataLabels: {
                            enabled: true
                        },
                        dial: {
                            baseLength: '0%',
                            baseWidth: 10,
                            radius: '100%',
                            rearLength: '0%',
                            topWidth: 2
                        }
                    }
                },

                // the value axis
                yAxis: {
                    labels: {
                        enabled: true,
                        x: 35, y: -10
                    },
                    tickPositions: [0, 10, 20, 30],
                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',
                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',

                    min: 0,
                    max: 30
                },

                series: [{
                    dataLabels: {
                        format: 'Kupiono już {y} sztuk!'
                    },
                    name: '',
                    data: [counter],
                    tooltip: {
                        enabled: false,
                        valuePrefix: 'Kupiono już ',
                        valueSuffix: ' sztuk'

                    }
                }, {name: '350,00 zł', color: 'rgb(192, 0, 0)', showInLegend: true},
                    {name: '340,00 zł', color: 'rgb(255, 192, 0)', showInLegend: true},
                    {name: '330,00 zł', color: 'rgb(155, 187, 89)', showInLegend: true}
                ]

            });


            var yAxis = $("#container").highcharts().yAxis[0];
            var series = $("#container").highcharts().series;

            for (var i = 0; i < values.length; i++) {
                values[i].thickness = '50%';
                yAxis.tickPositions[i + 1] = values[i].to;
                yAxis.addPlotBand(values[i]);
            }
        }
    });
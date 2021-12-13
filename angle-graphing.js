var line1 = new TimeSeries();
var line2 = new TimeSeries();

setInterval(function () {
    line1.append(new Date().getTime(), theta);
    line2.append(new Date().getTime(), theta_dot);
}, 1);

var angles = new SmoothieChart({ grid: { strokeStyle: 'rgb(125, 0, 0)', fillStyle: 'rgb(60, 0, 0)', lineWidth: 1, millisPerLine: 250, verticalSections: 6 } });
angles.addTimeSeries(line1, { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth: 3 });
angles.addTimeSeries(line2, { strokeStyle: 'rgb(255, 0, 255)', fillStyle: 'rgba(255, 0, 255, 0.3)', lineWidth: 3 });

angles.streamTo(document.getElementById("angle-graphing"));
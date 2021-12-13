var ke_line = new TimeSeries();
var pe_line = new TimeSeries();
var energy_line = new TimeSeries();

setInterval(function () {
    let [omega, omega0, gamma, F, m] = constants;

    let ke = 0.5*m*(L*theta_dot)**2
    g = L*m*omega0**2
    let pe = m*g*L*(1-Math.cos(theta))
    ke_line.append(new Date().getTime(), ke);
    pe_line.append(new Date().getTime(), pe);
    energy_line.append(new Date().getTime(), ke+pe)
}, 1);

var energies = new SmoothieChart({ grid: { strokeStyle: 'rgb(125, 0, 0)', fillStyle: 'rgb(60, 0, 0)', lineWidth: 1, millisPerLine: 250, verticalSections: 6 } });
energies.addTimeSeries(ke_line, { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth: 3 });
energies.addTimeSeries(pe_line, { strokeStyle: 'rgb(255, 0, 255)', fillStyle: 'rgba(255, 0, 255, 0.3)', lineWidth: 3 });
energies.addTimeSeries(energy_line, { strokeStyle: 'rgb(255, 0, 0)', fillStyle: 'rgba(0, 0, 0, 0)', lineWidth: 3 });

energies.streamTo(document.getElementById("energy-graphing"));
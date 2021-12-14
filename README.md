# ForcedOscillator

A JavaScript simulation of a damped, forced harmonic oscillator

Simulates the differential equation

![equation](https://latex.codecogs.com/svg.image?\bg_white&space;\ddot{\theta}&space;&plus;&space;\gamma&space;\dot{\theta}&space;&plus;&space;\omega^2&space;\theta&space;=&space;\frac{F}{m}\cos{\omega&space;t})

using Euler's method for a coupled system. Graph plotting is done using [`smoothie.js`](http://smoothiecharts.org/). Webpage can be hosted locally using `webserver.py`, which uses Python's `http.server` module
![image](https://user-images.githubusercontent.com/22815544/146019265-fb5d4304-3a68-429f-8447-051468702c7f.png)


## Rubik's Cube Visualization

This is an interactive simulation of a 3x3x3 Rubik's cube, with the following features.

* State randomization 
* Automatic solving 
* Rotatable cube on two axes
* Mutate slice in any direction with mouse drag


GIF example (fps faster in browser)
![alt text](https://github.com/MasonDarcy/RubiksCubeVisualization/blob/main/example.gif "Rubiks Cube Solving")

# Implementation

This visualization is implemented in pure CSS and React.js. 

# Dependencies 

The algorithm used to solve the cube is Kociemba's two-phase algorithm, implemented by the cubejs package.
https://github.com/ldez/cubejs

![Pathfinder](assets/title.png)

Welcome to my "Pathfinder Playground" repository! Here I am experimenting with pathfinding, specifically A* for a different project.

This repository is for educational purposes and to share and document my approach.
Feel free to explore, modify, and use any code you find here for your own learning and
projects.

The current progress is deployed as https://pathfinder-playground.vercel.app/, but might change at any point,
since this is very much a playground. 

## How to use it?

<p align="center"><img src="assets/example.png" width="500" alt></p>

1. Access the [Webapp](https://pathfinder-playground.vercel.app/).
2. Add a Token A and B - the algorithm will try and find the cheapest path between the two points.
3. Change weights of cells or block them off entirely to make it path around.

## What are "weights"?

If you imagine the pathfinder on an actual map, "weights" might refer to the equivalent of a hill in between for example.
Sometimes it's just easier to walk around it. Sometimes it is not.
The base weight for each cell is "0".

## What does "cheapest path" mean?

It doesn't find the shortest path (as in "number of cells it crosses") but factors in how much each cell adds to the total cost.
A small cluster of "Weight 9" cells might be a lot more costly then a large cluster of "Weight 1" cells.

## What algorithm is it using?

This is my best attempt at writing an A* implementation.

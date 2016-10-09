# Detrostrat
Mhacks 2016 - Gamifying Detroit Open Data to help/entertain the city.

Detrostrat is a tower defence game that built on top of google maps. It is set in Detroit and uses the city's open crime data sets to construct enemies across the gameboard. While the tower defence game is entertaining, the broader purpose is to allow users to mark safe locations across the city while playing the game in an interactive way.

Based on safe spots marked by users while playing the game, a crowd sourced safe map is generated that can be utilized to ensure safe commutes, waiting areas, and highlight areas where higher safety consideration is needed.

# Dependencies

* Node.js
* A local mongodb instance
* Google Maps API Key

# How to play?

Choose a Detroit precinct that you want to play in and hit start game. Recent crime data points from within the precinct are used to generate enemies that can be battled with three type of towers.

Safe Tower: This tower can be placed to signify an area that a player has experienced to be a secure location while travelling in Detroit.

Tower 1: Fires ranged projectiles.

Tower 2: Increases the range of type 1 towers.

Tower 3: Can be placed around danger zones to eliminate them.

The enemies generated damage the player's health as they change colors. The objective is to stop as many of them as possible while maximizing your score.

# Data Used

We made use of the major crimes dataset at https://data.detroitmi.gov to explore assault crimes. We extracted data points after December 2014 and split them by precinct and then used a randomized set of 20 datapoints from each to generate game maps for the different precincts.

# About the creators

Detrostrat was built under 36 hours at Mhacks 2016 by Purdue University students Omar Pineda and Murtuza Kainan.



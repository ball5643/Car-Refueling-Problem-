const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
let distanceOfAllWay = 0;
let fullTankOfCar = 0;
let countOfStops = 0;
let distanceOfGasStations = [];

rl.once('line', line => {
    distanceOfAllWay = line.split(' ').map(Number)[0];
    rl.once('line', line => {
        fullTankOfCar = line.split(' ').map(Number)[0];  
        rl.once('line', line => {
            countOfStops = line.split(' ').map(Number)[0];
            rl.once('line', line => {
                distanceOfGasStations = line.split(' ').map(Number);
        
                // process.stdout.write('\n');
                // console.log(distance, m, arr);
                console.log(reachDistanceWithMinimumCountOfGasStations(distanceOfAllWay, fullTankOfCar, distanceOfGasStations));
                process.exit();
            });
        })
    });
});

function reachDistanceWithMinimumCountOfGasStations(distanceOfAllWay, fullTankOfCar, distanceOfGasStations) {
    let minimalCountOfStops = 0; 
    let lastStop = distanceOfGasStations[distanceOfGasStations.length - 1];
    let index = getIndexOfMaximalStopWhichLessOrEqualToFullTankOfCar(fullTankOfCar, distanceOfGasStations);
    let currentStop = distanceOfGasStations[index];
    let nextStop = distanceOfGasStations[index + 1];
    if (distanceOfAllWay - lastStop > fullTankOfCar || currentStop === undefined) {
        return -1;
    }
    if (distanceOfAllWay <= fullTankOfCar) {
        return 0;
    }
    return findMinimalCountOfStops(distanceOfAllWay, fullTankOfCar, currentStop, minimalCountOfStops, nextStop, distanceOfGasStations);
}

function getIndexOfMaximalStopWhichLessOrEqualToFullTankOfCar(fullTankOfCar, distanceOfGasStations) {
    const maxStop = getMaximalValueOfStopWhichLessOrEqualToFullTankOfCar(fullTankOfCar, distanceOfGasStations);
    return index = distanceOfGasStations.indexOf(Math.max.apply(Math, maxStop));
}

function getMaximalValueOfStopWhichLessOrEqualToFullTankOfCar(fullTankOfCar, distanceOfGasStations) {
    return distanceOfGasStations.filter(function(x){return x <= fullTankOfCar});
}

function findMinimalCountOfStops(distanceOfAllWay, fullTankOfCar, currentStop, minimalCountOfStops, nextStop, distanceOfGasStations) {
    // TODO loop over every stop in numberOfStopsay here
    let i = 0;
    while(i < distanceOfGasStations.length){
        currentStop = distanceOfGasStations[i];
        nextStop = distanceOfGasStations[i + 1];
        if (currentStop + fullTankOfCar < nextStop) {
            return -1;
        }
        if (distanceOfAllWay - currentStop > fullTankOfCar) {
            minimalCountOfStops++;
            nextStop = currentStop;
        }
    i++
    }
    return minimalCountOfStops;
}

module.exports = reachDistanceWithMinimumCountOfGasStations;
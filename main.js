"use strict";
var balls = [];
var Ball = /** @class */ (function () {
    function Ball(position, size) {
        this.position = position;
        this.size = size;
    }
    return Ball;
}());
var Ray = /** @class */ (function () {
    function Ray(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
    Ray.prototype.getClosestBall = function () {
        var intersects = [];
        for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
            var ball = balls_1[_i];
            var eye_to_centerBall = ball.position.clone().subtract(this.position);
            var rayLength = eye_to_centerBall.dotProduct(this.velocity);
            var rayClosestToBall = this.position.clone().plus(this.velocity.clone().setMagnitude(rayLength));
            var rayDistanceToBall = rayClosestToBall.clone().subtract(ball.position).getMagnitude();
            if (rayDistanceToBall < ball.size / 2 && rayLength > 0) {
                var dist1 = rayLength - Math.sqrt(Math.pow((ball.size / 2), 2) - Math.pow(rayDistanceToBall, 2));
                var intersectPos = this.position.clone().plus(this.velocity.clone().setMagnitude(dist1));
                intersects.push({
                    ball: ball,
                    intersectPos: intersectPos,
                    rayLength: rayLength
                });
            }
        }
        var intersectsOrdered = intersects.sort(function (a, b) { return a.rayLength - b.rayLength; });
        if (!intersectsOrdered[0])
            return;
        var firstIntersect = {
            object: intersectsOrdered[0].ball,
            rayLength: intersectsOrdered[0].rayLength,
            intersectPos: intersectsOrdered[0].intersectPos
        };
        return firstIntersect;
    };
    return Ray;
}());
$(function () {
    startTest();
});
function startTest() {
    spawnRandomBalls(10000);
    var startTime = performance.now();
    // try calculate 1000 rays collision to the balls
    var rayCount = 1000;
    for (var i = 0; i < rayCount; i++) {
        var newRay = new Ray(new Vec3().randomizeInBall(1000), new Vec3().randomizeInBall(1));
        var closestBall = newRay.getClosestBall();
    }
    var endTime = performance.now();
    var timeDifference = endTime - startTime;
    console.log(timeDifference);
}
function spawnRandomBalls(amount) {
    for (var i = 0; i < amount; i++) {
        var newBall = new Ball(new Vec3().randomizeInBall(1000), Math.random() * 50);
        balls.push(newBall);
    }
}

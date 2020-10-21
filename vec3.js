"use strict";
var Axis;
(function (Axis) {
    Axis[Axis["x"] = 0] = "x";
    Axis[Axis["y"] = 1] = "y";
    Axis[Axis["z"] = 2] = "z";
})(Axis || (Axis = {}));
var Vec3 = /** @class */ (function () {
    function Vec3(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    Vec3.prototype.multiply = function (vec1) {
        this.x *= vec1.x;
        this.y *= vec1.y;
        this.z *= vec1.z;
        return this;
    };
    Vec3.prototype.dotProduct = function (vec1) {
        return this.x * vec1.x + this.y * vec1.y + this.z * vec1.z;
    };
    Vec3.prototype.getAngles = function () {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var angles = new Vec3(0, 0, 0);
        //angles.x = Math.atan2(Math.sqrt(y^2+z^2),x)
        //angles.y = Math.atan2(Math.sqrt(z^2+x^2),y)
        //angles.z = Math.atan2(Math.sqrt(x^2+y^2),z)
        angles.y = Math.asin(-this.y);
        angles.z = Math.atan2(this.x, this.z);
        return angles;
    };
    Vec3.prototype.rotateFull = function (angles) {
        this.rotate(Axis.z, angles.z);
        this.rotate(Axis.x, angles.x);
        this.rotate(Axis.y, angles.y);
        return this;
    };
    Vec3.prototype.rotate = function (axis, angle) {
        var x1 = 0;
        var y1 = 0;
        var z1 = 0;
        if (axis == Axis.x) {
            x1 = this.x;
            y1 = this.y * Math.cos(angle) - this.z * Math.sin(angle);
            z1 = this.y * Math.sin(angle) + this.z * Math.cos(angle);
        }
        if (axis == Axis.y) {
            x1 = this.x * Math.cos(angle) + this.z * Math.sin(angle);
            y1 = this.y;
            z1 = -this.x * Math.sin(angle) + this.z * Math.cos(angle);
        }
        if (axis == Axis.z) {
            x1 = this.x * Math.cos(angle) - this.y * Math.sin(angle);
            y1 = this.x * Math.sin(angle) + this.y * Math.cos(angle);
            z1 = this.z;
        }
        this.x = x1;
        this.y = y1;
        this.z = z1;
        return this;
    };
    Vec3.prototype.plus = function (vec1) {
        this.x += vec1.x;
        this.y += vec1.y;
        this.z += vec1.z;
        return this;
    };
    Vec3.prototype.subtract = function (vec1) {
        this.x -= vec1.x;
        this.y -= vec1.y;
        this.z -= vec1.z;
        return this;
    };
    Vec3.prototype.divide = function (vec1) {
        this.x /= vec1.x;
        this.y /= vec1.y;
        this.z /= vec1.z;
        return this;
    };
    Vec3.prototype.string = function () {
        return this.x + ' - ' + this.y + ' - ' + this.z;
    };
    Vec3.prototype.setMagnitude = function (newMagnitude) {
        var magnitude = this.getMagnitude();
        var x = (this.x / magnitude) * newMagnitude;
        var y = (this.y / magnitude) * newMagnitude;
        var z = (this.z / magnitude) * newMagnitude;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };
    Vec3.prototype.getMagnitude = function () {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var magnitude = Math.sqrt(x * x + y * y + z * z);
        return magnitude;
    };
    Vec3.prototype.clone = function () {
        return new Vec3(this.x, this.y, this.z);
    };
    Vec3.prototype.compare = function (vec) {
        if (vec.x == this.x && vec.y == this.y && vec.z == this.z)
            return true;
        else
            return false;
    };
    Vec3.prototype.getDistanceTo = function (vec1) {
        return this.clone().subtract(vec1).getMagnitude();
    };
    Vec3.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    };
    Vec3.prototype.randomizeInBall = function (i) {
        this.x = (Math.random() * i) - i / 2;
        this.y = (Math.random() * i) - i / 2;
        this.z = (Math.random() * i) - i / 2;
        var magnitude = this.getMagnitude();
        if (magnitude > i)
            this.setMagnitude(i);
        return this;
    };
    Vec3.prototype.randomizeInCube = function (i) {
        this.x = (Math.random() * i) - i / 2;
        this.y = (Math.random() * i) - i / 2;
        this.z = (Math.random() * i) - i / 2;
        return this;
    };
    return Vec3;
}());

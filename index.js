"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.availableRooms = exports.totalOccupancyPercentage = exports.Booking = exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(room) {
        this.name = room.name;
        this.bookings = room.bookings;
        this.rate = room.rate;
        this.discount = room.discount;
    }
    Room.prototype.dateRange = function (startDate, endDate) {
        var start = new Date(startDate);
        var end = new Date(endDate);
        var dateRange = [];
        while (start <= end) {
            dateRange = __spreadArray(__spreadArray([], dateRange, true), [start.toISOString()], false);
            start.setDate(start.getDate() + 1);
        }
        return dateRange;
    };
    Room.prototype.isOccupied = function (date) {
        var targetDate = new Date(date);
        var name;
        this.bookings.forEach(function (element) {
            var checkin = new Date(element.checkin);
            var checkout = new Date(element.checkout);
            if (checkin <= targetDate && checkout >= targetDate) {
                name = element.name;
            }
        });
        return name ? name : false;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        var _this = this;
        var dateRange = this.dateRange(startDate, endDate);
        var daysOccuped = 0;
        dateRange.forEach(function (date) {
            if (_this.isOccupied(date) !== false)
                daysOccuped += 1;
        });
        var percentage = ((daysOccuped * 100) / dateRange.length);
        return percentage;
    };
    return Room;
}());
exports.Room = Room;
var Booking = /** @class */ (function () {
    function Booking(booking) {
        this.name = booking.name;
        this.email = booking.email;
        this.checkin = booking.checkin;
        this.checkout = booking.checkout;
        this.discount = booking.discount;
        this.room = booking.room;
    }
    Booking.prototype.getFee = function () {
        var totalDiscount = this.discount + this.room.discount;
        var dateRange = this.room.dateRange(this.checkin, this.checkout);
        var totalPrice = dateRange.length * this.room.rate;
        var priceWithDiscount = (totalPrice - ((totalDiscount / 100) * totalPrice));
        return priceWithDiscount;
    };
    return Booking;
}());
exports.Booking = Booking;
function totalOccupancyPercentage(rooms, startDate, endDate) {
    var totalOccupancyPercentage = 0;
    rooms.forEach(function (room) {
        totalOccupancyPercentage += room.occupancyPercentage(startDate, endDate) / rooms.length;
    });
    return Math.round(totalOccupancyPercentage);
}
exports.totalOccupancyPercentage = totalOccupancyPercentage;
function availableRooms(rooms, startDate, endDate) {
    var arrAvailableRooms = [];
    rooms.forEach(function (room) {
        if (room.occupancyPercentage(startDate, endDate) === 0) {
            arrAvailableRooms.push(room);
        }
    });
    return arrAvailableRooms.length > 0 ? arrAvailableRooms : false;
}
exports.availableRooms = availableRooms;

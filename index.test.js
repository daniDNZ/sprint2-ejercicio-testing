"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var index_1 = require("./index");
var roomTemplate = new index_1.Room({ name: 'Emperador', bookings: [], rate: 40000, discount: 25 });
var bookingTemplate = new index_1.Booking({ name: 'Estrella', email: 'estrella@mail.com', checkin: '2022-01-03', checkout: '2022-01-10', discount: 10, room: roomTemplate });
describe("Room", function () {
    test('Room is occupied', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
        booking1.room = room1;
        expect(room1.isOccupied('2022-01-06')).toBe('Estrella');
    });
    test('Room is NOT occupied', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
        booking1.room = room1;
        expect(room1.isOccupied('2022-04-11')).toBe(false);
    });
    test('occupancyPercentage', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var booking2 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkin: '2022-01-12', checkout: '2022-01-14' }));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1, booking2] }));
        booking1.room = room1;
        booking2.room = room1;
        expect(room1.occupancyPercentage('2022-01-03', '2022-01-12')).toBe(90);
    });
    test('occupancyPercentage is 0', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
        booking1.room = room1;
        expect(room1.occupancyPercentage('2022-01-15', '2022-01-23')).toBe(0);
    });
});
describe('Booking', function () {
    test('Booking Fee', function () {
        var room1 = new index_1.Room(__assign({}, roomTemplate));
        var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1 }));
        room1.bookings.push(booking1);
        expect(booking1.getFee()).toBe(208000);
    });
    test('Booking Fee 100% discount', function () {
        var room1 = new index_1.Room(__assign({}, roomTemplate));
        var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1, discount: 75 }));
        room1.bookings.push(booking1);
        expect(booking1.getFee()).toBe(0);
    });
});
describe('Total Occupancy Pecentage Method', function () {
    var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkout: '2022-01-14' }));
    var booking2 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkin: '2022-01-12', checkout: '2022-01-14' }));
    var booking3 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkin: '2022-01-08', checkout: '2022-01-14' }));
    var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
    var room2 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking2] }));
    var room3 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking3] }));
    test('Total Occupancy Percentage 33%', function () {
        var startDate = '2022-01-03';
        var endDate = '2022-01-07';
        expect((0, index_1.totalOccupancyPercentage)([room1, room2, room3], startDate, endDate)).toBe(33);
    });
    test('Total Occupancy Percentage 100%', function () {
        var startDate = '2022-01-12';
        var endDate = '2022-01-14';
        expect((0, index_1.totalOccupancyPercentage)([room1, room2, room3], startDate, endDate)).toBe(100);
    });
});
describe('Available Rooms', function () {
    var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkout: '2022-01-14' }));
    var booking2 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkin: '2022-01-12', checkout: '2022-01-14' }));
    var booking3 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkin: '2022-01-08', checkout: '2022-01-14' }));
    var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
    var room2 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking2] }));
    var room3 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking3] }));
    test('Available Rooms false', function () {
        var startDate = '2022-01-12';
        var endDate = '2022-01-14';
        expect((0, index_1.availableRooms)([room1, room2, room3], startDate, endDate)).toBe(false);
    });
    test('Available Rooms 2', function () {
        var startDate = '2022-01-06';
        var endDate = '2022-01-07';
        expect((0, index_1.availableRooms)([room1, room2, room3], startDate, endDate)).toStrictEqual([room2, room3]);
    });
});

class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    // const targetDate = new Date(date)
    // let name
    // this.bookings.forEach((element) => {
    //   const checkin = new Date(element.checkin)
    //   const checkout = new Date(element.checkout)
    //   if (checkin <= targetDate && checkout >= targetDate) {
    //     name = element.name
    //   }
    // });

    // return name ? name : false
    return
  }

  occupancyPercentage(startDate, endDate) {

  }
}

class Booking {
  constructor({ name, email, checkin, checkout, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = room;
  }

  fee() {

  }
}

function totalOccupancyPercentage(rooms, startDate, endDate) {

}

function availableRooms(rooms, startDate, endDate) {

}

module.exports = {
  Room, Booking, totalOccupancyPercentage, availableRooms
}
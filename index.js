class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  dateRange(startDate, endDate) {
    let start = new Date(startDate)
    const end = new Date(endDate)
    let dateRange = []

    while (start <= end) {
      dateRange = [...dateRange, start.toISOString()]
      start.setDate(start.getDate() + 1)
    }
    return dateRange
  }

  isOccupied(date) {
    const targetDate = new Date(date)
    let name
    this.bookings.forEach((element) => {
      const checkin = new Date(element.checkin)
      const checkout = new Date(element.checkout)
      if (checkin <= targetDate && checkout >= targetDate) {
        name = element.name
      }
    });

    return name ? name : false
  }

  occupancyPercentage(startDate, endDate) {
    const dateRange = this.dateRange(startDate, endDate)
    let daysOccuped = 0;

    dateRange.forEach(date => {
      if (this.isOccupied(date) !== false) daysOccuped += 1
    })

    const percentage = ((daysOccuped * 100) / dateRange.length)
    return percentage
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

  getFee() {
    const totalDiscount = this.discount + this.room.discount
    const dateRange = this.room.dateRange(this.checkin, this.checkout)
    const totalPrice = dateRange.length * this.room.rate
    const priceWithDiscount = (totalPrice - ((totalDiscount / 100) * totalPrice));

    console.log(totalDiscount, dateRange.length, totalPrice, priceWithDiscount)

    return priceWithDiscount
  }
}

function totalOccupancyPercentage(rooms, startDate, endDate) {
  let totalOccupancyPercentage = 0
  rooms.forEach(room => {
    totalOccupancyPercentage += room.occupancyPercentage(startDate, endDate) / rooms.length
  })

  return Math.round(totalOccupancyPercentage)
}

function availableRooms(rooms, startDate, endDate) {
  const arrAvailableRooms = []
  rooms.forEach(room => {
    if (room.occupancyPercentage(startDate, endDate) === 0) {
      arrAvailableRooms.push(room)
    }
  })
  return arrAvailableRooms.length > 0 ? arrAvailableRooms : false
}


module.exports = {
  Room, Booking, totalOccupancyPercentage, availableRooms
}
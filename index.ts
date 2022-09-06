
interface IRoom {
  name: string,
  bookings: Booking[],
  rate: number,
  discount: number
}

interface IBooking {
  name: string,
  email: string,
  checkin: string,
  checkout: string,
  discount: number,
  room: Room
}

class Room implements IRoom {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(room: IRoom) {
    this.name = room.name;
    this.bookings = room.bookings;
    this.rate = room.rate;
    this.discount = room.discount;
  }

  dateRange(startDate: string, endDate: string): string[] {
    let start: Date = new Date(startDate)
    const end: Date = new Date(endDate)
    let dateRange: string[] = []

    while (start <= end) {
      dateRange = [...dateRange, start.toISOString()]
      start.setDate(start.getDate() + 1)
    }
    return dateRange
  }

  isOccupied(date: string): string | false {
    const targetDate: Date = new Date(date)
    let name: string | undefined
    this.bookings.forEach((element: Booking) => {
      const checkin: Date = new Date(element.checkin)
      const checkout: Date = new Date(element.checkout)
      if (checkin <= targetDate && checkout >= targetDate) {
        name = element.name
      }
    });

    return name ? name : false
  }

  occupancyPercentage(startDate: string, endDate: string): number {
    const dateRange: string[] = this.dateRange(startDate, endDate)
    let daysOccuped: number = 0;

    dateRange.forEach(date => {
      if (this.isOccupied(date) !== false) daysOccuped += 1
    })

    const percentage: number = ((daysOccuped * 100) / dateRange.length)
    return percentage
  }
}

class Booking implements IBooking {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  discount: number;
  room: Room;
  constructor(booking: IBooking) {
    this.name = booking.name;
    this.email = booking.email;
    this.checkin = booking.checkin;
    this.checkout = booking.checkout;
    this.discount = booking.discount;
    this.room = booking.room;
  }

  getFee(): number {
    const totalDiscount: number = this.discount + this.room.discount
    const dateRange: string[] = this.room.dateRange(this.checkin, this.checkout)
    const totalPrice: number = dateRange.length * this.room.rate
    const priceWithDiscount: number = (totalPrice - ((totalDiscount / 100) * totalPrice));

    return priceWithDiscount
  }
}

function totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
  let totalOccupancyPercentage: number = 0
  rooms.forEach(room => {
    totalOccupancyPercentage += room.occupancyPercentage(startDate, endDate) / rooms.length
  })

  return Math.round(totalOccupancyPercentage)
}

function availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] | false {
  const arrAvailableRooms: Room[] = []
  rooms.forEach(room => {
    if (room.occupancyPercentage(startDate, endDate) === 0) {
      arrAvailableRooms.push(room)
    }
  })
  return arrAvailableRooms.length > 0 ? arrAvailableRooms : false
}


export {
  Room, Booking, totalOccupancyPercentage, availableRooms
}
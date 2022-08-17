const { Room, Booking, totalOccupancyPercentage, availableRooms } = require('./index');

const roomTemplate = { name: 'Emperador', bookings: [], rate: 40000, discount: 25 }
const bookingTemplate = { name: 'Estrella', email: 'estrella@mail.com', checkin: '2022-01-03', checkout: '2022-01-10', discount: 10, room: {} }

describe("Room", () => {
  test('Room is occupied', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    expect(room1.isOccupied('2022-01-06')).toBe('Estrella')
  })
  test('Room is NOT occupied', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    expect(room1.isOccupied('2022-04-11')).toBe(false)
  })

  test('occupancyPercentage', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    expect(room1.occupancyPercentage('2022-01-03', '2022-01-12')).toBe(80)
  })
})

describe('Booking', () => {
  test('Métodos Booking', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    expect(room1.getFee()).toBe(208)
  })
})

describe('Methods', () => {
  test('Total Occupancy Percentage', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    const startDate = '2022-01-03'
    const endDate = '2022-01-12'
    expect(totalOccupancyPercentage([room1], startDate, endDate)).toBe(100)
  })

  test('Available Rooms', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    const startDate = '2022-01-03'
    const endDate = '2022-01-12'
    expect(availableRooms([room1], startDate, endDate)).toBe(0)
  })
})
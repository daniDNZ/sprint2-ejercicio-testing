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
    const booking2 = new Booking({ ...bookingTemplate, checkin: '2022-01-12', checkout: '2022-01-14' })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1, booking2] })
    expect(room1.occupancyPercentage('2022-01-03', '2022-01-12')).toBe(90)
  })

  test('occupancyPercentage is 0', () => {
    const booking1 = new Booking({ ...bookingTemplate })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
    expect(room1.occupancyPercentage('2022-01-15', '2022-01-23')).toBe(0)
  })
})

describe('Booking', () => {
  test('Booking Fee', () => {
    let room1 = new Room({ ...roomTemplate })
    const booking1 = new Booking({ ...bookingTemplate, room: room1 })
    room1.bookings.push(booking1)

    expect(booking1.getFee()).toBe(208000)
  })

  test('Booking Fee 100% discount', () => {
    let room1 = new Room({ ...roomTemplate })
    const booking1 = new Booking({ ...bookingTemplate, room: room1, discount: 75 })
    room1.bookings.push(booking1)

    expect(booking1.getFee()).toBe(0)
  })
})

describe('Total Occupancy Pecentage Method', () => {
  const booking1 = new Booking({ ...bookingTemplate, checkout: '2022-01-14' })
  const booking2 = new Booking({ ...bookingTemplate, checkin: '2022-01-12', checkout: '2022-01-14' })
  const booking3 = new Booking({ ...bookingTemplate, checkin: '2022-01-08', checkout: '2022-01-14' })
  const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
  const room2 = new Room({ ...roomTemplate, bookings: [booking2] })
  const room3 = new Room({ ...roomTemplate, bookings: [booking3] })

  test('Total Occupancy Percentage 33%', () => {
    const startDate = '2022-01-03'
    const endDate = '2022-01-07'
    expect(totalOccupancyPercentage([room1, room2, room3], startDate, endDate)).toBe(33)
  })

  test('Total Occupancy Percentage 100%', () => {
    const startDate = '2022-01-12'
    const endDate = '2022-01-14'
    expect(totalOccupancyPercentage([room1, room2, room3], startDate, endDate)).toBe(100)
  })
})

describe('Available Rooms', () => {
  const booking1 = new Booking({ ...bookingTemplate, checkout: '2022-01-14' })
  const booking2 = new Booking({ ...bookingTemplate, checkin: '2022-01-12', checkout: '2022-01-14' })
  const booking3 = new Booking({ ...bookingTemplate, checkin: '2022-01-08', checkout: '2022-01-14' })
  const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
  const room2 = new Room({ ...roomTemplate, bookings: [booking2] })
  const room3 = new Room({ ...roomTemplate, bookings: [booking3] })

  test('Available Rooms false', () => {
    const startDate = '2022-01-12'
    const endDate = '2022-01-14'
    expect(availableRooms([room1, room2, room3], startDate, endDate)).toBe(false)
  })

  test('Available Rooms 2', () => {
    const startDate = '2022-01-06'
    const endDate = '2022-01-07'
    expect(availableRooms([room1, room2, room3], startDate, endDate)).toStrictEqual([room2, room3])
  })
})
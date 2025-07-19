// Slot pilihan jam mulai dan selesai meeting
export const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
})
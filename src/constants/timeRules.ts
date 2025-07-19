export const TIME_RULES = [
    {
        key: 'snack-siang',
        displayName: 'Snack Siang',
        condition: (startTime: string, endTime: string) => {
            const startHour = parseInt(startTime.split(':')[0])
            const startMinute = parseInt(startTime.split(':')[1])
            const startTimeInMinutes = startHour * 60 + startMinute
            const elevenAM = 11 * 60
            
            return startTimeInMinutes < elevenAM
        }
    },
    {
        key: 'makan-siang',
        displayName: 'Makan Siang', 
        condition: (startTime: string, endTime: string) => {
            const startHour = parseInt(startTime.split(':')[0])
            const startMinute = parseInt(startTime.split(':')[1])
            const endHour = parseInt(endTime.split(':')[0])
            const endMinute = parseInt(endTime.split(':')[1])
            
            const startTimeInMinutes = startHour * 60 + startMinute
            const endTimeInMinutes = endHour * 60 + endMinute
            const elevenAM = 11 * 60
            const twoPM = 14 * 60
            
            return startTimeInMinutes < twoPM && endTimeInMinutes > elevenAM
        }
    },
    {
        key: 'snack-sore',
        displayName: 'Snack Sore',
        condition: (startTime: string, endTime: string) => {
            const endHour = parseInt(endTime.split(':')[0])
            const endMinute = parseInt(endTime.split(':')[1])
            const endTimeInMinutes = endHour * 60 + endMinute
            const twoPM = 14 * 60
            
            return endTimeInMinutes >= twoPM
        }
    }
]
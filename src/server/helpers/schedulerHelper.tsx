import dayjs from "dayjs";


type Members = "NELICH" | "ANDRIOD" | "JINXEN" | "DTD" | "OIVIND"

type Vote = {
    castedBy: Members,
    result: boolean,
}

type TimeStamp = dayjs.Dayjs

type GameNightDay = {
    host: Members,
    date: TimeStamp,
    votes: Vote[]
}


type UnavailableDay = TimeStamp

type NotBookable = {
    start: UnavailableDay,
    end: UnavailableDay
    reason: string
}

type NextGameNights = {
    date: TimeStamp[],
}

export const nextGameNight = () => {
        // Function to find the next available day (Monday or later) that is not in the restricted days list
        function getNextAvailableDay(date: TimeStamp, restrictedDays: TimeStamp[]): TimeStamp {
            let nextDay = getNextMonday(date);

            // Check if the next day (Monday or later) is a weekend or in the restricted days list
            while (nextDay.day() === 6 || nextDay.day() === 0 || restrictedDays.some(restrictedDate => restrictedDate.isSame(nextDay, 'day'))) {
                nextDay = nextDay.add(1, 'day'); // Move to the next day
            }

            return nextDay;
        }

// Function to find the next Monday from a given date
        function getNextMonday(date: TimeStamp): TimeStamp {
            const dayOfWeek = date.day(); // 0 (Sunday) to 6 (Saturday)
            const daysUntilNextMonday = (8 - dayOfWeek) % 7;
            return date.add(daysUntilNextMonday, 'day');
        }

// Function to get the next 5 game nights
        function getNextFiveGameNights(startDate: TimeStamp, restrictedDays: TimeStamp[]): TimeStamp[] {
            const gameNights: TimeStamp[] = [];
            let nextGameNight = getNextAvailableDay(startDate, restrictedDays);

            for (let i = 0; i < 5; i++) {
                gameNights.push(nextGameNight);
                // Find the next game night, which is 2 weeks after the last one
                nextGameNight = getNextAvailableDay(nextGameNight.add(2, 'week'), restrictedDays);
            }

            return gameNights;
        }

    // Example usage:
    const today = dayjs(); // Get the current date
    const restrictedDays = [
        dayjs('2024-06-17'), // Example restricted dates
        dayjs('2024-07-01'),
        dayjs('2024-07-15')
    ];

    const nextFiveGameNights = getNextFiveGameNights(today, restrictedDays);

    return {
        date: nextFiveGameNights
    } as NextGameNights;
}







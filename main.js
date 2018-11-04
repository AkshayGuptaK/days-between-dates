function stringDatetoObject(date) {
    return { 'day': Number(date.substr(0,2)), 'month': Number(date.substr(2,2)), 'year': Number(date.substr(4,4)) }
}

function dayDifference(firstDate, secondDate) {
    let days = 0
    firstDate = stringDatetoObject(firstDate)
    secondDate = stringDatetoObject(secondDate)
    days += daysInYearsBetween(firstDate.year, secondDate.year)
    days += daysInMonthsBetween(firstDate.month, firstDate.year, secondDate.month, secondDate.year)
    days += daysBetween(firstDate, secondDate)
    return days
}

function daysInYearsBetween(year1, year2) {
    let days = 0
    for (let y = year1 + 1; y < year2; y++) {
        days += 365 + isYearLeapYear(y)
    } return days
}

function isYearLeapYear(year) {
    if (year % 400 === 0) {
        return 1
    } if (year % 100 === 0) {
        return 0
    } if (year % 4 === 0) {
        return 1
    } 
    return 0
}

function daysInMonthsBetween(month1, year1, month2, year2) {
    let days = 0
    let m_end = month2
    if (year2 > year1) {
        m_end += 12
    }
    for (let m = month1 + 1; m < m_end; m++) {
        if (m > 12) {
            days += daysInMonth(m % 12, year2)
        } else {
            days += daysInMonth(m, year1)
        }
    } return days
}

function daysInMonth(month, year) {
    const daysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let days = daysArr[month-1]
    if (month === 2) {
        days += isYearLeapYear(year)
    } 
    return days
}

function daysBetween(firstDate, secondDate) {
    let days = secondDate.day - firstDate.day
    if (firstDate.month === secondDate.month & firstDate.year === secondDate.year) {
        return days
    }
    return daysInMonth(firstDate.month, firstDate.year) + days
}

// Tests
console.log(dayDifference('01011995','01011999'))
console.log(dayDifference('05061992','05061992'))
console.log(dayDifference('05061992','06061992'))
console.log(dayDifference('31121990','01011991'))
console.log(dayDifference('28021988','01031988'))
console.log(dayDifference('26111985','04112018'))
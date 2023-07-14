export const dateTitleToDateTime = (title:string) => {
    switch(title){
        case 'Later +3h':
            return calculateDateTime(0, 3)
        case 'Tomorrow Eve':
            return calculateDateTime(1, 18)
        case 'Tomorrow':
            return calculateDateTime(1, 0)
        case 'Monday':
            return calculateNextWeekday(1)
        case 'This Weekend':
            return calculateWeekend()
        case 'Next Week':
            return calculateNextWeekday(1)
        case 'Unspecified':
            return undefined
        case 'At Location':
            return undefined
        case 'Pick A Date':
            return undefined

    }
}

export const isDateInPast = (date:string) => {
    const currentDate = new Date(); // Current date and time
    const inputDate = new Date(date); // Convert the input date to a Date object
  
    // Compare the input date with the current date
    return inputDate <= currentDate;
  }
  

 const calculateDateTime = (daysToAdd:number, hoursToAdd = 0, minutesToAdd = 0, secondsToAdd = 0) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getTime() +
        daysToAdd * 24 * 60 * 60 * 1000 +
        hoursToAdd * 60 * 60 * 1000 +
        minutesToAdd * 60 * 1000 +
        secondsToAdd * 1000
    );
  
    return targetDate.toISOString();
  }
  
   const calculateNextWeekday = (weekday:number)  => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const daysUntilNextWeekday = (weekday + (7 - dayOfWeek)) % 7;
    return calculateDateTime(daysUntilNextWeekday);
  }
  
   const calculateWeekend = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const daysUntilWeekend = dayOfWeek === 6 ? 1 : 6 - dayOfWeek;
    return calculateDateTime(daysUntilWeekend);
  }
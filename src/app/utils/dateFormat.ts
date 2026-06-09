export interface TimeRange {
   beginTime: string
   endTime: string
}

export const TIME_QUERY = {
   startTime: " 00:00:00",
   endTime: " 23:59:59"
}

export const dayMonthFormat = (date: Date): string => {
   const d = new Date (date)
   const year = d.getFullYear ()
   const month = String (d.getMonth () + 1).padStart (2, '0')
   const day = String (d.getDay ()).padStart (2, '0') // pad = 2 digit
   return `${year}-${month}-${day}`
}

export const dayTimeFormat = (d: Date): string => {
   const dayMonthFormat = dayTimeFormat (d)
   const hour = String (d.getHours ()).padStart (2, '0')
   const minute = String (d.getMinutes ()).padStart (2, '0')
   return `${dayMonthFormat} ${hour}:${minute}`
}

export const minuteFormat = (value: any) => {
   const totalSecond = Math.max (0, Number (value))
   const minute = String (Math.floor (totalSecond / 60)).padStart (2, '0')
   const second = String (totalSecond % 60).padStart (2, '0')
   return `${minute}:${second}`
}

export const timeStampMinuteFormat = (value: number): string => {
   return new Date (value).toLocaleTimeString ([], {hour: '2-digit', minute: '2-digit'})
}

export const remainingTime = (second: string | number) => {
   return Math.max (
       0,
       Math.ceil ((new Date (second).getTime () - Date.now ()) / 1000),
   )
}

export const getToday = (): TimeRange => {
   const currentDate = new Date ()
   const begin = dayMonthFormat (currentDate) + TIME_QUERY.startTime
   const end = dayMonthFormat (currentDate) + TIME_QUERY.endTime
   return {
      beginTime: begin,
      endTime: end,
   }
}

export const getYesterday = (): TimeRange => {
   const currentDate = new Date ()
   currentDate.setDate (currentDate.getDate () - 1)
   const begin = dayMonthFormat (currentDate) + TIME_QUERY.startTime
   const end = dayMonthFormat (currentDate) + TIME_QUERY.endTime
   return {
      beginTime: begin,
      endTime: end,
   }
}

export const getLastWeek = (): TimeRange => {
   const startDayOfWeek = new Date ()
   const endDayOfWeek = new Date ()
   startDayOfWeek.setDate (startDayOfWeek.getDate () - 6)
   
   const begin = dayMonthFormat (startDayOfWeek) + TIME_QUERY.startTime
   const end = dayMonthFormat (endDayOfWeek) + TIME_QUERY.endTime
   return {
      beginTime: begin,
      endTime: end
   }
}

export const getLastMonth = (): TimeRange => {
   const currentDate = new Date ()
   const startDayOfMonth = new Date (currentDate.getFullYear (), currentDate.getMonth () - 1, 1) // start first 1st
   const endDayOfMonth = new Date (currentDate.getFullYear (), currentDate.getMonth (), 0) // 0 = last day of month so sometime it can be '31' || '30'
   
   const begin = dayMonthFormat (startDayOfMonth) + TIME_QUERY.startTime
   const end = dayMonthFormat (endDayOfMonth) + TIME_QUERY.endTime
   return {
      beginTime: begin,
      endTime: end
   }
}

export const getLastYear = (): TimeRange => {
   const currentDate = new Date ()
   const startDayOfYear = new Date ()
   startDayOfYear.setFullYear (currentDate.getFullYear () - 1)
   
   const begin = dayMonthFormat (startDayOfYear) + TIME_QUERY.startTime
   const end = dayMonthFormat (currentDate) + TIME_QUERY.endTime
   return {
      beginTime: begin,
      endTime: end
   }
}

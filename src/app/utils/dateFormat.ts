export const dayMonthFormat = (date: string | Date) => {
	const d = new Date(date)
	const month = String(d.getMonth() + 1).padStart(2, '0')
	const year = d.getFullYear()
	const day = String(d.getDay()).padStart(2, '0') // pad = 2 digit
	return `${day}-${month}-${year}`
}

export const dayTimeFormat = (date: string | Date) => {
	const d = new Date(date)
	const month = String(d.getMonth() + 1).padStart(2, '0')
	const year = d.getFullYear()
	const day = String(d.getDay()).padStart(2, '0') // pad = 2 digit
	const hour = String(d.getHours()).padStart(2,'0')
	const minute = String(d.getMinutes()).padStart(2, '0')
	return `${day}-${month}-${year} ${hour}:${minute}`
}
export const minuteFormat = (value: any) =>{
	const totalSecond = Math.max(0,Number(value))
	const minute = String(Math.floor(totalSecond / 60)).padStart(2,'0');
	const second = String(totalSecond % 60).padStart(2,'0');
	return `${minute}:${second}`
}

export const remaingTime =  (second: string | number)=>{
	return Math.max(0,Math.ceil((new Date(second).getTime() - Date.now()) / 1000 ))
}
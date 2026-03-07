export const dayMonthFormat = (date: string) => {
	const d = new Date(date)
	const month = String(d.getMonth() + 1).padStart(2, '0')
	const year = d.getFullYear()
	const day = String(d.getDay()).padStart(2, '0') // pad = 2 digit
	return `${day}-${month}-${year}`
}

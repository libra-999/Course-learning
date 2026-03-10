export interface UploadItem {
	id: string
	name: string
	size: number
	type?: string
	percent: number
}

export interface UploadRule {
	label: string // mark name's object
	types: string[] // ex: img , doc , ...
	minSize?: number
	maxSize: number
}

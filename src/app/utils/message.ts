import {
	ElMessage,
	ElNotification,
	type MessagePlacement,
	type MessageType,
	type NotificationPosition,
	type NotificationType,
} from 'element-plus'

export function useMessage() {
	const messageBox = (
		msg: string,
		type: MessageType,
		placement?: MessagePlacement,
	): any => {
		ElMessage({
			message: msg,
			type: type,
			placement: placement ?? 'top',
		})
	}
	const notificationBox = (
		msg: string,
		type: NotificationType,
		placement?: NotificationPosition,
	): any => {
		ElNotification({
			message: msg,
			type: type,
			position: placement ?? 'top-right',
		})
	}
	return {
		messageBox,
		notificationBox,
	}
}

export const switchStatusCode = (value: number, messageAPI: string) => {
	const message = useMessage()
	switch (value) {
		case 200: {
			message.messageBox('Succeed!', 'success')
			break
		}
		case 201: {
			message.messageBox('Created Successfully !', 'success')
			break
		}
		case 401: {
			message.messageBox('Unauthorized!', 'error')
			break
		}
		case 404: {
			message.messageBox('Not Found!', 'error')
			break
		}
		case 400: {
			message.messageBox('Bad Request!', 'error')
			break
		}
		case 32: {
			message.messageBox(messageAPI, 'error')
			break
		}
		default:
			message.messageBox(messageAPI, 'error')
			break
	}
}

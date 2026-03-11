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

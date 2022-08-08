/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('messages', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		orderId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'orderId'
		},
		senderId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'senderId'
		},
		receiverId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'receiverId'
		},
		senderType: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'senderType'
		},
		receiverType: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'receiverType'
		},
		chatConstantId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			field: 'chatConstantId'
		},
		groupId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			field: 'groupId'
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'message'
		},
		lat: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'lat'
		},
		lng: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'lng'
		},
		replyMessageId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			field: 'replyMessageId'
		},
		replyMessageOwnerId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			field: 'replyMessageOwnerId'
		},
		replyMessage: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'replyMessage'
		},
		replyMessageType: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'replyMessageType'
		},
		forwadedMessageId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			field: 'forwadedMessageId'
		},
		readStatus: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0',
			field: 'readStatus'
		},
		messageType: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'messageType'
		},
		caption: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'caption'
		},
		thumbnail: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'thumbnail'
		},
		isBroadcast: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			field: 'isBroadcast'
		},
		deletedId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'deletedId'
		},
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'created'
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'updated'
		}
	}, {
		tableName: 'messages',
		timestamps:false
	});
};

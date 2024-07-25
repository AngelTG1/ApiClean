"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// src/config/index.ts
exports.config = {
    port: process.env.PORT || 3000,
    wsUrl: process.env.WS_URL || 'ws://localhost:8080',
    mqttBrokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883',
    rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    mqttTopic: process.env.MQTT_TOPIC || 'sensor/max30100',
    rabbitmqTopic: process.env.RABBITMQ_TOPIC || 'sensor/max30100',
};

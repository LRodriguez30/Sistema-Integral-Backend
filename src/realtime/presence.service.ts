import { Injectable, Inject } from '@nestjs/common';
// import { Server } from 'http';
// import Redis from 'ioredis';

@Injectable()
export class PresenceService {
    // constructor(
    //     @Inject('REDIS_CLIENT') private readonly redis: Redis
    // ) {}

    // // SOCKETS
    // async bindSocket(userId: string, socketId: string) {
    //     await this.redis.sadd(`user:${userId}:sockets`, socketId);
    //     await this.redis.set(`socket:${socketId}:user`, userId);
    // }

    // async removeSocket(userId: string, socketId: string) {
    //     await this.redis.srem(`user:${userId}:sockets`, socketId);
    //     await this.redis.del(`socket:${socketId}:user`);
    // }

    // async getUserSockets(userId: string) {
    //     return this.redis.smembers(`user:${userId}:sockets`);
    // }

    // // ROOMS
    // async joinRoom(userId: string, room: string) {
    //     await this.redis.sadd(`user:${userId}:rooms`, room);
    // }

    // async leaveRoom(userId: string, room: string) {
    //     await this.redis.srem(`user:${userId}:rooms`, room);
    // }

    // async getUserRooms(userId: string) {
    //     return this.redis.smembers(`user:${userId}:rooms`);
    // }
}

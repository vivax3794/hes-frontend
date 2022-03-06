import * as xmlUtils from "./xmlUtils";


class Node {
    id: string
    name: string = "No Name Given"
    ip: string | null = null
    adminPass: string
    accounts: {username: string; password: string; type: string;}[] = []
    ports: number[] = []
    proxy_time: number | null = null
    portsToCrack: number = 101
    firewall: {solution: string; additionalTime: number} | null = null
    trace: number | null = null
    adminType: {type: string; resetPassword: boolean; isSuper: boolean} | null = null
    portOverwrites: {[key: number]: number} = {}
    tracker: boolean = false

    constructor(id: string) {
        this.id = id; 
        this.adminPass = Math.random().toString(36).substring(2);
    }
}
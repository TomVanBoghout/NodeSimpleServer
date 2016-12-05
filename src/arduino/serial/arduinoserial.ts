import SerialPort = require("serialport");

import {Arduino}    from "../arduino";
import {Scenario}   from "../scenario";

export class ArduinoSerial extends Arduino {

    private port:SerialPort     = null;

    private portName:string     = null;
    private baudRate:number     = null;

    constructor(portName:string, baudRate: number, scenario: Scenario) {
        super();
        this.portName = portName;
        this.baudRate = baudRate;
        this.scenario = scenario;
    }

    public init(): void {
        this.listPorts();

        if(this.portName != null) {
            this.port = new SerialPort(this.portName, {baudRate: this.baudRate,  parser: SerialPort.parsers.readline('\n')});
            this.port.on('open', this.onCommOpen);
            this.port.on('error', this.onCommError);
            this.port.on('data', this.onDataReceived);
        } else {
            console.error('No comm port for Arduino communication!');
        }
    };

    private listPorts = () => {
        SerialPort.list((err, ports) => {
            console.log('----------------------------------------------');
            console.log('----------------------------------------------');
            console.log('Listing comm ports:');
            console.log('----------------------------------------------');

            ports.forEach((port) => {
                console.log(port.comName);
                console.log(port.pnpId);
                console.log(port.manufacturer);
                console.log('----------------------------------------------');
            });
            console.log('----------------------------------------------');
        });
    };

    private onCommOpen = () => {
        if(this.scenario != null) {
            this.scenario.run(this.port);
        } else {
            console.error('No arduino scenario given to run!');
        }
    };

    private onCommError = (error: any) => {
        console.error('Arduino serial comm error!')
    };

    private onDataReceived = (data: any) => {
        if(this.scenario != null) {
            this.scenario.onMessage(data);
        } else {
            console.error('No scenario to pass data to!');
        }
    };
}
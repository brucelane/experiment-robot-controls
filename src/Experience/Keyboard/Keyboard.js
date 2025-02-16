import EventEmitter from '../Utils/EventEmitter.js'
import KeyboardInterface from './KeyboardInterface.js'

export default class Keyboard extends EventEmitter
{
    constructor()
    {
        super()

        this.setInputs()
        this.setInterface()
    }    

    setInputs()
    {
        this.inputs = {}
        this.inputs.all = [
            { code: 'Digit1', name: 'preset1Pressed' },
            { code: 'Digit2', name: 'preset2Pressed' },
            { code: 'Digit3', name: 'preset3Pressed' },
            { code: 'Digit4', name: 'preset4Pressed' },

            { code: 'KeyW', name: 'torsoUpPressed' },
            { code: 'KeyA', name: 'torsoLeftPressed' },
            { code: 'KeyS', name: 'torsoDownPressed' },
            { code: 'KeyD', name: 'torsoRightPressed' },

            { code: 'ShiftLeft', name: 'clampPressed' },
            { code: 'ShiftRight', name: 'wireframePressed' },

            { code: 'ArrowUp', name: 'forearmPressed' },
            { code: 'ArrowRight', name: 'shoulderPressed' },
            { code: 'ArrowDown', name: 'elbowPressed' },
            { code: 'ArrowLeft', name: 'tetePressed' },
            { code: 'KeyH', name: 'hidePressed' },
        ]

        window.addEventListener('keydown', (_event) =>
        {
            // Input
            const input = this.inputs.all.find((_input) => _input.code === _event.code)

            if(input)
            {
                this.trigger('pressed', [input.name])
            }
        })

        window.addEventListener('keyup', (_event) =>
        {
            // Input
            const input = this.inputs.all.find((_input) => _input.code === _event.code)

            if(input)
            {
                this.trigger('unpressed', [input.name])
            }
        })
    }

    setInterface()
    {
        this.interface = new KeyboardInterface(this.inputs)
    }
}
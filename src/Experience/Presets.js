import * as THREE from 'three'

export default class Presets
{
    constructor()
    {
        this.experience = window.experience
        this.config = this.experience.config
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer
        this.controls = this.experience.controls
        this.world = this.experience.world
        
        this.ready = false

        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.ready = true
                this.apply(0)
            }
        })

        this.controls.on('preset1Pressed', () =>
        {
            this.apply(0)
        })

        this.controls.on('preset2Pressed', () =>
        {
            this.apply(1)
        })

        this.controls.on('preset3Pressed', () =>
        {
            this.apply(2)
        })

        this.controls.on('preset4Pressed', () =>
        {
            this.apply(3)
        })

        this.items = [
            // Default
            {
                bloomEnabled: false,
                bloomThreshold: 0.85,
                bloomStrength: 1.5,
                bloomRadius: 0.4,

                finalEnabled: true,

                toneMapping: THREE.NoToneMapping,
                toneMappingExposure: 1,

                backgroundColorA: '#1c1c1c',
                backgroundColorB: '#000000',

                robotWireframe: false,
                robotColor: '#666666',
                robotRoughness: 1,
                robotMetalness: 0,

                pointLightColor: '#ffffff',
                pointLightIntensity: 50,
                pointLightDecay: 2,
                pointLightY: 5,
                pointLightZ: 3.5,

                spotLightColor: '#ffffff',
                spotLightIntensity: 260,
                spotLightAngle: 1,
                spotLightPenumbra: 1,
                spotLightDecay: 2,
                spotLightZ: 8,
            },

            // Silhouette
            {
                bloomEnabled: false,
                bloomThreshold: 0.85,
                bloomStrength: 1.5,
                bloomRadius: 0.4,

                finalEnabled: true,

                toneMapping: THREE.NoToneMapping,
                toneMappingExposure: 1,

                backgroundColorA: '#ffffff',
                backgroundColorB: '#c5c5c5',

                robotWireframe: false,
                robotColor: '#000000',
                robotRoughness: 0.5,
                robotMetalness: 0,

                pointLightColor: '#ffffff',
                pointLightIntensity: 50,
                pointLightDecay: 2,
                pointLightY: 4,
                pointLightZ: - 4.75,

                spotLightColor: '#ffffff',
                spotLightIntensity: 260,
                spotLightAngle: 1,
                spotLightPenumbra: 1,
                spotLightDecay: 2,
                spotLightZ: - 4.5,
            },

            // Golden
            {
                bloomEnabled: true,
                bloomThreshold: 0.85,
                bloomStrength: 1.5,
                bloomRadius: 0.4,

                finalEnabled: true,

                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1,

                backgroundColorA: '#000000',
                backgroundColorB: '#000000',

                robotWireframe: false,
                robotColor: '#892c00',
                robotRoughness: 0.23,
                robotMetalness: 1,

                pointLightColor: '#2c2c2c',
                pointLightIntensity: 152,
                pointLightDecay: 2,
                pointLightY: - 0.43,
                pointLightZ: 7,

                spotLightColor: '#ffffff',
                spotLightIntensity: 500,
                spotLightAngle: 1,
                spotLightPenumbra: 1,
                spotLightDecay: 0.43,
                spotLightZ: 5,
            },

            // Wireframe
            {
                bloomEnabled: true,
                bloomThreshold: 0,
                bloomStrength: 1.14,
                bloomRadius: 0,

                finalEnabled: false,

                toneMapping: THREE.CineonToneMapping,
                toneMappingExposure: 3,

                backgroundColorA: '#000000',
                backgroundColorB: '#000000',

                robotWireframe: true,
                robotColor: '#000000',
                robotRoughness: 0.35,
                robotMetalness: 0.8,

                pointLightColor: '#AA2211',
                pointLightIntensity: 200,
                pointLightDecay: 0,
                pointLightY: 10,
                pointLightZ: - 1.75,

                spotLightColor: '#3300AA',
                spotLightIntensity: 500,
                spotLightAngle: 1.6,
                spotLightPenumbra: 0.3,
                spotLightDecay: 0,
                spotLightZ: 2.61,
            },
        ]
    }

    apply(_index)
    {
        const presetItem = this.items[_index]

        this.renderer.postProcess.unrealBloomPass.enabled = presetItem.bloomEnabled
        this.renderer.postProcess.unrealBloomPass.threshold = presetItem.bloomThreshold
        this.renderer.postProcess.unrealBloomPass.strength = presetItem.bloomStrength
        this.renderer.postProcess.unrealBloomPass.radius = presetItem.bloomRadius

        this.renderer.postProcess.finalPass.enabled = presetItem.finalEnabled

        this.renderer.instance.toneMapping = presetItem.toneMapping
        this.renderer.instance.toneMappingExposure = presetItem.toneMappingExposure
        
        this.world.background.material.uniforms.uColorA.value.set(presetItem.backgroundColorA)
        this.world.background.material.uniforms.uColorB.value.set(presetItem.backgroundColorB)

        this.world.robot.material.wireframe = presetItem.robotWireframe
        this.world.robot.material.color.set(presetItem.robotColor)
        this.world.robot.material.roughness = presetItem.robotRoughness
        this.world.robot.material.metalness = presetItem.robotMetalness
        this.world.robot.material.needsUpdate = true

        this.world.lights.pointLight.instance.color.set(presetItem.pointLightColor)
        this.world.lights.pointLight.instance.intensity = presetItem.pointLightIntensity
        this.world.lights.pointLight.instance.decay = presetItem.pointLightDecay
        this.world.lights.pointLight.instance.position.y = presetItem.pointLightY
        this.world.lights.pointLight.instance.position.z = presetItem.pointLightZ

        this.world.lights.spotLight.instance.color.set(presetItem.spotLightColor)
        this.world.lights.spotLight.instance.intensity = presetItem.spotLightIntensity
        this.world.lights.spotLight.instance.angle = presetItem.spotLightAngle
        this.world.lights.spotLight.instance.decay = presetItem.spotLightDecay
        this.world.lights.spotLight.instance.position.z = presetItem.spotLightZ
    }
}
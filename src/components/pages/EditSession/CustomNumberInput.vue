<template>
    <div>
        <div class="label">
            {{label}}
            <sup>
                {{supLabel}}
            </sup>
        </div>
        <div class="number-input">
            <button @click="decreaseValue()" class="number-input-button" ></button>
            <input ref="input" type="number" min="0" :max="typeTime === 'seconds' ? 59 : ''" :value="valueComp" @input="onInput($event.target.value, false)" @blur="onInput($event.target.value, true)">
            <button  @click="increaseValue()" class="number-input-button plus"></button>
        </div>
    </div>
</template>

<script>
import {getMutatedObj} from '@/helpers'
export default {
    name: 'CustomNumberInput',
    props: ['typeTime', 'reqModelPath', 'modelObj', 'max', 'label', 'supLabel'],
    computed: {
        valueComp () {
            const value = +this.mutatedObj[ this.reqModelPath[ this.reqModelPath.length - 1]]
            switch (this.typeTime) {
                case 'minutes':
                    return Math.floor(value / 60)
                case 'seconds':
                    return value - Math.floor(value / 60) * 60
                case 'secondsOnly':
                    return value
            }
        },
        mutatedObj () {
            return getMutatedObj(this.modelObj, this.reqModelPath)
        }
    },
    methods: {
        onInput (value, isEmitEvent) {
            const currentValue = +this.mutatedObj[ this.reqModelPath[ this.reqModelPath.length - 1]]
            const secRest = currentValue - Math.floor(currentValue / 60) * 60
            const minRest = Math.floor(currentValue / 60) * 60
            let sendValue = 0
            switch (this.typeTime) {
                case 'minutes':
                    sendValue = (+value * 60) + secRest
                    break
                case 'seconds':
                    sendValue = +value + minRest
                    break
                case 'secondsOnly':
                    sendValue = +value
                    break
            }
            if (this.max !== undefined && sendValue > this.max) {
                sendValue = this.max
            }
            this.mutatedObj[ this.reqModelPath[ this.reqModelPath.length - 1]] = sendValue
            if (isEmitEvent) {
                this.$emit('saveEvent')
            }
        },
        decreaseValue () {
            let currentValue = +this.$refs.input.value
            if (currentValue === 0) return
            this.onInput(currentValue - 1, true)
        },
        increaseValue () {
            let currentValue = +this.$refs.input.value
            this.onInput(currentValue + 1, true)
        }
    }
}
</script>

<style>
    .number-input {
        border: 2px solid #ddd;
        display: inline-flex;
    }
    .number-input-button {
        outline: none;
        -webkit-appearance: none;
        background-color: transparent;
        border: none;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        cursor: pointer;
        margin: 0;
        position: relative;
        margin-top: 3px;
    }
    .number-input-button:before,
    .number-input-button:after {
        display: inline-block;
        position: absolute;
        content: '';
        width: 12px;
        height: 2px;
        background-color: #212121;
        transform: translate(-50%, -50%);
    }
    .number-input-button.plus:after {
        transform: translate(-50%, -50%) rotate(90deg);
    }
    [type="number"] {
        width: 100px;
        height: 38px;
        padding-left: 18px;
        color: #77777a;
        border: 1px solid #dddddd;
        font-family: sans-serif;
        padding: 6px 6px 6px 18px;
        font-size: 21px;
        font-weight: bold;
        text-align: center;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
    }
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type="number"]:focus {
        outline: none;
    }
</style>

<template>
    <div ref="dropdownMenu">
        <div class="label">{{labelName}}</div>
        <div class="select-content">
            <span class="dropdown-arrow" @click="toggleOptions"></span>
            <div class="select-value" :style="valueBackgroundColor" @click="toggleOptions">{{valueText}}</div>
            <div class="select-options" v-show="optionsShow">
                <div class="select-option" 
                    :key="index" v-for="(option, index) in options" @click="onSelect(option)"
                    :style="option.backgroundColor ? {'background-color': option.backgroundColor} : ''"
                    :class = "{'not-hover-backgorund': option.backgroundColor}"
                >
                    {{option.text}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'CustomSelect',
    props: ['labelName', 'options', 'value'],
    data () {
        return {
            optionsShow: false
        }
    },
    computed: {
        valueText () {
            const valueOption =  this.options.filter(option => option.value === this.value)[0]
            if (valueOption) {
                return valueOption.text
            }
            return ''
        },
        valueBackgroundColor () {
            const valueOption =  this.options.filter(option => option.value === this.value)[0]
            if (valueOption) {
                const backgroundColor = valueOption.backgroundColor
                if (backgroundColor) return {'background-color': backgroundColor}
                return ''
            }
            return ''
        }
    },
    methods: {
        onSelect(option) {
            this.$emit('input', option.value)
            this.$emit('close')
            this.optionsShow = false
        },
        toggleOptions () {
            this.optionsShow = !this.optionsShow
            if (this.optionsShow) {
                this.$emit('open')
            } else {
                this.$emit('close')
            }
            
        },
        documentClick(e){
            let el = this.$refs.dropdownMenu
            let target = e.target
            if (( el !== target) && !el.contains(target)) {
                if (this.optionsShow) {
                    this.$emit('close')
                }
                this.optionsShow = false
            }
      }
    },
    created () {
        document.addEventListener('click', this.documentClick)
    },
    destroyed () {
        document.removeEventListener('click', this.documentClick)
  }
}
</script>

<style>
    .select-content {
        position: relative;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: #77777a;

    }
    .dropdown-arrow {
        display: block;
        position: absolute;
        right: 14px;
        top: 14px;
        width: 12px;
        height: 7px;
        background: url(/images/css_sprites.png) -10px -52px;
        cursor: pointer;
    }
    .select-value {
        background-color: #fff;
        border: 1px solid #dddddd;
        width: 100%;
        padding-top: 7px;
        padding-bottom: 8px;
        padding-left: 15px;
        height: 38px;
        cursor: pointer;
    }
    .select-options {
        position: absolute;
        width: 100%;
        top: calc(100% + 1px);
        border: 1px solid #dddddd;
        z-index: 1;
    }
    .select-option {
        background-color: #fff;
        padding-left: 15px;
        padding-top: 7px;
        padding-bottom: 8px;
        height: 38px;
        cursor: pointer;
    }
    .select-option:not(.not-hover-backgorund):hover {
        background-color: #aeb6b5;
    }
</style>


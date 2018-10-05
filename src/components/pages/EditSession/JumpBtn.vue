<template>
    <div  class="jump-segment-btn" @click="save" :class="{'active': isActiveComp}">
        Jump!
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'JumpBtn',
    props: ['serverDateTime', 'isActive', 'segmentTime', 'startDate', 'endDate'],
    data () {
        return {
            
        }
    },
    computed: {
        isActiveComp () {
            const startDate = moment(new Date(this.startDate))
            const endDate = moment(new Date (this.endDate))
            const serverDateTime = moment(new Date(this.serverDateTime))
            if (!this.isActive) {
                return false
            }
            if (serverDateTime > startDate && serverDateTime < endDate) {
                const pastPart = (serverDateTime - startDate) / 1000
                return this.segmentTime > pastPart
            } else {
                return false
            }
        }
    },
    methods: {
        save () {
            if (this.isActiveComp) {
                this.$emit('saveEvent')
            }
        }
    }
}
</script>
<style scoped>
    .jump-segment-btn {
        display: block;
        width: 150px;
        padding-left: 15px;
        padding-right: 15px;
        height: 44px;
        line-height: 34px;
        font-family: Roboto,sans-serif;
        font-size: 18px;
        font-weight: 500;
        border: 5px solid #39b54a;
        color: black;
        text-decoration: none;
        text-align: center;
        border-radius: 3px;
        margin-right: 10px;
        margin-top: 47px;
        opacity: .5;
    }
    .jump-segment-btn:first-child {
        margin-top: 30px;
    }
    .jump-segment-btn.active {
        opacity: 1;
        cursor: pointer;
    }
</style>

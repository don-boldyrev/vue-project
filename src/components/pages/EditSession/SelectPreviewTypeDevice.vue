<template>
    <div class="clearfix chg-w-container">
        <div
            @click="changeDeviceType('desktop')"
            class="chg-w-btn btn btn-default"
            :class="{'active': value === 'desktop'}"
        >Desktop</div>
        <div
            class="chg-w-btn btn btn-default"
            @click="changeDeviceType('ipadH')"
            :class="{'active': value === 'ipadH'}"
        >ipad H</div>
        <div
            class="chg-w-btn btn btn-default"
            @click="changeDeviceType('ipadV')"
            :class="{'active': value === 'ipadV'}"
        >ipad V</div>
    </div>
</template>

<script>
export default {
    name: 'SelectPreviewTypeDevice',
    props: ['value'],
    methods: {
        changeDeviceType(type) {
            this.$emit('input', type)
        }
    }
}
</script>

<style>
.chg-w-container .chg-w-btn {
    color: #333333;
    background-color: #fff;
    border: 1px solid #adadad;
    font-size: 16px;
}
.chg-w-container .chg-w-btn:hover,
.chg-w-container .chg-w-btn.active {
    background-color: #ebebeb;
}
.chg-w-container .chg-w-btn:active,
.chg-w-container .chg-w-btn.active {
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.chg-w-container .chg-w-btn {
    margin-right: 4px;
}


</style>
<template>
    <div class="cta-popup-content">
        <div class="popup-close-btn">X</div>
        <div class="cta-popup-header">
            <div class="countdown">
                <div class="countdown-param">
                    <div class="countdown-min">0</div>
                    <div class="countdown-name">min</div>
                </div>
                <div class="countdown-param">
                    <div class="countdown-sec">0</div>
                    <div class="countdown-name">sec</div>
                </div>
            </div>
            <div class="cta-clearfix"></div>
        </div>
        <div class="popup-sec1">
            <div class="delimeter-cell">
                <div class="delimeter-row"></div>
            </div>
            <div class="text1">{{modelObj['Title1']}}</div>
            <div class="delimeter-cell">
                <div class="delimeter-row"></div>
            </div>
        </div>
        <div class="popup-sec2">
            <span class="text2">{{modelObj['Title2']}}</span>
        </div>
        <div class="popup-btn-wrapper">
            <div class="part-table-cell cta-btn">
                <div class="cta-btn-icon">&gt;</div>
                <span class="cta-btn-text">{{modelObj['ButtonText']}}</span>
            </div>
        </div>
        <div class="popup-cancel-btn">no thanks</div>
    </div>
</template>

<script>
export default {
    name: 'PopupPreview',
    props: ['modelObj']
}
</script>

<style>
.cta-popup-content {
    width: 700px;
    margin: 0 auto;
    background-color: #00c04a;
    font-family: "Aileron";
    color: #fff;
    padding-bottom: 24px;
    position: relative;
    border: 1px solid #000;
}
.popup-close-btn {
    width: 34px;
    height: 34px;
    position: absolute;
    right: 14px;
    top: 14px;
    z-index: 1;
    border-radius: 50%;
    border: 3px solid #009439;
    font-size: 23px;
    font-weight: 700;
    color: #00792f;
    text-align: center;
    line-height: 28px;
    cursor: pointer;
}
.cta-popup-header {
    padding-top: 33px;
    padding-bottom: 30px;
    background-color: #00ac42;
    text-align: center;
    position: relative;
    margin-bottom: 30px;
}
.cta-popup-content .cta-popup-header:after {
    content: "";
    display: block;
    border: 20px solid transparent;
    border-top: 20px solid #00ac42;
    position: absolute;
    bottom: -40px;
    left: calc(50% - 20px);
}
.cta-popup-content .countdown {
    display: inline-block;
    margin: 0 auto;
}
.cta-popup-content .countdown-param {
    width: 110px;
    height: 100px;
    font-size: 54px;
    line-height: 54px;
    font-weight: 200;
    box-shadow: 0 9px 15px -9px #000000;
}
.cta-popup-content .countdown-name {
    font-size: 21px;
    font-weight: 600;
}
.popup-sec1 {
    display: table;
    margin: 0 auto;
    margin-bottom: 2px;
    max-width: 680px;
}
.popup-sec1 .delimeter-cell,
.popup-sec1 .text1 {
    display: table-cell;
    vertical-align: middle;
}
.popup-sec1 .delimeter-cell {
    width: 130px;
}
.delimeter-cell .delimeter-row {
    border: 1px solid #fff;
}
.popup-sec1 .text1 {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 37px;
    font-weight: 300;
    text-transform: uppercase;
    text-align: center;
}
.popup-sec2 {
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    max-width: 570px;
    margin: 0 auto;
    margin-bottom: 15px;
}
.popup-btn-wrapper {
    display: table;
    margin: 0 auto;
    margin-bottom: 13px;
    width: 197px;
    height: 57px;
}
.popup-cancel-btn {
    width: 137px;
    height: 39px;
    line-height: 39px;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #cdcdcd;
    text-align: center;
    background-color: #009439;
    cursor: pointer;
}
</style>


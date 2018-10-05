<template>
    <div 
        class="preview-container"
        :class="{
            'desctop': deviceTypeView === 'desktop',
            'ipad-h': deviceTypeView === 'ipadH',
            'ipad-v': deviceTypeView === 'ipadV'
        }"
    >
        <div class="cta-tbl-wrap">
            <div class="cta-cell-wrap cta-speaker-info-style">
                <div class="cta-cell-content">
                    <div class="left-part">
                        <div class="left-part-sec1">
                            <span class="time-mark">coming<br>up next</span>
                        </div>
                    </div>
                    <div class="right-part">
                        <div class="right-part-sec1">
                            <span class="text1">{{modelObj['Title1']}}</span>
                            <span class="text2">{{modelObj['Title2']}}</span>
                        </div>
                        <div class="right-part-sec2">
                            <span class="text3">{{modelObj['Text1']}}</span>
                        </div>
                        <div class="right-part-sec3">
                            <span class="text4">{{modelObj['Text2']}}</span>
                        </div>
                    </div>
                    <div class="cta-clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpreakerInfoNextPreview',
    props: ['modelObj', 'deviceTypeView']  //desktop, ipadH, ipadV
}
</script>

<style>
.cta-speaker-info-style {
    background-color: #262626;
}
.cta-speaker-info-style .left-part {
    float: left;
    width: 110px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: justify;
    text-align-last: justify;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 900;
}
.cta-speaker-info-style .left-part-sec1 {
    text-align: right;
    text-align-last: right;
}
.cta-speaker-info-style .right-part {
    float: right;
    width: calc(100% - 110px);
    padding-right: 30px;
}
.cta-speaker-info-style .text1 {
    font-weight: 200;
    font-size: 30px;
    text-transform: uppercase;
}
.cta-speaker-info-style .text2 {
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    margin-left: 10px;
}
.cta-speaker-info-style .right-part-sec2 {
    margin-top: -4px;
}
.cta-speaker-info-style .text3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
    color: #00c04a;
}
.cta-speaker-info-style .right-part-sec3 {
    margin-top: 7px;
    text-align: right;
}
.cta-speaker-info-style .text4 {
    font-size: 12px;
    font-style: italic;
}
</style>


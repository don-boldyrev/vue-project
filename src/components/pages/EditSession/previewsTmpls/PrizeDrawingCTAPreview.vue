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
            <div class="cta-cell-wrap cta-price-drawing-style">
                <div class="cta-cell-content">
                    <div class="central-part part-table">
                        <div class="cta-price-drawing-form" v-show="!showThankYouTxt">
                            <div class="left-part part-table-cell">
                                <div class="left-part-sec1">
                                    <span class="text1">{{modelObj['Title1']}}</span>
                                </div>
                                <div class="left-part-sec2">
                                    <input class="input-name" type="text">
                                    <input class="input-email" type="email">
                                </div>
                            </div>
                            <div class="right-part part-table-cell" id="prize_signup">
                                <div class="cta-btn" id="prize_signup">
                                    <div class="cta-btn-icon">&gt;</div>
                                    <span class="cta-btn-text" data-cta-render="btn-text">{{modelObj['ButtonText']}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cta-price-drawing-thank-you" v-show="showThankYouTxt">
                            <span class="text2" >{{modelObj['Title2']}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrizeDrawingCTAPreview',
    props: ['modelObj', 'deviceTypeView', 'showThankYouTxt']  //desktop, ipadH, ipadV
}
</script>

<style>
    .cta-price-drawing-style {
        background-color: #00c04a;
    }
    .cta-price-drawing-style .central-part {
        max-width: 700px;
        margin: 0 auto;
    }
    .cta-price-drawing-style .left-part {
        padding-right: 20px;
    }
    .cta-price-drawing-style .left-part-sec1 {
        margin-top: -3px;
        margin-bottom: 5px;
        text-align: justify;
        text-align-last: justify;
    }
    .cta-price-drawing-style .text1 {
        font-size: 29px;
        line-height: 29px;
        font-weight: 200;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .cta-price-drawing-style .left-part-sec2 {
        text-align: justify;
        text-align-last: justify;
        white-space: nowrap;
    }
    .cta-price-drawing-style input {
        text-align: left;
        text-align-last: left;
        border: 1px solid #939598;
        border-radius: 5px;
        height: 28px;
        background-color: #fff;
        color: #000;
        padding-left: 10px;
    }
    .cta-price-drawing-style .input-name {
        width: 222px;
    }
    .cta-price-drawing-style .input-email {
        width: 261px;
    }
    .cta-price-drawing-style .right-part {
        width: 170px;
        vertical-align: top;
        padding-top: 16px;
        padding-bottom: 16px;
    }
    .cta-price-drawing-thank-you {
        font-size: 23px;
        line-height: 25px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: center;
    }
    /*ipad-h*/
    .ipad-h .cta-price-drawing-style .cta-cell-content {
        padding-left: 50px;
        padding-right: 50px;
    }
    .ipad-h .cta-price-drawing-style .right-part,
    .ipad-v .cta-price-drawing-style .right-part {
        width: auto;
    }
    .ipad-h .cta-price-drawing-style .cta-btn,
    .ipad-v .cta-price-drawing-style .cta-btn {
        font-size: 17px;
        min-width: unset;
        padding-right: 5px;
    }
    .ipad-h .cta-price-drawing-style .text1 {
        font-size: 20px;
    }
    .ipad-h .cta-price-drawing-style .input-name,
    .ipad-h .cta-price-drawing-style .input-email {
        width: 200px;
    }
    .ipad-h .cta-price-drawing-thank-you {
        text-align: justify;
    }
    /*end ipad-h*/
    /*ipad-v */
    .ipad-v .cta-price-drawing-style .cta-cell-content {
        padding-left: 30px;
        padding-right: 30px;
    }
    .ipad-v .cta-price-drawing-style .text1 {
        font-size: 15px;
    }
    .ipad-v .cta-price-drawing-style .input-name,
    .ipad-v .cta-price-drawing-style .input-email {
        width: 140px;
    }
    .ipad-v .cta-price-drawing-thank-you {
        text-align: justify;
        font-size: 18px;
        line-height: 23px;
    }
    /*end ipad-v */
</style>



<template>
    <div class="preview-container"
        :class="{
            'desctop': deviceTypeView === 'desktop',
            'ipad-h': deviceTypeView === 'ipadH',
            'ipad-v': deviceTypeView === 'ipadV'
        }"
    >
        <div class="cta-tbl-wrap">
            <div class="cta-cell-wrap cta-offer-style">
                <div class="cta-cell-content">
                    <div class="part-table">
                        <div class="left-part part-table-cell">
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
                        </div>
                        <div class="central-part part-table-cell">
                            <div class="table-cell-txt-content">
                                <span class="text1">{{modelObj['Text1']}}</span>
                            </div>
                        </div>
                        <div class="right-part part-table-cell">
                            <div class="cta-btn cta-btn-animate">
                                <div class="cta-btn-icon">&gt;</div>
                                <span class="cta-btn-text">{{modelObj['ButtonText']}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CTAOfferPreview',
    props: ['modelObj', 'deviceTypeView']
}
</script>

<style>
.cta-offer-style {
    background-color: #00c04a;
}
.cta-offer-style .cta-cell-content {
    padding-left: 15px;
    padding-right: 15px;
}
.cta-offer-style .left-part {
    width: 130px;
    vertical-align: top;
    padding-top: 15px;
    padding-bottom: 15px;
}
.cta-offer-cont .countdown {
    width: 130px;
}
.cta-offer-style .central-part {
    padding-left: 15px;
    padding-right: 15px;
    font-weight: 900;
    font-size: 17px;
    line-height: 22px;
}
.cta-offer-style .right-part {
    width: 200px;
    vertical-align: top;
    padding-top: 16px;
    padding-bottom: 16px;
}
.cta-btn-animate {
    box-shadow: 0px 0px white, 0em 0px 2.5em 20px white;
    animation: pulse 1s linear infinite;
    -webkit-animation: pulse 1s linear infinite;
}
.cta-btn-animate .cta-btn-text {
    animation: pulsate 1s ease-out infinite;
    -webkit-animation: pulsate 1s ease-out infinite;
    opacity: 0.5;
}
.ipad-h .cta-offer-style .right-part,
.ipad-v .cta-offer-style .right-part {
    width: auto;
}
.ipad-h .cta-offer-style .central-part,
.ipad-v .cta-offer-style .central-part {
    font-size: 15px;
}
.ipad-h .cta-offer-style .cta-btn,
.ipad-v .cta-offer-style .cta-btn {
    font-size: 17px;
    min-width: unset;
    padding-right: 5px;
}
.ipad-h .cta-offer-style  .countdown-param,
.ipad-v .cta-offer-style  .countdown-param {
    font-size: 25px;
    line-height: 25px;
    width: 50px;
    height: 54px;
}
@keyframes pulse {
    0% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 0px white;
    }

    25% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 10px white;
    }

    50% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 20px white;
    }

    75% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 10px white;
    }

    100% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 0px white;
    }
}

@-webkit-keyframes pulse {
    0% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 0px white;
    }

    25% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 10px white;
    }

    50% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 20px white;
    }

    75% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 10px white;
    }

    100% {
        box-shadow: 0px 0px white, 0em 0px 2.5em 0px white;
    }
}

@keyframes pulsate {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1.0;
    }

    100% {
        opacity: 0.5;
    }
}

@-webkit-keyframes pulsate {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1.0;
    }

    100% {
        opacity: 0.5;
    }
}

</style>



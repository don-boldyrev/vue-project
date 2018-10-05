<template>
    <div :class="{'content-container': !isMobile}"  ref="contentContainer">
        <div :class="{'content-section': !isMobile}" ref="contentSection">
            <div class="edit-session-page page">
                <!-- <div @click="saveSettings">Show model</div> -->
                <div class="clearfix save-btn-wrapper">
                    <div class="save-btn" :class="{'disabled': saveLoading}" @click="checkAndSave">
                        <div class="loader" v-show="saveLoading"></div>
                        Save
                    </div>
                </div>
                <custom-tabs v-model="tabsArr"
                    :active-tab="activeTabIndex" 
                    @changeActiveTabIndex="activeTabIndex = $event"
                    :active-segment="activeSegment"
                    :popup-index-tab="popupIndexTab"
                    :is-timeline-popup="isTimelinePopup"
                >
                    <div slot="tabContent0">
                        <div class="clearfix">
                            <div class="settings-col col-session-1">
                                <label class="label" for="EventName">Event Name</label>
                                <input v-model="reqModel.EventName" type="text" class="control-input" placeholder="Input event name" id="EventName">
                                <label class="label" for="SessionName">Session Name</label>
                                <textarea v-model="reqModel.SessionName" class="control-textarea control-textarea-session" id="SessionName" placeholder="Input session name"></textarea>
                                <div class="clearfix">
                                    <div class="settings-col settings-col-datepicker">
                                        <label class="label" for="SessionDateTimeStart">Session DateTime Start</label>
                                        <div class="datepicker-wrapper">
                                            <span class="icon-calendar" @click="$refs['SessionDateTimeStart'].$vnode.elm.focus()"></span>
                                            <date-picker 
                                                ref="SessionDateTimeStart"
                                                id="SessionDateTimeStart"
                                                v-model="reqModel['SessionDateTimeStart']"
                                                :config="datePickerStartOptions"
                                                @dp-change="dateChange">
                                            </date-picker>
                                        </div>
                                    </div>
                                    <div class="settings-col-right settings-col-datepicker">
                                        <label class="label" for="SessionDateTimeEnd">Session DateTime End</label>
                                        <div class="datepicker-wrapper">
                                            <span class="icon-calendar" @click="$refs['SessionDateTimeEnd'].$vnode.elm.focus()"></span>
                                            <date-picker 
                                                ref="SessionDateTimeEnd"
                                                id="SessionDateTimeEnd"
                                                v-model="reqModel['SessionDateTimeEnd']"
                                                :config="datePickerEndOptions"
                                                @dp-change="dateChange">
                                            </date-picker>
                                        </div>
                                    </div>
                                </div>
                                <custom-select
                                    label-name="Room"
                                    :options="roomSelectOptions"
                                    v-model="reqModel['SessionRoom']"
                                    class="room-select">
                                </custom-select>
                                <div class="checkbox-block checkbox-block-popup clearfix">
                                    <input id="isPopup" type="checkbox" class="control-checkbox" 
                                        v-model="reqModel['PopUp_isEnable']"
                                        @change="checkboxTabsChange(popupIndexTab)"
                                    >
                                    <label for="isPopup">Popup is Enabled</label>
                                </div>
                            </div>
                            <div class="settings-col col-session-2">
                                <div 
                                    v-for="segmentNum in countSegments" 
                                    :key="segmentNum"
                                    class="checkbox-block checkbox-block-segment clearfix"
                                >
                                    <div class="label">Segment</div>
                                    <div class="segment-number">{{segmentNum}}</div>
                                    <input 
                                        :id="'segCheckbox' + segmentNum"
                                        type="checkbox" 
                                        class="control-checkbox" 
                                        v-model="reqModel['Segment' + segmentNum + '_isActive']"
                                        @change="segmentTabsChange(segmentNum)"
                                    >
                                    <label :for="'segCheckbox' + segmentNum"></label>
                                </div>
                            </div>
                            <div class="settings-col col-session-3">
                                <div 
                                    v-for="segmentNum in countSegments" 
                                    :key="segmentNum"
                                    class="select-block"
                                    :class="{'disabled': !reqModel['Segment' + segmentNum + '_isActive']}"
                                >
                                    <custom-select
                                        label-name="Segment Type"
                                        :options="segmentTypeSelectOptions"
                                        v-model="reqModel['Segment' + segmentNum + '_Type']"
                                        @input="segmentTabsChange(segmentNum)"
                                    >
                                    </custom-select>
                                </div>
                            </div>
                            <div class="settings-col col-session-4">
                                <custom-number-input
                                    v-for="segmentNum in countSegments"
                                    :key="segmentNum"
                                    :type-time="'minutes'"
                                    :req-model-path = "['Segment' + segmentNum + '_Seconds']"
                                    :model-obj = "reqModel"
                                    @saveEvent = "checkSegTimeAccord"
                                    label="Minutes"
                                    sup-label="from session start"
                                    class="col-session-number-input"
                                    v-visible="segmentNum !== 1"
                                >
                                </custom-number-input>
                            </div>
                            <div class="settings-col col-session-5">
                                <custom-number-input
                                    v-for="segmentNum in countSegments"
                                    :key="segmentNum"
                                    :type-time="'seconds'"
                                    :req-model-path = "['Segment' + segmentNum + '_Seconds']"
                                    :model-obj = "reqModel"
                                    @saveEvent = "checkSegTimeAccord"
                                    label="Seconds"
                                    sup-label="from session start"
                                    class="col-session-number-input"
                                    v-visible="segmentNum !== 1"
                                >
                                </custom-number-input>
                            </div>
                            <div class="settings-col">
                                <jump-btn
                                    v-for="segmentNum in countSegments"
                                    :key="segmentNum"
                                    :is-active = "reqModel['Segment' + segmentNum + '_isActive']"
                                    :server-date-time = "serverDateTime"
                                    :segment-time = "reqModel['Segment' + segmentNum + '_Seconds']"
                                    :start-date = "reqModel['SessionDateTimeStart']"
                                    :end-date = "reqModel['SessionDateTimeEnd']"
                                    @saveEvent = "jumpSaveEvent(reqModel['Segment' + segmentNum + '_Seconds'], segmentNum)"
                                    v-visible="segmentNum !== 1"
                                >
                                </jump-btn>
                            </div>
                        </div>
                    </div>
                    <div slot="tabContent1">
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="SpInTitle1">Title 1</label>
                                <input 
                                    v-model="stateType(1)['Title1']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info title"
                                    id="SpInTitle1"
                                    maxlength="30"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="SpInTitle2">Title 2</label>
                                <input
                                    v-model="stateType(1)['Title2']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info title"
                                    id="SpInTitle2"
                                    maxlength="45"
                                >
                            </div>  
                        </div>
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="SpInText1">Text 1</label>
                                <input 
                                    v-model="stateType(1)['Text1']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info text"
                                    id="SpInText1"
                                    maxlength="120"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="SpInTitle2">Text 2</label>
                                <input
                                    v-model="stateType(1)['Text2']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info title"
                                    id="SpInTitle2"
                                    maxlength="100"
                                >
                            </div>  
                        </div>           
                    </div>
                    <div slot="tabContent2">
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="PriceCTATitle1">Title 1</label>
                                <input 
                                    v-model="stateType(2)['Title1']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input price CTA title"
                                    id="PriceCTATitle1"
                                    maxlength="30"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="PriceCTATitle2">Title 2</label>
                                <input
                                    v-model="stateType(2)['Title2']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input price CTA title"
                                    id="PriceCTATitle2"
                                    maxlength="100"
                                >
                            </div>  
                        </div>
                        <div>
                            <label class="label" for="PriceCTABtnText1">Button Text</label>
                            <input
                                v-model="stateType(2)['ButtonText']"
                                type="text"
                                class="control-input"
                                placeholder="Input price CTA button text"
                                id="PriceCTABtnText1"
                                maxlength="8"
                            >
                        </div>
                    </div>
                    <div slot="tabContent3">
                        <div>
                            <label class="label" for="OfferCTAText1">Text 1</label>
                            <input
                                v-model="stateType(3)['Text1']"
                                type="text"
                                class="control-input"
                                placeholder="Input offer CTA buy text"
                                id="OfferCTAText1"
                                maxlength="160"
                            >
                        </div>
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="OfferCTABtnText1">Button Text</label>
                                <input 
                                    v-model="stateType(3)['ButtonText']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input offer CTA buy button text"
                                    id="OfferCTABtnText1"
                                    maxlength="8"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="OfferCTABtnUrl">Button URL</label>
                                <input 
                                    v-model="stateType(3)['ButtonUrl']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input offer CTA buy button URL"
                                    id="OfferCTABtnUrl"
                                >
                            </div>
                        </div>
                    </div>
                    <div slot="tabContent4">
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="SpInNextTitle1">Title 1</label>
                                <input 
                                    v-model="stateType(4)['Title1']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info next title"
                                    id="SpInNextTitle1"
                                    maxlength="30"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="SpInNextTitle2">Title 2</label>
                                <input
                                    v-model="stateType(4)['Title2']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info next title"
                                    id="SpInNextTitle2"
                                    maxlength="45"
                                >
                            </div>  
                        </div>
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="SpInNextText1">Text 1</label>
                                <input 
                                    v-model="stateType(4)['Text1']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info next text"
                                    id="SpInNextText1"
                                    maxlength="120"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="SpInNextTitle2">Text 2</label>
                                <input
                                    v-model="stateType(4)['Text2']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input speaker info next title"
                                    id="SpInNextTitle2"
                                    maxlength="100"
                                >
                            </div>  
                        </div>  
                    </div>
                    <div slot="tabContent5">
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="PopUpTitle1">Title 1</label>
                                <input 
                                    v-model="reqModel['SessionPopUp']['Title1']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input pop up title"
                                    id="PopUpTitle1"
                                    maxlength="35"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="PopUpTitle2">Title 2</label>
                                <input 
                                    v-model="reqModel['SessionPopUp']['Title2']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input pop up title"
                                    id="PopUpTitle2"
                                    maxlength="53"
                                >
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <label class="label" for="PopUpBtnText">Button Text</label>
                                <input 
                                    v-model="reqModel['SessionPopUp']['ButtonText']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input pop up button text"
                                    id="PopUpBtnText"
                                    maxlength="8"
                                >
                            </div>
                            <div class="settings-col-right hulf-width">
                                <label class="label" for="PopUpBtnURL">Button URL</label>
                                <input 
                                    v-model="reqModel['SessionPopUp']['ButtonUrl']"
                                    type="text"
                                    class="control-input"
                                    placeholder="Input pop up button text"
                                    id="PopUpBtnURL"
                                >
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <custom-number-input
                                    :type-time="'minutes'"
                                    :req-model-path = "['PopUp_SecondsStart']"
                                    :model-obj = "reqModel"
                                    @saveEvent = "checkTimeAccord(reqModel, 'PopUp_SecondsStart', 'PopUp_SecondsEnd', sessionDuration, true)"
                                    label="Start Time from session start: Minutes"
                                    class="col-session-number-input"
                                >
                                </custom-number-input>
                            </div>
                            <div class="settings-col-right hulf-width">
                                <custom-number-input
                                    :type-time="'seconds'"
                                    :req-model-path = "['PopUp_SecondsStart']"
                                    :model-obj = "reqModel"
                                    @saveEvent = "checkTimeAccord(reqModel, 'PopUp_SecondsStart', 'PopUp_SecondsEnd', sessionDuration, true)"
                                    label="Start Time from session start: Seconds"
                                    class="col-session-number-input"
                                >
                                </custom-number-input>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="settings-col hulf-width">
                                <custom-number-input
                                    :type-time="'minutes'"
                                    :req-model-path = "['PopUp_SecondsEnd']"
                                    :model-obj = "reqModel"
                                    @saveEvent = "checkTimeAccord(reqModel, 'PopUp_SecondsStart', 'PopUp_SecondsEnd', sessionDuration, true)"
                                    label="End Time from session start: Minutes"
                                    class="col-session-number-input"
                                >
                                </custom-number-input>
                            </div>
                            <div class="settings-col-right hulf-width">
                                <custom-number-input
                                    :type-time="'seconds'"
                                    :req-model-path = "['PopUp_SecondsEnd']"
                                    :model-obj = "reqModel"
                                    @saveEvent = "checkTimeAccord(reqModel, 'PopUp_SecondsStart', 'PopUp_SecondsEnd', sessionDuration, true)"
                                    label="End Time from session start: Seconds"
                                    class="col-session-number-input"
                                >
                                </custom-number-input>
                            </div>
                        </div>
                    </div>
                    <div slot="tabContent6">
                        <div class="clearfix add-video-btn-wrapper">
                            <div class="add-video-btn" @click="addVideo">Add video</div>
                        </div>
                        <div class="video-items-content">
                            <VideoItem
                                :key=" index"
                                v-for="(videoObj, index) in reqModel['SessionVideos']"
                                :models-arr="reqModel['SessionVideos']"
                                :model-index="index"
                                :session-duration = "sessionDuration"
                            ></VideoItem>
                        </div>
                    </div>
                    <div slot=tabContent7>
                        <div class="clearfix add-message-btn-wrapper">
                            <div class="add-message-btn" @click="addMessage">Add Message</div>
                        </div>
                        <div class="message-items-content">
                            <MessageItem
                                :key=" index"
                                v-for="(messageObj, index) in reqModel['SessionMessages']"
                                :model-obj="messageObj"
                                :model-index="index"
                                :session-duration = "sessionDuration"
                                :session-id = "sessionId"
                                @setMessage="setMessage($event, index)"
                                @deleteMessage="deleteMessage(index)"
                            ></MessageItem>
                        </div>
                    </div>
                    <div slot="previewContent" class="preview" v-show="[1, 2, 3, 4, 5].indexOf(activeTabIndex) !== -1">
                        <div class="clearfix">
                            <a
                                class="preview-link"
                                :href="'/preview/index?segment=' + activeTabIndex + '&session=' + sessionId + '&room=' + reqModel['SessionRoom']"
                                target="_blank"
                            >
                                See Preview (preview is available after saving)
                            </a>
                            <div
                                class="show-thank-you-btn btn btn-default"
                                @click="showThankYouTxt = !showThankYouTxt"
                                :class="{'active': showThankYouTxt}"
                                v-show="activeTabIndex === 2"
                            >{{showThankYouTxt ? 'Show form' : 'Show thank you text'}}
                            </div>
                            <SelectPreviewTypeDevice 
                                v-model="deviceTypeView"
                                v-show="activeTabIndex !== 5"
                            ></SelectPreviewTypeDevice>
                        </div>
                        <SpreakerInfoPreview 
                            v-show="activeTabIndex === 1"
                            :model-obj="stateType(1)" 
                            :device-type-view="deviceTypeView"
                        ></SpreakerInfoPreview>
                        <PrizeDrawingCTAPreview 
                            v-show="activeTabIndex === 2"
                            :model-obj="stateType(2)" 
                            :device-type-view="deviceTypeView"
                            :show-thank-you-txt="showThankYouTxt"
                        ></PrizeDrawingCTAPreview>
                        <CTAOfferPreview 
                            v-show="activeTabIndex === 3"
                            :model-obj="stateType(3)" 
                            :device-type-view="deviceTypeView"
                        ></CTAOfferPreview>
                        <SpreakerInfoNextPreview 
                            v-show="activeTabIndex === 4"
                            :model-obj="stateType(4)" 
                            :device-type-view="deviceTypeView"
                        ></SpreakerInfoNextPreview>
                        <PopupPreview 
                            v-show="activeTabIndex === 5"
                            :model-obj="reqModel['SessionPopUp']"
                        ></PopupPreview>
                    </div>
                </custom-tabs>         
            </div>
        </div>
        <Timeline 
            :model-obj="reqModel"
            :session-duration="sessionDuration"
            :server-date-time="serverDateTime"
            :segmentTypes="segmentTypeSelectOptions"
            :count-segments="countSegments"
            :is-mobile="isMobile"
            @changeSegmentActive="activeSegment = $event"
            @changePopupActive ="isTimelinePopup = $event"
            ></Timeline>
    </div>
</template>

<script>
    import '@/components/pages/EditSession/EditSession.css'
    import pageWraperMixin from '@/components/mixins/checkTimeAccordMixin'
    import checkTimeAccordMixin from '@/components/mixins/pageWraperMixin'
    import CustomTabs from '@/components/pages/EditSession/CustomTabs'
    import JumpBtn from '@/components/pages/EditSession/JumpBtn'
    import SelectPreviewTypeDevice from '@/components/pages/EditSession/SelectPreviewTypeDevice'
    import SpreakerInfoPreview from '@/components/pages/EditSession/previewsTmpls/SpreakerInfoPreview'
    import PrizeDrawingCTAPreview from '@/components/pages/EditSession/previewsTmpls/PrizeDrawingCTAPreview'
    import SpreakerInfoNextPreview from '@/components/pages/EditSession/previewsTmpls/SpreakerInfoNextPreview'
    import CTAOfferPreview from '@/components/pages/EditSession/previewsTmpls/CTAOfferPreview'
    import PopupPreview from '@/components/pages/EditSession/previewsTmpls/PopupPreview'
    import VideoItem from '@/components/pages/EditSession/VideoItem'
    import MessageItem from '@/components/pages/EditSession/MessageItem'
    import Timeline from '@/components/pages/EditSession/Timeline'
    import checkBeforeSave from '@/components/pages/EditSession/checkBeforeSave.js'
    import swal from 'sweetalert'
    import * as sharedClasses from '@/components/pages/EditSession/sharedClasses'
    import moment from 'moment'
    const dateFormat = 'YYYY-MM-DD HH:mm'

    const segmentTypes = [
        {
            text: "SPEAKER INFO",
            value: 1,
            backgroundColor: '#b9ffba'
        },
        {
            text: "PRIZE DRAWING CTA",
            value: 2,
            backgroundColor: '#f4ffaa'
        },
        {
            text: "CTA OFFER, BUY LINK",
            value: 3,
            backgroundColor: '#ffc3c3'
        },
        {
            text: "COMING UP NEXT",
            value: 4,
            backgroundColor: '#b1dafd'
        }
    ]
    
    export default {
        name: 'EditSession',
        mixins: [pageWraperMixin, checkTimeAccordMixin],
        data () {
            return {
                countSegments: 5,
                countStatesTypes: segmentTypes.length,
                popupIndexTab: 5,
                reqModel: {
                    ActiveSessionMessages: null,
                    ActiveSessionVideo: null,
                    CTA_LaunchUrl: null,
                    CTA_Text: null,
                    CountDownTimerMode: 0,
                    CountDownTimer_DT: '',
                    CountDownTimer_DT_Str: '',
                    CountDownTimer_Minute: 0,
                    CountDownTimer_isActive: false,
                    EventName: '',
                    Front_ActiveState: 1,
                    Front_CountDownTimerEnd: '',
                    Front_CountDownTimerStart: '',
                    Front_PopupIsActive: false,
                    Id: 0,
                    PopUp_DateTimeEnd: '',
                    PopUp_DateTimeEnd_Str: '',
                    PopUp_DateTimeStart: '',
                    PopUp_DateTimeStart_Str: '',
                    PopUp_SecondsEnd: 60,
                    PopUp_SecondsStart: 0,
                    PopUp_Text: null,
                    PopUp_isEnable: false,
                    Segment1_DateTimeStart: '',
                    Segment1_DateTimeStart_Str: '',
                    Segment1_Seconds: 0,
                    Segment1_Type: 1,
                    Segment1_isActive: false,
                    Segment2_DateTimeStart: '',
                    Segment2_DateTimeStart_Str: '',
                    Segment2_Seconds: 0,
                    Segment2_Type: 1,
                    Segment2_isActive: false,
                    Segment3_DateTimeStart: '',
                    Segment3_DateTimeStart_Str: '',
                    Segment3_Seconds: 0,
                    Segment3_Type: 1,
                    Segment3_isActive: false,
                    Segment4_DateTimeStart: '',
                    Segment4_DateTimeStart_Str: '',
                    Segment4_Seconds: 0,
                    Segment4_Type: 1,
                    Segment4_isActive: false,
                    Segment5_DateTimeStart: '',
                    Segment5_DateTimeStart_Str: '',
                    Segment5_Seconds: 0,
                    Segment5_Type: 1,
                    Segment5_isActive: false,
                    SessionDateTimeEnd: moment().add(1, 'hours').format(dateFormat),
                    SessionDateTimeEnd_Str: '',
                    SessionDateTimeEnd_StrDataTable: '',
                    SessionDateTimeStart: moment().format(dateFormat),
                    SessionDateTimeStart_Str: '',
                    SessionDateTimeStart_StrDataTable: '',
                    SessionLength: 0,
                    SessionMessages: [],
                    SessionName: null,
                    SessionPopUp: new sharedClasses.PopupContruct(0),
                    SessionRoom: 1,
                    SessionStates: [
                        new sharedClasses.SessionStateContruct(1, 0),
                        new sharedClasses.SessionStateContruct(2, 0),
                        new sharedClasses.SessionStateContruct(3, 0),
                        new sharedClasses.SessionStateContruct(4, 0)
                    ],
                    SessionVideos: [new sharedClasses.VideoConstruct(0)],
                    State1_Text: null,
                    State2_Text: null,
                    State3_Text: null,
                    State3_Timer_isActive: false,
                    UserId: null
                },
                activeTabIndex: 0,
                activeTabs: [0, 6, 7],
                /*disabled props detected automatically in method setEnableTab*/
                tabsArr: [
                    {
                        name: 'SESSION',
                    },
                    {
                        name: segmentTypes[0].text
                    },
                    {
                        name: segmentTypes[1].text
                    },
                    {
                        name: segmentTypes[2].text
                    },
                    {
                        name: segmentTypes[3].text
                    },
                    {
                        name: 'POP UP'
                    },
                    {
                        name: 'Pre-Schedule Videos'
                    },
                    {
                        name: 'Messages'
                    }
                ],
                datePickerStartOptions: {
                    format: dateFormat
                },
                roomSelectOptions: [
                    {
                        text: 1,
                        value: 1
                    },
                    {
                        text: 2,
                        value: 2
                    },
                    {
                        text: 3,
                        value: 3
                    },
                    {
                        text: 4,
                        value: 4
                    },
                    {
                        text: 5,
                        value: 5
                    },
                    {
                        text: 6,
                        value: 6
                    },
                    {
                        text: 7,
                        value: 7
                    },
                    {
                        text: 8,
                        value: 8
                    },
                    {
                        text: 9,
                        value: 9
                    },
                    {
                        text: 10,
                        value: 10
                    }
                ],
                activeSegment: false,
                isTimelinePopup: false,
                segmentTypeSelectOptions: segmentTypes,
                serverDateTime: moment().format(dateFormat),
                sessionId: 0,
                deviceTypeView: 'desktop', //ipadH, ipadV
                showThankYouTxt: false,
                saveLoading: false
            }
        },
        computed: {
            stateType () {
                return (type) => {
                    const stateType = this.reqModel.SessionStates.filter(state => state['StateType'] == type)[0]
                    return stateType
                }
            },
            datePickerEndOptions () {
                 return {
                    format: dateFormat,
                    minDate : this.reqModel.SessionDateTimeStart
                 }
            },
            sessionDuration () {
                return (moment(this.reqModel['SessionDateTimeEnd']) - moment(this.reqModel['SessionDateTimeStart']))/1000
            }
        },
        created () {
            this.createInit(true)
        },
        methods: {
            createInit (firstTime) {
                this.sessionId = this.$route.params.id ? +this.$route.params.id : 0
                this.setEnableTab()
                this.$http.get('/SessionSettings/GetSessionSettingItem/' + (this.$route.params.id ? this.$route.params.id : 0))
                .then (response => {
                    return response.json()
                })
                .then(json => {
                    this.reqModel = json
                        this.reqModel['SessionDateTimeStart'] = moment(new Date(this.reqModel['SessionDateTimeStart_Str'])).format(dateFormat)
                        /*need because min date from computed will set after*/
                        new Promise((resolve) => {
                            resolve(true)
                        }).then(() => {
                            this.reqModel['SessionDateTimeEnd'] = moment(new Date(this.reqModel['SessionDateTimeEnd_Str'])).format(dateFormat)
                        })
                    
                    for (let i = 1; i <= this.countSegments; i++) {
                        if (!this.reqModel['Segment' + i + '_Type']) {
                            this.reqModel['Segment' + i + '_Type'] = 1
                        }
                    }
                    if (!this.reqModel['SessionStates']) {
                        this.reqModel['SessionStates'] = []
                    }
                    for (let i = 1; i <= this.countStatesTypes; i++) {
                        if (!this.reqModel['SessionStates'].find(state => state["StateType"] == i)) {
                            this.reqModel['SessionStates'].push(new sharedClasses.SessionStateContruct(i, this.sessionId))
                        }
                    }
                    this.initSegmentsActive()
                    if (!this.reqModel['SessionPopUp']) {
                        this.reqModel['SessionPopUp'] = new sharedClasses.PopupContruct(this.sessionId)
                    }
                    if (this.reqModel['PopUp_SecondsStart'] == 0 && this.reqModel['PopUp_SecondsEnd'] == 0) {
                        this.reqModel['PopUp_SecondsEnd'] = 60
                    }
                    if (!this.reqModel['SessionVideos']) {
                        this.reqModel['SessionVideos'] = [new sharedClasses.VideoConstruct(this.sessionId)]
                    }
                    if (!this.reqModel['SessionMessages']) {
                        this.reqModel['SessionMessages'] = []
                    }
                    if (this.reqModel['PopUp_isEnable']) {
                        this.activeTabs.push(this.popupIndexTab)
                    }
                    if (!this.$route.params.id) {
                        this.initSegmentsTime()
                    }
                    this.setEnableTab()
                })
                if (firstTime) {
                    const getServerDateTime = () => {
                    this.$http.get('/SessionSettings/GetServerDateTimeNow').then(response => {
                        return response.json()
                    }).then((dateTime)=>{
                        this.serverDateTime = dateTime
                        setTimeout(()=>{
                            getServerDateTime()
                        }, 5000)
                    })
                    }
                    getServerDateTime()
                }     
            },
            setEnableTab () {
                this.tabsArr.forEach((tab, index) => {
                    tab.disabled = this.activeTabs.indexOf(index) === -1
                })
            },
            dateChange () {
                if (moment(this.reqModel['SessionDateTimeStart']) >= moment(this.reqModel['SessionDateTimeEnd'])) {
                    this.reqModel['SessionDateTimeEnd'] = moment(this.reqModel['SessionDateTimeStart']).add(1, 'h').format(dateFormat)
                }
                this.checkSegTimeAccord()
            },
            checkboxTabsChange (tabIndex) {
                if (this.activeTabs.indexOf(tabIndex) === -1) {
                    this.activeTabs.push(tabIndex)
                } else {
                    const tabIndexInArr = this.activeTabs.indexOf(tabIndex)
                    if (tabIndexInArr !== -1) {
                        this.activeTabs.splice(tabIndexInArr, 1)
                    }
                }
                this.setEnableTab()
            },
            segmentTabsChange (segmentNum) {
                if (this.reqModel['Segment' + (segmentNum - 1) + '_isActive'] === false) {
                    this.reqModel['Segment' + segmentNum + '_isActive'] = false
                    return
                }
                if (!this.reqModel['Segment' + segmentNum + '_isActive']) {
                    for (let i = segmentNum + 1; i <= this.countSegments; i++) {
                        this.reqModel['Segment' + i + '_isActive'] = false
                    }
                }
                this.initSegmentsActive()
                this.setEnableTab()
            },
            initSegmentsActive() {
                let activeSegTypeArr = []
                for (let i = 1; i <= this.countSegments; i++) {
                    if (this.reqModel['Segment' + i + '_isActive']) {
                        if (activeSegTypeArr.indexOf(this.reqModel['Segment' + i + '_Type']) === -1) {
                            activeSegTypeArr.push(this.reqModel['Segment' + i + '_Type'])
                        }
                    }
                }
                this.activeTabs = this.activeTabs.filter(index => !(index >= 1 && index <= this.countStatesTypes))
                this.activeTabs = this.activeTabs.concat(activeSegTypeArr)
            },
            initSegmentsTime () {
                let countMins = 60
                for (let i = 0; i < this. countSegments; i++) {
                    if (i !== 0) {
                        const nextSeconds = this.reqModel['Segment' + (i + 1) + '_Seconds']
                        const prevSeconds = this.reqModel['Segment' + i + '_Seconds']
                        if (nextSeconds == prevSeconds && nextSeconds < this.sessionDuration - 60) {
                            this.reqModel['Segment' + (i + 1) + '_Seconds'] = nextSeconds + 60
                        }
                    } else {
                        this.reqModel['Segment' + (i + 1) + '_Seconds'] = countMins * i
                    }
                }
            },
            checkSegTimeAccord () {
                for (let i = 1; i <= this.countSegments; i++) {
                    let nextSegment = this.reqModel['Segment' + (i + 1) + '_Seconds']
                    if (nextSegment !== undefined) {
                        this.checkTimeAccord(this.reqModel, 'Segment' + i + '_Seconds', 'Segment' + (i + 1) + '_Seconds', this.sessionDuration)
                    }
                }
            },
            jumpSaveEvent (secondsSegments, segmentNum) {
                swal({
                    title: "Are you sure you?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then(isJump => {
                    if (isJump) {
                        const diff = (moment(new Date(this.serverDateTime)) - moment(new Date(this.reqModel['SessionDateTimeStart']))) / 1000
                        for (let i = 1; i < segmentNum; i++) {
                            this.reqModel['Segment' + i + '_Seconds'] = 0
                        }
                        this.reqModel['Segment' + segmentNum + '_Seconds'] = diff
                        this.initSegmentsTime()
                        this.saveSettings()
                    }
                })
            },
            addVideo() {
                this.reqModel['SessionVideos'].push(new sharedClasses.VideoConstruct(this.sessionId))
            },
            
            addMessage() {
                this.reqModel['SessionMessages'].push(new sharedClasses.ModalMessageConstruct(this.sessionId))
            },
            // need for rerender
            setMessage(msgObj, index) {
                this.$set(this.reqModel['SessionMessages'], index, msgObj)
            },
            deleteMessage(index) {
                this.reqModel['SessionMessages'].splice(index, 1)
            },
            //
            checkAndSave() {
                const showTabCB = (index) => {this.activeTabIndex = index}
                let resultCheck = checkBeforeSave(this.reqModel, this.countSegments, segmentTypes, this.sessionDuration, showTabCB)
                if (resultCheck) {
                    // this.saveSettings()
                }
                console.log('this.reqModel', this.reqModel)
            },
            saveSettings () {
                this.saveLoading = true
                this.$http.post('/SessionSettings/CheckSessionDateTime')
                    .then(response => {
                        return response.json()
                    })
                    .then(checkDateTime => {
                        if (!checkDateTime) {
                            this.$http.post('/SessionSettings/EditSessionSettingItem', this.reqModel)
                                .then(resSave => {
                                    return resSave.json()
                                })
                                .then(saveResult => {
                                    this.saveLoading = false
                                    if (saveResult.successsave == 1) {
                                        let id = this.$router.currentRoute.params.id
                                        if (id) {
                                            location.reload()
                                        } else {
                                            this.$router.push({
                                                name: 'editSessionId',
                                                params: { id: saveResult.id }
                                            },
                                            () => {
                                                location.reload()
                                            })
                                        }
                                    } else {
                                        swal(saveResult.message, "", "error")
                                        this.activeTabIndex = 0
                                    }
                                })
                        }
                    })
            }
        },
        watch: {
            "$route.params.id": function () {
                // this.createInit()
                location.reload()
            }
        },
        components: {
            CustomTabs,
            JumpBtn,
            SelectPreviewTypeDevice,
            SpreakerInfoPreview,
            SpreakerInfoNextPreview,
            PrizeDrawingCTAPreview,
            CTAOfferPreview,
            PopupPreview,
            VideoItem,
            MessageItem,
            Timeline
        }
    }
</script>
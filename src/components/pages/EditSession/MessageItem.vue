<template>
    <div class="message-item">
        <div class="delete-message" @click="deleteMessageItem">&times;</div>
        <div class="message-item-row clearfix">
            <div class="message-col col-message-number-input">
                <custom-number-input
                    v-for="(typeModel, key) in typeModels"
                    :key = key
                    :type-time="'minutes'"
                    :req-model-path = "['SecondsStart']"
                    :model-obj="typeModel"
                    @saveEvent="checkMessageTimeAccord(key)"
                    label="Minutes"
                    sup-label="from session start"
                    v-show="currentSelectedtype === key"
                >
                </custom-number-input>
            </div>
            <div class="message-col col-message-number-input">
                <custom-number-input
                    v-for="(typeModel, key) in typeModels"
                    :key = key
                    :type-time="'seconds'"
                    :req-model-path = "['SecondsStart']"
                    :model-obj="typeModel"
                    @saveEvent="checkMessageTimeAccord(key)"
                    label="Seconds"
                    sup-label="from session start"
                    v-show="currentSelectedtype === key"
                >
                </custom-number-input>
            </div>
            <div class="message-col" :class="{
                'col-message-3' : currentSelectedtype === '1',
                'col-message-4' : currentSelectedtype !== '1',
            }">
                <custom-select
                    label-name="Message Type"
                    :options="messageSelectOptions"
                    v-model="currentSelectedtype"
                    @input="changeMessageType()"
                >
                </custom-select>

            <!-- Modal -->
            </div>
            <div 
                class="message-col col-message-4"
                v-show="currentSelectedtype === '0'"
            >
                <label class="label" :for="'m0Title_' + modelIndex">Message Title</label>
                <input 
                    v-model="typeModels['0']['M0_Title']" 
                    type="text" class="control-input" 
                    placeholder="Input message title" 
                    :id="'m0Title_' + modelIndex"
                >
            </div>
            <div 
                class="message-col col-message-4"
                v-show="currentSelectedtype === '0'"
            >
                <label class="label" :for="'m0Txt_' + modelIndex">Message Text</label>
                <input 
                    v-model="typeModels['0']['M0_Text']" 
                    type="text" class="control-input" 
                    placeholder="Input message text" 
                    :id="'m0Txt_' + modelIndex"
                >
            </div>
            <div 
                class="message-col col-message-4"
                v-show="currentSelectedtype === '0'"
            >
                <label class="label" :for="'m0Btn1Txt_' + modelIndex">Button 1 Text</label>
                <input 
                    v-model="typeModels['0']['M0_Button1Text']" 
                    type="text" class="control-input" 
                    placeholder="Input button 1 text" 
                    :id="'m0Btn1Txt_' + modelIndex"
                >
            </div>
            <!-- end Modal -->

        <!-- Proof -->
        <div 
            class="message-col col-message-3"
            v-show="currentSelectedtype === '1'"
        >
            <label class="label" :for="'m1Title_' + modelIndex">Message Title</label>
            <input 
                v-model="typeModels['1']['M1_Title']" 
                type="text" class="control-input" 
                placeholder="Input message title" 
                :id="'m1Title_' + modelIndex"
            >
        </div>
        <div 
            class="message-col col-message-3"
            v-show="currentSelectedtype === '1'"
        >
            <label class="label" :for="'m1Txt' + modelIndex">Message Text</label>
            <input 
                v-model="typeModels['1']['M1_Text']" 
                type="text" class="control-input" 
                placeholder="Input message text" 
                :id="'m1Txt' + modelIndex"
            >
        </div>

        <!-- end Proof (see next row)-->
        <!--Chat box-->
        <div 
            class="message-col col-message-4"
            v-show="currentSelectedtype === '2'"
        >
            <label class="label" :for="'m2Txt' + modelIndex">Message Text</label>
            <input 
                v-model="typeModels['2']['M2_Text']" 
                type="text" class="control-input" 
                placeholder="Input message text" 
                :id="'m2Txt' + modelIndex"
            >
        </div>
        <div 
            class="message-col col-message-4"
            v-show="currentSelectedtype === '2'"
        >
            <label class="label" :for="'m2Fname' + modelIndex">First Name</label>
            <input 
                v-model="typeModels['2']['M2_Fname']" 
                type="text" class="control-input" 
                placeholder="Input message text" 
                :id="'m2Fname' + modelIndex"
            >
        </div>
        <div 
            class="message-col col-message-4"
            v-show="currentSelectedtype === '2'"
        >
            <label class="label" :for="'m2Lname' + modelIndex">Last Name</label>
            <input 
                v-model="typeModels['2']['M2_Lname']" 
                type="text" class="control-input" 
                placeholder="Input message text" 
                :id="'m2Lname' + modelIndex"
            >
        </div>
        <!--end Chat box-->
    </div>
        <!--continue Proof-->
        <div 
            class="message-item-row message-item-row-second clearfix"
            v-show="currentSelectedtype === '1'"
        >
            <div class="message-col col-message-number-input-wide">
                <custom-number-input
                    :type-time="'secondsOnly'"
                    :req-model-path = "['value']"
                    :model-obj="proofDurationObj"
                    @saveEvent="setProofDuration"
                    label="Duration"
                    sup-label="seconds"
                >
                </custom-number-input>
            </div>
            <div class="message-col col-message-3">
                <label class="label" :for="'m1Button1Text_' + modelIndex">Button 1 Text</label>
                <input 
                    v-model="typeModels['1']['M1_Button1Text']" 
                    type="text" class="control-input" 
                    placeholder="Input button 1 text" 
                    :id="'m1Button1Text_' + modelIndex"
                >
            </div>
            <div class="message-col col-message-3">
                <label class="label" :for="'m1Button2Text_' + modelIndex">Button 2 Text</label>
                <input 
                    v-model="typeModels['1']['M1_Button2Text']" 
                    type="text" class="control-input" 
                    placeholder="Input button 2 text" 
                    :id="'m1Button2Text_' + modelIndex"
                >
            </div>
            <div class="message-col col-message-3">
                <label class="label" :for="'m1Url_' + modelIndex">Url</label>
                <input 
                    v-model="typeModels['1']['M1_Url']" 
                    type="text" class="control-input" 
                    placeholder="Input URL" 
                    :id="'m1Url_' + modelIndex"
                >
            </div>
        </div>
    </div>
</template>

<script>
import * as sharedClasses from '@/components/pages/EditSession/sharedClasses'
export default {
    name: 'MessageItem',
    props: ['modelObj', 'modelIndex', 'sessionDuration', 'sessionId'],
    data () {
        return {
            rerenderFlag: false,
            currentSelectedtype: '0',
            typeModels: {
                0: new sharedClasses.ModalMessageConstruct(this.sessionId),
                1: new sharedClasses.ProofMessageConstruct(this.sessionId),
                2: new sharedClasses.ChatMessageConstruct(this.sessionId)
            },
            messageSelectOptions: [
                {
                    text: 'Modal',
                    value: '0'
                },
                {
                    text: 'Proof',
                    value: '1'
                },
                {
                    text: 'Chat box',
                    value: '2'
                }
            ],
            proofDurationObj: {
                value: 0
            }
        }
    },
    created () {
       this.initMsgData()
       // redo links
       this.changeMessageType()
    },
    methods: {
        initMsgData () {
            const initMessageType = this.modelObj['MessageType']
            this.currentSelectedtype = initMessageType.toString()
            for (let key in this.modelObj) {
                this.typeModels[this.currentSelectedtype][key] = this.modelObj[key]
            }
            if (initMessageType === 1) {
                this.proofDurationObj.value = this.typeModels[this.currentSelectedtype]['SecondsEnd'] - this.typeModels[this.currentSelectedtype]['SecondsStart']
            }
        },
        checkMessageTimeAccord (typeKey) {
            if (this.typeModels[typeKey]['SecondsStart'] > this.sessionDuration) {
                // autocorrect logic here
                // this.typeModels[typeKey]['SecondsStart'] = this.sessionDuration
            }
            if (this.typeModels[typeKey]['MessageType'] === 1) {
                this.setProofDuration()
            }
        },
        changeMessageType () {
            this.$emit('setMessage', this.typeModels[this.currentSelectedtype])
        },
        setProofDuration () {
            this.typeModels[1]['SecondsEnd'] = this.typeModels[1]['SecondsStart'] + this.proofDurationObj.value
        },
        deleteMessageItem () {
            this.rerenderFlag = true
            this.$emit('deleteMessage')
        }
    },
    watch: {
        modelObj () {
            if (this.rerenderFlag) {
                this.rerenderFlag = false
                // redo links
                this.initMsgData()
                this.changeMessageType()
            }
        }
    }
}
</script>

<style>
    .message-item {
        border-radius: 2px;
        background-color: #f1f1f1;
        border: 1px solid #cdcece; 
        margin-bottom: 20px;
        position: relative;
    }
    .delete-message {
        position: absolute;
        font-family: Roboto;
        font-size: 28px;
        line-height: 25px;
        color: #ec0303;
        right: 12px;
        top: 3px;
        cursor: pointer;
    }
    .message-col {
        float: left;
        padding: 20px 10px 20px 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .message-item-row-second .message-col {
        padding-top: 0;
    }
    .message-col  .control-input, .form-control[type='text'] {
        margin-bottom: 0;
    }
    .col-message-3 {
        width: 359px;
    }
    .col-message-4 {
        width: 269px;
    }
    .col-message-number-input-wide {
        width: 393px;
    }
    .col-message-number-input-wide [type="number"] {
        width: 150px;
    }
</style>

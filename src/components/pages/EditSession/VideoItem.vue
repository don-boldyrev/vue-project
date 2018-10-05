<template>
    <div class="clearfix video-item" :class="{'video-item-border-bottom': modelIndex !== modelsArr.length - 1}">
        <div class="delete-video-btn" @click="removeVedeo(modelIndex)">x</div>
        <div class="col-video col-video-1">
            <custom-select
                label-name="Video Type"
                :options="videoSelectOptions"
                v-model="modelsArr[modelIndex]['VideoType']"
            >
            </custom-select>
        </div>
        <div class="col-video col-video-2" v-visible="modelIndex !== 0">
            <custom-number-input
                :type-time="'minutes'"
                :req-model-path = "['SecondsStart']"
                :model-obj="modelsArr[modelIndex]"
                @saveEvent = "checkVideoTimeAccord"
                label="Minutes"
                sup-label="from session start"
            >
            </custom-number-input>
        </div>
        <div class="col-video col-video-3" v-visible="modelIndex !== 0">
            <custom-number-input
                :type-time="'seconds'"
                :req-model-path = "['SecondsStart']"
                :model-obj="modelsArr[modelIndex]"
                @saveEvent = "checkVideoTimeAccord"
                label="Seconds"
                sup-label="from session start"
            >
            </custom-number-input>
        </div>
        <div class="col-video col-video-4" v-visible="modelsArr[modelIndex]['VideoType'] === 2">
            <label class="label" :for="'videoUrl' + modelIndex">Video Url</label>
            <input v-model="modelsArr[modelIndex]['VideoUrl']" type="text" class="control-input" placeholder="Video Url" :id="'videoUrl' + modelIndex">
        </div>
    </div>
</template>

<script>
import checkTimeAccordMixin from '@/components/mixins/checkTimeAccordMixin'
export default {
    name: 'VideoItem',
    mixins: [checkTimeAccordMixin],
    props: ['modelsArr', 'modelIndex', 'sessionDuration'],
    data () {
        return {
             videoSelectOptions: [
                {
                    text: 'Live Broadcast',
                    value: 1
                },
                {
                    text: 'Video Url',
                    value: 2
                }
            ]
        }
    },
    methods: {
        checkVideoTimeAccord () {
            this.modelsArr.forEach((currentVideo, index, arr) => {
                const nextVideo = arr[index + 1]
                if (nextVideo) {
                    this.checkTimeAccord(this.modelsArr, [index, 'SecondsStart'], [index + 1, 'SecondsStart'], this.sessionDuration)
                }
            })
        },
        removeVedeo(modelIndex) {
            this.modelsArr.splice(modelIndex, 1)
        }
    },
    created () {
        this.checkVideoTimeAccord()
        if (this.modelIndex - 1 !== -1) {
            const currentSeconds = this.modelsArr[this.modelIndex]['SecondsStart']
            const prevSeconds = this.modelsArr[this.modelIndex - 1]['SecondsStart']
            if (currentSeconds < this.sessionDuration - 60 && currentSeconds === prevSeconds) {
                this.modelsArr[this.modelIndex]['SecondsStart'] = currentSeconds + 60
            }
        }
        
    }
}
</script>
<style>
    .video-item {
        background-color: #f1f1f1;
        position: relative;
        
    }
    .video-item-border-bottom {
        border-bottom: 15px solid #eaeaea;
    }
    .col-video {
        float: left;
        padding: 20px 10px 20px 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .col-video-1 {
        width: 260px;
    }
    .col-video-4 {
        width: 880px;
    }
    .delete-video-btn {
        display: block;
        width: 16px;
        height: 16px;
        font-size: 16px;
        margin-right: 10px;
        margin-top: 10px;
        color: red;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>


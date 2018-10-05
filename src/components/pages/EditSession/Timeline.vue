<template>
    <div class="timeline" ref="timeline">
        <div class="timeline-popup clearfix">
            <div v-for="(popupType, index) in popupTypesArr" 
                :key="index"
                class="timeline-item"
                :style="{
                    'width': popupType.width,
                    'backgroundColor': popupType.backgroundColor,
                    'marginLeft': popupType.left
                }"
                :class="{'active': popupType.isActive}"
            >
                <div class="timeline-item-content">{{popupType.name}}</div>
            </div>
        </div>
        <div class="timeline-segments clearfix">
            <div v-for="(segmentType, index) in segmentTypesArr" 
                :key="index"
                class="timeline-item"
                :style="{
                    'width': segmentType.width,
                    'backgroundColor': segmentType.backgroundColor
                }"
                :class="{'active': segmentType.isActive}"
            >
                <div class="timeline-item-content">{{segmentType.name}}</div>
            </div>
        </div>
        <div class="timeline-video clearfix">
            <div v-for="(videoType, index) in vdeoTypesArr" 
                :key="index"
                class="timeline-item"
                :style="{
                    'width': videoType.width,
                    'backgroundColor': videoType.backgroundColor
                }"
                :class="{'active': videoType.isActive}"
            >
                <div class="timeline-item-content">{{videoType.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
class TimelineItem {
    constructor (type, name, width, isActive = false, backgroundColor = '#fff', left = '') {
        this.type = type
        this.name = name
        this.width = width + '%'
        this.isActive = isActive
        this.backgroundColor = backgroundColor
        this.left = left + '%'
    }
}
export default {
    name: 'Timeline',
    props: ['modelObj', 'sessionDuration', 'serverDateTime', 'segment-types', 'count-segments', 'isMbile'],
    data () {
        return {
            timelineWidth: 0,
            widthFlagPixel: 150,
            hoveredFlagIndex: false
        }
    },
    computed: {
        widthFlagPercent () {
            return  Math.floor(this.widthFlagPixel / this.timelineWidth * 10000) / 100
        },
        zIndexFlagsCross () {
            let zIndex = 0
            if (this.modelObj['SessionMessages'].length) {
                zIndex = this.modelObj['SessionMessages'].filter(msgObj => msgObj.MessageType !== 1)
                .length
            }
            return zIndex
        },
        pastSessionTimePerc () {
            const serverTime = moment(new Date(this.serverDateTime))
            const sessionStartTime = moment(new Date(this.modelObj['SessionDateTimeStart']))
            const sessionEndTime = moment(new Date(this.modelObj['SessionDateTimeEnd']))
            let pastSessionTimePerc = 0
            if (serverTime > sessionStartTime && serverTime < sessionEndTime) {
                pastSessionTimePerc = Math.floor(((serverTime - sessionStartTime) / 1000) / this.sessionDuration * 10000) / 100
            }
            return pastSessionTimePerc
        },
        vdeoTypesArr () {
            const resultArr = []
            this.modelObj['SessionVideos'].forEach((videoObj, index) => {
                let videoName = ''
                let videoBackground = ''
                switch (videoObj['VideoType']) {
                    case 1:
                        videoName = 'Live Broadcast'
                        videoBackground = 'rgb(255, 188, 145)'
                        break
                    case 2:
                        videoBackground = 'rgb(222, 187, 217)'
                        videoName = 'Video Url'
                        break
                }
                const startSeconds = videoObj['SecondsStart']
                let endSeconds = 0
                if (this.modelObj['SessionVideos'][index + 1]) {
                    endSeconds = this.modelObj['SessionVideos'][index + 1]['SecondsStart']
                } else {
                    endSeconds = this.sessionDuration
                }
                let widthPerc = Math.floor(((endSeconds - startSeconds) / this.sessionDuration) * 10000) / 100
                let startPerc =  Math.floor(startSeconds / this.sessionDuration * 10000) / 100
                let endPerc = Math.floor(endSeconds / this.sessionDuration * 10000) / 100
                let isActive = startPerc < this.pastSessionTimePerc && endPerc > this.pastSessionTimePerc
                resultArr.push(new TimelineItem('video', videoName, widthPerc, isActive, videoBackground, startPerc))
            })
            return resultArr
        },
        segmentTypesArr () {
            const resultArr = []
            for (let i=1; i<=this.countSegments; i++) {
                if (this.modelObj['Segment' + i + '_isActive']) {
                    const segmentType = this.modelObj['Segment' + i + '_Type']
                    const segmentName = this.segmentTypes.filter(type => type.value === segmentType)[0].text
                    const segmentBackground = this.segmentTypes.filter(type => type.value === segmentType)[0].backgroundColor
                    const startSeconds = this.modelObj['Segment' + i + '_Seconds']
                    let endSeconds
                    if (this.modelObj['Segment' + (i + 1) + '_isActive']) {
                        endSeconds = this.modelObj['Segment' + (i + 1) + '_Seconds']
                    } else {
                        endSeconds = this.sessionDuration
                    }
                    let widthPerc = Math.floor(((endSeconds - startSeconds) / this.sessionDuration) * 10000) / 100
                    let startPerc = Math.floor(startSeconds / this.sessionDuration * 10000) / 100
                    let endPerc = Math.floor(endSeconds / this.sessionDuration * 10000) / 100
                    let isActive = startPerc < this.pastSessionTimePerc && endPerc > this.pastSessionTimePerc
                    resultArr.push(new TimelineItem(segmentType, segmentName, widthPerc, isActive, segmentBackground))
                }
            }
            const activeSegment = resultArr.filter(segment => segment.isActive)[0]
            if (activeSegment) {
                this.$emit('changeSegmentActive', activeSegment.type)
            } else {
                this.$emit('changeSegmentActive', false)
            }
            return resultArr
        },
        popupTypesArr () {
            const resultArr = []
            if (this.modelObj['PopUp_isEnable']) {
                const startSeconds = this.modelObj['PopUp_SecondsStart']
                const endSeconds = this.modelObj['PopUp_SecondsEnd']
                let widthPerc = Math.floor(((endSeconds - startSeconds) / this.sessionDuration) * 10000) / 100
                let startPerc =  Math.floor(startSeconds / this.sessionDuration * 10000) / 100
                let endPerc = Math.floor(endSeconds / this.sessionDuration * 10000) / 100
                let isActive = startPerc < this.pastSessionTimePerc && endPerc > this.pastSessionTimePerc
                resultArr.push(new TimelineItem('popup', 'POPUP', widthPerc, isActive, 'rgb(133, 133, 133)', startPerc))
            }
            return resultArr
        }
    },
    methods: {
        setTimelineWidth () {
            this.timelineWidth = this.$refs.timeline.offsetWidth
        }
    },
    mounted () {
        this.setTimelineWidth()
        if (!this.isMobile) {
            window.addEventListener('resize', this.setTimelineWidth)
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.setTimelineWidth)
    }
}
</script>

<style>
.timeline {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #fff;
}
.timeline-item {
  height: 20px;
  float: left;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
  font-family: Roboto;
  color: #000;
  text-align: left;
  padding-top: 5px;
}
.timeline-item.active {
  border: 1px solid #39b54a;
}
.timeline-item-content {
  padding-right: 10px;
}
.timeline-messages {
  position: relative;
  height: 20px;
}
.timeline-messages .timeline-item {
  float: none;
  position: absolute;
}
.time-indicator {
  position: absolute;
  height: 100%;
  bottom: 0;
  border: 2px solid red;
}
</style>

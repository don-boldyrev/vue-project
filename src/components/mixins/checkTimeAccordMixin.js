import {getMutatedObj} from '@/helpers'
export default {
    methods: {
        checkTimeAccord (modelObj, pathStart, pathEnd, duration, isWholeDuration) {
            let startTimeObj
            let startTimeField
            let endTimeObj
            let endTimeField
            if (typeof pathStart === 'string') {
                startTimeObj = modelObj
                startTimeField = pathStart
            } else {
                startTimeObj = getMutatedObj(modelObj, pathStart)
                startTimeField = pathStart[pathStart.length - 1]
            }

            if (typeof pathEnd === 'string') {
                endTimeObj = modelObj
                endTimeField = pathEnd
            } else {
                endTimeObj = getMutatedObj(modelObj, pathEnd)
                endTimeField = pathEnd[pathEnd.length - 1]
            }
            let startTime = startTimeObj[startTimeField]
            let endTime = endTimeObj[endTimeField]
            if (startTime > duration - 60) {
                startTimeObj[startTimeField] = duration - 60
            }
            if (!isWholeDuration && endTime > duration - 60) {
                if (duration > 60) {
                    endTimeObj[endTimeField] = duration - 60
                } else {
                    endTimeObj[endTimeField] = duration
                }
                
            } else if (isWholeDuration && endTime > duration) {
                endTimeObj[endTimeField] = this.sessionDuration
            }
            
            startTime = startTimeObj[startTimeField]
            endTime = endTimeObj[endTimeField]
            if (endTime < startTime) {
                if (!isWholeDuration) {
                    if (startTime + 60 >= this.sessionDuration) {
                        endTimeObj[endTimeField] = startTime
                    } else {
                        endTimeObj[endTimeField] = startTime + 60
                    }
                } else {
                     if (startTime + 60 > this.sessionDuration) {
                        endTimeObj[endTimeField] = startTime
                    } else {
                        endTimeObj[endTimeField] = startTime + 60
                    }
                }
            }
        }
    }
}
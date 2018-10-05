import swal from 'sweetalert'
import moment from 'moment'
import * as sharedClasses from '@/components/pages/EditSession/sharedClasses'
import {isValidUrl} from '@/helpers'

export default (json, countSegments, segmentTypes, sessionDuration, showTabCB) => {
    const showErrMsg = (msgTxt, indexTab) => {
        swal(msgTxt, "", "error")
        showTabCB(indexTab)
    }
    let checkSelectSegmets = false

    for (let i=1; i<=countSegments; i++) {
        if (!json['Segment' + i + '_isActive']) {
            checkSelectSegmets = true
        }
    }
    if (!checkSelectSegmets) {
        showErrMsg ('You must specify at least one segment', 0)
        return false
    }
    if (moment(json['SessionDateTimeEnd']) < moment(json['SessionDateTimeStart'])) {
        showErrMsg ('The session end date must be greater than the start date of the session', 0)
        return false
    }
    for (let i = 1; i <= countSegments; i++) {

        if(json['Segment' + i + '_isActive'] && json['Segment' + i + '_Type'] === 2) {
            const prizeDrawingCTAType = json['SessionStates'].filter((state) => {
                return state['StateType'] == 2
            })[0]
            if (prizeDrawingCTAType) {
                if (!(prizeDrawingCTAType['Title1'] && prizeDrawingCTAType['Title2'])) {
                    showErrMsg('If PRIZE DRAWING CTA is selected, you must fill both fields Title 1 and Title 2', 2)
                    return false
                }
            }
        }

        if(json['Segment' + i + '_isActive'] && json['Segment' + i + '_Type'] === 3) {
            const ctaByLinkType = json['SessionStates'].filter((state) => {
                return state['StateType'] == 3
            })[0]
    
            if (ctaByLinkType) {
                if (!isValidUrl.test(ctaByLinkType['ButtonUrl'])) {
                    showErrMsg('Specify the correct URL for the button in CTA OFFER, BUY LINK. Url should start with http:// or https://', 3)
                    return false
                }
            }
            if (!ctaByLinkType['ButtonText']) {
                showErrMsg('Button Text must be filled', 3)
                return false
            }
        }
        
    }
    
    if (json['PopUp_isEnable']) {
        if (json['PopUp_SecondsEnd'] <= json['PopUp_SecondsStart']) {
            showErrMsg('The pop up end time must be greater than the start time of the pop up', 5)
            return false
        }
        if (!isValidUrl.test(json['SessionPopUp']['ButtonUrl'])) {
            showErrMsg('Specify the correct URL for the button in POP UP. Url should start with http:// or https://', 5)
            return false
        }
        if (!json['SessionPopUp']['ButtonText']) {
            showErrMsg('Button Text must be filled', 5)
            return false
        }
    }

    const checkAllEmpyFields = (obj) => {
        let check = false
        for (let key in obj) {
            if (key !== 'Id' && key !== 'SessionId' && key !== 'StateType') {
                if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
                    check = true
                }
            }
        }
        return check
    }

    for (let i = 1; i <= countSegments; i++) {
        if(json['Segment' + i + '_isActive']) {
            const segmentTypeObj = json['SessionStates'].filter((state) => {
                return state['StateType'] == i
            })[0]
            const segmentTypeName = segmentTypes.filter(segmentType => {
                return segmentType.value == i
            })[0].text
            if (!checkAllEmpyFields(segmentTypeObj)) {
                showErrMsg('If ' + segmentTypeName + ' is selected, at least one text field must be filled', i)
                return false
            }
        }
    }

    /* video */
    let checkVideoUrl = true
    let checkVideoTime = true
    json['SessionVideos'].forEach((videoObj, index) => {
        if (videoObj['VideoType'] == 2 && !isValidUrl.test(videoObj['VideoUrl'])) {
            checkVideoUrl = false
        }
        if (index !== 0 && videoObj['SecondsStart'] <= json['SessionVideos'][index - 1]['SecondsStart']) {
            checkVideoTime = false
        }
    })
    if (!checkVideoUrl) {
        showErrMsg('Specify the correct URL for the video. Url should start with http:// or https://', 6)
        return false
    }
    if (!checkVideoTime) {
        showErrMsg('The video time must be greater than the time of the previous video', 6)
        return false
    }
    /* end video */

    /* messages */
    const getMdgTextFields = (msgType) => {
        let msgObj
        switch (msgType) {
            case 0:
                msgObj = new sharedClasses.ModalMessageConstruct()
                break
            case 1:
                msgObj = new sharedClasses.ProofMessageConstruct()
                break
            case 2:
                msgObj = new sharedClasses.ChatMessageConstruct()
                break
        }
        const notCheckFields = ['MessageType', 'SessionId', 'SecondsStart', 'SecondsEnd']
        const resultArr = []
        for (let key in msgObj) {
            if (notCheckFields.indexOf(key) === -1) {
                resultArr.push(key)
            }
        }
        return resultArr
    }
    let checkEmptyMsgs = true
    let checkMsgTotalTime = true
    let checkMsgProofEndTime = true
    let checkMessageIntersection = true
    const proofTimeArr = []
    json['SessionMessages'].forEach(msgObj => {
        const msgType = msgObj['MessageType']
        const msgTextFields = getMdgTextFields(msgType)
        for(let key in msgObj) {
            if (msgTextFields.indexOf(key) !== -1 && !msgObj[key]) {
                checkEmptyMsgs = false
            }
        }
        if (msgType === 1) {
            if (msgObj['SecondsEnd'] > sessionDuration - 10) {
                checkMsgTotalTime = false
            }
            if (msgObj['SecondsEnd'] <= msgObj['SecondsStart']) {
                checkMsgProofEndTime = false
            }
            proofTimeArr.push({
                start: msgObj['SecondsStart'],
                end: msgObj['SecondsEnd']
            })
        } else if (msgObj['SecondsStart'] > (sessionDuration - 30)) {
            checkMsgTotalTime = false
        }
    })
    proofTimeArr.forEach((currectProofTime, currentIndex) => {
        proofTimeArr.forEach((proofTime, index) => {
            if (index !== currentIndex) {
                if (!(proofTime.end < currectProofTime.start || proofTime.start > currectProofTime.end)) {
                    checkMessageIntersection = false
                }
            }
        })
    })
    if (!checkEmptyMsgs) {
        showErrMsg('All text fields are required', 7)
        return false
    }
    if (!checkMsgProofEndTime) {
        showErrMsg('Proof Message Duration is required', 7)
        return false
    }
    if (!checkMsgTotalTime) {
        showErrMsg('Message Time must not be greater than Session Length', 7)
        return false
    }
    if (!checkMessageIntersection) {
        showErrMsg('Proof Messages cannot intersect', 7)
        return false
    }
    
    /* end  messages */

    /* Other checks*/
    if (!json['EventName'] && !json['SessionName']) {
        showErrMsg('Event Name or Session Name must be filled', 0)
        return false
    }
    let checkSegmentsTime = true
    for (let i=2; i <= countSegments; i++) {
        if (json['Segment' + i + '_isActive']) {
            const secondsPrev = json['Segment' + (i - 1) + '_Seconds']
            const seconds = json['Segment' + i + '_Seconds']
            if (seconds <= secondsPrev) {
                checkSegmentsTime = false
            }
        }
    }
    if (!checkSegmentsTime) {
        showErrMsg('The segment time must be greater than the time of the previous segment', 0)
        return false
    }
    /* end Other checks*/
    return true
}
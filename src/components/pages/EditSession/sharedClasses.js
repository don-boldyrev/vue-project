export class SessionStateContruct {
    constructor(type = 1, sessionId = 0) {
        this['StateType'] = type
        this['SessionId'] = sessionId
        this['ButtonText'] = ''
        this['ButtonUrl'] = ''
        this['Title1'] = ''
        this['Title2'] = ''
        this['Text1'] = ''
        this['Text2'] = ''
        switch (type) {
            case 2:
                this['Title1'] = "ENTER TO WIN THIS HOUR'S PRIZE"
                this['Title2'] = 'Congratulations, you’re now entered for this hours prize drawing. Enjoy the presentation!'
                this['ButtonText'] = 'SUBMIT'
                break
            case 3:
                this['Text1'] = "Take Advantage of this special offer from"
                this['ButtonText'] = 'BUY NOW'
                this['ButtonUrl'] = 'https://'
                break
        }
    }
}
export class PopupContruct {
    constructor(sessionId = 0) {
        this['ButtonText'] = ''
        this['ButtonUrl'] = 'https://'
        this['SessionId'] = sessionId
        this['Text1'] = ''
        this['Text2'] = ''
        this['Title1'] = ''
        this['Title2'] = ''
    }
}
export class VideoConstruct {
    constructor(sessionId = 0) {
        this['SecondsStart'] = 0
        this['SessionId'] =  sessionId
        this['VideoType'] = 1
        this['VideoUrl'] = ''
    }
}

export class ModalMessageConstruct {
    constructor(sessionId = 0) {
        this['M0_Button1Text'] = ''
        this['M0_Text'] = ''
        this['M0_Title'] = ''
        this['MessageType'] = 0
        this['SecondsStart'] = 0
        this['SessionId'] = sessionId

    }
}
export class ProofMessageConstruct {
    constructor(sessionId = 0) {
        this['M1_Button1Text'] = ''
        this['M1_Button2Text'] = ''
        this['M1_Text'] = ''
        this['M1_Title'] = ''
        this['M1_Url'] = ''
        this['MessageType'] = 1
        this['SecondsEnd'] = 0
        this['SecondsStart'] = 0
        this['SessionId'] = sessionId
    }
}
export class ChatMessageConstruct {
    constructor(sessionId = 0) {
        this['M2_Fname'] = ''
        this['M2_Lname'] = ''
        this['M2_Text'] = ''
        this['MessageType'] = 2
        this['SecondsStart'] = 0
        this['SessionId'] = sessionId
    }
}
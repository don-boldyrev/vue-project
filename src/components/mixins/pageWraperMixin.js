import MobileDetect from 'mobile-detect'
import _ from 'underscore'
const md = new MobileDetect(window.navigator.userAgent)
const basePage = {
    width: 1920,
    scale: 1
}
export default {
    data () {
        return {
            isMobileDevice: !!md.mobile() && !md.tablet(),
            isDesctopChg: false,

        }
    },
    computed: {
        isMobile () {
            return this.isMobileDevice && !this.isDesctopChg
        }
    },
    methods: {
        scalePages () {
            const context = this
            _.debounce(function () {
                if (screen.width > basePage.width) {
                    context.$refs.contentSection.setAttribute('style', 
                        `transform:scale(1);
                        -webkit-transform:scale(1);`
                    )
                } else {
                    const pageWidth = context.$refs.contentContainer.offsetWidth
                    basePage.scale = pageWidth / basePage.width
                    context.$refs.contentSection.setAttribute('style', 
                        `transform:scale(${basePage.scale});
                        -webkit-transform:scale(${basePage.scale});`
                    )
                }
            }, 150)()
        }
    },
    mounted () {
        if (!this.isMobile) {
            this.scalePages()
            window.addEventListener('resize', this.scalePages)
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.scalePages)
    }
}
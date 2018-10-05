<template>
    <div>
        <ul class="custom-tabs-menu clearfix">
            <li 
                v-for="(tab, index) in value"
                :key="index" 
                class="custom-tabs-menu-item"
                :class="{
                    'active': activeTab === index, 
                    'disabled': tab.disabled,
                    'active-timeline': activeSegment === index || isTimelinePopup && index === popupIndexTab
                }"
            >
                <a 
                    @click="showTab(index)"
                    class="custom-tabs-menu-link"
                >
                    {{tab.name}}
                </a>
            </li>
        </ul>
        <div class="custom-tabs-content">
            <div 
                v-for="(tab, index) in value" 
                :key="index" 
                v-show="activeTab === index"
            >
                <slot  :name="'tabContent' + index">
                    Tab with index {{index}}
                </slot>
            </div>
            <slot :name="'previewContent'"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomTabs',
    props: ['value', 'activeTab', 'activeSegment', 'popupIndexTab', 'isTimelinePopup'],
    methods: {
        showTab (index) {
            if (!this.value[index].disabled) {
                this.$emit('changeActiveTabIndex', index)
            }
        }
    }
}
</script>

<style scoped>
    .custom-tabs-content {
        width: 100%;
        border-radius: 2px;
        background-color: #eaeaea;
        border: solid 1px #dddede;
        margin-bottom: 16px;
        padding: 30px 28px 120px 28px;
    }
    .custom-tabs-menu {
        padding: 0;
        margin: 0;
        display: flex;
        border-bottom: 1px solid #f1f1f2;
    }
    .custom-tabs-menu-item {
        list-style-type: none;
        flex-grow: 1;
        border-right: 6px solid #f1f1f2;
    }
    .custom-tabs-menu .custom-tabs-menu-link {
        display: block;
        height: 60px;
        background-color: #e8e8e9;
        border-radius: 0;
        padding: 16px 25px;
        padding-top: 19px;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #39b54a;

    }
    .custom-tabs-menu .custom-tabs-menu-item:last-child {
        border-right: 0;
    }
    .custom-tabs-menu-link:hover,
    .custom-tabs-menu-link:focus,
    .custom-tabs-menu-link:visited {
        color: #39b54a;
    }
    .custom-tabs-menu-link:hover {
        background-color: #fff;
    }
    .custom-tabs-menu-item.disabled .custom-tabs-menu-link {
        color: rgba(158,159,159,0.2);
        cursor: default;
    }
    .custom-tabs-menu-item.disabled .custom-tabs-menu-link:hover,
    .custom-tabs-menu-item.disabled .custom-tabs-menu-link:focus,
    .custom-tabs-menu-item.disabled .custom-tabs-menu-link:visited {
        color: rgba(158,159,159,0.2);
        background-color: #e8e8e9;
    }
    
    .custom-tabs-menu-item.active .custom-tabs-menu-link {
        background-color: #fff;
        color: #39b54a;
        cursor: pointer;
    }
    .custom-tabs-menu-item.active .custom-tabs-menu-link:hover,
    .custom-tabs-menu-item.active .custom-tabs-menu-link:focus,
    .custom-tabs-menu-item.active .custom-tabs-menu-link:visited {
        color: #39b54a;
    }
    .active-timeline a {
        border: 1px solid #39b54a;
    }
</style>


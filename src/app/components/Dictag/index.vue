<template>
    <div>
        <template v-for="(item, index) in props.options">
            <template v-if="values.includes(item.value)">
                <span v-if="(item.elTagType == 'default' || item.elTagType == '') && (item.elTagClass == '' || item.elTagClass == null) "
                    :key="item.value"
                    :index="index"
                    :class="item.elTagClass"
                > {{  item.label + " " }}
                </span>
                <el-tag v-else
                    :disable-transitions="true"
                    :key="item.value + '' "
                    :index="index"
                    :type="item.elTagType"
                    :class="item.elTagType"    
                >{{ item.label + " " }}
                    
                </el-tag>
            </template>

            <template v-if="unMatch && showValue">
                {{  unMatchArr }}
            </template>
        </template>

    </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
const unMatchArr = ref<any>()
const props = defineProps({
    options: Array as PropType<any[]>,
    value: [Number, String , Array],
    showValue : {
        type: Boolean,
        default: true,
    },
    separator :{
        type:String,
        default: ","
    }
})

const values = computed(() => {
    if (props.value === null || typeof props.value === 'undefined' || props.value === ''){
        return []
    }
    return Array.isArray(props.value) ? props.value.map(item => '' + item) : String(props.value).split(props.separator)
})

const unMatch = computed(()=> {
    unMatchArr.value = []
    if(props.value === null || typeof props.value === 'undefined' || !Array.isArray(props.options) || props.options.length ===0){
        return false
    }

    let unMatch = false
    values.value.forEach(i => {
        // avoid prop.options == null
        if (!Array.isArray(props.options)){
            return false
        }

        // if value != item  then push new tag to unmatchArr
        if (!props.options.some(v => String(v.value) === i)){
            unMatchArr.value.push(i)
            unMatch = true
        }
    })
    return unMatch
})
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: .2rem;
    }
</style>
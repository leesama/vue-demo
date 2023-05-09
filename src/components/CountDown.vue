<template>
  <div class="time">
    <span>{{ timeLeft }}</span>
  </div>
</template>

<script setup>

import { computed, onUnmounted, ref, watch } from "vue";
// 倒计时时间
const countTime = ref(0);
// 用一个变量来存定时器
let interval;
// https://cn.vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure
// 如果直接解构会失去响应性，这里需要这样写，vue3.3以上有做一定处理，能达到可以直接解构，现在的版本是3.2不可以直接解构
// 以下代码是不行的
// const {diffTime} = defineProps({
//   diffTime: Number,
// });
const props = defineProps({
  diffTime: Number,
});
// 不能直接侦听响应式对象的属性值，这里需要用一个返回该属性的 getter 函数
watch(
  () => props.diffTime,
  () => {
    // 每次数据变化都要清除定时器，重新计算
    clearInterval(interval);
    countTime.value = props.diffTime;
    interval = setInterval(() => {
      countTime.value -= 1000;
      if (countTime.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
);
// 使用计算属性去推导出剩余时间
//  如果一个数据可以通过另一个数据生成,尽量不要去定义新的属性,
//  可以用计算属性，也可以直接写一个函数，在template中调用该函数，推荐使用计算属性
// 问题：为什么在react中我们不需要计算属性？
// 回答：因为在react的jsx中我们相当于直接去做了运算，vue也支持简单运算，但是不管在react还是vue中，都不推荐直接在jsx或者template中做运算，会让代码看着耦合度高，逻辑视图分离不清晰
// react中好点的方式是抽离一个函数处理，vue中也可以抽离一个函数
// 其实react中更好的方式是使用useMemo去缓存数据，vue中使用计算属性，这样性能更好
// 但是react的memo写起来麻烦还要传依赖项，所以我们一般不用，除非确实很卡，但是vue的计算属性写起来很简单，自动会去收集依赖，所以我们优先会用计算属性去生成一个依赖于原数据的数据
// 如果有一天react也能不用手写useMemo的依赖，大家也会更倾向于用useMemo
// 当然用函数还是计算属性都是看自己的习惯，计算属性更直观，推荐使用
const timeLeft = computed(() => {
  const hours = Math.floor(
    (countTime.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (countTime.value % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((countTime.value % (1000 * 60)) / 1000);
  return hours + "小时 " + minutes + "分 " + seconds + "秒";
});
onUnmounted(() => {
  // 卸载时清除定时器
  clearInterval(interval);
});
</script>

<style>
.time {
  font-family: monospace;
  font-size: 2rem;
  padding: 0.5rem;
  background-color: #eee;
  border-radius: 0.5rem;
  display: inline-block;
}
</style>

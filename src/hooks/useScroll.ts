import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "lodash-es";
export default function useScroll(elRef: any) {
  let el: any = window;
  const isReachBottom = ref(false);
  // 将其设置为false，因为默认应该在最底部，防止触发watchEffect
  const isReachTop = ref(false);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  const scrollListenerHandler = throttle(() => {
    reflow();
    isReachTop.value = scrollTop.value === 0;
    isReachBottom.value =
      Math.ceil(clientHeight.value + scrollTop.value) >= scrollHeight.value;
  }, 100);

  onMounted(() => {
    if (elRef) {
      el = elRef.value;
    }
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });
  const reflow = () => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollHeight.value = document.documentElement.scrollHeight;
      scrollTop.value = document.documentElement.scrollTop;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
  };
  const setScrollTop = (t: number) => {
    el.scrollTop = t;
    scrollTop.value = t;
  };

  return {
    isReachTop,
    isReachBottom,
    clientHeight,
    scrollTop,
    scrollHeight,
    reflow,
    setScrollTop
  };
}

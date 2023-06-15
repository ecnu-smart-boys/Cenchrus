import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "lodash-es";
export default function useScroll(elRef: any) {
  let el: any;
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
      el &&
        el.addEventListener &&
        el.addEventListener("scroll", scrollListenerHandler);
    }
  });

  onUnmounted(() => {
    if (el) {
      el.removeEventListener &&
        el.removeEventListener("scroll", scrollListenerHandler);
    }
  });
  const reflow = () => {
    if (el) {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
  };
  const setScrollTop = (t: number) => {
    if (el) {
      el.scrollTop = t;
      scrollTop.value = t;
    }
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

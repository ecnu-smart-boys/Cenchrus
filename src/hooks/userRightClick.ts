import { ref, watch } from "vue";

export default function useRightClick() {
  const rightMenuVisible = ref(false);
  const position = ref({
    top: 0,
    left: 0
  });
  const rightClickItem = ref({});
  const openMenu = (e: MouseEvent, item: any) => {
    rightMenuVisible.value = true;
    position.value.top = e.pageY;
    position.value.left = e.pageX;
    rightClickItem.value = item;
  };
  const closeMenu = () => {
    rightMenuVisible.value = false;
  };
  watch(rightMenuVisible, () => {
    if (rightMenuVisible.value) {
      document.body.addEventListener("click", closeMenu);
    } else {
      document.body.removeEventListener("click", closeMenu);
    }
  });

  return {
    rightMenuVisible,
    position,
    rightClickItem,
    openMenu,
    closeMenu
  };
}

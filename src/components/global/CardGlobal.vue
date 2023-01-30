<template>
  <div class="col accordion-item border-0">
    <div class="card bg-white border-0 shadow-sm h-100 w-100">
      <div
        class="card-header bg-gray-200 p-1 border-0 fs-5 my-2 mx-3 d-flex flex-row align-items-center justify-content-between"
      >
        <slot name="header" />
      </div>
      <div class="card-body py-2 px-3 col text-truncate">
        <slot name="body" />
      </div>
      <div class="card-footer border-0 py-2 px-3 d-flex align-items-center justify-content-between">
        <slot name="footer" />
        <div class="d-flex gap-2">
          <CardButton v-if="second" :id="refs[1]" outlined description="Reajustes" @click="secondAction(id)" />
          <CardButton :id="refs[0]" @click="action(id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardButton from "@/components/global/CardButton.vue";
const emit = defineEmits(["action", "secondAction"]);
defineProps({
  id: {
    type: Number,
    required: true,
  },
  refs: {
    type: Array,
    default: () => ["", ""],
  },
  second: {
    type: Boolean,
    default: false,
  },
});

const action = (id) => {
  emit("action", id);
};
const secondAction = (id) => {
  emit("secondAction", id);
};
</script>

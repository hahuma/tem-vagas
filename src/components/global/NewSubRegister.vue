<template>
  <button class="border-0 bg-transparent text-black m-0 h6" data-bs-toggle="modal" :data-bs-target="reference">
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.19778 0.589844C2.89628 0.589844 0.216797 3.26932 0.216797 6.57083C0.216797 9.87233 2.89628 12.5518 6.19778 12.5518C9.49928 12.5518 12.1788 9.87233 12.1788 6.57083C12.1788 3.26932 9.49928 0.589844 6.19778 0.589844ZM9.18827 7.16892H6.79588V9.56132H5.59968V7.16892H3.20729V5.97273H5.59968V3.58033H6.79588V5.97273H9.18827V7.16892Z"
        fill="url(#paint0_linear_325_3022)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_325_3022"
          x1="6.19778"
          y1="0.589844"
          x2="6.19778"
          y2="12.5518"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF671C" />
          <stop offset="1" stop-color="#F64904" />
        </linearGradient>
      </defs>
    </svg>
    {{ text }}
  </button>
</template>

<script setup>

defineProps({
  reference: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
})
</script>

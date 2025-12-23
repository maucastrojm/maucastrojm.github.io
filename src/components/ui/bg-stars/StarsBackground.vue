<script setup lang="ts">
import type { SpringOptions } from 'motion-v';
import { cn } from '@/lib/utils';
import { useMotionValue, useSpring } from 'motion-v';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface StarsBackgroundProps {
  factor?: number;
  speed?: number;
  directionX?: number; // Horizontal movement direction (-1 to 1, negative = left, positive = right)
  directionY?: number; // Vertical movement direction (-1 to 1, negative = up, positive = down)
  transition?: SpringOptions;
  starColor?: string;
  class?: string;
}

const props = withDefaults(defineProps<StarsBackgroundProps>(), {
  factor: 0.05,
  speed: 50,
  directionX: 0.7, // No horizontal movement by default
  directionY: -1, // Move downward by default
  transition: () => ({ stiffness: 50, damping: 20 }),
  starColor: '#fff',
});

defineSlots();

// Star field configuration constants
const STAR_FIELD_WIDTH = 4000; // Total width of the star field in pixels
const STAR_FIELD_HEIGHT = 6000; // Total height of the star field in pixels (4 screens worth)
const STAR_FIELD_HALF_WIDTH = STAR_FIELD_WIDTH / 2; // Half width for centering

// Star layer configuration
const LAYER_1_COUNT = 1000; // Number of small stars
const LAYER_1_SIZE = 1; // Size of small stars in pixels

const LAYER_2_COUNT = 400; // Number of medium stars
const LAYER_2_SIZE = 2; // Size of medium stars in pixels

const LAYER_3_COUNT = 200; // Number of large stars
const LAYER_3_SIZE = 3; // Size of large stars in pixels

interface Star {
  x: number;
  y: number;
  size: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const stars1 = ref<Star[]>([]);
const stars2 = ref<Star[]>([]);
const stars3 = ref<Star[]>([]);
let animationFrameId: number | null = null;
const startTime = Date.now();

const offsetX = useMotionValue(1);
const offsetY = useMotionValue(1);
const springX = useSpring(offsetX, props.transition);
const springY = useSpring(offsetY, props.transition);

function generateStars(count: number, size: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * STAR_FIELD_WIDTH - STAR_FIELD_HALF_WIDTH,
      y: Math.random() * STAR_FIELD_HEIGHT,
      size,
    });
  }
  return stars;
}

function initStars() {
  stars1.value = generateStars(LAYER_1_COUNT, LAYER_1_SIZE);
  stars2.value = generateStars(LAYER_2_COUNT, LAYER_2_SIZE);
  stars3.value = generateStars(LAYER_3_COUNT, LAYER_3_SIZE);
}

function handleMouseMove(e: MouseEvent) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const newOffsetX = -(e.clientX - centerX) * props.factor;
  const newOffsetY = -(e.clientY - centerY) * props.factor;
  offsetX.set(newOffsetX);
  offsetY.set(newOffsetY);
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  offsetX: number,
  offsetY: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  for (const star of stars) {
    // Calculate star position with wrapping for both X and Y
    const normalizedX = (((star.x + offsetX) % STAR_FIELD_WIDTH) + STAR_FIELD_WIDTH) % STAR_FIELD_WIDTH;
    const normalizedY = (((star.y + offsetY) % STAR_FIELD_HEIGHT) + STAR_FIELD_HEIGHT) % STAR_FIELD_HEIGHT;

    // Convert to screen coordinates (centered)
    const screenX = normalizedX - STAR_FIELD_HALF_WIDTH + canvasWidth / 2;
    const screenY = normalizedY;

    // Draw star if visible on screen
    if (
      screenX >= -star.size &&
      screenX <= canvasWidth + star.size &&
      screenY >= -star.size &&
      screenY <= canvasHeight + star.size
    ) {
      ctx.fillRect(screenX - star.size / 2, screenY - star.size / 2, star.size, star.size);
    }

    // Draw wrapped instances for seamless looping
    // Horizontal wrap
    const wrappedX = screenX - STAR_FIELD_WIDTH;
    if (
      wrappedX >= -star.size &&
      wrappedX <= canvasWidth + star.size &&
      screenY >= -star.size &&
      screenY <= canvasHeight + star.size
    ) {
      ctx.fillRect(wrappedX - star.size / 2, screenY - star.size / 2, star.size, star.size);
    }

    // Vertical wrap
    const wrappedY = screenY - STAR_FIELD_HEIGHT;
    if (
      screenX >= -star.size &&
      screenX <= canvasWidth + star.size &&
      wrappedY >= -star.size &&
      wrappedY <= canvasHeight + star.size
    ) {
      ctx.fillRect(screenX - star.size / 2, wrappedY - star.size / 2, star.size, star.size);
    }
  }
}

function animate() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const currentTime = Date.now();
  const elapsed = (currentTime - startTime) / 1000;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set star color
  ctx.fillStyle = props.starColor;

  // Calculate layer offsets based on speed, direction, and time
  const mouseOffsetX = springX.get();
  const mouseOffsetY = springY.get();

  // Calculate movement per layer based on direction vector and speed
  const baseOffsetX = (elapsed * STAR_FIELD_WIDTH * props.directionX) / props.speed;
  const baseOffsetY = (elapsed * STAR_FIELD_HEIGHT * props.directionY) / props.speed;

  const layer1OffsetX = baseOffsetX % STAR_FIELD_WIDTH;
  const layer1OffsetY = baseOffsetY % STAR_FIELD_HEIGHT;

  const layer2OffsetX = (baseOffsetX / 2) % STAR_FIELD_WIDTH;
  const layer2OffsetY = (baseOffsetY / 2) % STAR_FIELD_HEIGHT;

  const layer3OffsetX = (baseOffsetX / 3) % STAR_FIELD_WIDTH;
  const layer3OffsetY = (baseOffsetY / 3) % STAR_FIELD_HEIGHT;

  // Apply mouse parallax and draw each layer
  ctx.save();
  ctx.translate(mouseOffsetX, mouseOffsetY);
  drawStars(ctx, stars1.value, layer1OffsetX, layer1OffsetY, canvas.width, canvas.height);
  ctx.restore();

  ctx.save();
  ctx.translate(mouseOffsetX, mouseOffsetY);
  drawStars(ctx, stars2.value, layer2OffsetX, layer2OffsetY, canvas.width, canvas.height);
  ctx.restore();

  ctx.save();
  ctx.translate(mouseOffsetX, mouseOffsetY);
  drawStars(ctx, stars3.value, layer3OffsetX, layer3OffsetY, canvas.width, canvas.height);
  ctx.restore();

  animationFrameId = requestAnimationFrame(animate);
}

function handleResize() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

onMounted(() => {
  initStars();
  handleResize();
  animate();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('resize', handleResize);
});

watch(
  () => props.starColor,
  () => {
    // Stars will use new color on next frame
  },
);
</script>
<template>
  <div
    :class="
      cn('relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)]', props.class)
    "
    @mousemove="handleMouseMove">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
    <!-- Slot for child content -->
    <slot />
  </div>
</template>

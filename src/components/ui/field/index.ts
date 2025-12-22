import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: ['flex-col *:w-full [&>.sr-only]:w-auto'],
      horizontal: [
        'flex-row items-center',
        '*:data-[slot=field-label]:flex-auto',
        'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
      responsive: [
        'flex-col *:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto',
        '@md/field-group:*:data-[slot=field-label]:flex-auto',
        '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export type FieldVariants = VariantProps<typeof fieldVariants>;

export { default as Field } from './UiField.vue';
export { default as FieldContent } from './UiFieldContent.vue';
export { default as FieldDescription } from './UiFieldDescription.vue';
export { default as FieldError } from './UiFieldError.vue';
export { default as FieldGroup } from './UiFieldGroup.vue';
export { default as FieldLabel } from './UiFieldLabel.vue';
export { default as FieldLegend } from './UiFieldLegend.vue';
export { default as FieldSeparator } from './UiFieldSeparator.vue';
export { default as FieldSet } from './UiFieldSet.vue';
export { default as FieldTitle } from './UiFieldTitle.vue';

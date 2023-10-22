import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseSearchInput from '../BaseSearchInput.vue'

describe('BaseSearchInput', () => {
    it('renders with the provided modelValue and placeholder', () => {
        const wrapper = mount(BaseSearchInput, {
            props: {
                modelValue: 'Initial Value',
                placeholder: 'Search Placeholder',
            },
        });

        const inputElement = wrapper.element.querySelector('input');
        expect(inputElement).not.toBeNull();
        expect(inputElement?.value).toBe('Initial Value');
        expect(inputElement?.placeholder).toBe('Search Placeholder');
    });


    it('emits update:modelValue when input changes', async () => {
        const wrapper = mount(BaseSearchInput, {
            props: {
                modelValue: 'Initial Value',
            },
        });

        const inputElement = wrapper.find('#base-search-input');
        expect(inputElement).not.toBeNull()

        inputElement.setValue('New Value')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value']);
    })
})

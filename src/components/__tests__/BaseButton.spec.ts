import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseButtonVue from '../BaseButton.vue'

describe('BaseButtonVue', () => {
    it('renders properly', () => {
        const wrapper = mount(BaseButtonVue, { props: { buttonClass: 'my-btn-class', type: 'button' } })
        const buttonElement = wrapper.element.querySelector('button')
        expect(buttonElement).not.toBeNull()
        expect(wrapper.classes()[0]).toEqual('base-button')
    })

    it('uses the props appropriately', () => {
        const wrapper = mount(BaseButtonVue, { props: { buttonClass: 'my-btn-class', type: 'submit' } })
        const buttonElement = wrapper.element.querySelector('button')
        expect(buttonElement?.getAttribute('class')).toContain('my-btn-class');
        expect(buttonElement?.getAttribute('type')).toContain('submit')
    })

    it('should render button default slot correctly', () => {
        const wrapper = mount(BaseButtonVue, {
            props: {
                buttonClass: 'my-test-button-class',
                type: 'button',
            },
            slots: {
                default: 'Test slot',
            },
        });

        const buttonElement = wrapper.element.querySelector('button');
        expect(buttonElement)?.not.toBeNull();
        expect(buttonElement?.textContent).toContain('Test slot');
    });
})

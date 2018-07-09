import React from 'react';
import { shallow, mount } from 'enzyme';
import PluralInput from '../plural_input';
import HandleSpecial from '../../../hoc_special'
import TestRoot from '../../../../TestRoot';

let wrapped;
const mockProps = {
    correct: 'maisons',
    lang: 'french',
    fetchSth: jest.fn()
};
beforeEach(() => {
    //pass props and mount component?
  
});

describe.skip('plural input' ,() => {
    it('sets full property', () => {
        const Composed = HandleSpecial(PluralInput);     
        // wrapped = shallow(<TestRoot><Composed /></TestRoot>).dive();
        console.log('props', wrapped.instance().full);
        expect(wrapped.find('.plural-input').length).toEqual(1);
    });
});
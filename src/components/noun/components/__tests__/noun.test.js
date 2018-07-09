import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import TestRoot from '../../../../TestRoot';

import DisplayNoun from '../display_noun';
import InputNoun from '../input_noun';

//Comment document.querySelector.. in DisplayNoun
const document = {
    querySelector: jest.fn(),
    documentElement: {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    },
}
const url = process.env.REACT_APP_URL;
let wrapped;
beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('input placeholder', () => {

    it('shows article placeholder', () => {
        const wrapped = shallow(<InputNoun />);

        wrapped.find('.article-input').simulate('keyDown', { keyCode: 39 });
        expect(wrapped.state().articleHint).toBeTruthy();

        //Hide placeholder
        wrapped.find('.article-input').simulate('keyDown', { keyCode: 39 });
        expect(wrapped.state().articleHint).toBeFalsy();
    });

    it('shows noun placeholder', () => {
        const wrapped = shallow(<InputNoun />);

        wrapped.find('.noun-input').simulate('keyDown', { keyCode: 39 });
        //wrapper.instance().methodName() -> access components methods
        //similar with props: wrapped.props().lang 
        expect(wrapped.state().nounHint).toBeTruthy();
    });

});

describe.skip('noun was fetched', () => {
    beforeEach(() => {
        wrapped = mount(
            <TestRoot>
                <DisplayNoun />
            </TestRoot>
        );
        moxios.stubRequest(`${url}/fetch`, {
            status: 200,
            response: { lang: 'french', word: 'guerre', meaning: 'war', article: 'la' }
        });
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it('displays card elements', done => {
        moxios.wait(() => {
            wrapped.update();
            try {
                expect(wrapped.find('.card-content').length).toEqual(1);
                expect(wrapped.find('.noun-form').length).toEqual(1);
                expect(wrapped.find('.article-input').length).toEqual(1);
                done();
            } catch(e){
                done.fail(e);
            }
        });
    });

    it('validates empty user input', done => {
        moxios.wait(() => {
            wrapped.update();
            try {
                wrapped.find('.noun-form').simulate('submit');
                wrapped.update();

                expect(wrapped.find('.incorrect').length).toEqual(2);
                done();
            } catch(e){
                done.fail(e);
            }
        });
    });

    it('validates incomplete user input', done => {
        moxios.wait(() => {
            wrapped.update();
            try {
                wrapped.find('.article-input').simulate('change', {
                    target: { value: 'la' }
                });
                expect(wrapped.find('.article-input').prop('value')).toEqual('la');
                wrapped.find('.noun-form').simulate('submit');
                wrapped.update();

                expect(wrapped.find('.incorrect').length).toEqual(2);
                done();
            } catch(e){
                done.fail(e);
            }
        });
    });

    it('validates user input', done => {
        moxios.wait(() => {
            wrapped.update();
            try {
                wrapped.find('.article-input').simulate('change', {
                    target: { value: 'la' }
                });
                wrapped.find('.noun-input').simulate('change', {
                    target: { value: 'guerre' }
                });
                wrapped.find('.noun-form').simulate('submit');
                wrapped.update();
                
                expect(wrapped.find('.very-correct').length).toEqual(2);
                setTimeout(() => {
                    wrapped.update();
                    try {
                        expect(wrapped.find('.very-correct').length).toEqual(0);
                    } catch(e){
                        done.fail(e);
                    }
                    done();
                }, 400);
                
            } catch(e){
                done.fail(e);
            }
        });
    });

});

describe.skip('noun was not fetched', () => {

    beforeEach(() => {
        wrapped = mount(
            <TestRoot>
                <DisplayNoun />
            </TestRoot>
        );
        moxios.stubRequest(`${url}/fetch`, {
            status: 200,
            response: null
        });
    });
    afterEach(() => {
        wrapped.unmount();
    });

    it('displays loader', done => {
        moxios.wait(() => {
            wrapped.update();
            try {
                expect(wrapped.find('.loader').length).toEqual(1);
                done();
            } catch(e){
                done.fail(e);
            }
        });
    });
});

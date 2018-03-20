import 'jest-enzyme';
import React from 'react';
import { MemoryRouter, StaticRouter } from 'react-router';
import { mount } from 'enzyme';
import Redirect from './index';

describe('<Redirect>', () => {
    test('Redirect on client', () => {
        global.__BROWSER__ = true;

        const router = mount(
            <MemoryRouter initialEntries={['/one', '/two']} initialIndex={0}>
                <Redirect to="/two" />
            </MemoryRouter>
        );

        expect(router.find('Router').props().history.location.pathname).toBe('/two');
    });

    test('Redirect on client when `to` is object', () => {
        global.__BROWSER__ = true;

        const router = mount(
            <MemoryRouter initialEntries={['/one', '/two']} initialIndex={0}>
                <Redirect to={{ pathname: '/two', search: '?foo=bar' }} />
            </MemoryRouter>
        );

        expect(router.find('Router').props().history.location.pathname).toBe('/two');
        expect(router.find('Router').props().history.location.search).toBe('?foo=bar');
    });

    test('Server redirect', () => {
        global.__BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect to="/two" />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.location.pathname).toBe('/two');
    });

    test('Server redirect when `to` is object', () => {
        global.__BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect to={{ pathname: '/two', search: '?foo=bar' }} />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.location.pathname).toBe('/two');
        expect(staticContext.location.search).toBe('?foo=bar');
        expect(staticContext.url).toBe('/two?foo=bar');
    });

    test('Server redirect with custom status', () => {
        global.__BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect status={301} to="/two" />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.location.pathname).toBe('/two');
        expect(staticContext.status).toBe(301);
    });

    test('browserOnly redirect on client', () => {
        global.__BROWSER__ = true;

        const router = mount(
            <MemoryRouter initialEntries={['/one', '/two']} initialIndex={0}>
                <Redirect browserOnly to="/two" />
            </MemoryRouter>
        );

        expect(router.find('Router').props().history.location.pathname).toBe('/two');
    });

    test('browserOnly redirect on server', () => {
        global.__BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect browserOnly to="/two" />
            </StaticRouter>
        );

        expect(staticContext.action).toBe(undefined);
        expect(staticContext.location).toBe(undefined);
        expect(staticContext.status).toBe(undefined);
    });
});

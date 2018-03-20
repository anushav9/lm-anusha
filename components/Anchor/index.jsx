// @flow

import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { classy, scrollTo, passProps } from 'utils';
import style from './style.scss';

type AnchorProps = {
    href: Object | string,
    underline?: boolean,
    className?: string,
    activeClassName?: string,
    animatedScroll?: boolean, // (for hash links) scroll to target
};

@withRouter
export default class Anchor extends React.Component<AnchorProps> {
    __hashScrolled: boolean

    static defaultProps = {
        animatedScroll: true,
        underline: false,
    }

    constructor(props: AnchorProps) {
        super(props);

        this.__hashScrolled = false;
    }

    // Todo: Move scroll logic to another component
    componentDidMount() {
        const locationHash = this.getLocationHash(this.props.href);

        if ((window.location.hash === locationHash) && !this.__hashScrolled) {
            this.scrollToHash();
            this.__hashScrolled = true;
        }
    }

    onClick = (e: any) => {
        const { internal, noClick, onClick, history, href, external } = this.props;

        if (noClick) e.preventDefault();

        if (external !== true && typeof href === 'string') {
            if (!href.length) e.preventDefault();

            // internal link
            if (internal || href.charAt(0) === '#' || (href.indexOf(window.location.origin) > -1 && href.indexOf('#') > -1)) {
                e.preventDefault();
                history.push(href);
                this.scrollToHash();
            }
        } else if (process.env.isElectron) {
            e.preventDefault();
        }

        if (onClick) onClick(e);
    }

    getLocationHash = (href: Object | string): ?string => {
        let _href = href;

        if (typeof href === 'object') {
            _href = href.pathname;
        }

        if (_href && _href.indexOf('#') > -1) {
            return _href.split('#')[1];
        }

        return null;
    }

    scrollToHash = () => {
        const { animatedScroll, href } = this.props;

        let hash;
        if (href.charAt(0) === '#') {
            hash = href;
        } else {
            hash = '#' + href.split('#')[1];
        }

        const target = document.getElementById(hash.replace('#', ''));
        const offsetTop = target && target.offsetTop;

        scrollTo(offsetTop - 60, { // 60 is header height
            duration: animatedScroll ? 800 : 0, // 800ms
        });
    }

    fixLocalPath = path => {
        let $path = path;

        if ($path && $path.length) $path = $path.split('?')[0];

        if (!$path || !$path.charAt) return $path;
        if ($path.charAt(0) === '#') return $path;
        if ($path.charAt(0) !== '/') return '/' + $path;
        return $path;
    }

    fixPath = path => {
        // fix hash links
        if (path.charAt(0) === '#') {
            return window.location.href.split('#')[0] + path;
        }

        if (path.indexOf('mailto:') > -1 || path.indexOf('tel:') > -1) return path;

        if (path.indexOf('://') < 0 && this.props.external) {
            return 'http://' + path;
        }

        return path;
    }

    getQuery = href => href && href.split('?')[1];

    render() {
        const {
            underline,
            children,
            unstyled,
            className,
            activeClassName,
            external,
            target,
            rel,
            href,
            exact,
            location,
            name,
            ...rest
        } = this.props;

        if (!children && name) {
            return <a name={name} />;
        }

        if (typeof href === 'string') {
            const useTargetBlank = !!(external && !target && !(href.indexOf('mailto:') > -1 || href.indexOf('tel:') > -1));

            if (
                href.indexOf('://') > -1 || // has protocol
                href.charAt(0) === '#' || // in-page anchor
                href.indexOf('tel:') === 0 || // tel:
                href.indexOf('mailto:') === 0 || // mailto:
                external // explicit external link
            ) {
                return (
                    <a
                        {...passProps(rest)}
                        href={this.fixPath(href)}
                        onClick={this.onClick}
                        target={useTargetBlank ? '_blank' : target}
                        rel={useTargetBlank ? 'noopener noreferrer' : rel}
                        className={unstyled ? className : classy(style.anchor, underline && style['anchor--underline'], className)}
                    >
                        {children}
                    </a>
                );
            }
        }

        return (
            <NavLink
                {...passProps(rest)}
                exact={exact}
                activeClassName={activeClassName}
                to={typeof href === 'object' ?
                    Object.assign({ state: location.state }, { ...href, pathname: this.fixLocalPath(href.pathname) })
                    :
                    { pathname: this.fixLocalPath(href), state: location.state, search: this.getQuery(href) }
                }
                className={unstyled ? className : classy(style.anchor, underline && style['anchor--underline'], className)}
            >
                {children}
            </NavLink>
        );
    }
}

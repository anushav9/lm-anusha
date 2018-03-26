import shallowEqual from 'shallowequal';

function pureRender(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
    !shallowEqual(this.state, nextState) ||
    !shallowEqual(this.context, nextContext);
}

export default pureRender;
